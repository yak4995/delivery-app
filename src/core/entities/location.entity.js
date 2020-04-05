const CoreEntity = require('./core.entity');

class Location extends CoreEntity {

  constructor (id, client, district, address) {

    super(id);
    this.client = client;
    this.district = district;
    this.address = address;

  }
}

module.exports = Location;
