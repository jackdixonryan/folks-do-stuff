// variable declaration for the Decay class
// which will intrinsically lose its value after being declared. 

module.exports = class Decay {
  constructor(options) {
    // where value is an int or float quantity
    // and dps (decay per second) is the rate at which it will lose its value. 
    const { value, dps } = options;
    this.maxValue = value;
    this.currentValue = value;
    this.dps = dps; 
    this.timerId = null;
  }

  start() {
    this.timerId = setInterval(() => {
      const difference = this.currentValue - this.dps;
      if (difference >= 0) {
        this.currentValue -= this.dps;
      } else {
        this.currentValue = 0;
        this.stop();
      }
    }, 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    } else {
      throw new Error("DECAY_NOT_RUNNING");
    }
  }

  getValue() {
    return this.currentValue;
  }

  alterValue(amount) {
    this.currentValue += amount;
  }

  setValue(amount) {
    this.currentValue = amount;
  }
}