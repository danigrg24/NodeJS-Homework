const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let todos = [];

// Endpoint pentru crearea unui todo nou
app.post('/todos', (req, res) => {
    // const { title, description } = req.body;

    // // Verifică dacă există un titlu pentru todo și returnează eroare 400 Bad Request dacă nu există
    // if (!title) {
    //     return res.status(400).json({ error: 'Title is required' });
    // }


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

    const todo = { id: todos.length + 1, title, description };
    todos.push(todo);
    res.status(201).json(response);

});

// fetch('http://localhost:3000/todos', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         title: 'Task 1',
//         description: 'Optional description'
//     }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => {
//     console.error('Error:', error);
// });


// fetch('http://localhost:3000/todos', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         name: 'Task 2',
//         description: 'Optional description'
//     }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => {
//     console.error('Error:', error);
// });

// fetch('http://localhost:3000/todos', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         title: 'Task 3',
//         description: 'Optional description'
//     }),
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch((error) => {
//     console.error('Error:', error);
// });


// Endpoint pentru obținerea tuturor todo-urilor
app.get('/todos', (req, res) => {
    res.status(200).json(todos);
});

// Endpoint pentru obținerea unui todo specific după ID
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id.split(':')[1]);
    console.log(id);
    // console.log(req.params);
    const todo = todos.find(todo => todo.id === id);

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

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
