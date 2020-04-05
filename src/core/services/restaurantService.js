const Restaurant = require('../entities/restaurant.entity');
const Product = require('../entities/product.entity');

class RestaurantService {

  constructor (
    restaurantCreator,
    restaurantRepo,
    productCreator,
    productRepo,
  ) {
    this.restaurantCreator = restaurantCreator;
    this.restaurantRepo = restaurantRepo;
    this.productCreator = productCreator;
    this.productRepo = productRepo;
  }

  getList(page = 1, perPage = 10, orderBy = {name: 'ASC'}) {
    return this.restaurantRepo.findAll(page, perPage, orderBy);
  }

  getById(id) {
    return this.restaurantRepo.findById(id);
  }

  create({name, description}) {
    const id = this.restaurantCreator.getId();
    const createdRestaurant = new Restaurant(id, name, description);
    return this.restaurantRepo.insert(createdRestaurant);
  }

  update(id, {updatedName, updatedDescription}) {
    return this.restaurantRepo.update({name: updatedName, description: updatedDescription}, id);
  }

  delete(id) {
    return this.restaurantRepo.delete(id);
  }

  async addProduct(restaurantId, {name, description, price}) {
    const id = this.productCreator.getId();
    const restaurant = await this.restaurantRepo.findById(restaurantId);
    const createdProduct = new Product(id, name, description, price, restaurant);
    return this.productRepo.insert(createdProduct);
  }

  getProducts(restaurantId) {
    return this.productRepo.findByAndCriteria({restaurant: restaurantId});
  }

  deleteProduct(productId) {
    return this.productRepo.delete(productId);
  }
}

module.exports = RestaurantService;
