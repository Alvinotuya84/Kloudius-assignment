import { useAuth } from '@/contexts/auth.context';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import HomeScreen from './index';

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

// Mock Alert
jest.mock('react-native', () => ({
  ...jest.requireActual('react-native'),
  Alert: {
    alert: jest.fn(),
  },
}));

interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

describe('HomeScreen', () => {
  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  };
  const mockLogout = jest.fn();
  const mockRouter = require('expo-router').router;
  const mockAlert = require('react-native').Alert.alert;

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      logout: mockLogout,
    });
    mockLogout.mockClear();
    mockRouter.replace.mockClear();
    mockAlert.mockClear();
  });

  it('should display user information', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText(`Name: ${mockUser.name}`)).toBeTruthy();
    expect(getByText(`Email: ${mockUser.email}`)).toBeTruthy();
  });

  it('should show logout confirmation dialog', () => {
    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Logout'));
    expect(mockAlert).toHaveBeenCalledWith(
      'Logout',
      'Are you sure you want to logout?',
      expect.any(Array)
    );
  });

  it('should handle logout confirmation', async () => {
    mockAlert.mockImplementation((title: string, message: string, buttons: AlertButton[]) => {
      const confirmButton = buttons.find((button) => button.text === 'Logout');
      if (confirmButton?.onPress) {
        confirmButton.onPress();
      }
    });

    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Logout'));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
      expect(mockRouter.replace).toHaveBeenCalledWith('/login');
    });
  });

  it('should handle logout cancellation', () => {
    mockAlert.mockImplementation((title: string, message: string, buttons: AlertButton[]) => {
      const cancelButton = buttons.find((button) => button.text === 'Cancel');
      if (cancelButton?.onPress) {
        cancelButton.onPress();
      }
    });

    const { getByText } = render(<HomeScreen />);
    fireEvent.press(getByText('Logout'));

    expect(mockLogout).not.toHaveBeenCalled();
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });
}); 