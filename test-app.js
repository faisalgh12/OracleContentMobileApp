#!/usr/bin/env node

/**
 * Simple test script to verify the Oracle AI Explorer app structure
 */

console.log('🧪 Testing Oracle AI Explorer App Structure...\n');

// Test file existence
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'app.json',
  'babel.config.js',
  'index.js',
  'App.js',
  'src/screens/HomeScreen.js',
  'src/screens/AIFeaturesScreen.js',
  'src/screens/AgentStudioScreen.js',
  'src/screens/SearchScreen.js',
  'src/services/oracleService.js'
];

const requiredDirs = [
  'src',
  'src/screens',
  'src/services',
  'src/components',
  'src/utils',
  'assets'
];

console.log('📁 Checking required directories...');
requiredDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}/`);
  } else {
    console.log(`❌ ${dir}/ - Missing`);
  }
});

console.log('\n📄 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

// Test package.json
console.log('\n📦 Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (packageJson.name === 'oracle-ai-explorer') {
    console.log('✅ Package name is correct');
  } else {
    console.log('❌ Package name is incorrect');
  }
  
  if (packageJson.dependencies && packageJson.dependencies.expo) {
    console.log('✅ Expo dependency found');
  } else {
    console.log('❌ Expo dependency missing');
  }
  
  if (packageJson.dependencies && packageJson.dependencies['react-native']) {
    console.log('✅ React Native dependency found');
  } else {
    console.log('❌ React Native dependency missing');
  }
  
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

// Test app.json
console.log('\n⚙️ Checking app.json...');
try {
  const appJson = JSON.parse(fs.readFileSync('app.json', 'utf8'));
  
  if (appJson.expo && appJson.expo.name === 'Oracle AI Explorer') {
    console.log('✅ App name is correct');
  } else {
    console.log('❌ App name is incorrect');
  }
  
  if (appJson.expo && appJson.expo.slug === 'oracle-ai-explorer') {
    console.log('✅ App slug is correct');
  } else {
    console.log('❌ App slug is incorrect');
  }
  
} catch (error) {
  console.log('❌ Error reading app.json:', error.message);
}

// Test source files for basic syntax
console.log('\n🔍 Checking source files...');
const sourceFiles = [
  'src/screens/HomeScreen.js',
  'src/screens/AIFeaturesScreen.js',
  'src/screens/AgentStudioScreen.js',
  'src/screens/SearchScreen.js',
  'src/services/oracleService.js'
];

sourceFiles.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf8');
    
    // Basic syntax checks
    if (content.includes('import React') || content.includes('import React from')) {
      console.log(`✅ ${file} - React import found`);
    } else {
      console.log(`⚠️ ${file} - React import not found`);
    }
    
    if (content.includes('export default')) {
      console.log(`✅ ${file} - Default export found`);
    } else {
      console.log(`⚠️ ${file} - Default export not found`);
    }
    
  } catch (error) {
    console.log(`❌ ${file} - Error reading file: ${error.message}`);
  }
});

console.log('\n🎯 App Structure Test Complete!');
console.log('\n📱 To run the app:');
console.log('   npm install');
console.log('   npm start');
console.log('   # Or use: ./start.sh');
console.log('\n🚀 The app should now be ready to run!');