import 'regenerator-runtime/runtime';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
import colors from 'colors';
try {
  fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf-8');
} catch (e) {
  const message = `${colors.yellow('WARNING:')} ${colors.cyan(
    '".env"'
  )} file doesn't exist in:`;
  console.error(message);
  console.error(e.path);
}

config();
require('./app');
