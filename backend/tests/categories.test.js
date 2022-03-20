import mongoose from 'mongoose';
import supertest from 'supertest';
import 'dotenv/config';
import app from '../server.js';
import authService from '../services/auth.js';
import Category from '../models/categories.js';

describe('Tests for categories routes', () => {
  let token;
  let userId = '62369f231931879e56eb98cd';
  let categoryId;

  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(
      `${process.env.MONGO_URI}${process.env.TEST_DB_NAME}`
    );
    token = await authService.login('test@test1.com', 'slaptas1');
    let category = await Category.create({
      title: 'Temporary category',
      type: 'expenses',
      userId,
    });
    categoryId = category.id;
  });

  afterAll(async () => {
    await Category.deleteOne({ id: categoryId });
    await mongoose.disconnect();
  });

  describe('GET /categories', () => {
    it('gets all categories', async () => {
      const resp = await supertest(app)
        .get('/categories')
        .set('Authorization', `Bearer ${token}`);

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(resp.body).toEqual(expect.arrayContaining([]));
    });
  });

  describe('GET /categories/:id specific category', () => {
    it('given id which some category has', async () => {
      const resp = await supertest(app)
        .get(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

    it('given id which does not belong to any category', async () => {
      const resp = await supertest(app)
        .get('/categories/123')
        .set('Authorization', `Bearer ${token}`);

      expect(resp.status).toBe(500);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });
  });

  describe('POST /category', () => {
    it('given valid body', async () => {
      const resp = await supertest(app)
        .post('/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Stock trading', type: 'expenses' });

      expect(resp.status).toBe(201);
      expect(resp.body).toEqual(
        expect.objectContaining({
          title: 'Stock trading',
          type: 'expenses',
        })
      );
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

    it('given not valid body', async () => {
      const resp = await supertest(app)
        .post('/categories')
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Stock trading' });

      expect(resp.status).toBe(500);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });
  });

  describe('PUT /categories/:id', () => {
    it('given id which some category has', async () => {
      const resp = await supertest(app)
        .put(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Derivatives trading' });

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(resp.body.title).toEqual('Derivatives trading');
    });

    it('given id which no category has', async () => {
      const resp = await supertest(app)
        .put(`/categories/123`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'New title' });

      expect(resp.status).toBe(500);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });
  });

  describe('DELETE /categories/:id', () => {
    it('given id which some category has', async () => {
      const resp = await supertest(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'Derivatives trading' });

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

    it('given id which no category has', async () => {
      const resp = await supertest(app)
        .delete(`/categories/123`)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'New title' });

      expect(resp.status).toBe(500);
    });
  });
});
