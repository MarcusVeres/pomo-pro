export class Timer 
{
  constructor( app )
  {
    console.log("Timer :: constructor()");

    this.app = app;

    this.intervalFunction = null;
    this.isWorking = true;

    this.ticks = 0;
    this.timeObject = new Date();
  }

  // TIME LOGIC 
  initTimeObject()
  {
    this.timeObject.setHours(0,0,0,0); // Sets a blank date, today at midnight 

    if( this.isWorking ) {
      this.timeObject.setSeconds( this.app.settings.workTime );
    } else {
      this.timeObject.setSeconds( this.app.settings.restTime );
    }

    this.app.ui.updateDisplays();
  }

  checkGameOver()
  {
    if( this.timeObject.getMinutes() == 0 && this.timeObject.getSeconds() == 0 ) {

      pauseCounter();
      switchModes();
      startCounter();

      return true;
    }
  }

  switchModes()
  {
    isWorking = !isWorking;    
    initTimeObject();
  }

  // OPERATING 
  startCounter()
  {
    console.log( "Starting..." );
    if( !this.intervalFunction ) {
      this.intervalFunction = setInterval( () => {
        
        console.log( "counting" );
        this.ticks++;

        if( this.checkGameOver() ) { return; }

        this.timeObject.setSeconds( this.timeObject.getSeconds() - 1 );

        this.app.ui.updateDisplays();

      }, 1000 );
    }
  }
  pauseCounter()
  {
    console.log( "Pausing..." );

    clearInterval( this.intervalFunction );
    this.intervalFunction = null;
  }
  resetCounter()
  {
    this.pauseCounter();

    this.ticks = 0;
    this.initTimeObject();

    this.app.ui.updateDisplays();

    if( this.app.settings.pauseOnReset ) {
      this.pauseCounter(); 
    } else {
      this.startCounter();
    }
  }

}
