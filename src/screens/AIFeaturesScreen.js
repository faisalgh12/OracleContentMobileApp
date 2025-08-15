import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchOracleAIFeatures } from '../services/oracleService';

const AIFeaturesScreen = () => {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Database', 'Cloud', 'Analytics', 'Security', 'Integration'];

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      setLoading(true);
      const aiFeatures = await fetchOracleAIFeatures();
      setFeatures(aiFeatures);
    } catch (error) {
      console.error('Error loading AI features:', error);
      // Fallback to sample data
      setFeatures(getSampleFeatures());
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadFeatures();
    setRefreshing(false);
  };

  const getSampleFeatures = () => [
    {
      id: 1,
      name: 'Oracle Database 23c AI Vector Search',
      category: 'Database',
      description: 'Native vector similarity search for AI-powered applications with support for embeddings and semantic search.',
      status: 'Available',
      version: '23c',
      icon: 'search',
      gradient: ['#667eea', '#764ba2'],
    },
    {
      id: 2,
      name: 'Oracle Cloud AI Services',
      category: 'Cloud',
      description: 'Comprehensive AI services including vision, language, speech, and document analysis capabilities.',
      status: 'Available',
      version: 'Latest',
      icon: 'cloud',
      gradient: ['#f093fb', '#f5576c'],
    },
    {
      id: 3,
      name: 'Oracle Analytics AI',
      category: 'Analytics',
      description: 'AI-powered analytics with natural language querying, automated insights, and predictive analytics.',
      status: 'Available',
      version: '2023',
      icon: 'analytics',
      gradient: ['#4facfe', '#00f2fe'],
    },
    {
      id: 4,
      name: 'Oracle Security AI',
      category: 'Security',
      description: 'AI-driven threat detection, behavioral analytics, and automated security response systems.',
      status: 'Available',
      version: '2023',
      icon: 'shield-checkmark',
      gradient: ['#43e97b', '#38f9d7'],
    },
    {
      id: 5,
      name: 'Oracle Integration AI',
      category: 'Integration',
      description: 'AI-powered integration patterns, intelligent routing, and automated workflow optimization.',
      status: 'Available',
      version: '2023',
      icon: 'git-network',
      gradient: ['#fa709a', '#fee140'],
    },
    {
      id: 6,
      name: 'Oracle Autonomous Database AI',
      category: 'Database',
      description: 'Self-driving database with AI-powered optimization, tuning, and maintenance automation.',
      status: 'Available',
      version: '19c+',
      icon: 'car-sport',
      gradient: ['#a8edea', '#fed6e3'],
    },
  ];

  const filteredFeatures = selectedCategory === 'All' 
    ? features 
    : features.filter(feature => feature.category === selectedCategory);

  const FeatureCard = ({ feature }) => (
    <TouchableOpacity style={styles.featureCard}>
      <LinearGradient
        colors={feature.gradient}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Ionicons name={feature.icon} size={24} color="white" />
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{feature.status}</Text>
          </View>
        </View>
        <Text style={styles.featureName}>{feature.name}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.versionText}>v{feature.version}</Text>
          <Text style={styles.categoryText}>{feature.category}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading AI Features...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>AI Features</Text>
        <Text style={styles.headerSubtitle}>
          Oracle's embedded AI capabilities
        </Text>
      </LinearGradient>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScroll}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === category && styles.categoryButtonTextActive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.featuresGrid}>
          {filteredFeatures.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </View>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Feature Summary</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{filteredFeatures.length}</Text>
              <Text style={styles.statLabel}>Features</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {new Set(filteredFeatures.map(f => f.category)).size}
              </Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {filteredFeatures.filter(f => f.status === 'Available').length}
              </Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  categoriesScroll: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  featuresGrid: {
    marginTop: 20,
  },
  featureCard: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  featureName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    lineHeight: 24,
  },
  featureDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
});

export default AIFeaturesScreen;