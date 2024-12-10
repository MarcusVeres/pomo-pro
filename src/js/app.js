console.log( "main.js :: loaded" );

// Uncaught TypeError: The specifier “config.js” was a bare specifier, but was not remapped to anything. Relative module specifiers must start with “./”, “../” or “/”.
import { Config } from './config.js';

const app = {
  init() {
    this.config = Config.default.restTime;
  }
};