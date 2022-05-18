const Decay = require("../../src/helpers/decay");
const Entity = require("../../src/services/entity.service");

describe("The Most basic possible for of an entity.", () => {

  test("An entity can be created with a name and a description.", () => {
    const entity = new Entity({
      name: "Myknossos",
      description: "The first of his kind! A true Myknossian."
    }); 

    expect(entity).not.toBeUndefined();
    expect(entity).toHaveProperty("name");
    expect(entity).toHaveProperty("description");
  });

  test("An entity has needs. Every need is a decay variable.", () => {
    const entity = new Entity({
      name: "Myknossos",
      description: "The first of his kind! A true Myknossian.",
      needs: {
        hunger: new Decay({ startingValue: 100, decayPerSecond: 1})
      }
    }); 

    expect(entity).toHaveProperty("needs");
    const { needs } = entity;
    for (let need in needs) {
      expect(needs[need]).toBeInstanceOf(Decay);
    }
  });

  test("An entity can be stopped and started.", async () => {
    const entity = new Entity({
      name: "Myknossos",
      description: "The first of his kind! A true Myknossian.",
      needs: {
        hunger: new Decay({ startingValue: 100, decayPerSecond: 1})
      }
    }); 
    
    entity.start();

    await new Promise(res => setTimeout(() => {
      entity.stop();
      for (let need in entity.needs) {
        expect(entity.needs[need].getValue()).not.toBe(100);
      }
      res();
    }, 4000));
  });

  // test("An entity must have a decision tree.", () => {
  //   const entity = new Entity({
  //     name: "Myknossos",
  //     description: "The first of his kind! A true Myknossian.",
  //     needs: {
  //       hunger: new Decay({ startingValue: 100, decayPerSecond: 1})
  //     }
  //   }); 

  //   expect(entity).toHaveProperty("decisionTree");
  // });

  // test("An entity can query its own needs.", () => {
  //   const entity = new Entity({
  //     name: "Myknossos",
  //     description: "The first of his kind! A true Myknossian.",
  //     needs: {
  //       hunger: new Decay({ startingValue: 100, decayPerSecond: 1})
  //     }
  //   }); 
    
  //   expect(entity.queryNeeds).not.toBeUndefined();
  //   expect(entity.queryNeeds()).toHaveProperty("hunger");

  // });
});