const Location = require('../../../models').Location;
const Client = require('../../../models').Client;
const EntityRepository = require('../../core/repositories/entityRepository');

Location.belongsTo(Client, {
  foreignKey: 'client_id',
  targetKey: 'id',
  as: 'client'
});

class LocationRepository extends EntityRepository {
  constructor() {
    super();
  }

  insert (entity) {
    const {id, client, ...data} = entity;
    data.client_id = client.id;
    return Location.create(data);
  }

  findByAndCriteria (searchCriteria) {
    return Location.findAll({
      where: {
        client_id: searchCriteria.client,
      }
    });
  }

  async delete (id) {
    const location = await Location.findByPk(id);
    return location.destroy();
  }

  getRelatedEntity (id, fieldName) {
    if (fieldName !== 'client') {
      throw new Error('Don`t support for this entity');
    }
    return Location.findOne({
      where: {id},
      include: [
        {
          model: Client,
          as: 'client'
        }
      ]
    }).then(location => location.client);
  }
}

module.exports = LocationRepository;
