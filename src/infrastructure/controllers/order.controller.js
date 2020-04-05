const router = require('express').Router();

const OrderService = require('../../core/services/orderService');

const SimpleEntityCreator = require('../creators/simpleEntityCreator');
const simpleEntityCreator = new SimpleEntityCreator();

const OrderRepository = require('../repositories/order.repository');
const orderRepo = new OrderRepository();
const OrderItemRepository = require('../repositories/orderItem.repository');
const orderItemRepo = new OrderItemRepository();

const ClientService = require('../../core/services/clientsService');
const configService = require('../services/config.service');
const JwtAuthService = require('../services/jwtAuth.service');
const jwtAuthService = new JwtAuthService(configService);
const ClientRepository = require('../repositories/client.repository');
const clientRepo = new ClientRepository();
const LocationRepository = require('../repositories/location.repository');
const locationRepo = new LocationRepository();
const clientService = new ClientService(
  simpleEntityCreator,
  clientRepo,
  jwtAuthService,
  simpleEntityCreator,
  locationRepo,
);

const RestaurantService = require('../../core/services/restaurantService');
const RestaurantRepository = require('../repositories/restaurant.repository');
const restaurantRepo = new RestaurantRepository();
const ProductRepository = require('../repositories/product.repository');
const productRepo = new ProductRepository();
const restaurantService = new RestaurantService(
  simpleEntityCreator,
  restaurantRepo,
  simpleEntityCreator,
  productRepo,
);

const orderService = new OrderService(
  simpleEntityCreator,
  orderRepo,
  clientService,
  restaurantService,
  simpleEntityCreator,
  orderItemRepo,
);

const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/current/:id',
  authMiddleware,
  (req, res) => {
    orderService
      .getCurrentOrdersForClient(req.params.id)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.get(
  '/by-client/:id',
  authMiddleware,
  (req, res) => {
    orderService
      .getAllByClient(req.params.id)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.get(
  '/:id',
  authMiddleware,
  (req, res) => {
    orderService
      .getById(req.params.id)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.get(
  '/',
  authMiddleware,
  (req, res) => {
    orderService
      .getAll()
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.post(
  '/',
  authMiddleware,
  (req, res) => {
    orderService
      .create(req.body)
      .then((order) => res.send(order))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.patch(
  '/set-status/:id/:status',
  authMiddleware,
  (req, res) => {
    orderService
      .updateStatus(req.params.id, req.params.status)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.patch(
  '/set-courier/:orderId/:courierId',
  authMiddleware,
  (req, res) => {
    orderService
      .setCourier(req.params.orderId, req.params.courierId)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.patch(
  '/set-finished/:id',
  authMiddleware,
  (req, res) => {
    orderService
      .setFinished(req.params.id)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

module.exports = router;