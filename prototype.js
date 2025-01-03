// TODO - introduce a way to track time when user pressed "pause" regardless of mode.
// IDEA - pressing "pause" starts a new timer. If you un-pause, it'll stop that timer. "Paused time for..."
// HELP - helps track distractions. helps track time (e.g. you were pulled into something else)

var pp = (function(){

  // VARS
  let autoplay = true;
  let pauseOnReset = false;

  let restTime = 300;   // 5 minutes
  let workTime = 1500;  // 25 minutes


  // INTERNAL 
  let controlPause = null;
  let controlReset = null;
  let controlStart = null;
  
  let displayBG = null;
  let displayMinutes = null;
  let displayMode = null;
  let displaySeconds = null;

  let intervalFunction = null;
  let isWorking = true;

  let ticks = 0;
  let timeObject = new Date();


  // TIME LOGIC 
  const initTimeObject = () => {
    // TODO -- setings // pause the timer... should start break timer? or hidden break timer... or ... what? - should track in some way. 

    timeObject.setHours(0,0,0,0); // Sets a blank date, today at midnight 

    if( isWorking ) {
      timeObject.setSeconds( workTime );
    } else {
      timeObject.setSeconds( restTime );
    }

    updateDisplays();
  }
  const checkGameOver = () => {
    if(  timeObject.getMinutes() == 0 && timeObject.getSeconds() == 0 ) {

      pauseCounter();
      switchModes();
      startCounter();

      return true;
    }
  }
  const switchModes = () => {
    isWorking = !isWorking;    
    initTimeObject();
  }

  // SETTING
  function SetWorkTime( input )
  {
    workTime = Sanitize(input);
  }
  function SetRestTime( input )
  {
    restTime = Sanitize(input);
  }
  function Sanitize( input )
  {
    // TODO - detect if minutes, seconds, etc. 
    // Most common is in minutes...
    // if input contains : remove it and parse as minutes
    // if input is value, use seconds 
    // if input has decimal, use whatever 

    return input;
  }


  // OPERATING 
  const startCounter = () => {
    console.log( "Starting..." );
    if( !intervalFunction ) {
      intervalFunction = setInterval( () => {
        
        console.log( "counting" );
        ticks++;

        if( checkGameOver() ) { return; }

        timeObject.setSeconds( timeObject.getSeconds() - 1 );

        updateDisplays();


      }, 1000 );
    }
  }
  const pauseCounter = () => {
    console.log( "Pausing..." );
    clearInterval( intervalFunction );
    intervalFunction = null;
  }
  const resetCounter = () => {
    pauseCounter();

    ticks = 0;
    initTimeObject();

    updateDisplays();

    if( pauseOnReset ) {
      pauseCounter(); 
    } else {
      startCounter();
    }
  }


  // UI 
  const bindControls = () => {
    controlPause = document.getElementById("control-pause");
    controlReset = document.getElementById("control-reset");
    controlStart = document.getElementById("control-start");

    controlPause.addEventListener("click" , () => { pauseCounter(); });
    controlReset.addEventListener("click" , () => { resetCounter(); });
    controlStart.addEventListener("click" , () => { startCounter(); });
  }
  const bindDisplays = () => {
    displayBG = document.getElementById("display-bg");
    displayMinutes = document.getElementById("display-minutes");
    displayMode = document.getElementById("display-mode");
    displaySeconds = document.getElementById("display-seconds");
  }

  const formatTime = ( input ) => {
    let output = input;
    if( output < 10 )
    {
      output = "0" + input;
    }
    return output;
  }

  const updateDisplays = () => {
    displayMinutes.innerHTML = formatTime( timeObject.getMinutes() ); // ticks;
    displaySeconds.innerHTML = formatTime( timeObject.getSeconds() ); // ticks * 10;

    // displayMode.innerHTML = isWorking ? 'WORK' : 'REST';
    if( isWorking )
    {
      // TODO :: use classes, and color swatches 
      displayMode.innerHTML = 'WORK';
      displayBG.classList.remove('bg-rest');
      displayBG.classList.add('bg-work');
    }
    else 
    {
      displayMode.innerHTML = 'REST';
      displayBG.classList.remove('bg-work');
      displayBG.classList.add('bg-rest');
    }
  }


  // INITIALIZING
  function Init()
  {
    bindControls();
    bindDisplays();

    initTimeObject();

    if( autoplay ) {
      startCounter();
    }
  }
  Init();


  // RETURN OBJECT 
  return {
    SetRest: SetRestTime,
    SetWork: SetWorkTime,
  }

})();
