const { Tree } = require("../services/tree.service");
const Decay = require("../helpers/decay");
const sleep = require("system-sleep");

class Entity { 
  constructor(options) {
    const { name, needs } = options;
    
    this.name = name; 
    this.needs = {}
    this.started = false;

    const needCombos = Object.entries(needs);
    for (const [key, value] of needCombos) {
      this.needs[key] = new Decay({ 
        value: value.amt,
        dps: value.dps,
      });
    }
    
    this.decisionTree = new Tree();

    this.needListener = new Proxy(needs, {
      set(target, some, thing) {
        console.log(target, some, thing);
      }
    });
  }

  init() {
    this.started = true;
    console.log("Hello, my name is " + this.name);

    const needNames = Object.keys(this.needs);
    for (let i = 0; i < needNames.length; i++) {
      this.needs[needNames[i]].start();
    }
    console.log("I am awake.");
    
    let hunger = this.needs.hunger.getValue();
    console.log({ hunger });

    while(hunger > 0 && this.started === true) { 
      sleep(100);
      console.log({ hunger });
      hunger = this.needs.hunger.getValue();
    }
  }

  freezeAll() {
    this.started = false;
    const needNames = Object.keys(this.needs);
    for (let i = 0; i < needNames.length; i++) {
      this.needs[needNames[i]].stop();
      console.log(this.needs);
    }
  }
}

const p = new Entity({ 
  name: "Jack",
  needs: {
    hunger: { amt: 10, dps: 1 }
  }
});

p.init();

