const CoreEntity = require('./core.entity');

class Restaurant extends CoreEntity {

  constructor (id, name, description) {

    super(id);
    this.name = name;
    this.description = description;

  }
}

module.exports = Restaurant;
