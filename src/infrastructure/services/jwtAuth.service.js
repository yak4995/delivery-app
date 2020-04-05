const AuthService = require('../../core/services/authService');
const bcrypt = require('bcrypt');
const encode = require('jwt-simple').encode;

class JwtAuthService extends AuthService {
  constructor (configService) {
    super();
    this.configService = configService;
  }

  async getHash(data) {
    return bcrypt.hash(data, this.configService.get('saltRounds'));
  }

  getAuthenticatedData(client) {
    return encode(
      {
        id: client.id,
        email: client.email,
        isActive: client.isActive,
        iat: Math.round(Date.now() / 1000),
        exp: Math.round(Date.now() / 1000 + this.configService.get('jwtExpiresIn')),
      },
      this.configService.get('jwtSecret'),
    );
  }

  checkHash(password, passwordHash) {
    return bcrypt.compare(password, passwordHash);
  }
}

module.exports = JwtAuthService;