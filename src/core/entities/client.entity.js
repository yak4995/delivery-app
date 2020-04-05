const CoreEntity = require('./core.entity');

class Client extends CoreEntity {

  constructor (id, email, passwordHash, isActive = true) {

    super(id);
    this.email = email;
    this.passwordHash = passwordHash;
    this.isActive = isActive;

  }

}

module.exports = Client;
