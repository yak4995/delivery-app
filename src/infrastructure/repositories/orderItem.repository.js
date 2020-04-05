const OrderItem = require('../../../models').OrderItem;
const EntityRepository = require('../../core/repositories/entityRepository');

class OrderItemRepository extends EntityRepository {
  constructor() {
    super();
  }

  insert (entity) {
    const {id, order, product, ...data} = entity;
    return OrderItem.create(Object.assign(data, {
      order_id: order.id,
      product_id: product,
    }));
  }
}

module.exports = OrderItemRepository;