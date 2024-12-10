console.log( "main.js :: loaded" );

// Uncaught TypeError: The specifier “config.js” was a bare specifier, but was not remapped to anything. Relative module specifiers must start with “./”, “../” or “/”.
import { Config } from './config.js';
import { Timer } from './timer.js';
import { UI } from './ui.js';

const app = {

  init() {

    // DECLARE
    const settings = Config.default;
    const timer = new Timer();
    const ui = new UI();

    // INIT
    timer.init( settings, ui );
    ui.init( timer );

    // START LOGIC ... could be moved to timer... 
    timer.initTimeObject();

    if( settings.autoplay ) {
      timer.startCounter();
    }
    
  }
};

app.init();
