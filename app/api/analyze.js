// pages/api/analyze.js
import { exec } from 'child_process';
import fs from 'fs'; // Import the fs module

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }

    const tempFilePath = 'C:\\Users\\hp pc\\temp.c'; // Absolute path for temp file

    // Write the code to a temporary file
    fs.writeFileSync(tempFilePath, code, (err) => {
      if (err) {
        console.error('Error writing temp file:', err);
        return res.status(500).json({ error: 'Error writing temp file.' });
      }

      // Run Clang analysis
      const clangPath = 'C:\\Program Files\\LLVM\\bin\\clang.exe';
      const clangCommand = `${clangPath} --analyze ${tempFilePath} 2>&1`;

      exec(clangCommand, (error, stdout, stderr) => {
        if (error) {
          console.error('Analysis failed:', stderr);
          return res.status(500).json({ error: 'Analysis failed', details: stderr });
        }

        // Process the Clang output (simple line-by-line parsing)
        const analysisResults = stdout.split('\n').filter(line => line.trim() !== '');

        // Send analysis results back to the client
        res.status(200).json({ results: analysisResults });

        // Delete the temporary file
        fs.unlinkSync(tempFilePath, (err) => {
          if (err) {
            console.error('Error deleting temp file:', err);
          }
        });
      });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}