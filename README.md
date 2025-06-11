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

## Tech Stack

* React Native
* Expo Router
* Zustand (State Management)
* Zod (Form Validation)
* AsyncStorage (Data Persistence)
* Expo Blur (Glass Morphic Effects)
* Moti (Animations)
* React Native Safe Area Context

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
│   │   └── Toast.tsx
├── contexts/
│   └── auth.context.tsx
├── stores/
│   ├── auth.store.ts
│   └── toast.store.ts
├── schemas/
│   └── auth.schema.ts
├── utils/
│   └── error.utils.ts
└── constants/
    ├── dimensions.constant.ts
    └── scaler.constants.ts
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
