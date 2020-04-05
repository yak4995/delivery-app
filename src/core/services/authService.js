class AuthService {
  constructor () {

    if (this.constructor.name === 'AuthService') {
    
      throw new Error(`${this.constructor.name}: can not create instance of abstract class`);
    
    }
    
  }

  getHash(data) {
    throw new Error('Not implemented');
  }

  getAuthenticatedData(client) {
    throw new Error('Not implemented');
  }

  checkHash(password, passwordHash) {
    throw new Error('Not implemented');
  }
}

module.exports = AuthService;