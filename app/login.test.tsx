import { useAuth } from '@/contexts/auth.context';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import LoginScreen from './login';

// Mock the auth context
jest.mock('@/contexts/auth.context', () => ({
  useAuth: jest.fn(),
}));

// Mock the router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
  },
}));

describe('LoginScreen', () => {
  const mockLogin = jest.fn();
  const mockRouter = require('expo-router').router;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
    });
    mockLogin.mockClear();
    mockRouter.replace.mockClear();
  });

  it('should render login form', () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('should handle login success', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  it('should handle login error', async () => {
    const error = new Error('Invalid credentials');
    mockLogin.mockRejectedValueOnce(error);
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'wrong-password');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'wrong-password',
      });
      expect(mockRouter.replace).not.toHaveBeenCalled();
    });
  });

  it('should navigate to signup screen', () => {
    const { getByText } = render(<LoginScreen />);
    fireEvent.press(getByText('Sign up'));
    expect(mockRouter.push).toHaveBeenCalledWith('/signup');
  });
}); 