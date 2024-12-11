// AKA "SETTINGS" 

export const Config = {

  default: {
    autoplay: true, 
    pauseOnReset: false, 
    restTime: 300, 
    workTime: 1500, 
  },

  userSettings: null,

  
  load() {
    this.userSettings = JSON.parse(localStorage.getItem('settings')) || this.default;
    return this.userSettings;
  },

  save(settings) {
    this.userSettings = settings;
    localStorage.setItem('settings', JSON.stringify(settings));
  },

  reset() {
    this.userSettings = {...this.default};
    this.save(this.userSettings);
  }

}
