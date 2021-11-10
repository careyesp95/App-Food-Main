const { Diet, conn } = require('../../src/db.js');
const chai = require('chai');
//const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised);


describe('Diet model', () => {
    beforeEach(() => Diet.sync({ force: true }));
    before( async () => {
    try{
        await conn.authenticate()
    }catch(err) {
        console.error('Unable to connect to the database:', err)
    }
    })
    describe('Validators', () => {
      describe('name', () => {
        it('should throw an error if name is null', (done) => {
          Diet.create({})
            .then(() => done(new Error('It requires a valid name')))
            .catch(() => done());
        });
        it('should work when its a valid name', () => {
          Diet.create({ name: 'Hipercalorica' });
        });
        it('should work when its a valid name or more type the diets', () => {
            Diet.create({name:'Detox'});
            Diet.create({name:'Proteica'});
        })
      });
    });
  });
  