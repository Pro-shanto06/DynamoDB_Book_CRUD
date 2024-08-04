# This project provides a simple RESTful API for managing books using NestJS and AWS DynamoDB.

## Features

- **Create**: Add a new book to the database.
- **Read**: Retrieve a list of all books or a specific book by ID.
- **Update**: Modify the details of an existing book.
- **Delete**: Remove a book from the database.

## Installation

1. Clone the repository:
  ```bash
   git clone https://github.com/Pro-shanto06/DynamoDB_Book_CRUD
  ```

2. Navigate into the project directory:
   ```bash
   cd DynamoDB_Book_CRUD
   ```

3. Install dependencies:
  ```bash
     npm install
  ```

4. Set up environment variables:
   Create a .env file in the root directory and add the following:
   ```env
   REGION=us-west-2
   ENDPOINT_URL=http://localhost:8000
   TABLE_NAME=book
   ```

5. Start the application:
   ```bash
   npm run start
   ```

## API Endpoints

### POST /book

Create a new book.

- **Request Body**:
  ```json
  {
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationYear": 1925
  }
  ```

- **Response**:
  \`\`\`json
  {
    "message": "Book created successfully"
  }
  \`\`\`

### GET /book

Retrieve all books.

- **Response**:
  \`\`\`json
  [
    {
      "bookId": "some-uuid",
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "publicationYear": "1925"
    },
    {
      "bookId": "another-uuid",
      "title": "1984",
      "author": "George Orwell",
      "publicationYear": "1949"
    }
  ]
  \`\`\`

### GET /book/:bookId

Retrieve a book by ID.

- **Response**:
  \`\`\`json
  {
    "bookId": "some-uuid",
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "publicationYear": "1925"
  }
  \`\`\`

- **Error Response** (if not found):
  \`\`\`json
  {
    "statusCode": 404,
    "message": "Book with ID some-uuid not found"
  }
  \`\`\`

### PUT /book/:bookId

Update a book by ID.

- **Request Body**:
  \`\`\`json
  {
    "title": "The Great Gatsby (Updated)",
    "author": "F. Scott Fitzgerald",
    "publicationYear": 1925
  }
  \`\`\`

- **Response**:
  \`\`\`json
  {
    "bookId": "some-uuid",
    "title": "The Great Gatsby (Updated)",
    "author": "F. Scott Fitzgerald",
    "publicationYear": "1925"
  }
  \`\`\`

- **Error Response** (if not found):
  \`\`\`json
  {
    "statusCode": 404,
    "message": "Book with ID some-uuid not found"
  }
  \`\`\`

### DELETE /book/:bookId

Delete a book by ID.

- **Response**:
  \`\`\`json
  {
    "message": "Book deleted successfully"
  }
  \`\`\`

- **Error Response** (if not found):
  \`\`\`json
  {
    "statusCode": 404,
    "message": "Book with ID some-uuid not found"
  }
  \`\`\`

