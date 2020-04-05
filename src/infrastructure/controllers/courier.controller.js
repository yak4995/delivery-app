const router = require('express').Router();

const CourierService = require('../../core/services/courierService');

const SimpleEntityCreator = require('../creators/simpleEntityCreator');
const simpleEntityCreator = new SimpleEntityCreator();

const CourierRepository = require('../repositories/courier.repository');
const courierRepo = new CourierRepository();

const courierService = new CourierService(simpleEntityCreator, courierRepo);

const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/groupedOrderDestinations/:id',
  authMiddleware,
  (req, res) => {
    courierService
      .groupedOrderDestinations(req.params.id)
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
  '/ordersCount/:id',
  authMiddleware,
  (req, res) => {
    courierService
      .ordersCount(req.params.id)
      .then((result) => res.send(`${result}`))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.get(
  '/orderExecutionAverageTime/:id',
  authMiddleware,
  (req, res) => {
    courierService
      .orderExecutionAverageTime(req.params.id)
      .then((result) => res.send(`${result}`))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.get(
  '/ordersSum/:id',
  authMiddleware,
  (req, res) => {
    courierService
      .ordersSum(req.params.id)
      .then((result) => res.send(`${result}`))
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
  (req, res) => {
    courierService
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
    courierService
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
  '/:name',
  (req, res) => {
    courierService
      .create(req.params.name)
      .then((courier) => res.send(courier))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.patch(
  '/:id/:newName',
  authMiddleware,
  (req, res) => {
    courierService
      .update(req.params.id, req.params.newName)
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
    courierService
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