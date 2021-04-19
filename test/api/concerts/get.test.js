const Concert = require('../../../models/concert.model');
const server = require('../../../server.js');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
  before(async () => {
    const conOne = new Concert({ _id: '607ddf627df9361ba267897d', performer: 'Seven', genre: 'Jazz', price: '30', day: '1', image: 'imageSeven1'});
    await conOne.save();

    const conTwo = new Concert({ _id: '607ddfd17df9361ba267897e', performer: 'Eleven', genre: 'Soul', price: '45', day: '2', image: 'imageEleven2'});
    await conTwo.save();

    const conThree = new Concert({ _id: '607de01c7df9361ba267897f', performer: 'Fourteen', genre: 'Pop', price: '25', day: '2', image: 'imageFourteen3'});
    await conThree.save();

    const conFour = new Concert({ _id: '607de0617df9361ba2678980', performer: 'Twenty', genre: 'Rap', price: '25', day: '1', image: 'imageTwenty4'});
    await conFour.save();
  });

  it('/ return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(4);
  });

  it('/performer/:performer return concerts filtered by performer', async () => {
    const res = await request(server).get('/api/concerts/performer/Eleven');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/genre/:genre return concerts filtered by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Soul');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(1);
  });

  it('/price/:price_min/:price_max return concerts filtered by price from min to max', async () => {
    const res = await request(server).get('/api/concerts/price/30/45');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

  it('/price/day/:day return concerts filtered by day', async () => {
    const res = await request(server).get('/api/concerts/day/2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.not.be.null;
    expect(res.body.length).to.be.equal(2);
  });

  after(async () => {
    await Concert.deleteMany();
  });
});