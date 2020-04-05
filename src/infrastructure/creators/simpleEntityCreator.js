const EntityCreator = require('../../core/creators/entityCreator');

class SimpleEntityCreator extends EntityCreator {
  constructor () {
    super();
  }
  getId () {
    return 1;
  }
}

module.exports = SimpleEntityCreator;
