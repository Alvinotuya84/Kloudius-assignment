import Box, { AnimateOnAppear } from '@/components/ui/Box';
import { FancyPageHeader } from '@/components/ui/Page';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/contexts/auth.context';
import { LoginInput } from '@/schemas/auth.schema';
import { useToastStore } from '@/stores/toast.store';
import { formatErrorMessage } from '@/utils/error.utils';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function LoginScreen() {
  const { login } = useAuth();
  const { addToast } = useToastStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const input: LoginInput = { email, password };
      await login(input);
      addToast('Welcome back! You\'ve successfully logged in.', 'success');
      router.replace('/(tabs)');
    } catch (error: any) {
      addToast(formatErrorMessage(error), 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} color="white" px={20} py={40}>
      <AnimateOnAppear visible={true} animation="fadeIn">
        <FancyPageHeader
          title="Welcome Back"
          description="Sign in to continue"
        />
      </AnimateOnAppear>

      <Box gap={20} mt={40}>
        <AnimateOnAppear visible={true} animation="slideInUp" duration={300}>
          <Box gap={10}>
            <ThemedText>Email</ThemedText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
              }}
            />
          </Box>
        </AnimateOnAppear>

        <AnimateOnAppear visible={true} animation="slideInUp" duration={400}>
          <Box gap={10}>
            <ThemedText>Password</ThemedText>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              style={{
                borderWidth: 1,
                borderColor: '#ddd',
                borderRadius: 8,
                padding: 12,
                fontSize: 16,
              }}
            />
          </Box>
        </AnimateOnAppear>

        <AnimateOnAppear visible={true} animation="slideInUp" duration={500}>
          <ThemedButton
            onPress={handleLogin}
            loading={loading}
            block
            mt={20}
          >
            Login
          </ThemedButton>
        </AnimateOnAppear>

        <AnimateOnAppear visible={true} animation="slideInUp" duration={600}>
          <Box direction="row" justify="center" mt={20}>
            <ThemedText>Don't have an account? </ThemedText>
            <ThemedButton
              type="text"
              onPress={() => router.push('/signup')}
            >
              Sign up
            </ThemedButton>
          </Box>
        </AnimateOnAppear>
      </Box>
    </Box>
  );
} 