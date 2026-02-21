import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useFamily } from '@/contexts/FamilyContext';
import { MealPlanContent } from '@/components/meal-plan-content';

export default function MealPlanTabScreen() {
  const { mealPlan, groceryList } = useFamily();
  const hasData = mealPlan.length > 0 || groceryList.length > 0;

  if (!hasData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Meal plan & grocery list</Text>
          <Text style={styles.emptySubtitle}>
            Get a personalized meal plan and grocery list based on your SNAP benefits, household size, and preferences.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/onboarding')}>
            <Text style={styles.buttonText}>Create meal plan</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MealPlanContent mealPlan={mealPlan} groceryList={groceryList} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  emptyState: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', alignItems: 'center' },
  emptyTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a', marginBottom: 12, textAlign: 'center' },
  emptySubtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 24 },
  primaryButton: { backgroundColor: '#1B5E20', padding: 18, borderRadius: 12, alignItems: 'center', width: '100%' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
