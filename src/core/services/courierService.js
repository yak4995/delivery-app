const Courier = require('../entities/courier.entity');

class CourierService {

  constructor (courierCreator, couriersRepo) {
    this.courierCreator = courierCreator;
    this.couriersRepo = couriersRepo;
  }

  getList(page = 1, perPage = 10, orderBy = {name: 'ASC'}) {
    return this.couriersRepo.findAll(page, perPage, orderBy);
  }

  getById(id) {
    return this.couriersRepo.findById(id);
  }

  create(name) {
    const id = this.courierCreator.getId();
    const createdCourier = new Courier(id, name);
    return this.couriersRepo.insert(createdCourier);
  }

  update(id, updatedName) {
    return this.couriersRepo.update({name: updatedName}, id);
  }

  delete(id) {
    return this.couriersRepo.delete(id);
  }

  async groupedOrderDestinations(courierId) {
    const courierOrdersByCurrentMonth = await this.couriersRepo.getRelatedEntities(courierId, 'ordersByCurrentMonth');
    return courierOrdersByCurrentMonth.reduce((accumulator, currentOrder) => {
      const orderDistrict = currentOrder.destination.district;
      if (accumulator[orderDistrict]) {
        accumulator[orderDistrict]++;
      } else {
        accumulator[orderDistrict] = 1;
      }
      return accumulator;
    }, {});
  }

  async ordersCount(courierId) {
    const courierOrdersByCurrentMonth = await this.couriersRepo.getRelatedEntities(courierId, 'ordersByCurrentMonth');
    return courierOrdersByCurrentMonth.length;
  }

  async orderExecutionAverageTime(courierId) {
    const courierOrdersByCurrentMonth = await this.couriersRepo.getRelatedEntities(courierId, 'ordersByCurrentMonth');
    return Math.floor(courierOrdersByCurrentMonth.reduce(
      (accumulator, currentOrder) =>
        accumulator + currentOrder.deliveryDuration,
      0,
    ) / courierOrdersByCurrentMonth.length);
  }

  async ordersSum(courierId) {
    const courierOrdersByCurrentMonth = await this.couriersRepo.getRelatedEntities(courierId, 'ordersByCurrentMonth');
    return courierOrdersByCurrentMonth.reduce(
      (accumulator, currentOrder) => accumulator + currentOrder.sumToPay,
      0,
    );
  }
}

module.exports = CourierService;
