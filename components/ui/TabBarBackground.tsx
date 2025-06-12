// This is a shim for web and Android where the tab bar is generally opaque.
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ANIMATION_DURATION } from '@/constants/dimensions.constant';

export default function TabBarBackground() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(1.2, { damping: 10 });
    const timer = setTimeout(() => {
      scale.value = withSpring(1, { damping: 10 });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  if (Platform.OS !== 'ios') {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn.duration(ANIMATION_DURATION)}
      exiting={FadeOut.duration(ANIMATION_DURATION)}
      style={[
        StyleSheet.absoluteFill,
        {
          width,
          height: bottom + 50,
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
        animatedStyle,
      ]}>
      <BlurView
        intensity={95}
        tint={colors.background === 'dark' ? 'dark' : 'light'}
        style={[StyleSheet.absoluteFill]}
      />
    </Animated.View>
  );
}

export function useBottomTabOverflow() {
  return 0;
}
