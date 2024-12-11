export class UI 
{
  static PANELS = Object.freeze({
    SETTINGS: 'settings',
    TIMER: 'timer'
  });

  constructor() 
  {
    // DEPENDENCIES 
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
    
    this.formSettings = null;

    this.navSettings = null;
  }
  init( timer )
  {
    // this "setter" pattern is cleaner than using "app" since it makes dependencies explicit and controllable.
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

    this.formSettings.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // 
      console.log( "TODO :: Save form data." );
      
      this.showTimer();
    });
  }
  bindNav()
  {
    this.navSettings = document.getElementById("nav-settings");

    this.navSettings.addEventListener("click" , () => { this.showSettings(); });
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
