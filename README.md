# TaskSphere - Scalable Task & Team Management API 🚀

**TaskSphere** is a powerful Backend API designed for managing tasks, projects, and teams efficiently. Built with the MERN stack (MongoDB, Express, Node.js) and **GraphQL**, it offers a flexible and efficient query language for your frontend applications.

![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

## ✨ Features

*   **Authentication & Authorization**: Secure JWT-based auth with Role-Based Access Control (Admin, Manager, User).
*   **Project Management**: Create, update, and manage multiple projects.
*   **Task Management**: Comprehensive CRUD operations for tasks with status tracking (TODO, IN_PROGRESS, DONE).
*   **Team Collaboration**: Add members to projects and assign tasks to specific users.
*   **GraphQL API**: Strongly typed schema with efficient data fetching using Apollo Server.
*   **Modern ES Modules**: Built using the latest JavaScript standards.

## 🛠 Tech Stack

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **API Layer**: Apollo Server (GraphQL)
*   **Database**: MongoDB (Mongoose ODM)
*   **Authentication**: JSON Web Tokens (JWT) & Bcrypt

## 🚀 Getting Started

### Prerequisites

*   Node.js (v14+ recommended)
*   MongoDB Atlas URI or Local MongoDB instance

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/shasbinas/TaskSphere-Scalable-Task-Team-Management-API.git
    cd TaskSphere-Scalable-Task-Team-Management-API
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory:
    ```env
    PORT=5000
    MONGO_DB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    NODE_ENV=development
    ```

4.  **Run the Server**
    ```bash
    # Development mode (with nodemon)
    npm run dev

    # Production mode
    npm start
    ```

5.  **Access the API**
    Open your browser to [http://localhost:5000/graphql](http://localhost:5000/graphql) to use the **Apollo Sandbox**.

## 📖 API Usage Guide

### 1. Register a User
```graphql
mutation {
  register(name: "John Doe", email: "john@example.com", password: "password123", role: "User") {
    token
    user { id name role }
  }
}
```

### 2. Create a Project
*(Requires Authentication Header: `Authorization: Bearer <TOKEN>`)*
```graphql
mutation {
  createProject(name: "New Website Redesign") {
    id
    name
  }
}
```

### 3. Create a Task
```graphql
mutation {
  createTask(title: "Design Homepage", projectId: "YOUR_PROJECT_ID") {
    id
    title
    status
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
