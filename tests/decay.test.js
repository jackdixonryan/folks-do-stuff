const Decay = require("../src/helpers/decay");

describe("The Decay Type Variable", () => { 
  test("The Decay can be declared with a max value and a decay-per-second rate.", () => {
    const decay = new Decay({
      dps: 0.5,
      value: 100
    });

    expect(decay).toHaveProperty("dps");
    expect(decay).toHaveProperty("maxValue");
    expect(decay).toHaveProperty("currentValue");
  });

  test("The Decay does not decay until started.", () => {
    const decay = new Decay({
      dps: 0.5,
      value: 100
    });

    expect(decay.getValue()).toBe(100);
  });

  test("Once started, the decay begins.", () => {
    const decay = new Decay({
      dps: 0.5,
      value: 100
    });

    decay.start();
    expect(decay.value).not.toBe(100);
    decay.stop();

  });

  test("Once stopped, the decay stops.", () => {
    const decay = new Decay({
      dps: 0.5,
      value: 100
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
      dps: 100,
      value: 1
    });

    decay.start();
    setTimeout(() => {
      expect(decay.getValue() >= 0).toBe(true);
    }, 2000);
  });

  test("A decay that hits 0 will auto-stop.", () => {
    const decay = new Decay({
      dps: 100,
      value: 1,
    });

    decay.start();
    setTimeout(() => {
      expect(decay.timerId).toBe(null);
    }, 2000);
  });

  test("The decay can be modified and value checked while running.", () => {
    const decay = new Decay({
      dps: 0.5,
      value: 100
    });

    decay.start();
    decay.alterValue(1200);
    expect(decay.getValue() > 100).toBe(true);
    decay.stop();
  });
});