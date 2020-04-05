const OrderItem = require('../entities/orderItem.entity');
const { Order, ORDER_STATUS } = require('../entities/order.entity');

class OrderService {

  constructor (
    orderCreator,
    orderRepo,
    clientService,
    restaurantService,
    orderItemCreator,
    orderItemRepo,
  ) {
    this.orderCreator = orderCreator;
    this.orderRepo = orderRepo;
    this.clientService = clientService;
    this.restaurantService = restaurantService;
    this.orderItemCreator = orderItemCreator;
    this.orderItemRepo = orderItemRepo;
  }

  getAll(page = 1, perPage = 10, orderBy = {createdAt: 'DESC'}) {
    return this.orderRepo.findAll(page, perPage, orderBy);
  }

  getAllByClient(clientId) {
    return this.orderRepo.findByAndCriteria({client: clientId});
  }

  getCurrentOrdersForClient(clientId) {
    return this.getAllByClient(clientId).then((orders) =>
      orders.filter(order => !['cancelled', 'finished'].includes(order.status)),
    );
  }

  getById(id) {
    return this.orderRepo.findById(id);
  }

  async create({
    clientId,
    restaurantId,
    locationId,
    orderItemDtos, // array of {productId, count}
  }) {
    const [client, restaurant, destination] = await Promise.all([
      this.clientService.getById(clientId),
      this.restaurantService.getById(restaurantId),
      this.clientService
        .getClientLocations(clientId)
        .then(
          // in this simplified example, we believe that the method was called for an existing location
          (locations) => locations.filter(l => l.id === locationId)[0],
        ),
    ]);
    const orderId = this.orderCreator.getId();
    const createdOrder = new Order(orderId, client, restaurant, destination, 0);
    const order = await this.orderRepo.insert(createdOrder);
    const items = await Promise.all(
      orderItemDtos.map((orderItem) => 
        this.orderItemRepo.insert(
          new OrderItem(
            this.orderItemCreator.getId(),
            order,
            orderItem.productId,
            orderItem.count,
          ),
        ),
      ),
    );
    return this.orderRepo.update({
      sumToPay: items.reduce((accumulator, item) => accumulator + item.sumByItem)
    }, order.id);
  }

  updateStatus(orderId, status) {
    if (!ORDER_STATUS.includes(status)) {
      throw new Error('Incorrect status!');
    }
    return this.orderRepo.update({status}, orderId);
  }

  setCourier(orderId, courierId) {
    return this.orderRepo.update({courier: courierId}, orderId);
  }

  async setFinished (orderId) {
    const deliveryAt = new Date();
    const order = await this.orderRepo.findById(orderId);
    return this.orderRepo.update({
      status: 'finished',
      deliveryAt,
      deliveryDuration: Math.floor((deliveryAt - new Date(order.createdAt)) / 60000),
    }, order.id);
  }
}

module.exports = OrderService;
