import logger from "../logger.js";
import { cosmiconfigSync } from 'cosmiconfig';
import schema from '../config/config.js';

import Ajv from 'ajv';
import betterAjvErrors from 'better-ajv-errors';
const ajv = new Ajv({ strict: false });

const configLoader = cosmiconfigSync('logger');

export default function getConfig() {
    const result = configLoader.search(process.cwd());
  if (!result) {
    //console.log('Could not find configuration, using default');
    return { port: 1234 };
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning('Invalid configuration was supplied');
        console.log();
        logger.warning(betterAjvErrors(schema, result.config, ajv.errors));
      process.exit(1);
    }
    logger.log('Found configuration', result.config);
    return result.config;
  }
}