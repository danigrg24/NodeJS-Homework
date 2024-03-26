const request = require('supertest');
const app = require('./todo');

describe('POST /todos', () => {
    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ title: 'Todo 1' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Todo 1');
        expect(res.body.description).toBe('');
    });

    it('should return 400 if title is empty', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ title: '' });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty('error');
    });
});

describe('GET /todos', () => {
    it('should return all todos', async () => {
        const res = await request(app)
            .get('/todos');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual([]);
    });
});

describe('GET /todos/:id', () => {
    it('should return a todo by id', async () => {
        const todo = { id: 1, title: 'Todo 1', description: '' };
        await request(app)
            .post('/todos')
            .send(todo);

        const res = await request(app)
            .get('/todos/1');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(todo);
    });

    it('should return 404 if todo not found', async () => {
        const res = await request(app)
            .get('/todos/1');

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error');
    });
});