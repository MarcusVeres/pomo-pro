export class Timer 
{
  constructor()
  {
    // DECLARE DEPENDENCIES 
    this.config = null;
    this.ui = null;

    // VARIABLES 
    this.intervalFunction = null;
    this.isWorking = true;

    this.ticks = 0;
    this.timeObject = new Date();
  }
  init( config , ui )
  {
    // SET DEPENDENCIES 
    this.config = config;
    this.ui = ui;
  }

  // TIME LOGIC 
  refreshTimeObject()
  {
    this.timeObject.setHours(0,0,0,0); // Sets a blank date, today at midnight 

    if( this.isWorking ) {
      this.timeObject.setSeconds( this.config.userSettings.workTime );
    } else {
      this.timeObject.setSeconds( this.config.userSettings.restTime );
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
    this.refreshTimeObject();
  }

  // OPERATING 
  startCounter()
  {
    console.log( "Starting..." );
    this.ui.showPause();

    if( !this.intervalFunction ) 
    {
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
    this.ui.showPlay();

    clearInterval( this.intervalFunction );
    this.intervalFunction = null;
  }
  resetCounter()
  {
    this.pauseCounter();

    this.ticks = 0;
    this.refreshTimeObject();

    this.ui.updateDisplays();

    if( this.config.userSettings.pauseOnReset ) {
      this.pauseCounter(); 
    } else {
      this.startCounter();
    }
  }

}
