import Box, { AnimateOnAppear } from '@/components/Box';
import { FancyPageHeader } from '@/components/Page';
import ThemedButton from '@/components/ThemedButton';
import ThemedText from '@/components/ThemedText';
import { useAuth } from '@/contexts/auth.context';
import { router } from 'expo-router';
import React from 'react';
import { Alert } from 'react-native';

export default function HomeScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <Box flex={1} color="white" px={20} py={40}>
      <AnimateOnAppear visible={true} animation="fadeIn">
        <FancyPageHeader
          title="Welcome"
          description="You are now logged in"
        />
      </AnimateOnAppear>

      <Box gap={20} mt={40}>
        <AnimateOnAppear visible={true} animation="slideInUp" duration={300}>
          <Box gap={10}>
            <ThemedText size="lg">User Information</ThemedText>
            <Box
              color="#f5f5f5"
              radius={12}
              p={20}
              gap={10}
            >
              <ThemedText>Name: {user?.name}</ThemedText>
              <ThemedText>Email: {user?.email}</ThemedText>
            </Box>
          </Box>
        </AnimateOnAppear>

        <AnimateOnAppear visible={true} animation="slideInUp" duration={400}>
          <ThemedButton
            onPress={handleLogout}
            block
            mt={20}
            color="#ff4444"
          >
            Logout
          </ThemedButton>
        </AnimateOnAppear>
      </Box>
    </Box>
  );
}
