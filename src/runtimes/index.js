const crypto = require("crypto");

class Runtime { 
  constructor() {
    this.id = crypto.randomUUID();
    this.units = []; 
    this.started = false;
  }

  start() {
    this.started = true;
    console.log("Runtime started on RTM-" + this.id);
  }

  stop() {
    this.started = false;
  }

  // where units can be entities, objects, etc
  registerUnits(units) {
    this.units = units;
  }

  addUnit(unit) {
    this.units.push(unit);
  }
}

const base = new Runtime({ name: "forinev" });
const runtime = new Proxy(base, {
  set(target, prop, receiver) {
    console.log(base);
  }
});

runtime.start();
handler.started = false;

