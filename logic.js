var pp = (function(){

  // VARS
  let restTime = 5;
  let workTime = 900; // TODO - convert from seconds to ms later. Use low values for testing. 

  // INTERNAL 
  let controlPause = null;
  let controlReset = null;
  let controlStart = null;
  
  let displayMinutes = null;
  let displaySeconds = null;
  let intervalFunction = null;

  let ticks = 0;
  let timeObject = new Date();


  // TIME LOGIC 
  const initTimeObject = () => {
    // TODO -- setings // pause the timer... should start break timer? or hidden break timer... or ... what? - should track in some way. 

    timeObject.setHours(0,0,0,0); // Sets a blank date, today at midnight 
    timeObject.setSeconds( workTime );

    updateDisplays();
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
    updateDisplays();
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
    displayMinutes = document.getElementById("display-minutes");
    displaySeconds = document.getElementById("display-seconds");
  }

  const updateDisplays = () => {
    displayMinutes.innerHTML = timeObject.getMinutes(); // ticks;
    displaySeconds.innerHTML = timeObject.getSeconds(); // ticks * 10;
  }


  // INITIALIZING
  function Init()
  {
    bindControls();
    bindDisplays();

    initTimeObject();
    // startCounter(); // AUTO-START (testing)
  }
  Init();


  // RETURN OBJECT 
  return {
    SetRest: SetRestTime,
    SetWork: SetWorkTime,
  }

})();
