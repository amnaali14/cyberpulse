import { exec } from 'child_process';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';

export async function POST(request) {
    try {
        const { code } = await request.json();

        const tempFilePath = path.join(os.tmpdir(), `temp-${Date.now()}.c`);
        const clangPath = process.env.CLANG_PATH || 'clang';

        await fs.writeFile(tempFilePath, code);

        const clangCommand = `${clangPath} --analyze ${tempFilePath} 2>&1`;

        const { stdout, stderr } = await new Promise((resolve, reject) => {
            exec(clangCommand, (error, stdout, stderr) => {
                if (error) {
                    reject({ error, stdout, stderr });
                } else {
                    resolve({ stdout, stderr });
                }
            });
        });

        const analysisResults = stdout.split('\n').filter(line => line.trim() !== '');

        return new Response(JSON.stringify({ results: analysisResults }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        if (tempFilePath) {
            fs.unlink(tempFilePath).catch(err => console.error('Error deleting temp file:', err));
        }
    }
}