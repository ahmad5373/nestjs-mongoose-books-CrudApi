# nestjs-mongoose-books-CrudApi
This is a sample project built with Nest.js, Mongoose, and TypeScript. It provides CRUD operations for managing books using a RESTful API.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v12 or higher)
- MongoDB

## Getting Started

1. Clone the repository:
git Clone
https://github.com/ahmad5373/nestjs-mongoose-books-CrudApi

# Install the dependencies
cd your-repo
npm install

# Configure the environment variables:
Rename the .env.example file to .env and update the values based on your environment settings.

# Start the development server:
npm run start:dev

The server will start running on http://localhost:3000.

# Available Routes
GET /books: Get all books
GET /books/:id: Get a book by ID
POST /books/createBook: Create a new book
PUT /books/update/:id: Update a book by ID
DELETE /books/delete/:id: Delete a book by ID

# Contributing
If you'd like to contribute to this project, please follow these steps:

# Fork the repository
Create a new branch: git checkout -b feature/your-feature-name
Make your changes and commit them: git commit -m 'Add some feature'
Push the branch to your forked repository: git push origin feature/your-feature-name
Submit a pull request to the original repository

# This project is licensed under the MIT License.
