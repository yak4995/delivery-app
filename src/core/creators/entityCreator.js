class EntityCreator {

  constructor () {

    if (this.constructor.name === 'EntityCreator') {

      throw new Error(`${this.constructor.name}: can not create instance of abstract class`);

    }

  }

  // eslint-disable-next-line
  getId () {

    throw new Error('Not implemented');

  }

}

module.exports = EntityCreator;
