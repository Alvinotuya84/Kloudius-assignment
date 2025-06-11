import Box from '@/components/ui/Box';
import ThemedIcon from '@/components/ui/ThemedIcon';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/contexts/auth.context';
import { useTheme } from '@/hooks/useTheme.hook';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import React from 'react';
import { ScrollView, StyleSheet, TextStyle, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatCard = ({ title, value, icon, color }: { title: string; value: string; icon: string; color: string }) => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'timing', duration: 500 } as any}
    style={styles.statCard}
  >
    <BlurView intensity={20} tint="light" style={styles.blurContainer}>
      <Box 
        direction="row" 
        align="center" 
        pa={12} 
        color={`${color}15`}
      >
        <ThemedIcon name={icon as any} size={24} color={color} source='MaterialCommunityIcons'/>
        <Box ml={8} flex={1}>
          <ThemedText size="xs" style={styles.statTitle}>{title}</ThemedText>
          <ThemedText size="lg" style={{ fontWeight: 'bold', color } as TextStyle}>{value}</ThemedText>
        </Box>
      </Box>
    </BlurView>
  </MotiView>
);

const QuickAction = ({ 
  title, 
  icon, 
  source = 'MaterialCommunityIcons', 
  onPress 
}: { 
  title: string; 
  icon: string; 
  source?: 'MaterialCommunityIcons' | 'FontAwesome' | 'Fontisto' | 'AntDesign' | 'Entypo' | 'EvilIcons' | 'Feather' | 'FontAwesome5' | 'FontAwesome6' | 'Foundation' | 'Ionicons' | 'MaterialIcons' | 'Octicons' | 'SimpleLineIcons' | 'Zocial'; 
  onPress: () => void 
}) => (
  <MotiView
    from={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ type: 'timing', duration: 500 } as any}
    style={styles.quickAction}
  >
    <TouchableOpacity onPress={onPress} style={styles.quickActionButton}>
      <BlurView intensity={20} tint="light" style={styles.blurContainer}>
        <Box 
          pa={16} 
          align="center" 
          color="rgba(255, 255, 255, 0.1)"
        >
          <ThemedIcon name={icon as any} size={24} source={source} color="#666" />
          <ThemedText size="sm" style={styles.quickActionText}>{title}</ThemedText>
        </Box>
      </BlurView>
    </TouchableOpacity>
  </MotiView>
);

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      <MotiView
        from={{ opacity: 0, translateY: -20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 } as any}
        style={styles.header}
      >
        <Box>
          <ThemedText size="xl" style={styles.welcomeText}>Welcome back,</ThemedText>
          <ThemedText size="xl" style={styles.nameText}>{user?.name}</ThemedText>
        </Box>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <ThemedIcon name="logout" source='MaterialCommunityIcons' size={24} color="#666" />
        </TouchableOpacity>
      </MotiView>

      <Box direction="row" justify="space-between" mb={30}>
        <StatCard
          title="Total Tasks"
          value="12"
          icon="checkbox-marked-circle-outline"
          color={theme.primary}
        />
        <StatCard
          title="Completed"
          value="8"
          icon="check-circle"
          color={theme.success}
        />
        <StatCard
          title="Pending"
          value="4"
          icon="clock-outline"
          color={theme.warning}
        />
      </Box>

      <Box mb={30}>
        <ThemedText size="lg" style={styles.sectionTitle}>Quick Actions</ThemedText>
        <Box direction="row" wrap="wrap" mx={-5}>
          <QuickAction
            title="New Task"
            icon="plus-circle-outline"
            onPress={() => {}}
          />
          <QuickAction
            title="Calendar"
            icon="calendar"
            onPress={() => {}}
          />
          <QuickAction
            title="Analytics"
            icon="chart-bar"
            onPress={() => {}}
          />
          <QuickAction
            title="Settings"
            icon="cog"
            onPress={() => {}}
          />
        </Box>
      </Box>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500 } as any}
        style={styles.recentActivityContainer}
      >
        <ThemedText size="lg" style={styles.sectionTitle}>Recent Activity</ThemedText>
        <BlurView intensity={20} tint="light" style={styles.blurContainer}>
          <Box pa={16} color="rgba(255, 255, 255, 0.1)">
            <Box direction="row" align="center" mb={16}>
              <ThemedIcon name="check-circle" size={20} color={theme.success} />
              <Box ml={12} flex={1}>
                <ThemedText size="sm">Completed task "Design Review"</ThemedText>
                <ThemedText size="xs" style={styles.activityTime}>2 hours ago</ThemedText>
              </Box>
            </Box>
            <Box direction="row" align="center" mb={16}>
              <ThemedIcon name="plus-circle" size={20} color={theme.primary} />
              <Box ml={12} flex={1}>
                <ThemedText size="sm">Created new task "Team Meeting"</ThemedText>
                <ThemedText size="xs" style={styles.activityTime}>4 hours ago</ThemedText>
              </Box>
            </Box>
          </Box>
        </BlurView>
      </MotiView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    color: '#666',
  },
  nameText: {
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 100,
  },
  blurContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  statTitle: {
    color: '#666',
    marginBottom: 2,
  },
  quickAction: {
    width: '50%',
    padding: 5,
  },
  quickActionButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  quickActionText: {
    marginTop: 8,
    color: '#666',
  },
  recentActivityContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: 'bold',
  },
  activityTime: {
    color: '#666',
    marginTop: 2,
  },
});
