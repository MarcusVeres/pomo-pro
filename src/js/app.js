console.log( "main.js :: loaded" );

// Uncaught TypeError: The specifier “config.js” was a bare specifier, but was not remapped to anything. Relative module specifiers must start with “./”, “../” or “/”.
import { Config } from './config.js';
import { Timer } from './timer.js';
import { UI } from './ui.js';

const app = {

  start() {

    // DECLARE
    const config = Config;
    const timer = new Timer();
    const ui = new UI();

    // LOAD DATA 
    config.load();

    // SCROLL TO TIMER 
    ui.showTimer();

    // SET DEPENDENCIES 
    timer.init( config, ui );
    ui.init( config , timer );

    // SET TIMER VALUES BASED ON CONFIG 
    timer.refreshTimeObject();
    ui.updateForms();

    // START 
    if( config.userSettings.autoplay ) {
      timer.startCounter();
    }    
  }
};

app.start();
