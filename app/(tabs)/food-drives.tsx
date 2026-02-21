import { StyleSheet, ScrollView, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mockFoodDrives } from '@/services/foodDrives';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function FoodDrivesScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top']}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Food drives</ThemedText>
        <ThemedText style={styles.subtitle}>Nearby pantries and giveaways</ThemedText>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockFoodDrives.map((drive) => (
          <View key={drive.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <ThemedText type="subtitle" style={styles.cardTitle}>{drive.name}</ThemedText>
              {drive.distance && (
                <View style={styles.distanceBadge}>
                  <ThemedText style={styles.distanceText}>{drive.distance}</ThemedText>
                </View>
              )}
            </View>
            <ThemedText style={styles.org}>{drive.organization}</ThemedText>
            <View style={styles.row}>
              <IconSymbol name="clock.fill" size={16} color="#666" />
              <ThemedText style={styles.metaText}>{drive.date} · {drive.time}</ThemedText>
            </View>
            <ThemedText style={styles.address}>{drive.address}</ThemedText>
            {drive.notes ? (
              <ThemedText style={styles.notes}>{drive.notes}</ThemedText>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#666' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', flex: 1 },
  distanceBadge: { backgroundColor: '#E3F2FD', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  distanceText: { fontSize: 12, fontWeight: '600', color: '#1976D2' },
  org: { fontSize: 14, color: '#666', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  metaText: { fontSize: 13, color: '#666' },
  address: { fontSize: 13, color: '#333', marginBottom: 8 },
  notes: { fontSize: 12, color: '#999', fontStyle: 'italic' },
});
