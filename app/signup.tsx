import Box, { AnimateOnAppear } from '@/components/ui/Box';
import { FancyPageHeader } from '@/components/ui/Page';
import ThemedButton from '@/components/ui/ThemedButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/contexts/auth.context';
import { SignupInput } from '@/schemas/auth.schema';
import { useToastStore } from '@/stores/toast.store';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

export default function SignupScreen() {
  const { signup } = useAuth();
  const { addToast } = useToastStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      const input: SignupInput = { name, email, password };
      await signup(input);
      addToast('Account created successfully!', 'success');
      router.replace('/(tabs)');
    } catch (error: any) {
      addToast(error.message || 'Failed to create account', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box flex={1} color="white" px={20} py={40}>
      <AnimateOnAppear visible={true} animation="fadeIn">
        <FancyPageHeader
          title="Create Account"
          description="Sign up to get started"
        />
      </AnimateOnAppear>

      <Box gap={20} mt={40}>
        <AnimateOnAppear visible={true} animation="slideInUp" duration={300}>
          <Box gap={10}>
            <ThemedText>Name</ThemedText>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
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

        <AnimateOnAppear visible={true} animation="slideInUp" duration={500}>
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

        <AnimateOnAppear visible={true} animation="slideInUp" duration={600}>
          <ThemedButton
            onPress={handleSignup}
            loading={loading}
            block
            mt={20}
          >
            Sign up
          </ThemedButton>
        </AnimateOnAppear>

        <AnimateOnAppear visible={true} animation="slideInUp" duration={700}>
          <Box direction="row" justify="center" mt={20}>
            <ThemedText>Already have an account? </ThemedText>
            <ThemedButton
              type="text"
              onPress={() => router.push('/login')}
            >
              Login
            </ThemedButton>
          </Box>
        </AnimateOnAppear>
      </Box>
    </Box>
  );
} 