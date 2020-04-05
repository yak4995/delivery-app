const CoreEntity = require('./core.entity');

class Product extends CoreEntity {

  constructor (id, name, description, price, restaurant) {

    super(id);
    this.name = name;
    this.description = description;
    this.price = price;
    this.restaurant = restaurant;

  }
}

module.exports = Product;
