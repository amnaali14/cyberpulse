require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs').promises;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios'); // Import Axios
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');
const os = require('os');
const util = require('util');
const cors = require('cors');


const execAsync = util.promisify(exec);

app.use(bodyParser.json());
app.use(cors());

const hash = await bcrypt.hash("amna123", 10);
console.log(hash);

const SECRET_KEY = process.env.JWT_SECRET;
const CLANG_PATH = process.env.CLANG_PATH || 'clang';


if (!SECRET_KEY) {
    console.error('Error: JWT_SECRET environment variable is not set.');
    process.exit(1);
}

// Replace with a database!
const users = [];

const generateToken = (user) => {
    return jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

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

// Register endpoint using Axios
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });

    const token = generateToken({ username });

    res.json({ message: 'User registered successfully.', token });
});

// Login endpoint using Axios
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = generateToken(user);
    res.json({ message: 'Login successful.', token });
});

app.get('/', (req, res) => {
    res.send('Welcome to the Clang Backend!');
});

// Analyze Code API
app.post('/api/analyze', async (req, res) => {
    console.log("Request received:", req.body);
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Code is required.' });
    }

    if (code.length > 10000) {
        return res.status(400).json({ error: 'Code too large.' });
    }

    const sanitizedCode = code.replace(/[^a-zA-Z0-9\s{};#()+\-*/%&|^~=!<>.,\[\]]/g, '');
    console.log("Sanitized code:", sanitizedCode);

      sanitizedCode = req.body.code.trim(); // Trim spaces/newlines

    // Check if code contains "int main" or at least a function definition
    if (!sanitizedCode.includes("int main") && !sanitizedCode.includes("(")) {
        return res.status(400).json({ error: "Invalid C code. Please provide valid C syntax." });
    }
    
    let tempFilePath;
    try {
        tempFilePath = path.join(os.tmpdir(), `temp-${Date.now()}.c`);

        console.log("Temp file path:", tempFilePath);
await fs.writeFile(tempFilePath, sanitizedCode);
console.log("File written successfully");

  
        
        const clangCommand = `"${CLANG_PATH}" --analyze ${tempFilePath} 2>&1`;
        console.log("Executing:", clangCommand);

        const { stdout, stderr } = await execAsync(clangCommand);
        
        if (stderr) {
            console.error('Clang stderr:', stderr);
            return res.status(500).json({ error: 'Clang analysis failed.', details: stderr });
        }

        const analysisResults = processClangOutput(stdout);
        
        // Example: Making an external API request with Axios (if needed)
        try {
           await axios.post('http://localhost:3001/api/logs', { results: analysisResults });

            console.log('Log response:', axiosResponse.data);
        } catch (axiosError) {
            console.error('Error sending logs:', axiosError.message);
        }

        res.json({ results: analysisResults });

    } catch (err) {
        console.error('File operation error:', err);
        return res.status(500).json({ error: 'Internal server error.' });

    } finally {
        if (tempFilePath) {
            fs.unlink(tempFilePath).catch(err => console.error('Error deleting temp file:', err));
        }
    }
});

function processClangOutput(output) {
    return output.split('\n').filter(line => line.trim() !== '');
}

app.listen(port, () => {
    console.log(`Backend listening at http://localhost:${port}`);
});
