import { useToastStore } from '@/stores/toast.store';
import { fireEvent, render } from '@testing-library/react-native';
import { Toast } from '../Toast';

// Mock the toast store
jest.mock('@/stores/toast.store', () => ({
  useToastStore: jest.fn(),
}));

// Mock expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

describe('Toast Component', () => {
  const mockToasts = [
    {
      id: '1',
      message: 'Test success message',
      type: 'success' as const,
    },
    {
      id: '2',
      message: 'Test error message',
      type: 'error' as const,
    },
  ];

  const mockRemoveToast = jest.fn();

  beforeEach(() => {
    (useToastStore as jest.Mock).mockReturnValue({
      toasts: mockToasts,
      removeToast: mockRemoveToast,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all toasts', () => {
    const { getByText } = render(<Toast />);
    
    expect(getByText('Test success message')).toBeTruthy();
    expect(getByText('Test error message')).toBeTruthy();
  });

  it('calls removeToast when a toast is pressed', () => {
    const { getByText } = render(<Toast />);
    
    fireEvent.press(getByText('Test success message'));
    expect(mockRemoveToast).toHaveBeenCalledWith('1');
  });

  it('renders correct icons for different toast types', () => {
    const { UNSAFE_getByProps } = render(<Toast />);
    
    const successIcon = UNSAFE_getByProps({ name: 'check-circle' });
    const errorIcon = UNSAFE_getByProps({ name: 'x-circle' });
    
    expect(successIcon).toBeTruthy();
    expect(errorIcon).toBeTruthy();
  });
}); 