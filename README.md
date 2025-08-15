# Oracle AI Explorer

A modern, sleek mobile app that explores Oracle's embedded AI features and Agent Studio capabilities by reading publicly available documentation.

## 🚀 Features

### **AI Features Discovery**
- **Database AI**: Oracle Database 23c AI Vector Search, Autonomous Database AI
- **Cloud AI**: Oracle Cloud AI Services, Vision, Language, Speech, Document Analysis
- **Analytics AI**: AI-powered analytics, Natural Language Querying, Predictive Analytics
- **Security AI**: AI-driven threat detection, Behavioral Analytics, Automated Response
- **Integration AI**: AI-powered integration patterns, Intelligent Routing, Workflow Optimization

### **Agent Studio Explorer**
- **Data Agents**: Data Integration, Data Quality, ETL Automation
- **Security Agents**: Security Monitoring, Threat Detection, Compliance Monitoring
- **Analytics Agents**: Business Intelligence, Report Generation, Predictive Analytics
- **Automation Agents**: Workflow Automation, Process Management, Approval Workflows
- **Integration Agents**: API Management, Performance Monitoring, Security Compliance

### **Smart Search & Discovery**
- Global search across all AI features and agents
- Intelligent relevance scoring
- Category-based filtering
- Recent searches and search history
- Popular topics and trending features

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Gradient Cards**: Beautiful gradient backgrounds for visual appeal
- **Responsive Design**: Optimized for all mobile screen sizes
- **Dark/Light Themes**: Adaptive color schemes
- **Smooth Navigation**: Tab-based navigation with stack navigation
- **Pull-to-Refresh**: Real-time data updates
- **Loading States**: Elegant loading animations and skeleton screens

## 🛠️ Technical Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **Navigation**: React Navigation v6 with bottom tabs and stack
- **Web Scraping**: Axios + Cheerio for Oracle documentation parsing
- **UI Components**: Custom components with LinearGradient and Ionicons
- **State Management**: React Hooks for local state
- **Error Handling**: Graceful fallbacks to sample data

## 📱 Screens

### **Home Screen**
- Welcome message and app overview
- Quick access cards to main sections
- Statistics dashboard
- Recently added features

### **AI Features Screen**
- Categorized AI capabilities
- Feature cards with descriptions
- Status indicators and version info
- Category filtering

### **Agent Studio Screen**
- Available agents listing
- Capability tags and complexity levels
- Search and type filtering
- Agent details and descriptions

### **Search Screen**
- Global search functionality
- Popular topics grid
- Recent searches
- Search history
- Relevance-based results

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (optional)

### Quick Start
```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web
```

### Environment Setup
The app is configured to work out of the box with sample data. For production use:

1. **Configure Oracle URLs**: Update URLs in `src/services/oracleService.js`
2. **API Keys**: Add any required API keys for enhanced functionality
3. **Rate Limiting**: Implement proper rate limiting for web scraping
4. **Caching**: Add data caching for better performance

## 🌐 Web Scraping

The app includes intelligent web scraping capabilities:

- **Oracle Documentation**: Automatically discovers AI features from official docs
- **Agent Studio**: Finds available agents and capabilities
- **Fallback Data**: Comprehensive sample data when scraping fails
- **Respectful Scraping**: Proper user agents and rate limiting
- **Error Handling**: Graceful degradation to sample data

### Supported Oracle Sources
- Oracle Database Documentation
- Oracle Cloud Documentation
- Oracle Analytics Documentation
- Oracle Integration Documentation
- Oracle Agent Studio Documentation

## 📊 Data Structure

### AI Features
```javascript
{
  id: number,
  name: string,
  category: string,
  description: string,
  status: string,
  version: string,
  icon: string,
  gradient: string[]
}
```

### Agents
```javascript
{
  id: number,
  name: string,
  type: string,
  description: string,
  capabilities: string[],
  status: string,
  version: string,
  icon: string,
  gradient: string[],
  complexity: string
}
```

## 🚀 Deployment

### Expo Build
```bash
# Build for production
expo build:android
expo build:ios

# EAS Build (recommended)
eas build --platform all
```

### App Store Deployment
1. Configure app.json with proper metadata
2. Build production version
3. Submit to App Store/Play Store
4. Configure app signing and certificates

## 🔒 Security & Privacy

- **No Data Storage**: App doesn't store personal user data
- **Public Documentation**: Only accesses publicly available Oracle docs
- **Respectful Scraping**: Proper user agents and rate limiting
- **Fallback Data**: Sample data when external sources unavailable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Oracle Corporation for comprehensive documentation
- React Native community for excellent tooling
- Expo team for the amazing development platform
- Contributors and beta testers

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide

---

**Oracle AI Explorer** - Discover the future of Oracle AI and Agent Studio capabilities! 🚀✨
