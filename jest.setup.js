import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('expo-router', () => ({
  replace: jest.fn(),
  push: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Node.js built-in modules
jest.mock('console', () => ({
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}));

// Mock other Node.js built-in modules that might be used
jest.mock('util', () => ({
  ...jest.requireActual('util'),
  inspect: jest.fn(),
}));

// Mock process
global.process = {
  ...global.process,
  env: {
    ...global.process.env,
    NODE_ENV: 'test',
  },
};

// Mock timers
jest.useFakeTimers(); 