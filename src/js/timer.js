export class Timer 
{
  constructor()
  {
    // DECLARE DEPENDENCIES 
    this.settings = null;
    this.ui = null;

    // VARIABLES 
    this.intervalFunction = null;
    this.isWorking = true;

    this.ticks = 0;
    this.timeObject = new Date();
  }
  init( settings , ui )
  {
    // SET DEPENDENCIES 
    this.settings = settings;
    this.ui = ui;
  }

  // TIME LOGIC 
  initTimeObject()
  {
    this.timeObject.setHours(0,0,0,0); // Sets a blank date, today at midnight 

    if( this.isWorking ) {
      this.timeObject.setSeconds( this.settings.workTime );
    } else {
      this.timeObject.setSeconds( this.settings.restTime );
    }

    this.ui.updateDisplays();
  }

  checkGameOver()
  {
    if( this.timeObject.getMinutes() == 0 && this.timeObject.getSeconds() == 0 ) {

      this.pauseCounter();
      this.switchModes();
      this.startCounter();

      return true;
    }
  }

  switchModes()
  {
    this.isWorking = !this.isWorking;    
    this.initTimeObject();
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

        this.ui.updateDisplays();

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

    this.ui.updateDisplays();

    if( this.settings.pauseOnReset ) {
      this.pauseCounter(); 
    } else {
      this.startCounter();
    }
  }

}
