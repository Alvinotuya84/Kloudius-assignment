# React Native Authentication App

A React Native app with Login and Signup functionality using React Context API to manage the authentication state. This project demonstrates authentication flows, state management using Context API, form handling, and navigation.

## Features

- User Authentication (Login/Signup)
- Form Validation using Zod
- State Management using Zustand
- Protected Routes using Expo Router
- Persistent Authentication using AsyncStorage
- Animated UI Components
- Unit Tests

## Tech Stack

- React Native
- Expo Router
- Zustand (State Management)
- Zod (Form Validation)
- AsyncStorage (Data Persistence)
- React Native Testing Library
- Jest

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   └── index.tsx
│   ├── _layout.tsx
│   ├── login.tsx
│   └── signup.tsx
├── components/
│   ├── Box.tsx
│   ├── Page.tsx
│   ├── ThemedButton.tsx
│   └── ThemedText.tsx
├── contexts/
│   └── auth.context.tsx
├── stores/
│   └── auth.store.ts
├── schemas/
│   └── auth.schema.ts
└── tests/
    ├── auth.store.test.ts
    ├── auth.context.test.tsx
    ├── login.test.tsx
    ├── signup.test.tsx
    └── home.test.tsx
```

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run tests:
```bash
npm test
```

## Features Implementation

### Authentication Context
- Implemented using React's Context API
- Manages global authentication state
- Provides login, signup, and logout functions
- Stores user information

### Form Validation
- Email format validation
- Password length validation
- Required field validation
- Error message display

### Protected Routes
- Login/Signup screens for unauthenticated users
- Home screen for authenticated users
- Automatic redirection based on authentication state

### UI Components
- Animated form inputs
- Loading states
- Error messages
- Responsive layout
- Theme support

### Testing
- Unit tests for authentication store
- Component tests for screens
- Integration tests for authentication flow

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
