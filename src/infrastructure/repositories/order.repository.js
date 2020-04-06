const Order = require('../../../models').Order;
const Client = require('../../../models').Client;
const Location = require('../../../models').Location;
const Restaurant = require('../../../models').Restaurant;
const Courier = require('../../../models').Courier;
const EntityRepository = require('../../core/repositories/entityRepository');

Order.belongsTo(Client, {
  foreignKey: 'client_id',
  targetKey: 'id',
  as: 'client'
});
Order.belongsTo(Location, {
  foreignKey: 'destination_id',
  targetKey: 'id',
  as: 'destination'
});
Order.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  targetKey: 'id',
  as: 'restaurant'
});
Order.belongsTo(Courier, {
  foreignKey: 'courier_id',
  targetKey: 'id',
  as: 'courier'
});

const eagerConditions = [
  {
    model: Client,
    as: 'client'
  },
  {
    model: Location,
    as: 'destination'
  },
  {
    model: Restaurant,
    as: 'restaurant'
  },
  {
    model: Courier,
    as: 'courier'
  },
];

class OrderRepository extends EntityRepository {
  constructor() {
    super();
  }

  insert (entity) {
    const {id, client, restaurant, destination, ...data} = entity;
    return Order.create(Object.assign(data, {
      client_id: client.id,
      restaurant_id: restaurant.id,
      destination_id: destination.id,
    }));
  }

  findAll (
    page,
    perPage,
    orderBy
  ) {
    return Order.findAll({
      offset: ((page - 1) * perPage),
      limit: perPage,
      order: Object.entries(orderBy),
      include: eagerConditions,
    });
  }

  findById (id) {
    return Order.findOne({
      where: { id },
      include: eagerConditions,
    });
  }

  findByAndCriteria (searchCriteria) {
    return Order.findAll({
      where: {
        client_id: searchCriteria.client,
      },
      include: eagerConditions,
    });
  }

  async update (updateData, id) {
    const order = await Order.findByPk(id);
    if (updateData.deliveryAt) {
      return order.update(updateData);
    }
    return order.update({courier_id: updateData.courier});
  }
}

module.exports = OrderRepository;
