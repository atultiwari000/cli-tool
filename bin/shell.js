import readline from 'readline';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Atul $ '
});

rl.prompt();

rl.on('line', (line) => {
  const args = line.trim().split(' ');
  const command = args[0];
  const commandArgs = args.slice(1);

  if (command === 'exit' || command === 'quit') {
    rl.close();
    return;
  }

    const loggerPath = path.resolve(__dirname, 'index.js');
  const shellCommand = spawn('node', [loggerPath, ...args], { stdio: 'inherit' });

  shellCommand.on('close', (code) => {
    if (code !== 0) {
      console.error(`Command failed with exit code ${code}`);
    }
    rl.prompt();
  });
});

rl.on('close', () => {
  console.log('Shell closed');
  process.exit(0);
});
