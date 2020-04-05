const Client = require('../../../models').Client;
const EntityRepository = require('../../core/repositories/entityRepository');

class ClientRepository extends EntityRepository {
  constructor() {
    super();
  }

  insert (entity) {
    const {id, ...data} = entity;
    return Client.create(data);
  }

  findAll (
    page,
    perPage,
    orderBy
  ) {
    return Client.scope('withoutPassword').findAll({
      offset: ((page - 1) * perPage),
      limit: perPage,
      order: Object.entries(orderBy),
    });
  }

  findById (id) {
    return Client.findByPk(id);
  }

  findOneByAndCriteria (searchCriteria) {
    return Client.findOne({
      where: searchCriteria,
    });
  }

  async update (updateData, id) {
    const client = await Client.findByPk(id);
    return client.update(updateData);
  }

  async delete (id) {
    const client = await Client.findByPk(id);
    return client.destroy({ force: true });
  }
}

module.exports = ClientRepository;