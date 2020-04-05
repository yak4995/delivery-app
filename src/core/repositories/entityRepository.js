class EntityRepository {

  constructor () {

    if (this.constructor.name === 'EntityRepository') {

      throw new Error(`${this.constructor.name}: can not create instance of abstract class`);

    }

  }

  insert (entity) {

    throw new Error('Not implemented');

  }

  findAll (
    page,
    perPage,
    orderBy
  ) {

    throw new Error('Not implemented');

  }

  
  findById (id) {

    throw new Error('Not implemented');

  }

  // for orders will be search by {client: clientId}
  findOneByAndCriteria (searchCriteria) {

    throw new Error('Not implemented');

  }

  // for location and orders will be search by {client: clientId}
  // for products will be search by {restaurant: restaurantId}
  findByAndCriteria (searchCriteria) {

    throw new Error('Not implemented');

  }

  // for orders {courier: courierId}
  update (updateData, id) {

    throw new Error('Not implemented');

  }

  
  delete (id) {

    throw new Error('Not implemented');

  }

  // for orders все сразу надо
  getRelatedEntity (id, fieldName) {

    throw new Error('Not implemented');

  }

  
  // for couriers implementate 'ordersByCurrentMonth' field
  getRelatedEntities (id, fieldName) {

    throw new Error('Not implemented');

  }

}

module.exports = EntityRepository;
