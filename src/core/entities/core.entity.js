class CoreEntity {

  constructor (id) {

    if (this.constructor.name === 'CoreEntity') {

      throw new Error(`${this.constructor.name}: can not create instance of abstract class`);

    }
    this.id = id;

  }

}

module.exports = CoreEntity;
