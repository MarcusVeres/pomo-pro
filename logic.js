var pp = (function(){

  // VARS
  let restTime = 5;
  let workTime = 15; // TODO - convert from seconds to ms later. Use low values for testing. 

  // SETTINGS
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

  // RUNTIME
  function Init()
  {
    console.log( "Starting" );

  }
  Init();

  return {
    SetRest: SetRestTime,
    SetWork: SetWorkTime,
  }

})();