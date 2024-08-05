import { readFileSync } from 'fs';
const config = JSON.parse(readFileSync(new URL('./schema.json', import.meta.url), 'utf-8'));
export default config;