
class Entity { 
  constructor({ name, description, needs }) {
    this.name = name;
    this.description = description;
    this.needs = needs;
  }

  start() {
    for (let need in this.needs) {
      this.needs[need].start();
    }
  }

  stop() {
    for (let need in this.needs) {
      this.needs[need].stop();
    }
  }
}

module.exports = Entity;

