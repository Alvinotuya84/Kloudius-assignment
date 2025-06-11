# React Native Authentication App

A React Native app with Login and Signup functionality using React Context API to manage the authentication state. This project demonstrates authentication flows, state management using Context API, form handling, and navigation.

## Features

* User Authentication (Login/Signup)
* Form Validation using Zod
* State Management using Zustand
* Protected Routes using Expo Router
* Persistent Authentication using AsyncStorage
* Animated UI Components
* Glass Morphic UI Design
* Toast Notifications System
* Human-readable Error Messages
* Responsive Layout with Safe Area Support
* Unit Testing with Jest and React Native Testing Library

## Tech Stack

* React Native
* Expo Router
* Zustand (State Management)
* Zod (Form Validation)
* AsyncStorage (Data Persistence)
* Expo Blur (Glass Morphic Effects)
* Moti (Animations)
* React Native Safe Area Context
* Jest (Testing)
* React Native Testing Library

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
│   ├── ui/
│   │   ├── Box.tsx
│   │   ├── Page.tsx
│   │   ├── ThemedButton.tsx
│   │   ├── ThemedText.tsx
│   │   ├── ThemedIcon.tsx
│   │   ├── Toast.tsx
│   │   └── __tests__/
│   │       └── Toast.test.tsx
├── contexts/
│   └── auth.context.tsx
├── stores/
│   ├── auth.store.ts
│   └── toast.store.ts
├── schemas/
│   └── auth.schema.ts
├── utils/
│   ├── error.utils.ts
│   └── __tests__/
│       └── error.utils.test.ts
├── constants/
│   ├── dimensions.constant.ts
│   └── scaler.constants.ts
├── jest.config.js
└── jest.setup.js
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/Alvinotuya84/Kloudius-assignment.git
cd Kloudius-assignment
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
# Run tests in watch mode
npm test

# Run tests for changed files only
npm run testDebug

# Run all tests once
npm run testFinal

# Update snapshots
npm run updateSnapshots
```

## Features Implementation

### Authentication Context
* Implemented using React's Context API
* Manages global authentication state
* Provides login, signup, and logout functions
* Stores user information

### Form Validation
* Email format validation
* Password length validation
* Required field validation
* Human-readable error messages

### Toast Notifications
* Glass morphic design using expo-blur
* Animated entrance and exit
* Multiple toast types (success, error, warning, info)
* Auto-dismiss with tap to dismiss option
* Bottom-aligned with safe area support

### UI Components
* Glass morphic design elements
* Animated form inputs
* Loading states
* Responsive layout
* Theme support
* Safe area aware components

### Error Handling
* Human-readable error messages
* Form validation errors
* Network errors
* Authentication errors
* Fallback error messages

### Testing
* Jest configuration with jest-expo preset
* React Native Testing Library for component testing
* Global mocks for Expo and React Native modules
* Unit tests for components and utilities
* Snapshot testing support
* Code coverage reporting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
