export class UI 
{
  static PANELS = Object.freeze({
    SETTINGS: 'settings',
    TIMER: 'timer'
  });

  constructor() 
  {
    // DEPENDENCIES 
    this.config = null;
    this.timer = null;

    // VARIABLES
    this.activePanel = UI.PANELS.TIMER;

    this.controlPause = null;
    this.controlReset = null;
    this.controlStart = null;
    
    this.displayBG = null;
    this.displayMinutes = null;
    this.displayMode = null;
    this.displaySeconds = null;
    
    // TODO - rename these to be consistent
    this.formSettings = null;
    this.formSettingsRestTime = null;
    this.formSettingsWorkTime = null;

    this.navSettings = null;
  }
  init( config , timer )
  {
    // this "setter" pattern is cleaner than using "app" since it makes dependencies explicit and controllable.
    this.config = config;
    this.timer = timer;

    // NOTE - setting this from app.js, for now 
    this.bindControls();
    this.bindDisplays();
    this.bindForms();
    this.bindNav();
  }

  bindControls()
  {
    this.controlPause = document.getElementById("control-pause");
    this.controlReset = document.getElementById("control-reset");
    this.controlStart = document.getElementById("control-start");

    this.controlPause.addEventListener("click" , () => { this.timer.pauseCounter(); });
    this.controlReset.addEventListener("click" , () => { this.timer.resetCounter(); });
    this.controlStart.addEventListener("click" , () => { this.timer.startCounter(); });
  }
  bindDisplays()
  {
    this.displayBG = document.getElementById("display-bg");
    this.displayMinutes = document.getElementById("display-minutes");
    this.displayMode = document.getElementById("display-mode");
    this.displaySeconds = document.getElementById("display-seconds");

    this.displayMode.addEventListener("click" , () => { this.timer.switchModes(); });
  }
  bindForms()
  {
    this.formSettings = document.getElementById("form-settings");
    
    this.formSettingsRestTime = document.getElementById("setting-rest-time");
    this.formSettingsWorkTime = document.getElementById("setting-work-time");

    this.formSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveSettings();      
      this.showTimer();
    });
  }
  bindNav()
  {
    this.navSettings = document.getElementById("nav-settings");

    this.navSettings.addEventListener("click" , () => { this.showSettings(); });
  }

  // DISPLAYS
  formatInputToMinutes( input )
  {
    // TODO : if contains colon 
    // TODO : if contains decimal 

    // DEFAULT - using seconds
    return input / 60; 
  }
  formatInputToSeconds( input )
  {
    // TODO : if contains colon 
    // TODO : if contains decimal 

    // DEFAULT - using minutes
    return input * 60; 
  }
  formatTime( input )
  {
    let output = input;
    if( output < 10 )
    {
      output = "0" + input;
    }
    return output;
  }

  updateDisplays()
  {
    this.displayMinutes.innerHTML = this.formatTime( this.timer.timeObject.getMinutes() ); // ticks;
    this.displaySeconds.innerHTML = this.formatTime( this.timer.timeObject.getSeconds() ); // ticks * 10;

    // displayMode.innerHTML = isWorking ? 'WORK' : 'REST';
    if( this.timer.isWorking )
    {
      // TODO :: use classes, and color swatches 
      this.displayMode.innerHTML = 'WORK';
      this.displayBG.classList.remove('bg-rest');
      this.displayBG.classList.add('bg-work');
    }
    else 
    {
      this.displayMode.innerHTML = 'REST';
      this.displayBG.classList.remove('bg-work');
      this.displayBG.classList.add('bg-rest');
    }
  }
  updateForms()
  {
    this.formSettingsRestTime.value = this.formatInputToMinutes( this.config.userSettings.restTime );
    this.formSettingsWorkTime.value = this.formatInputToMinutes( this.config.userSettings.workTime );
  }

  // FORMS
  saveSettings()
  {
      console.log( "Save Settings." );

      let newRest = this.formatInputToSeconds( this.formSettingsRestTime.value );
      let newWork = this.formatInputToSeconds( this.formSettingsWorkTime.value );
      console.log( `newRest: ${ newRest } , newWork: ${ newWork }` );

      const newSettings = {
        ...this.config.userSettings,
        restTime: newRest,
        workTime: newWork
      };

      this.config.save( newSettings );

      this.showTimer();
      
      // this.timer.refreshTimeObject(); // If you want the timer to restart each time the save button is pressed. 
      // TODO - could also checkDiff but this is getting way too complicated. 
  }

  // NAV 
  showSettings()
  {
    if( this.activePanel != UI.PANELS.SETTINGS )
    {
      document.querySelector('#panel-settings').scrollIntoView({ 
        behavior: 'smooth'
      })

      this.activePanel = UI.PANELS.SETTINGS;
    }
    else 
    {
      this.showTimer();
    }
  }
  showTimer()
  {
    document.querySelector('#panel-timer').scrollIntoView({ 
      behavior: 'smooth'
    })

    this.activePanel = UI.PANELS.TIMER;
  }
}
