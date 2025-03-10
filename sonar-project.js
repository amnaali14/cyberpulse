const scanner = require('sonarqube-scanner');

scanner(
  {
    serverUrl: 'http://localhost:9000',
    token: '<your-token>',
    options: {
      'sonar.projectKey': 'your_frontend_project_key',
      'sonar.projectName': 'Your Frontend Project',
      'sonar.projectVersion': '1.0',
      'sonar.sources': 'src',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info', // If using Jest or other test frameworks
    },
  },
  () => process.exit()
);