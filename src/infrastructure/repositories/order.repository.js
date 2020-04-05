const Sequelize = require('sequelize');
const Order = require('../../../models').Order;
const Client = require('../../../models').Client;
const Location = require('../../../models').Location;
const Restaurant = require('../../../models').Restaurant;
const Courier = require('../../../models').Courier;
const EntityRepository = require('../../core/repositories/entityRepository');

const configService = require('../services/config.service');
const sequelize = new Sequelize(configService.get('dbConnectionUrl'));
sequelize.authenticate();

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

class OrderRepository extends EntityRepository {
  constructor() {
    super();
  }

  insert (entity) {
    const {id, client, restaurant, destination, ...data} = entity;
    return sequelize.query(`
      INSERT INTO "orders" (
        "client_id",
        "restaurant_id",
        "destination_id",
        "createdAt"
      ) VALUES (
        ?,
        ?,
        ?,
        ?
      ) RETURNING id`,
    {
      replacements: [
        client.id,
        restaurant.id,
        destination.id,
        new Date(),
      ],
      type: Sequelize.QueryTypes.INSERT
    }
    ).then((rawQueryResult) => this.findById(rawQueryResult[0][0].id));
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
      include: [
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
      ]
    });
  }

  findById (id) {
    return Order.findOne({
      where: { id },
      include: [
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
      ]
    });
  }

  findByAndCriteria (searchCriteria) {
    return Order.findAll({
      where: {
        client_id: searchCriteria.client,
      },
      include: [
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
      ]
    });
  }

  async update (updateData, id) {
    const order = await Order.findByPk(id);
    if (updateData.deliveryAt) {
      updateData.delivery_duration = updateData.deliveryDuration;
      delete updateData.deliveryDuration;
      return order.update(updateData);
    }
    return order.update({courier_id: updateData.courier});
  }
}

module.exports = OrderRepository;
