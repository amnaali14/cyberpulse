const { exec } = require('child_process');

const clangPath = 'C:\\Program Files\\LLVM\\bin\\clang.exe';
const command = `"${clangPath}" --version`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});