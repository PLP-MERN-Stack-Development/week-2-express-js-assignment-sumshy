# 📦 Week 2: Express.js RESTful API – Product Management

This project is a RESTful API built with **Express.js** for managing a collection of products. It includes standard CRUD operations, middleware for logging and authentication, validation, advanced filtering, pagination, and error handling.

## 🚀 Features

- Full CRUD operations for product resources
- Middleware:
  - Custom logger (method, URL, timestamp)
  - API key authentication
  - Request validation
- Advanced API features:
  - Filter by category
  - Pagination support
  - Search by name
  - Product statistics (count by category)
- Global error handling with custom error classes


## 🛠️ Installation & Setup

1. **Clone the repository**
   bash
   git clone <your-repo-url>
   cd week-2-express-api-assignment


2. **Install dependencies**

   bash
   npm install
   

3. **Create a `.env` file**

   PORT=your choice
   API_KEY= your choice
   
4. **Start the server**

   bash
   npm start
   

   Server will run at: `http://localhost:3000`

## 📄 API Endpoints

All endpoints require a valid API key passed via headers:

**Header Example:**

x-api-key: mysecretkey123

### 🔍 GET /api/products

Returns all products. Supports optional query parameters:

* `category` – filter by category
* `page` – current page (default 1)
* `limit` – items per page (default 10)

**Example:**

GET /api/products?category=electronics&page=1&limit=5

### 📦 GET /api/products/\:id

Get a specific product by its ID.

GET /api/products/1


### ➕ POST /api/products

Create a new product.
**Required fields:** `name`, `description`, `price`, `category`, `inStock`

**Body:**

json
{
  "name": "Headphones",
  "description": "Noise-cancelling wireless headphones",
  "price": 199,
  "category": "electronics",
  "inStock": true
}

### 🛠️ PUT /api/products/\:id

Update a product by its ID.
**Body:** Provide any field(s) to update.

json
{
  "price": 999,
  "inStock": false
}


### 🗑️ DELETE /api/products/\:id

Delete a product by ID.

DELETE /api/products/3


### 🔎 GET /api/products/search?name=term

Search products by name (case-insensitive).

GET /api/products/search?name=laptop

### 📊 GET /api/products/stats

Returns total product count by category.

GET /api/products/stats


## 🔒 Environment Variables

Use a `.env` file to store config:

| Variable  | Description            |
| --------- | ---------------------- |
| `PORT`    | Port to run the server |
| `API_KEY` | API key for access     |


## 🧪 Testing

Use [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test all endpoints.
Ensure to include the `x-api-key` header in each request.


## 📁 Project Structure

📁 week-2-express-api-assignment
│
├── server.js
├── .env
├── .env.example
├── package.json
├── README.md
└── node_modules/


## ✅ Sample Test Requests

Check the Images section in this repository or refer to the documentation above to test each feature using Postman.