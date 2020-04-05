const CoreEntity = require('./core.entity');

const ORDER_STATUS = [
  'processing',
  'cooking',
  'on the way',
  'finished',
  'cancelled'
];

class Order extends CoreEntity {

  constructor (
    id,
    client,
    restaurant,
    destination,
    sumToPay,
    courier = null,
    deliveryDuration = null,
    createdAt = new Date(),
    deliveryAt = null,
    status = 'processing'
  ) {
    super(id);
    this.client = client;
    this.createdAt = createdAt;
    this.restaurant = restaurant;
    this.sumToPay = sumToPay;
    this.destination = destination;
    this.status = status;
    this.courier = courier;
    this.deliveryAt = deliveryAt;
    this.deliveryDuration = deliveryDuration;
  }

}

module.exports = { Order, ORDER_STATUS };
