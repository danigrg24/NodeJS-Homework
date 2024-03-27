
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory database
let todos = [];
let nextId = 1;

// Routes

// Create a new todo
app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  // Validate input
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const todo = { id: nextId++, title, description };
  todos.push(todo);
  res.status(201).json(todo);
});

// Retrieve all todos
app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

// Retrieve a specific todo by its ID
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === parseInt(id));

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  res.status(200).json(todo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Validate input
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }

  const index = todos.findIndex(todo => todo.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[index] = { id: parseInt(id), title, description };
  res.status(200).json(todos[index]);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

// Retrieve all todos with pagination support
app.get('/todos', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    console.log("Pagina e: ", page);
    console.log("Limita e: ", limit);
  
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    const results = {};
  
    if (endIndex < todos.length) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }
  
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      };
    }
  
    results.results = todos.slice(startIndex, endIndex);
  
    res.status(200).json(results);
  });