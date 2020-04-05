const router = require('express').Router();

const RestaurantService = require('../../core/services/restaurantService');

const SimpleEntityCreator = require('../creators/simpleEntityCreator');
const simpleEntityCreator = new SimpleEntityCreator();

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

const authMiddleware = require('../middlewares/auth.middleware');

// products

router.get(
  '/product/:id',
  authMiddleware,
  (req, res) => {
    restaurantService
      .getProducts(req.params.id)
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
  '/product/:id',
  authMiddleware,
  (req, res) => {
    restaurantService
      .addProduct(req.params.id, req.body)
      .then((product) => res.send(product))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.delete(
  '/product/:id',
  authMiddleware,
  (req, res) => {
    restaurantService
      .deleteProduct(req.params.id)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

// restaurants

router.get(
  '/:id',
  (req, res) => {
    restaurantService
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
  (req, res) => {
    restaurantService
      .getList()
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
    restaurantService
      .create(req.body)
      .then((restaurant) => res.send(restaurant))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.patch(
  '/:id',
  authMiddleware,
  (req, res) => {
    restaurantService
      .update(req.params.id, req.body)
      .then((result) => res.send(result))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.delete(
  '/:id',
  authMiddleware,
  (req, res) => {
    restaurantService
      .delete(req.params.id)
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