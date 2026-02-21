import { useState, useMemo } from 'react';
import { StyleSheet, ScrollView, TextInput, View, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { RecipeCard } from '@/components/recipe-card';
import { searchRecipes, mockRecipes, getRecipesRecommendedForPlan, getRecipeById } from '@/services/recipes';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useFamily } from '@/contexts/FamilyContext';

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const { mealPlan, favoriteRecipeIds } = useFamily();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(mockRecipes);

  const mealNames = useMemo(() => {
    const names: string[] = [];
    mealPlan.forEach((day) => day.meals.forEach((m) => names.push(m.name)));
    return names;
  }, [mealPlan]);

  const recommendedRecipes = useMemo(() => getRecipesRecommendedForPlan(mealNames), [mealNames]);
  const favoriteRecipes = useMemo(
    () => favoriteRecipeIds.map((id) => getRecipeById(id)).filter(Boolean) as import('@/services/recipes').Recipe[],
    [favoriteRecipeIds]
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredRecipes(mockRecipes);
    } else {
      setFilteredRecipes(searchRecipes(query));
    }
  };

  const cuisines = ['All', 'Italian', 'Mediterranean', 'American', 'Indian', 'Asian'];
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  const handleCuisineFilter = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    if (cuisine === 'All') {
      setFilteredRecipes(searchQuery ? searchRecipes(searchQuery) : mockRecipes);
    } else {
      const filtered = mockRecipes.filter(recipe => recipe.cuisine === cuisine);
      setFilteredRecipes(searchQuery ? filtered.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) : filtered);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]} edges={['top']}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>Discover Recipes</ThemedText>
      </View>

      <View style={styles.searchContainer}>
        <IconSymbol name="magnifyingglass" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recipes..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <IconSymbol 
              name="xmark.circle.fill" 
              size={20} 
              color="#999" 
            />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.cuisineScroll}
        contentContainerStyle={styles.cuisineContainer}
      >
        {cuisines.map((cuisine) => (
          <TouchableOpacity
            key={cuisine}
            style={[
              styles.cuisineChip,
              selectedCuisine === cuisine && styles.cuisineChipActive
            ]}
            onPress={() => handleCuisineFilter(cuisine)}
            activeOpacity={0.7}
          >
            <ThemedText style={[
              styles.cuisineText,
              selectedCuisine === cuisine && styles.cuisineTextActive
            ]}>
              {cuisine}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {favoriteRecipes.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Favorites</ThemedText>
            {favoriteRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </View>
        )}

        {recommendedRecipes.length > 0 && mealNames.length > 0 && (
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>Recommended for your meal plan</ThemedText>
            <ThemedText style={styles.sectionSubtitle}>Recipes that fit your plan and maximize benefits</ThemedText>
            {recommendedRecipes.slice(0, 4).map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} showSNAPBadge />
            ))}
          </View>
        )}

        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            {searchQuery || selectedCuisine !== 'All' ? 'Results' : 'All recipes'}
          </ThemedText>
          {filteredRecipes.length > 0 ? (
            <>
              <ThemedText style={styles.resultCount}>
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
              </ThemedText>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </>
          ) : (
            <View style={styles.emptyState}>
              <IconSymbol name="magnifyingglass" size={64} color="#ccc" />
              <ThemedText style={styles.emptyText}>No recipes found</ThemedText>
              <ThemedText style={styles.emptySubtext}>Try a different search term or filter</ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearIcon: {
    marginLeft: 8,
  },
  cuisineScroll: {
    maxHeight: 50,
    marginBottom: 16,
  },
  cuisineContainer: {
    paddingHorizontal: 20,
    gap: 8,
  },
  cuisineChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  cuisineChipActive: {
    backgroundColor: '#FF6B6B',
  },
  cuisineText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  cuisineTextActive: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: '#666', marginBottom: 12 },
  resultCount: { fontSize: 14, color: '#666', marginBottom: 12 },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});