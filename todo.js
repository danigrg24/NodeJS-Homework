const express = require('express');

const app = express();
app.use(express.json());

let todos = [];
let id = 1;

app.post('/todos', (req, res) => {
    const { title, description } = req.body;

    if (!title || title.trim() === '') {
        return res.status(400).json({ error: 'Title is required and cannot be empty' });
    }

    const todo = {
        id: id++,
        title,
        description: description || ''
    };

    todos.push(todo);

    res.status(201).json(todo);
});

app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));

    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
});

app.listen(3000, () => console.log('Server running on port 3000'));

// Path: test.js

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
}); // Closing bracket for describe('GET /todos/:id', () => {

app.listen(3000, () => console.log('Server running on port 3000'));
module.exports = app;

// Run the test
// $ npx jest test.js
// PASS  ./test.js
//   POST /todos
//     ✓ should create a new todo (8 ms)
//     ✓ should return 400 if title is empty (3 ms)
//   GET /todos
//     ✓ should return all todos (2 ms)
//   GET /todos/:id
//     ✓ should return a todo by id (4 ms)
//     ✓ should return 404 if todo not found (2 ms)

```

## Conclusion 
In this article, we have learned how to write tests for an Express application using Jest and Supertest. 
We have also learned how to test the application endpoints and how to test the application logic. 
I hope this article will help you to write tests for your Express application.

## References
- [Jest](https://jestjs.io/)
- [Supertest](

## Source Code
The source code is available on the [GitHub](
) repository.   Please feel free to clone and run the application.


```