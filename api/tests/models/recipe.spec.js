const { Recipe, conn } = require('../../src/db.js');
const chai = require('chai');
//const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised);

describe('Recipe model', () => {
  /*before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));*/
    before( async () => {
      try{
        await conn.authenticate()
      }catch(err) {
        console.error('Unable to connect to the database:', err)
      }

    })
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });
});
