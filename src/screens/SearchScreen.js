import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { searchOracleContent } from '../services/oracleService';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchHistory, setSearchHistory] = useState([
    'Oracle Database 23c AI',
    'Agent Studio agents',
    'Vector search capabilities',
    'AI-powered analytics',
    'Security monitoring',
  ]);

  const popularTopics = [
    { title: 'Database AI Features', icon: 'server', color: '#667eea' },
    { title: 'Cloud AI Services', icon: 'cloud', color: '#f093fb' },
    { title: 'Analytics & BI', icon: 'analytics', color: '#4facfe' },
    { title: 'Security & Compliance', icon: 'shield-checkmark', color: '#43e97b' },
    { title: 'Integration Patterns', icon: 'git-network', color: '#fa709a' },
    { title: 'Automation Agents', icon: 'construct', color: '#a8edea' },
  ];

  const performSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setSearchQuery(query);

    // Add to recent searches
    if (!recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }

    try {
      const results = await searchOracleContent(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to sample results
      setSearchResults(getSampleSearchResults(query));
    } finally {
      setLoading(false);
    }
  };

  const getSampleSearchResults = (query) => [
    {
      id: 1,
      type: 'AI Feature',
      title: 'Oracle Database 23c AI Vector Search',
      description: 'Native vector similarity search for AI-powered applications with support for embeddings and semantic search.',
      category: 'Database',
      relevance: 95,
      url: '#',
    },
    {
      id: 2,
      type: 'Agent',
      title: 'Data Integration Agent',
      description: 'Automates data extraction, transformation, and loading processes across multiple sources.',
      category: 'Data',
      relevance: 88,
      url: '#',
    },
    {
      id: 3,
      type: 'AI Feature',
      title: 'Oracle Cloud AI Services',
      description: 'Comprehensive AI services including vision, language, speech, and document analysis capabilities.',
      category: 'Cloud',
      relevance: 82,
      url: '#',
    },
    {
      id: 4,
      type: 'Agent',
      title: 'Security Monitoring Agent',
      description: 'Continuously monitors system security, detects threats, and responds to security incidents.',
      category: 'Security',
      relevance: 78,
      url: '#',
    },
  ];

  const SearchResultCard = ({ result }) => (
    <TouchableOpacity style={styles.resultCard}>
      <View style={styles.resultHeader}>
        <View style={styles.resultType}>
          <Ionicons 
            name={result.type === 'AI Feature' ? 'sparkles' : 'construct'} 
            size={16} 
            color={result.type === 'AI Feature' ? '#667eea' : '#f093fb'} 
          />
          <Text style={styles.resultTypeText}>{result.type}</Text>
        </View>
        <View style={styles.relevanceBadge}>
          <Text style={styles.relevanceText}>{result.relevance}%</Text>
        </View>
      </View>
      
      <Text style={styles.resultTitle}>{result.title}</Text>
      <Text style={styles.resultDescription}>{result.description}</Text>
      
      <View style={styles.resultFooter}>
        <View style={styles.categoryTag}>
          <Text style={styles.categoryText}>{result.category}</Text>
        </View>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
          <Ionicons name="arrow-forward" size={16} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const PopularTopicCard = ({ topic, onPress }) => (
    <TouchableOpacity style={styles.topicCard} onPress={onPress}>
      <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
        <Ionicons name={topic.icon} size={24} color="white" />
      </View>
      <Text style={styles.topicTitle}>{topic.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Search Oracle AI</Text>
        <Text style={styles.headerSubtitle}>
          Find AI features, agents, and capabilities
        </Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for AI features, agents, capabilities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={() => performSearch(searchQuery)}
            placeholderTextColor="#999"
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
        
        {searchQuery && (
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={() => performSearch(searchQuery)}
          >
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!searchQuery && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Topics</Text>
              <View style={styles.topicsGrid}>
                {popularTopics.map((topic, index) => (
                  <PopularTopicCard
                    key={index}
                    topic={topic}
                    onPress={() => performSearch(topic.title)}
                  />
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent Searches</Text>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSearchItem}
                  onPress={() => performSearch(search)}
                >
                  <Ionicons name="time" size={16} color="#666" />
                  <Text style={styles.recentSearchText}>{search}</Text>
                  <Ionicons name="arrow-forward" size={16} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Search History</Text>
              {searchHistory.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.historyItem}
                  onPress={() => performSearch(search)}
                >
                  <Ionicons name="search" size={16} color="#666" />
                  <Text style={styles.historyText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        )}

        {searchQuery && !loading && searchResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Search Results ({searchResults.length})
            </Text>
            {searchResults.map((result) => (
              <SearchResultCard key={result.id} result={result} />
            ))}
          </View>
        )}

        {searchQuery && !loading && searchResults.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No results found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search terms or browse popular topics
            </Text>
          </View>
        )}
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
  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  topicIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  topicTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 20,
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  recentSearchText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    marginLeft: 10,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  historyText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    marginLeft: 10,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginLeft: 5,
  },
  relevanceBadge: {
    backgroundColor: '#e8f5e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  relevanceText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#28a745',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    lineHeight: 22,
  },
  resultDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
    marginBottom: 15,
  },
  resultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#007AFF',
    marginRight: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default SearchScreen;