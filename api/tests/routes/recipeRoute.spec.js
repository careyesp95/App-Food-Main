/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const chai = require('chai')
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const chaiAsPromised = require('chai-as-promised')
const chaiUUID = require('chai-uuid')

chai.use(chaiAsPromised);
chai.use(chaiUUID);

const agent = session(app);


const recipe = {
  name: 'Milanesa',
  summary:'Es un plato creado en Buenos Aires y tipico de la gastronomia argentina',
  analyzedInstructions:'Consiste en una milanesa',
};

xdescribe('Recipe routes', () => {
  before( async() => {
    try{
      await conn.authenticate()

    }catch(e){
      console.error('Unable to connect to the database:', e)
    }
  });
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /api/recipes-name', () => {
    it('should get 200', async () =>{
      await agent
      .get('/api/recipes-name?name=Milanesa')
      .expect(200)
      .then((data) => {
        data.body.forEach(res => {
          expect(res).to.have.property('id')
          expect(res).to.have.property('name')
          expect(res).to.have.property('summary')
        })
      })
    });
  });
});
