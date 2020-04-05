const router = require('express').Router();

const ClientService = require('../../core/services/clientsService');

const SimpleEntityCreator = require('../creators/simpleEntityCreator');
const simpleEntityCreator = new SimpleEntityCreator();

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

const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/register',
  (req, res) => {
    clientService
      .create(req.body)
      .then((client) => res.send({
        id: client.id,
        email: client.email,
        isActive: client.isActive,
      }))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.post(
  '/login',
  (req, res) => {
    clientService
      .checkAuth(req.body)
      .then((token) => res.send(token))
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
    clientService
      .update(req.params.id, req.body.email, req.body.isActive)
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
    clientService
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

router.get(
  '/:id',
  authMiddleware,
  (req, res) => {
    clientService
      .getById(req.params.id)
      .then((result) => res.send({
        id: result.id,
        email: result.email,
        isActive: result.isActive
      }))
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
    clientService
      .getList()
      .then((result) => res.send(
        result.map(r => ({
          id: r.id,
          email: r.email,
          isActive: r.isActive
        })
        )
      ))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

// locations:

router.post(
  '/location',
  (req, res) => {
    clientService
      .addLocation(req.body)
      .then((token) => res.send(token))
      .catch(e => {
        res
          .status(400)
          .send(e.message)
          .end();
      });
  }
);

router.get(
  '/location/:userId',
  authMiddleware,
  (req, res) => {
    clientService
      .getClientLocations(req.params.userId)
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
  '/location/:userId/:locationId',
  authMiddleware,
  (req, res) => {
    clientService
      .deleteLocation(req.params.userId, req.params.locationId)
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