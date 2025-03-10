const sonarqubeScanner = require('sonarqube-scanner').default; // Use .default for ES modules compatibility

sonarqubeScanner(
  {
    serverUrl: 'http://localhost:9000',
    token: '<squ_8f7b21a5a82269d871ccf96b149594b53ddb6f9b>', // Replace with your actual token
    options: {
      'sonar.projectKey': 'your_project_key',
      'sonar.projectName': 'Your Project Name',
      'sonar.projectVersion': '1.0',
      'sonar.sources': 'src', // Path to your source code
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info', // If using Jest or other test frameworks
    },
  },
  () => process.exit()
);