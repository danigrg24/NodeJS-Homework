const express = require('express');
const bodyParser = require('body-parser');
const LIMIT = 10;
const PAGE = 1;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let todos = [];

const crypto = require('crypto');

function generateUniqueHash() {
    const randomBytes = crypto.randomBytes(16); // Generate random bytes
    const hash = crypto.createHash('sha256'); // Create SHA-256 hash object
    hash.update(randomBytes); // Update hash with random bytes
    return hash.digest('hex'); // Get hexadecimal representation of the hash
}

// Example usage:
const uniqueHash = generateUniqueHash(); 

// Endpoint pentru crearea unui todo nou
app.post('/todos', (req, res) => {

    const response = req.body;
    // console.log(response);

    var count = Object.keys(response).length;
    // console.log(count);

    if (count != 2) {
        return res.status(400).json({ error: 'Bad Request on invalid input' });
    }

    if (!(response.description && response.title)) {
        return res.status(400).json({ error: 'Bad Request on invalid input' });
    }

    const { title, description } = req.body;

    const todo = { id: generateUniqueHash(), title, description };
    todos.push(todo);
    res.status(201).json(response);

});

// Endpoint pentru obținerea unui todo specific după ID
app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    // console.log(req.params);
    const todo = todos.find(todo => todo.id == id);

    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(todo);
});

// Endpoint pentru actualizarea unui todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, description } = req.body;

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    todos[todoIndex] = { ...todos[todoIndex], title, description };
    res.status(200).json(todos[todoIndex]);
});

// Endpoint pentru ștergerea unui todo
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const todoIndex = todos.findIndex(todo => todo.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    todos.splice(todoIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Retrieve all todos with pagination support
// Bonus tasks
app.get('/todos', (req, res) => {
    const page = parseInt(req.query.page) || PAGE;
    const limit = parseInt(req.query.limit) || LIMIT;

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

    console.log(results);
  
    res.status(200).json(results);
  });


