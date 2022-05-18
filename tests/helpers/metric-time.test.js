const metricTime = require("../../src/helpers/metric-time");

describe("The Metric Time Module", () => {

  test("It can be called with a timestamp in loops.", () => {
    expect(metricTime.convert(100)).not.toThrowError();
  });

  test("It only takes positive numbers.", () => {
    expect(() => { 
      metricTime.convert(-100)
    }).toThrow("INVALID_TIMESTAMP");
  });

  test("Its return value should always have 7 timekeeping elements.", () => {
    const elements = metricTime.convert(1).split(".");
    expect(elements.length).toBe(7);
  });

  test("It correctly parses loops.", () => {
    expect(metricTime.convert(1)).toBe("00.00.00.00.00.00.01");
  });

  test("It correctly parses decaloops.", () => {
    expect(metricTime.convert(10)).toBe("00.00.00.00.00.01.00");
  });

  test("It correctly parses hectoloops.", () => {
    expect(metricTime.convert(100)).toBe("00.00.00.00.01.00.00");
  });

  test("It correctly parses megaloops.", () => {
    expect(metricTime.convert(1000)).toBe("00.00.00.01.00.00.00");
  });

  test("It correctly parses gigaloops.", () => {
    expect(metricTime.convert(10000)).toBe("00.00.01.00.00.00.00");
  });

  test("It correctly parses teraloops.", () => {
    expect(metricTime.convert(100000)).toBe("00.01.00.00.00.00.00");
  });

  test("It correctly parses petaloops.", () => {
    expect(metricTime.convert(10000000)).toBe("01.00.00.00.00.00.00");
  });

})