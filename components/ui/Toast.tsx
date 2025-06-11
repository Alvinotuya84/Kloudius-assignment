import { useTheme } from '@/hooks/useTheme.hook';
import { ToastType, useToastStore } from '@/stores/toast.store';
import { MotiView } from 'moti';
import React from 'react';
import { StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThemedIcon from './ThemedIcon';
import ThemedText from './ThemedText';

const getToastConfig = (type: ToastType, theme: ReturnType<typeof useTheme>) => {
  switch (type) {
    case 'success':
      return {
        icon: 'check-circle' as const,
        color: theme.success,
        backgroundColor: `${theme.success}20`,
      };
    case 'error':
      return {
        icon: 'x-circle' as const,
        color: theme.error,
        backgroundColor: `${theme.error}20`,
      };
    case 'warning':
      return {
        icon: 'alert-circle' as const,
        color: theme.warning,
        backgroundColor: `${theme.warning}20`,
      };
    case 'info':
      return {
        icon: 'info' as const,
        color: theme.info,
        backgroundColor: `${theme.info}20`,
      };
  }
};

export const Toast = () => {
  const { toasts, removeToast } = useToastStore();
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <MotiView
      style={[
        styles.container,
        {
          paddingTop: insets.top + 10,
        },
      ]}
    >
      {toasts.map((toast) => {
        const config = getToastConfig(toast.type, theme);
        return (
          <MotiView
            key={toast.id}
            from={{
              opacity: 0,
              scale: 0.9,
              translateY: -20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              translateY: -20,
            }}
            transition={{
              type: 'timing',
              duration: 300,
            } as any}
            style={[
              styles.toast,
              {
                backgroundColor: config.backgroundColor,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.content}
              onPress={() => removeToast(toast.id)}
            >
              <ThemedIcon
                name={config.icon}
                size={20}
                color={config.color}
                style={styles.icon}
              />
              <ThemedText
                style={[styles.message, { color: config.color }] as TextStyle}
                size="sm"
              >
                {toast.message}
              </ThemedText>
            </TouchableOpacity>
          </MotiView>
        );
      })}
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingHorizontal: 16,
  },
  toast: {
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    marginRight: 8,
  },
  message: {
    flex: 1,
  },
}); 