const Decay = require("../src/helpers/decay");

describe("The Decay Type Variable", () => { 
  test("The Decay can be declared with a max value and a decay-per-second rate.", () => {
    const decay = new Decay({
      startingValue: 100,
      decayPerSecond: 1
    });

    expect(decay).toHaveProperty("value");
    expect(decay).toHaveProperty("decayPerSecond");
    expect(decay).toHaveProperty("startTime");
  });

  test("The Decay does not decay until started.", () => {
    const decay = new Decay({
      startingValue: 100,
      decayPerSecond: 1
    });

    expect(decay.getValue()).toBe(100);
  });

  test("Once started, the decay begins.", () => {
    const decay = new Decay({
      startingValue: 100,
      decayPerSecond: 15
    });

    decay.start();
    setTimeout(() => {
      expect(decay.value).not.toBe(100);
      decay.stop();
    }, 2000);
  });

  test("Once stopped, the decay stops.", () => {
    const decay = new Decay({
      startingValue: 100,
      decayPerSecond: 1
    });

    decay.start();
    decay.stop();
    const value = decay.getValue();
    setTimeout(() => {
      const anotherValue = decay.getValue();
      expect(value).toBe(anotherValue);
    });
    
  });

  test("The decay will not be negative.", () => {
    const decay = new Decay({
      startingValue: 100,
      decayPerSecond: 100
    });

    decay.start();
    setTimeout(() => {
      expect(decay.getValue() >= 0).toBe(true);
    }, 2000);
  });

  test("A decay that hits 0 will auto-stop.", () => {
    const decay = new Decay({
      startingValue: 100,
      decayPerSecond: 1
    });

    decay.start();
    setTimeout(() => {
      expect(decay.timerId).toBe(null);
    }, 2000);
  });

  test("The decay can be modified and value checked while running.", () => {
    const decay = new Decay({
      startingValue: 100,
      decayPerSecond: 1
    });

    decay.start();
    decay.modify(100);
    expect(decay.getValue() > 100).toBe(true);
    decay.stop();
  });
});