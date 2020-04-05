const CoreEntity = require('./core.entity');

class Courier extends CoreEntity {

  constructor (id, name) {

    super(id);
    this.name = name;

  }
}

module.exports = Courier;
