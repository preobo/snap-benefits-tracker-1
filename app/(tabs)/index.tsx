import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { RecipeCard } from '@/components/recipe-card';
import { mockRecipes } from '@/services/recipes';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useFamily } from '@/contexts/FamilyContext';
import { router } from 'expo-router';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { snap, suggestedDeals } = useFamily();
  const featuredRecipes = mockRecipes.slice(0, 4);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top']}>
      <View style={styles.header}>
        <View>
          <ThemedText type="title" style={styles.greeting}>Welcome back</ThemedText>
          <ThemedText style={styles.subtitle}>Meal plans, deals & recipes for your family</ThemedText>
        </View>
        <View style={styles.iconContainer}>
          <IconSymbol name="bell.fill" size={24} color={Colors[colorScheme ?? 'light'].icon} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* SNAP benefits – easily accessible */}
        {snap && (
          <TouchableOpacity
            style={styles.snapCard}
            activeOpacity={0.9}
            onPress={() => router.push('/(tabs)/meal-plan')}
          >
            <View style={styles.snapRow}>
              <ThemedText style={styles.snapLabel}>SNAP balance</ThemedText>
              <ThemedText style={styles.snapBalance}>${snap.balance.toFixed(2)}</ThemedText>
            </View>
            <ThemedText style={styles.snapReload}>Reloads {snap.reloadDate}</ThemedText>
          </TouchableOpacity>
        )}

        {/* Quick links – family viewable areas */}
        <View style={styles.quickLinks}>
          <TouchableOpacity style={styles.quickLink} onPress={() => router.push('/(tabs)/meal-plan')}>
            <View style={[styles.quickLinkIcon, { backgroundColor: '#E8F5E9' }]}>
              <ThemedText style={styles.quickLinkEmoji}>📋</ThemedText>
            </View>
            <ThemedText style={styles.quickLinkLabel}>Meal Plan</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={() => router.push('/(tabs)/search')}>
            <View style={[styles.quickLinkIcon, { backgroundColor: '#FFF3E0' }]}>
              <ThemedText style={styles.quickLinkEmoji}>🍳</ThemedText>
            </View>
            <ThemedText style={styles.quickLinkLabel}>Discover</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickLink} onPress={() => router.push('/(tabs)/food-drives')}>
            <View style={[styles.quickLinkIcon, { backgroundColor: '#E3F2FD' }]}>
              <ThemedText style={styles.quickLinkEmoji}>🚚</ThemedText>
            </View>
            <ThemedText style={styles.quickLinkLabel}>Food Drives</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Suggested deals – viewable by all family */}
        {suggestedDeals.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Suggested deals</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dealsRow}>
              {suggestedDeals.slice(0, 5).map((deal) => (
                <View key={deal.id} style={styles.dealCard}>
                  <ThemedText style={styles.dealTitle} numberOfLines={2}>{deal.title}</ThemedText>
                  <ThemedText style={styles.dealStore}>{deal.store}</ThemedText>
                  <ThemedText style={styles.dealDiscount}>{deal.discount}</ThemedText>
                  {deal.snapEligible && (
                    <View style={styles.snapBadge}><ThemedText style={styles.snapBadgeText}>SNAP</ThemedText></View>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Discoverable recipes preview */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Discover recipes</ThemedText>
          {featuredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  greeting: { fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 16, color: '#666' },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },
  snapCard: {
    backgroundColor: '#1B5E20',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  snapRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  snapLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 14 },
  snapBalance: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  snapReload: { color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 8 },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quickLink: { alignItems: 'center', flex: 1 },
  quickLinkIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickLinkEmoji: { fontSize: 24 },
  quickLinkLabel: { fontSize: 12, fontWeight: '600', color: '#333' },
  section: { marginTop: 8 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  dealsRow: { gap: 12, paddingRight: 20 },
  dealCard: {
    width: 160,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dealTitle: { fontSize: 14, fontWeight: '600', color: '#1a1a1a', marginBottom: 4 },
  dealStore: { fontSize: 12, color: '#666', marginBottom: 2 },
  dealDiscount: { fontSize: 12, color: '#1B5E20', fontWeight: '600' },
  snapBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 8,
  },
  snapBadgeText: { fontSize: 10, fontWeight: '700', color: '#1B5E20' },
});
