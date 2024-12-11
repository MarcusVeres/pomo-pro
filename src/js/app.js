console.log( "main.js :: loaded" );

// Uncaught TypeError: The specifier “config.js” was a bare specifier, but was not remapped to anything. Relative module specifiers must start with “./”, “../” or “/”.
import { Config } from './config.js';
import { Timer } from './timer.js';
import { UI } from './ui.js';

const app = {

  start() {

    // DECLARE
    const settings = Config.default;
    const timer = new Timer();
    const ui = new UI();

    // SCROLL TO TIMER 
    ui.showTimer();

    // SET DEPENDENCIES 
    timer.init( settings, ui );
    ui.init( timer );

    // SET TIMER VALUES BASED ON SETTINGS 
    timer.refreshTimeObject();

    // START 
    if( settings.autoplay ) {
      timer.startCounter();
    }    
  }
};

app.start();
