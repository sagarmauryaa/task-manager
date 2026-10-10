# Task Manager API

A RESTful API for managing tasks, built with Node.js and Express.js. This project is Assignment 1 for the Backend Engineering Launchpad program.

## Overview

The Task Manager API provides a simple and efficient way to manage tasks with features including:
- Create, read, update, and delete tasks
- Filter tasks by completion status, priority, and search terms
- Sort tasks by creation or update date
- Automatic ID generation and timestamp tracking
- Input validation using Zod schema validation

The API uses JSON file-based storage for persistence and includes comprehensive error handling and validation.

## Tech Stack

- **Node.js** (>= 18.0.0)
- **Express.js** - Web framework
- **Zod** - Schema validation
- **Supertest** - API testing
- **Tap** - Test framework

## Setup Instructions

### Prerequisites

- Node.js version 18.0.0 or higher
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager-api-sagarmauryaa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

4. Run tests:
   ```bash
   npm test
   ```

## API Endpoints

### Base URL
```
http://localhost:3000
```

### 1. Create a Task

**POST** `/tasks`

Creates a new task with the provided details.

**Request Body:**
```json
{
  "title": "Task title",
  "description": "Task description",
  "priority": "low" | "medium" | "high",  // optional, defaults to "low"
  "completed": false  // optional, defaults to false
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "createdDate": "2025-12-29T08:42:21.193Z",
  "title": "Task title",
  "description": "Task description",
  "priority": "low",
  "completed": false
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager API",
    "priority": "high",
    "completed": false
  }'
```

---

### 2. Get All Tasks

**GET** `/tasks`

Retrieves all tasks with optional filtering and sorting.

**Query Parameters:**
- `completed` (optional): Filter by completion status (`"true"` or `"false"`)
- `search` (optional): Search tasks by title (case-insensitive)
- `priority` (optional): Filter by priority (`"low"`, `"medium"`, or `"high"`)
- `sort` (optional): Sort field (`"createdDate"` or `"updatedDate"`, defaults to `"createdDate"`)
- `order` (optional): Sort order (`"asc"` or `"desc"`, defaults to `"asc"`)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "createdDate": "2025-12-29T08:42:21.193Z",
    "title": "Task title",
    "description": "Task description",
    "priority": "low",
    "completed": false
  }
]
```

**Example Requests:**
```bash
# Get all tasks
curl http://localhost:3000/tasks

# Get completed tasks
curl "http://localhost:3000/tasks?completed=true"

# Search tasks
curl "http://localhost:3000/tasks?search=project"

# Filter by priority and sort
curl "http://localhost:3000/tasks?priority=high&sort=createdDate&order=desc"
```

---

### 3. Get Tasks by Priority

**GET** `/tasks/priority/:priority`

Retrieves all tasks filtered by a specific priority level.

**URL Parameters:**
- `priority`: Priority level (`"low"`, `"medium"`, or `"high"`)

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "createdDate": "2025-12-29T08:42:21.193Z",
    "title": "Task title",
    "description": "Task description",
    "priority": "high",
    "completed": false
  }
]
```

**Example Request:**
```bash
curl http://localhost:3000/tasks/priority/high
```

---

### 4. Get Task by ID

**GET** `/tasks/:id`

Retrieves a specific task by its ID.

**URL Parameters:**
- `id`: Task ID (positive integer)

**Response:** `200 OK`
```json
{
  "id": 1,
  "createdDate": "2025-12-29T08:42:21.193Z",
  "title": "Task title",
  "description": "Task description",
  "priority": "low",
  "completed": false
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

**Example Request:**
```bash
curl http://localhost:3000/tasks/1
```

---

### 5. Update Task by ID

**PUT** `/tasks/:id`

Updates an existing task. Only provided fields will be updated.

**URL Parameters:**
- `id`: Task ID (positive integer)

**Request Body:**
```json
{
  "title": "Updated title",  // optional
  "description": "Updated description",  // optional
  "priority": "medium",  // optional
  "completed": true  // optional
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "createdDate": "2025-12-29T08:42:21.193Z",
  "updatedDate": "2025-12-29T09:00:00.000Z",
  "title": "Updated title",
  "description": "Updated description",
  "priority": "medium",
  "completed": true
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated task",
    "completed": true
  }'
```

---

### 6. Delete Task by ID

**DELETE** `/tasks/:id`

Deletes a task by its ID.

**URL Parameters:**
- `id`: Task ID (positive integer)

**Response:** `200 OK`
```json
{
  "message": "Task deleted successfully"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Task not found"
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

---

## Testing the API

### Running Automated Tests

The project includes automated tests using Tap and Supertest. Run all tests with:

```bash
npm test
```

### Manual Testing with cURL

#### 1. Create a Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Task",
    "description": "This is a test task",
    "priority": "high",
    "completed": false
  }'
```

#### 2. Get All Tasks
```bash
curl http://localhost:3000/tasks
```

#### 3. Get Task by ID
```bash
curl http://localhost:3000/tasks/1
```

#### 4. Update a Task
```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Task",
    "completed": true
  }'
```

#### 5. Get Tasks by Priority
```bash
curl http://localhost:3000/tasks/priority/high
```

#### 6. Delete a Task
```bash
curl -X DELETE http://localhost:3000/tasks/1
```

### Testing with Postman or Similar Tools

1. **Import Collection**: Create a new collection in Postman
2. **Set Base URL**: `http://localhost:3000`
3. **Create Requests**:
   - POST `/tasks` - Create task
   - GET `/tasks` - Get all tasks
   - GET `/tasks/:id` - Get task by ID
   - PUT `/tasks/:id` - Update task
   - DELETE `/tasks/:id` - Delete task
   - GET `/tasks/priority/:priority` - Get tasks by priority

### Testing Query Parameters

Test the filtering and sorting capabilities:

```bash
# Get completed tasks
curl "http://localhost:3000/tasks?completed=true"

# Search for tasks
curl "http://localhost:3000/tasks?search=test"

# Filter by priority
curl "http://localhost:3000/tasks?priority=high"

# Sort by updated date (descending)
curl "http://localhost:3000/tasks?sort=updatedDate&order=desc"

# Combine multiple filters
curl "http://localhost:3000/tasks?completed=false&priority=high&sort=createdDate&order=desc"
```

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid input data or validation error
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error responses follow this format:
```json
{
  "error": "Error message description"
}
```

## Data Validation

The API validates all input using Zod schemas:

- **Title**: Required, non-empty string
- **Description**: Required, non-empty string
- **Priority**: Optional, must be `"low"`, `"medium"`, or `"high"` (defaults to `"low"`)
- **Completed**: Optional, must be boolean (defaults to `false`)
- **Task ID**: Must be a positive integer

## Project Structure

```
task-manager-api-sagarmauryaa/
├── app.js                 # Express app configuration
├── controllers/           # Request handlers
│   └── taskController.js
├── services/              # Business logic
│   └── taskService.js
├── router/                # Route definitions
│   └── taskRouter.js
├── validator/             # Zod validation schemas
│   └── taskSchema.js
├── utils/                 # Utility functions
│   ├── errorHandler.js
│   └── fileUtils.js
├── data/                  # JSON data storage
│   └── task.json
├── test/                  # Test files
│   └── server.test.js
└── package.json
```

## License

ISC

## Author

Sagar Maurya

