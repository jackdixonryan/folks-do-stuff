

// this is the chief file for the entity API.


const express = require("express");

module.exports = entityApi = (function () { 
  "use strict";

  const entityApp = express();
  const port = 2000;
  entityApp.use(express.json()); 

  return {
    start() {
      entityApp.listen(port, () => {
        console.log(`ENTITY_API: PORT ${port}`);
      });
    }
  }
})();