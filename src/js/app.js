console.log( "main.js :: loaded" );

// Uncaught TypeError: The specifier “config.js” was a bare specifier, but was not remapped to anything. Relative module specifiers must start with “./”, “../” or “/”.
import { Config } from './config.js';
import { Timer } from './timer.js';
import { UI } from './ui.js';

const app = {
  init() {

    this.settings = Config.default;
    console.log( this.settings );

    this.ui = new UI( this );       // create instance
    this.timer = new Timer( this ); // pass app as reference

    // Init - could be in ui constructor, but need control references 
    this.ui.bindControls();
    this.ui.bindDisplays();

    this.timer.initTimeObject();

    if( this.settings.autoplay ) {
      this.timer.startCounter();
    }
    
  }
};

app.init();
