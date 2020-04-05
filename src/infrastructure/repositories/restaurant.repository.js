const Restaurant = require('../../../models').Restaurant;
const EntityRepository = require('../../core/repositories/entityRepository');

class RestaurantRepository extends EntityRepository {
  constructor() {
    super();
  }

  findAll (
    page,
    perPage,
    orderBy
  ) {
    return Restaurant.findAll({
      offset: ((page - 1) * perPage),
      limit: perPage,
      order: Object.entries(orderBy),
    });
  }

  
  findById (id) {
    return Restaurant.findByPk(id);
  }

  insert (entity) {
    const {id, ...data} = entity;
    return Restaurant.create(data);
  }

  async update (updateData, id) {
    const restaurant = await Restaurant.findByPk(id);
    return restaurant.update(updateData);
  }

  async delete (id) {
    const restaurant = await Restaurant.findByPk(id);
    return restaurant.destroy({ force: true });
  }
}

module.exports = RestaurantRepository;
