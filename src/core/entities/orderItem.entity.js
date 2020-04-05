const CoreEntity = require('./core.entity');

class OrderItem extends CoreEntity {

  constructor (id, order, product, count) {

    super(id);
    this.order = order;
    this.product = product;
    this.count = count;
    this.sumByItem = this.product.price * this.count;

  }
}

module.exports = OrderItem;
