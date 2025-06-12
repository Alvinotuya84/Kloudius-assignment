import { StyleSheet } from 'react-native';

import Box from '@/components/ui/Box';
import Page from '@/components/ui/Page';

export default function SettingsScreen() {
  return (
    <Page
    header={{
      title:"settings"
    }}
    >
<Box></Box>
    </Page>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
