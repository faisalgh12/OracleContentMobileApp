import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { fetchAgentStudioAgents } from '../services/oracleService';

const AgentStudioScreen = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const agentTypes = ['All', 'Data', 'Integration', 'Security', 'Analytics', 'Automation'];

  useEffect(() => {
    loadAgents();
  }, []);

  useEffect(() => {
    filterAgents();
  }, [searchQuery, selectedType, agents]);

  const loadAgents = async () => {
    try {
      setLoading(true);
      const agentStudioAgents = await fetchAgentStudioAgents();
      setAgents(agentStudioAgents);
    } catch (error) {
      console.error('Error loading agents:', error);
      // Fallback to sample data
      setAgents(getSampleAgents());
    } finally {
      setLoading(false);
    }
  };

  const filterAgents = () => {
    let filtered = agents;

    if (selectedType !== 'All') {
      filtered = filtered.filter(agent => agent.type === selectedType);
    }

    if (searchQuery) {
      filtered = filtered.filter(agent => 
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAgents(filtered);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAgents();
    setRefreshing(false);
  };

  const getSampleAgents = () => [
    {
      id: 1,
      name: 'Data Integration Agent',
      type: 'Data',
      description: 'Automates data extraction, transformation, and loading processes across multiple sources.',
      capabilities: ['ETL Automation', 'Data Validation', 'Schema Mapping'],
      status: 'Available',
      version: '2.1',
      icon: 'server',
      gradient: ['#667eea', '#764ba2'],
      complexity: 'Intermediate',
    },
    {
      id: 2,
      name: 'Security Monitoring Agent',
      type: 'Security',
      description: 'Continuously monitors system security, detects threats, and responds to security incidents.',
      capabilities: ['Threat Detection', 'Incident Response', 'Compliance Monitoring'],
      status: 'Available',
      version: '1.8',
      icon: 'shield-checkmark',
      gradient: ['#f093fb', '#f5576c'],
      complexity: 'Advanced',
    },
    {
      id: 3,
      name: 'Business Intelligence Agent',
      type: 'Analytics',
      description: 'Generates insights from business data, creates reports, and provides predictive analytics.',
      capabilities: ['Report Generation', 'Predictive Analytics', 'Data Visualization'],
      status: 'Available',
      version: '2.0',
      icon: 'analytics',
      gradient: ['#4facfe', '#00f2fe'],
      complexity: 'Intermediate',
    },
    {
      id: 4,
      name: 'Workflow Automation Agent',
      type: 'Automation',
      description: 'Automates business processes, manages approvals, and optimizes workflow efficiency.',
      capabilities: ['Process Automation', 'Approval Management', 'Workflow Optimization'],
      status: 'Available',
      version: '1.9',
      icon: 'git-network',
      gradient: ['#43e97b', '#38f9d7'],
      complexity: 'Beginner',
    },
    {
      id: 5,
      name: 'API Management Agent',
      type: 'Integration',
      description: 'Manages API lifecycle, monitors performance, and ensures API security and compliance.',
      capabilities: ['API Lifecycle Management', 'Performance Monitoring', 'Security Compliance'],
      status: 'Available',
      version: '2.2',
      icon: 'code-slash',
      gradient: ['#fa709a', '#fee140'],
      complexity: 'Advanced',
    },
    {
      id: 6,
      name: 'Data Quality Agent',
      type: 'Data',
      description: 'Ensures data quality, validates data integrity, and maintains data governance standards.',
      capabilities: ['Data Validation', 'Quality Monitoring', 'Governance Compliance'],
      status: 'Available',
      version: '1.7',
      icon: 'checkmark-circle',
      gradient: ['#a8edea', '#fed6e3'],
      complexity: 'Intermediate',
    },
  ];

  const AgentCard = ({ agent }) => (
    <TouchableOpacity style={styles.agentCard}>
      <LinearGradient
        colors={agent.gradient}
        style={styles.cardGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.cardHeader}>
          <Ionicons name={agent.icon} size={24} color="white" />
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{agent.status}</Text>
          </View>
        </View>
        
        <Text style={styles.agentName}>{agent.name}</Text>
        <Text style={styles.agentDescription}>{agent.description}</Text>
        
        <View style={styles.capabilitiesContainer}>
          {agent.capabilities.map((capability, index) => (
            <View key={index} style={styles.capabilityTag}>
              <Text style={styles.capabilityText}>{capability}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.footerLeft}>
            <Text style={styles.versionText}>v{agent.version}</Text>
            <Text style={styles.typeText}>{agent.type}</Text>
          </View>
          <View style={styles.complexityBadge}>
            <Text style={styles.complexityText}>{agent.complexity}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading Agents...</Text>
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
        <Text style={styles.headerTitle}>Agent Studio</Text>
        <Text style={styles.headerSubtitle}>
          Available AI agents and capabilities
        </Text>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search agents..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <View style={styles.typesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.typesScroll}
        >
          {agentTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedType === type && styles.typeButtonActive
              ]}
              onPress={() => setSelectedType(type)}
            >
              <Text style={[
                styles.typeButtonText,
                selectedType === type && styles.typeButtonTextActive
              ]}>
                {type}
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
        <View style={styles.agentsGrid}>
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </View>
        
        {filteredAgents.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="search" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No agents found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Agent Summary</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{filteredAgents.length}</Text>
              <Text style={styles.statLabel}>Agents</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {new Set(filteredAgents.map(a => a.type)).size}
              </Text>
              <Text style={styles.statLabel}>Types</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {filteredAgents.filter(a => a.status === 'Available').length}
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
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  typesContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  typesScroll: {
    paddingHorizontal: 20,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  typeButtonActive: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  agentsGrid: {
    marginTop: 20,
  },
  agentCard: {
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
  agentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    lineHeight: 24,
  },
  agentDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
    marginBottom: 15,
  },
  capabilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  capabilityTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 5,
  },
  capabilityText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 15,
  },
  typeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  complexityBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  complexityText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
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

export default AgentStudioScreen;