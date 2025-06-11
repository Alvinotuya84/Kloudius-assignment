import { act, renderHook } from '@testing-library/react-hooks';
import { useAuthStore } from './auth.store';

describe('Auth Store', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.logout();
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
  });

  it('should login user', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    };

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBeTruthy();
  });

  it('should logout user', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    };

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBeTruthy();

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
  });

  it('should signup user', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    };

    act(() => {
      result.current.signup(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBeTruthy();
  });
}); 