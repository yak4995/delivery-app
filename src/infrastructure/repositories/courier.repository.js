const Op = require('sequelize').Op;
const Courier = require('../../../models').Courier;
const Order = require('../../../models').Order;
const Location = require('../../../models').Location;
const EntityRepository = require('../../core/repositories/entityRepository');

class CourierRepository extends EntityRepository {
  constructor() {
    super();
  }

  findAll (
    page,
    perPage,
    orderBy
  ) {
    return Courier.findAll({
      offset: ((page - 1) * perPage),
      limit: perPage,
      order: Object.entries(orderBy),
    });
  }

  findById (id) {
    return Courier.findByPk(id);
  }

  insert (entity) {
    const {id, ...data} = entity;
    return Courier.create(data);
  }

  async update (updateData, id) {
    const courier = await Courier.findByPk(id);
    return courier.update(updateData);
  }

  async delete (id) {
    const courier = await Courier.findByPk(id);
    return courier.destroy();
  }

  getRelatedEntities (id, fieldName) {
    if (fieldName !== 'ordersByCurrentMonth') {
      throw new Error('Don`t support for this entity');
    }
    const today = new Date();
    const targetDate = new Date(today.getFullYear(), today.getMonth(), 1);
    return Order.findAll({
      where: {
        courier_id: id,
        status: 'finished',
        createdAt: {
          [Op.gte]: targetDate,
        }
      },
      include: [
        {
          model: Location,
          as: 'destination'
        }
      ]
    }).then(result => result.map(order => ({
      id: order.id,
      client: order.client_id,
      restaurant: order.restaurant_id,
      destination: order.destination,
      sumToPay: order.sum_to_pay,
      courier: order.courier_id,
      deliveryDuration: order.delivery_duration,
      deliveryAt: order.deliveryAt,
      status: order.status
    })));
  }
}

module.exports = CourierRepository;
