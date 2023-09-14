const chai = require('chai');
const superTest = require('supertest');
const testingURL = 'http://localhost:8080';
const request = superTest(testingURL);
const expect = chai.expect;
const testingProducts = ['664724e10c1ef4edc5e425926'];

describe('Test de productos', () => {
  const product = {
    title: 'Testing product',
    description: 'Descripcion de prueba para testing',
    code: 'PRTS1',
    price: 50000,
    stock: 200,
    category: 'testing',
    thumbnails: ['...links'],
  };

  it(`Testing de obtencion de todos los productos - ${testingURL}/api/products`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body.payload).to.be.an.instanceof(Array);
  });

  it(`Testing de obtencion de un producto por ID - ${testingURL}/api/products/:pid`, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/productsBd/${testingProducts[0]}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });

  it(`Testing de creacion de un producto - ${testingURL}/api/products/`, async () => {
    const { statusCode, ok, _body } = await request.post(`/api/products/`).send(product);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });
});

// Testing de carrito

describe('Test de carritos', () => {
  let id = ['64659116e416357ea2bdb349'];
  it(`Testing de obtencion de carritos `, async () => {
    const { statusCode, ok, _body } = await request.get('/api/cartsBd');
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Array);
  });

  it(`Testing de obtencion de carrito por ID `, async () => {
    const { statusCode, ok, _body } = await request.get(`/api/cartsBd/${id}`);
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });

  it(`Testing de adicion de producto a un carrito por ID `, async () => {
    const response = await request.post(`/api/session/login`).send({
      email: 'bimbo95car@gmail.com',
      password: '123',
    });
    const { headers } = response;
    const array = headers['set-cookie'][0].split('=');
    cookie = {
      name: array[0],
      value: array[1],
    };
    const { statusCode, ok, _body } = await request.post(`/api/cartsBd/${id}/product/${testingProducts[0]}`).set('Cookie', `${cookie.name}=${cookie.value}`);
    console.log(statusCode);
    expect(statusCode).to.deep.equal(201);
    expect(ok).to.be.true;
    expect(_body).to.be.an.instanceof(Object);
  });
});

// Testing de Session
describe('Test de sesiones', () => {
  const user = {
    firstName: 'Admin',
    lastName: 'Coder',
    email: 'adminCoder@coder.com',
    password: 'Cod3r123',
  };

  // const userLogin = {
  //   email: 'adminCoder@coder.com',
  //   password: 'Cod3r123',
  // };
  let cookie;

  it(`Testing de registro`, async () => {
    const response = await request.post(`/api/session/register`).send(user);
    const { statusCode, _body, ok } = response;
    expect(statusCode).to.deep.equal(200);
    expect(ok).to.be.true;
    expect(_body);
  }).timeout(10000);

  it(`Testing de inicio de sesion`, async () => {
    const response = await request.post(`/api/session/login`).send({
      email: user.email,
      password: user.password,
    });
    const { statusCode, _body, headers } = response;
    console.log(_body);
    const array = headers['set-cookie'][0].split('=');
    cookie = {
      name: array[0],
      value: array[1],
    };
    expect(statusCode).to.deep.equal(200);
    expect(headers['set-cookie']).to.be.ok;
    expect(_body.firstName).to.equal(user.firstName);
    expect(_body.lastName).to.equal(user.lastName);
    expect(cookie.name).to.equal('connect.sid');
    expect(cookie.value).to.equal;
  }).timeout(10000);

  it(`Current Usuario`, async () => {
    const response = await request.get(`/api/session/current`).set('Cookie', `${cookie.name}=${cookie.value}`);
    const { statusCode, _body } = response;
    console.log(statusCode, _body);
    expect(statusCode).to.deep.equal(200);
    expect(_body.email).to.deep.equal(user.email);
    expect(_body).to.be.an.instanceof(Object);
  }).timeout(10000);
});