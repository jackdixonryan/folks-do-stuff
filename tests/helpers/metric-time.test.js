const metricTime = require("../../src/helpers/metric-time");

describe("The Metric Time Module", () => {

  test("It can be called with a timestamp in loops.", () => {
    expect(() => {
      metricTime.convert(100)
    }).not.toThrowError();
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
    expect(metricTime.convert(1)).toBe("000.000.000.000.00.00.01"); // 1 second
  });

  test("It correctly parses decaloops.", () => {
    expect(metricTime.convert(10)).toBe("000.000.000.000.00.01.00"); // 10 seconds
  });

  test("It correctly parses hectoloops.", () => {
    expect(metricTime.convert(100)).toBe("000.000.000.000.01.00.00"); // 1.67 minutes
  });

  test("It correctly parses kiloloops.", () => {
    expect(metricTime.convert(1000)).toBe("000.000.000.001.00.00.00"); // 16.7 minutes
  });

  test("It correctly parses megaloops.", () => {
    expect(metricTime.convert(1000000)).toBe("000.000.001.000.00.00.00"); // 11.5 days
  });

  test("It correctly parses gigaloops.", () => {
    expect(metricTime.convert(1000000000)).toBe("000.001.000.000.00.00.00"); // 31 years
  });

  test("It correctly parses teraloops.", () => {
    expect(metricTime.convert(1000000000000)).toBe("001.000.000.000.00.00.00"); // 31,688 years
  });

  test("Just in case...", () => {
    expect(metricTime.convert(9)).toBe("000.000.000.000.00.00.09"); // 31,688 years
    expect(metricTime.convert(97)).toBe("000.000.000.000.00.09.07"); // 31,688 years
    expect(metricTime.convert(234)).toBe("000.000.000.000.02.03.04"); // 31,688 years
    expect(metricTime.convert(1423)).toBe("000.000.000.001.04.02.03"); // 31,688 years

  });

  test("It can convert back to raw loops", () => {
    expect(metricTime.deformat("000.000.000.000.00.00.01")).toBe(1);
    expect(metricTime.deformat("000.000.000.000.00.00.09")).toBe(9);
    expect(metricTime.deformat("000.000.000.000.00.09.07")).toBe(97);
    expect(metricTime.deformat("000.000.000.000.02.03.04")).toBe(234);
    expect(metricTime.deformat("000.000.000.001.004.02.03")).toBe(1423);
    expect(metricTime.deformat("000.000.001.022.04.02.03")).toBe(1022423);
    
  });

});