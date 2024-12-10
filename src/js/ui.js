export class UI 
{
  constructor( app ) 
  {
    this.app = app;

    this.controlPause = null;
    this.controlReset = null;
    this.controlStart = null;
    
    this.displayBG = null;
    this.displayMinutes = null;
    this.displayMode = null;
    this.displaySeconds = null;  

    // NOTE - setting thisg from app.js, for now 
    // this.bindControls();
    // this.bindDisplays();
  }

  bindControls()
  {
    this.controlPause = document.getElementById("control-pause");
    this.controlReset = document.getElementById("control-reset");
    this.controlStart = document.getElementById("control-start");

    this.controlPause.addEventListener("click" , () => { this.app.timer.pauseCounter(); });
    this.controlReset.addEventListener("click" , () => { this.app.timer.resetCounter(); });
    this.controlStart.addEventListener("click" , () => { this.app.timer.startCounter(); });
  }
  bindDisplays()
  {
    this.displayBG = document.getElementById("display-bg");
    this.displayMinutes = document.getElementById("display-minutes");
    this.displayMode = document.getElementById("display-mode");
    this.displaySeconds = document.getElementById("display-seconds");
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
    this.displayMinutes.innerHTML = this.formatTime( this.app.timer.timeObject.getMinutes() ); // ticks;
    this.displaySeconds.innerHTML = this.formatTime( this.app.timer.timeObject.getSeconds() ); // ticks * 10;

    // displayMode.innerHTML = isWorking ? 'WORK' : 'REST';
    if( this.app.timer.isWorking )
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
}
