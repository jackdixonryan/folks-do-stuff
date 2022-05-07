// The Decay class is a class of variable that we will use a lot 
// it is declared with a starting value but slowly loses its value over time 
// based on its decay rate. 

// it's also a complete illusion. The "value" and "decay" occurs 

module.exports = class Decay {
  constructor({ startingValue, decayPerSecond }) {
    this.value = startingValue;
    this.decayPerSecond = decayPerSecond;
    this.startTime = null; 
  }

  getValue() {
    if (this.startTime) {
      // need to work out how much time has elapsed. 
      const timeElapsed = new Date().getTime() - this.startTime;
      // this yields the number of milliseconds that have elapsed. 
      const inSeconds = timeElapsed / 1000;
      // all of this lets us calculate how much loss the value property
      // should have incurred between it's declaration and now. 
      const amountOfDecay = this.decayPerSecond * inSeconds;
      const newValue = this.value - amountOfDecay; 
      // decays should not be able to fall lower than 0. 
      if (newValue < 0) {
        newValue = 0;
      }
      // now we assign the this.value variable based on the decay rate. 
      this.value = newValue;
    }
    return this.value;
  }

  start() {
    // yields a millisecond-quality timestamp. 
    this.startTime = new Date().getTime();
  }

  // this effectively causes the "decay" to end
  stop() {
    this.startTime = null;
  }

  modify(amount) {
    this.value += amount;
  }

}