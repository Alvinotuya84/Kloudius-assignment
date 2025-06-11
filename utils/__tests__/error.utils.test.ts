import { formatErrorMessage } from '../error.utils';

describe('formatErrorMessage', () => {
  it('formats Zod validation errors', () => {
    const zodError = {
      issues: [
        {
          code: 'invalid_type',
          path: ['email'],
          message: 'Required',
        },
        {
          code: 'too_small',
          path: ['password'],
          message: 'Too short',
        },
      ],
    };

    const result = formatErrorMessage(zodError);
    expect(result).toBe('email: Required\npassword is too short');
  });

  it('handles string errors', () => {
    const error = 'Network error';
    const result = formatErrorMessage(error);
    expect(result).toBe('Network error');
  });

  it('formats common error messages', () => {
    const error = new Error('Invalid email format');
    const result = formatErrorMessage(error);
    expect(result).toBe('Please enter a valid email address');
  });

  it('provides fallback for unknown errors', () => {
    const error = new Error('Unknown error');
    const result = formatErrorMessage(error);
    expect(result).toBe('Something went wrong. Please try again');
  });
}); 