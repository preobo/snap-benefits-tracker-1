import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themed-text';
import { Recipe } from '@/services/recipes';
import { useRouter } from 'expo-router';
import { IconSymbol } from './ui/icon-symbol';
import { useFamily } from '@/contexts/FamilyContext';

interface RecipeCardProps {
  recipe: Recipe;
  showSNAPBadge?: boolean;
}

export function RecipeCard({ recipe, showSNAPBadge }: RecipeCardProps) {
  const router = useRouter();
  const { favoriteRecipeIds, toggleFavorite } = useFamily();
  const isFavorite = favoriteRecipeIds.includes(recipe.id);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/recipe/${recipe.id}`)}
      activeOpacity={0.8}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: recipe.image }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={styles.overlay} />
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite(recipe.id);
          }}
        >
          <IconSymbol name={isFavorite ? 'heart.fill' : 'heart'} size={22} color={isFavorite ? '#c62828' : '#fff'} />
        </TouchableOpacity>
        {showSNAPBadge && (
          <View style={styles.snapBadge}>
            <ThemedText style={styles.snapBadgeText}>SNAP-friendly</ThemedText>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <ThemedText type="subtitle" style={styles.title}>
          {recipe.title}
        </ThemedText>
        <View style={styles.meta}>
          <View style={styles.metaItem}>
            <IconSymbol name="clock.fill" size={14} color="#fff" />
            <ThemedText style={styles.metaText}>{recipe.cookTime} min</ThemedText>
          </View>
          <View style={styles.metaItem}>
            <IconSymbol name="star.fill" size={14} color="#FFD700" />
            <ThemedText style={styles.metaText}>{recipe.rating}</ThemedText>
          </View>
          <View style={styles.metaItem}>
            <IconSymbol name="flame.fill" size={14} color="#FF6B6B" />
            <ThemedText style={styles.metaText}>{recipe.calories} cal</ThemedText>
          </View>
        </View>
        <ThemedText style={styles.description} numberOfLines={2}>
          {recipe.description}
        </ThemedText>
        <View style={styles.badges}>
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>{recipe.difficulty}</ThemedText>
          </View>
          <View style={styles.badge}>
            <ThemedText style={styles.badgeText}>{recipe.cuisine}</ThemedText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  snapBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: '#1B5E20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  snapBadgeText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
});
