const Client = require('../entities/client.entity');
const Location = require('../entities/location.entity');

class ClientService {

  constructor (
    clientCreator,
    clientRepo,
    authService,
    locationCreator,
    locationRepo,
  ) {
    this.clientCreator = clientCreator;
    this.clientRepo = clientRepo;
    this.authService = authService;
    this.locationCreator = locationCreator;
    this.locationRepo = locationRepo;
  }

  getList(page = 1, perPage = 10, orderBy = {email: 'ASC'}) {
    return this.clientRepo.findAll(page, perPage, orderBy);
  }

  getById(id) {
    return this.clientRepo.findById(id);
  }

  async create({email, password}) {
    const id = this.clientCreator.getId();
    const passwordHash = await this.authService.getHash(password);
    const createdClient = new Client(id, email, passwordHash);
    return this.clientRepo.insert(createdClient);
  }

  async checkAuth({email, password}) {
    const client = await this.clientRepo.findOneByAndCriteria({email, isActive: true});
    if (!client) {
      throw new Error('Active client with this email has not been found');
    }
    const isPassed = await this.authService.checkHash(password, client.passwordHash);
    if (!isPassed) {
      throw new Error('Incorrect password!');
    }
    return this.authService.getAuthenticatedData(client);
  }

  update(id, email, isActive) {
    return this.clientRepo.update({email, isActive}, id);
  }

  delete(id) {
    return this.clientRepo.delete(id);
  }

  async addLocation({clientId, district, address}) {
    const client = this.clientRepo.findById(clientId);
    const id = this.locationCreator.getId();
    const createdLocation = new Location(id, await client, district, address);
    return this.locationRepo.insert(createdLocation);
  }

  getClientLocations(clientId) {
    return this.locationRepo.findByAndCriteria({client: clientId});
  }

  async deleteLocation(clientId, locationId) {
    const locationClient = await this.locationRepo.getRelatedEntity(locationId, 'client');
    if(locationClient.id === Number(clientId)) {
      return this.locationRepo.delete(locationId);
    } else {
      throw new Error('This location doesn`t belong to this client');
    }
  }
}

module.exports = ClientService;
