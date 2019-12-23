require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const ExplorationItem = require('../lib/models/ExplorationItem');

jest.mock('../lib/services/forecast.js', () => ({
  getWOEID() {
    return Promise.resolve('12345');
  },
  getForecast() {
    return Promise.resolve({
      min_temp: 5
    });
  }
}));

describe('app routes', () => {
  beforeAll(() => connect());
  beforeEach(() => mongoose.connection.dropDatabase());

  let trip;
  let explorationItem;
  beforeEach(async() => {
    trip = await Trip.create({
      name: 'Canada Spring 2020'
    });

    explorationItem = await ExplorationItem.create({
      trip: trip._id,
      startDate: new Date('2020-03-21'),
      endDate: new Date('2020-03-22'),
      woeid: '2487956',
      name: 'Visit City Hall'
    });
  });

  it('creates a trip', () => {
    return request(app)
      .post('/api/v1/trips')
      .send({ name: 'Hawaii 2020' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Hawaii 2020',
          __v: 0
        });
      });
  });

  it('gets a trip by id', () => {
    return request(app)
      .get(`/api/v1/trips/${trip.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip.id,
          name: 'Canada Spring 2020',
          exploration: [{
            _id: explorationItem.id,
            trip: trip.id,
            startDate: explorationItem.startDate.toISOString(),
            endDate: explorationItem.endDate.toISOString(),
            temp: 5,
            name: 'Visit City Hall',
            woeid: '2487956',
            __v: 0
          }],
          __v: 0
        });
      });
  });

  it('gets all trips', () => {
    return request(app)
      .get('/api/v1/trips')
      .then(res => {
        expect(res.body).toEqual([JSON.parse(JSON.stringify(trip))]);
      });
  });

  it('updates a trip', () => {
    return request(app)
      .patch(`/api/v1/trips/${trip.id}`)
      .send({ name: 'Canada Summer 2020' })
      .then(res => {
        expect(res.body.name).toEqual('Canada Summer 2020');
      });
  });

  it('deletes a trip', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: trip.id,
          name: 'Canada Spring 2020',
          __v: 0
        });
      });
  });

  it('can add an exploration item', () => {
    return request(app)
      .post(`/api/v1/trips/${trip.id}/item`)
      .send({
        startDate: new Date('2020-03-23'),
        endDate: new Date('2020-03-24'),
        name: 'Eat Lunch',
        latitude: 37.777119,
        longitude: -122.41964
      })
      .then(res => {
        expect(res.body.exploration).toContainEqual({
          _id: expect.any(String),
          trip: trip.id,
          startDate: '2020-03-23T00:00:00.000Z',
          endDate: '2020-03-24T00:00:00.000Z',
          name: 'Eat Lunch',
          latitude: 37.777119,
          longitude: -122.41964,
          woeid: '12345',
          __v: 0
        });
      });
  });

  it('can delete an exploration item', () => {
    return request(app)
      .delete(`/api/v1/trips/${trip.id}/item/${explorationItem.id}`)
      .then(res => {
        expect(res.body.exploration).toHaveLength(0);
      });
  });

  afterAll(() => mongoose.connection.close());
});
