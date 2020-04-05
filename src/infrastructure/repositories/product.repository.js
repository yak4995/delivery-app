const Product = require('../../../models').Product;
const EntityRepository = require('../../core/repositories/entityRepository');

class ProductRepository extends EntityRepository {
  constructor() {
    super();
  }

  findByAndCriteria(searchCriteria) {
    return Product.findAll({
      where: {
        restaurant_id: searchCriteria.restaurant,
      },
    });
  }

  insert (entity) {
    const {id, restaurant, ...data} = entity;
    return Product.create(Object.assign(data, {restaurant_id: restaurant.id}));
  }

  async delete (id) {
    const product = await Product.findByPk(id);
    return product.destroy({ force: true });
  }
}

module.exports = ProductRepository;
