import { useAuth } from '@/contexts/auth.context';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SignupScreen from './signup';

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

describe('SignupScreen', () => {
  const mockSignup = jest.fn();
  const mockRouter = require('expo-router').router;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
    });
    mockSignup.mockClear();
    mockRouter.replace.mockClear();
  });

  it('should render signup form', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen />);
    expect(getByPlaceholderText('Enter your name')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
  });

  it('should handle signup success', async () => {
    mockSignup.mockResolvedValueOnce(undefined);
    const { getByPlaceholderText, getByText } = render(<SignupScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  it('should handle signup error', async () => {
    const error = new Error('Email already exists');
    mockSignup.mockRejectedValueOnce(error);
    const { getByPlaceholderText, getByText } = render(<SignupScreen />);

    fireEvent.changeText(getByPlaceholderText('Enter your name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'existing@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'existing@example.com',
        password: 'password123',
      });
      expect(mockRouter.replace).not.toHaveBeenCalled();
    });
  });

  it('should navigate to login screen', () => {
    const { getByText } = render(<SignupScreen />);
    fireEvent.press(getByText('Login'));
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });
}); 