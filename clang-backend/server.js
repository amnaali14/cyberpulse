const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const port = 3001;

app.use(bodyParser.json());

const SECRET_KEY = 'your-secret-key'; // Replace with a secure key in production

// Mock database for users
const users = [];

// Helper function to generate JWT
const generateToken = (user) => {
  return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// User Registration Endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'Username already exists.' });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: 'User registered successfully.' });
});

// User Login Endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(400).json({ error: 'Invalid username or password.' });
  }

  // Verify the password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid username or password.' });
  }

  // Generate and return a JWT
  const token = generateToken(user);
  res.json({ token });
});

// Protected Route: Code Analysis
app.post('/analyze', authenticateToken, (req, res) => {
  const { code } = req.body;

  const tempFilePath = 'C:\\Users\\hp pc\\temp.c';
  fs.writeFileSync(tempFilePath, code, (err) => {
    if (err) {
      console.error('Error writing temp file:', err);
      return res.status(500).json({ error: 'Error writing temp file.' });
    }

    const clangPath = 'C:\\Program Files\\LLVM\\bin\\clang.exe';
    const clangCommand = `${clangPath} --analyze ${tempFilePath} 2>&1`;

    console.log('clangCommand:', clangCommand);
    console.log('process.env.PATH:', process.env.PATH); // Log PATH

    exec(clangCommand, {
      cwd: 'C:\\Users\\hp pc\\Downloads',
      env: { PATH: 'C:\\Program Files\\LLVM\\bin;' + process.env.PATH }, // Explicitly set PATH
    }, (error, stdout, stderr) => {
      console.log('stdout:', stdout);
      console.log('stderr:', stderr);

      if (error) {
        console.error('Error object:', error);
        console.error(`Error executing Clang: ${error}`);
        return res.status(500).json({ error: 'Analysis failed.' });
      }

      const analysisResults = processClangOutput(stdout);

      res.json({ results: analysisResults });

      fs.unlinkSync(tempFilePath, (err) => {
        if (err) {
          console.error('Error deleting temp file:', err);
        }
      });
    });
  });
});

// Helper function to process Clang output
function processClangOutput(output) {
  const lines = output.split('\n').filter((line) => line.trim() !== '');
  return lines;
}

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});

