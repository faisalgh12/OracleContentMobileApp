import axios from 'axios';
import * as cheerio from 'cheerio';

// Oracle documentation URLs
const ORACLE_URLS = {
  database: 'https://docs.oracle.com/en/database/oracle/oracle-database/',
  cloud: 'https://docs.oracle.com/en-us/iaas/Content/home.htm',
  analytics: 'https://docs.oracle.com/en/analytics/',
  integration: 'https://docs.oracle.com/en/cloud/paas/integration-cloud/',
  agentStudio: 'https://docs.oracle.com/en/cloud/paas/agent-studio/',
};

// Sample data for fallback when scraping fails
const SAMPLE_AI_FEATURES = [
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

const SAMPLE_AGENTS = [
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

/**
 * Scrape Oracle documentation for AI features
 * @returns {Promise<Array>} Array of AI features
 */
export const fetchOracleAIFeatures = async () => {
  try {
    console.log('Fetching Oracle AI features...');
    
    // Try to scrape actual Oracle documentation
    const features = await scrapeOracleAIFeatures();
    
    if (features && features.length > 0) {
      console.log(`Found ${features.length} AI features from Oracle docs`);
      return features;
    }
    
    // Fallback to sample data
    console.log('Using sample AI features data');
    return SAMPLE_AI_FEATURES;
    
  } catch (error) {
    console.error('Error fetching Oracle AI features:', error);
    return SAMPLE_AI_FEATURES;
  }
};

/**
 * Scrape Oracle documentation for Agent Studio agents
 * @returns {Promise<Array>} Array of agents
 */
export const fetchAgentStudioAgents = async () => {
  try {
    console.log('Fetching Agent Studio agents...');
    
    // Try to scrape actual Agent Studio documentation
    const agents = await scrapeAgentStudioAgents();
    
    if (agents && agents.length > 0) {
      console.log(`Found ${agents.length} agents from Agent Studio docs`);
      return agents;
    }
    
    // Fallback to sample data
    console.log('Using sample agents data');
    return SAMPLE_AGENTS;
    
  } catch (error) {
    console.error('Error fetching Agent Studio agents:', error);
    return SAMPLE_AGENTS;
  }
};

/**
 * Search Oracle content for AI features and agents
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of search results
 */
export const searchOracleContent = async (query) => {
  try {
    console.log(`Searching Oracle content for: ${query}`);
    
    // Try to search actual Oracle documentation
    const results = await searchOracleDocs(query);
    
    if (results && results.length > 0) {
      console.log(`Found ${results.length} search results`);
      return results;
    }
    
    // Fallback to sample search results
    console.log('Using sample search results');
    return getSampleSearchResults(query);
    
  } catch (error) {
    console.error('Error searching Oracle content:', error);
    return getSampleSearchResults(query);
  }
};

/**
 * Scrape Oracle documentation for AI features
 * @returns {Promise<Array>} Array of AI features
 */
const scrapeOracleAIFeatures = async () => {
  try {
    const features = [];
    
    // Scrape Database AI features
    const databaseFeatures = await scrapeDatabaseAIFeatures();
    features.push(...databaseFeatures);
    
    // Scrape Cloud AI features
    const cloudFeatures = await scrapeCloudAIFeatures();
    features.push(...cloudFeatures);
    
    // Scrape Analytics AI features
    const analyticsFeatures = await scrapeAnalyticsAIFeatures();
    features.push(...analyticsFeatures);
    
    return features;
    
  } catch (error) {
    console.error('Error scraping Oracle AI features:', error);
    return [];
  }
};

/**
 * Scrape Oracle Database AI features
 * @returns {Promise<Array>} Array of database AI features
 */
const scrapeDatabaseAIFeatures = async () => {
  try {
    const response = await axios.get(ORACLE_URLS.database, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const features = [];
    
    // Look for AI-related content in the documentation
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning')) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          features.push({
            id: features.length + 1,
            name: title,
            category: 'Database',
            description: `AI feature found in Oracle Database documentation: ${title}`,
            status: 'Available',
            version: '23c',
            icon: 'server',
            gradient: ['#667eea', '#764ba2'],
          });
        }
      }
    });
    
    return features.slice(0, 5); // Limit to 5 features
    
  } catch (error) {
    console.error('Error scraping database AI features:', error);
    return [];
  }
};

/**
 * Scrape Oracle Cloud AI features
 * @returns {Promise<Array>} Array of cloud AI features
 */
const scrapeCloudAIFeatures = async () => {
  try {
    const response = await axios.get(ORACLE_URLS.cloud, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const features = [];
    
    // Look for AI-related content in the cloud documentation
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning')) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          features.push({
            id: features.length + 1,
            name: title,
            category: 'Cloud',
            description: `AI feature found in Oracle Cloud documentation: ${title}`,
            status: 'Available',
            version: 'Latest',
            icon: 'cloud',
            gradient: ['#f093fb', '#f5576c'],
          });
        }
      }
    });
    
    return features.slice(0, 5); // Limit to 5 features
    
  } catch (error) {
    console.error('Error scraping cloud AI features:', error);
    return [];
  }
};

/**
 * Scrape Oracle Analytics AI features
 * @returns {Promise<Array>} Array of analytics AI features
 */
const scrapeAnalyticsAIFeatures = async () => {
  try {
    const response = await axios.get(ORACLE_URLS.analytics, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const features = [];
    
    // Look for AI-related content in the analytics documentation
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      if (text.includes('ai') || text.includes('artificial intelligence') || text.includes('machine learning')) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          features.push({
            id: features.length + 1,
            name: title,
            category: 'Analytics',
            description: `AI feature found in Oracle Analytics documentation: ${title}`,
            status: 'Available',
            version: '2023',
            icon: 'analytics',
            gradient: ['#4facfe', '#00f2fe'],
          });
        }
      }
    });
    
    return features.slice(0, 5); // Limit to 5 features
    
  } catch (error) {
    console.error('Error scraping analytics AI features:', error);
    return [];
  }
};

/**
 * Scrape Agent Studio agents
 * @returns {Promise<Array>} Array of agents
 */
const scrapeAgentStudioAgents = async () => {
  try {
    const response = await axios.get(ORACLE_URLS.agentStudio, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const agents = [];
    
    // Look for agent-related content in the Agent Studio documentation
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      if (text.includes('agent') || text.includes('automation') || text.includes('workflow')) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          agents.push({
            id: agents.length + 1,
            name: title,
            type: 'Automation',
            description: `Agent found in Agent Studio documentation: ${title}`,
            capabilities: ['Automation', 'Workflow Management'],
            status: 'Available',
            version: '2.0',
            icon: 'construct',
            gradient: ['#43e97b', '#38f9d7'],
            complexity: 'Intermediate',
          });
        }
      }
    });
    
    return agents.slice(0, 5); // Limit to 5 agents
    
  } catch (error) {
    console.error('Error scraping Agent Studio agents:', error);
    return [];
  }
};

/**
 * Search Oracle documentation
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of search results
 */
const searchOracleDocs = async (query) => {
  try {
    const results = [];
    
    // Search across multiple Oracle documentation sources
    const searchPromises = [
      searchDatabaseDocs(query),
      searchCloudDocs(query),
      searchAnalyticsDocs(query),
      searchAgentStudioDocs(query),
    ];
    
    const searchResults = await Promise.allSettled(searchPromises);
    
    searchResults.forEach((result, index) => {
      if (result.status === 'fulfilled' && result.value) {
        results.push(...result.value);
      }
    });
    
    // Sort by relevance and remove duplicates
    const uniqueResults = results.filter((result, index, self) => 
      index === self.findIndex(r => r.title === result.title)
    );
    
    return uniqueResults.sort((a, b) => b.relevance - a.relevance);
    
  } catch (error) {
    console.error('Error searching Oracle docs:', error);
    return [];
  }
};

/**
 * Search Database documentation
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of search results
 */
const searchDatabaseDocs = async (query) => {
  try {
    const response = await axios.get(ORACLE_URLS.database, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const results = [];
    
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (text.includes(queryLower)) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          const relevance = calculateRelevance(text, queryLower);
          results.push({
            id: results.length + 1,
            type: 'AI Feature',
            title: title,
            description: `Found in Database documentation: ${title}`,
            category: 'Database',
            relevance: relevance,
            url: '#',
          });
        }
      }
    });
    
    return results.slice(0, 3);
    
  } catch (error) {
    console.error('Error searching database docs:', error);
    return [];
  }
};

/**
 * Search Cloud documentation
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of search results
 */
const searchCloudDocs = async (query) => {
  try {
    const response = await axios.get(ORACLE_URLS.cloud, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const results = [];
    
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (text.includes(queryLower)) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          const relevance = calculateRelevance(text, queryLower);
          results.push({
            id: results.length + 1,
            type: 'AI Feature',
            title: title,
            description: `Found in Cloud documentation: ${title}`,
            category: 'Cloud',
            relevance: relevance,
            url: '#',
          });
        }
      }
    });
    
    return results.slice(0, 3);
    
  } catch (error) {
    console.error('Error searching cloud docs:', error);
    return [];
  }
};

/**
 * Search Analytics documentation
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of search results
 */
const searchAnalyticsDocs = async (query) => {
  try {
    const response = await axios.get(ORACLE_URLS.analytics, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const results = [];
    
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (text.includes(queryLower)) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          const relevance = calculateRelevance(text, queryLower);
          results.push({
            id: results.length + 1,
            type: 'AI Feature',
            title: title,
            description: `Found in Analytics documentation: ${title}`,
            category: 'Analytics',
            relevance: relevance,
            url: '#',
          });
        }
      }
    });
    
    return results.slice(0, 3);
    
  } catch (error) {
    console.error('Error searching analytics docs:', error);
    return [];
  }
};

/**
 * Search Agent Studio documentation
 * @param {string} query - Search query
 * @returns {Promise<Array>} Array of search results
 */
const searchAgentStudioDocs = async (query) => {
  try {
    const response = await axios.get(ORACLE_URLS.agentStudio, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OracleAIExplorer/1.0)',
      },
    });
    
    const $ = cheerio.load(response.data);
    const results = [];
    
    $('a, h1, h2, h3, p').each((index, element) => {
      const text = $(element).text().toLowerCase();
      const queryLower = query.toLowerCase();
      
      if (text.includes(queryLower)) {
        const title = $(element).text().trim();
        if (title && title.length > 10 && title.length < 100) {
          const relevance = calculateRelevance(text, queryLower);
          results.push({
            id: results.length + 1,
            type: 'Agent',
            title: title,
            description: `Found in Agent Studio documentation: ${title}`,
            category: 'Automation',
            relevance: relevance,
            url: '#',
          });
        }
      }
    });
    
    return results.slice(0, 3);
    
  } catch (error) {
    console.error('Error searching Agent Studio docs:', error);
    return [];
  }
};

/**
 * Calculate search relevance score
 * @param {string} text - Text content
 * @param {string} query - Search query
 * @returns {number} Relevance score (0-100)
 */
const calculateRelevance = (text, query) => {
  const queryWords = query.split(' ').filter(word => word.length > 2);
  let score = 0;
  
  queryWords.forEach(word => {
    const wordCount = (text.match(new RegExp(word, 'g')) || []).length;
    score += wordCount * 10;
  });
  
  // Bonus for exact phrase match
  if (text.includes(query)) {
    score += 20;
  }
  
  // Bonus for title matches
  if (text.includes(query) && text.length < 100) {
    score += 15;
  }
  
  return Math.min(100, Math.max(0, score));
};

/**
 * Get sample search results for fallback
 * @param {string} query - Search query
 * @returns {Array} Array of sample search results
 */
const getSampleSearchResults = (query) => {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('database') || queryLower.includes('vector')) {
    return [
      {
        id: 1,
        type: 'AI Feature',
        title: 'Oracle Database 23c AI Vector Search',
        description: 'Native vector similarity search for AI-powered applications with support for embeddings and semantic search.',
        category: 'Database',
        relevance: 95,
        url: '#',
      },
    ];
  }
  
  if (queryLower.includes('agent') || queryLower.includes('studio')) {
    return [
      {
        id: 2,
        type: 'Agent',
        title: 'Data Integration Agent',
        description: 'Automates data extraction, transformation, and loading processes across multiple sources.',
        category: 'Data',
        relevance: 88,
        url: '#',
      },
    ];
  }
  
  if (queryLower.includes('cloud') || queryLower.includes('ai')) {
    return [
      {
        id: 3,
        type: 'AI Feature',
        title: 'Oracle Cloud AI Services',
        description: 'Comprehensive AI services including vision, language, speech, and document analysis capabilities.',
        category: 'Cloud',
        relevance: 82,
        url: '#',
      },
    ];
  }
  
  return [
    {
      id: 4,
      type: 'AI Feature',
      title: 'Oracle Security AI',
      description: 'AI-driven threat detection, behavioral analytics, and automated security response systems.',
      category: 'Security',
      relevance: 78,
      url: '#',
    },
  ];
};