import 'regenerator-runtime/runtime';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';
try {
  fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf-8');
} catch (e) {
  const message = `.env file doesn't exist`;
  console.error(message);
  console.error(e.path);
  throw message;
}

config();
require('./app');
