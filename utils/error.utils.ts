export const formatErrorMessage = (error: any): string => {
  // If it's a Zod error
  if (error?.issues) {
    const issues = error.issues;
    if (Array.isArray(issues)) {
      return issues.map(issue => {
        const field = issue.path.join('.');
        switch (issue.code) {
          case 'invalid_type':
            return `${field}: ${issue.message}`;
          case 'too_small':
            return `${field} is too short`;
          case 'too_big':
            return `${field} is too long`;
          case 'invalid_string':
            if (issue.validation === 'email') {
              return 'Please enter a valid email address';
            }
            return `${field}: ${issue.message}`;
          default:
            return issue.message;
        }
      }).join('\n');
    }
  }

  // If it's a string, return it directly
  if (typeof error === 'string') {
    return error;
  }

  // If it's an error object with a message
  if (error?.message) {
    // Format common error messages
    const message = error.message.toLowerCase();
    if (message.includes('email')) {
      return 'Please enter a valid email address';
    }
    if (message.includes('password')) {
      return 'Please check your password';
    }
    if (message.includes('network')) {
      return 'Please check your internet connection';
    }
    if (message.includes('auth')) {
      return 'Authentication failed. Please try again';
    }
    return error.message;
  }

  // Default fallback
  return 'Something went wrong. Please try again';
}; 