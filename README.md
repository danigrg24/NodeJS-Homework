# NodeJS-Homework

Base URL: http://localhost:3000

Endpoints

1. Create a New Todo

Create a new todo item by sending a POST request to /todos endpoint.

Endpoint: POST /todos

Request Format:
Content-Type: application/json
Body: 
{
    "title": "Todo Title",
    "description": "Todo Description"
}

Response Format:
Status Code: 201 Created
Content-Type: application/json
Body:
{
    "id": "Todo ID",
    "title": "Todo Title",
    "description": "Optional Description"
}

Error Responses:
Status Code: 400 Bad Request
Content-Type: application/json
Body:
{
    "error": "Bad Request on invalid input"
}

2. Retrieve a List of All Todos

Retrieve a list of all todo items by sending a GET request to /todos endpoint.

Endpoint: GET /todos

Response Format:
Status Code: 200 OK
Content-Type: application/json
Body:
[
    {
        "id": "Todo ID",
        "title": "Todo Title",
        "description": "Optional Description"
    },
    ...
]

3. Retrieve a Specific Todo by Its ID
   
Retrieve a specific todo item by its ID.

Endpoint: GET /todos/:id
Request Format:
URL Parameter: id (The ID of the todo)
Response Format:
Status Code: 200 OK
Content-Type: application/json
Body:
{
    "id": "Todo ID",
    "title": "Todo Title",
    "description": "Todo Description"
}

Error Responses:
Status Code: 404 Not Found
Content-Type: application/json
Body:
{
    "error": "Todo not found"
}

4. Update a Todo
   
Update an existing todo item by sending a PUT request to /todos/:id endpoint.

Endpoint: PUT /todos/:id

Request Format:
URL Parameter: id (The ID of the todo)
Content-Type: application/json
Body:
{
    "title": "Updated Todo Title",
    "description": "Updated Todo Description"
}

Response Format:
Status Code: 200 OK
Content-Type: application/json
Body:
{
    "id": "Todo ID",
    "title": "Updated Todo Title",
    "description": "Updated Todo Description"
}

Error Responses:
Status Code: 400 Bad Request
Content-Type: application/json
Body:
{
    "error": "Title is required"
}

Status Code: 404 Not Found
Content-Type: application/json
Body:
{
    "error": "Todo not found"
}

5. Retrieve All Todos with Pagination Support

Retrieve a list of all todo items with support for pagination.

Endpoint: GET /todos

Query Parameters:
page (optional): Page number for pagination (default: 1)
limit (optional): Number of items per page (default: 10)

Response Format:
Status Code: 200 OK
Content-Type: application/json
Body:
{
    "results": [
        {
            "id": "Todo ID",
            "title": "Todo Title",
            "description": "Todo Description"
        },
        ...
    ],
    "next": {
        "page": Next Page Number,
        "limit": Number of Items per Page
    },
    "previous": {
        "page": Previous Page Number,
        "limit": Number of Items per Page
    }
}

Note: If there are no previous or next pages, the corresponding key will not be present in the response.


Error Handling
- The API returns appropriate HTTP status codes and error messages for invalid requests or when resources are not found.

Authentication & Authorization
- This API does not include authentication or authorization mechanisms.

Security
- The API does not handle sensitive data. However, it is recommended to use HTTPS for secure communication.

Additional Notes
- All responses are in JSON format.
- The function generateUniqueHash is used to generate unique identifiers (IDs) for todo objects within your application. This function utilizes the crypto module in Node.js to generate a SHA-256 hash based on random bytes. Here's how each part of this function works:

- crypto.randomBytes(16): This method generates 16 bytes of random data used as input for generating the hash. These bytes are essential to ensure that the generated hash will be unique with each function call.

- crypto.createHash('sha256'): Here, a hash object is created using the SHA-256 algorithm. This algorithm is chosen because it is a secure cryptographic hash function and produces a 256-bit result.

- hash.update(randomBytes): The hash object is updated with the previously generated random bytes. This step ensures that the random data is included in the hash calculation process.

- hash.digest('hex'): Finally, the hash is computed and converted to a hexadecimal representation, which is then returned as the unique identifier for the todo object.

Running and Testing the Application

1. Installed Dependencies:
I made sure to have Node.js and npm (Node Package Manager) installed on my machine.

2. Ran the Server:
I started the server using the command:
"npm start" or "node server.js"

The server was available at http://localhost:3000 .

3. Tested the API:
I tested the API using tools like Postman or directly through a web browser.

- To create a new todo, I sent a POST request to http://localhost:3000/todos with a valid request body as per the documentation.
- To retrieve a specific todo by ID, I sent a GET request to http://localhost:3000/todos/:id, where :id is the ID of the desired todo.
- To update a todo, I sent a PUT request to http://localhost:3000/todos/:id with a valid request body as per the documentation.
- To retrieve all todos with pagination support, I sent a GET request to http://localhost:3000/todos with optional query parameters for pagination (page and limit), as per the documentation.
