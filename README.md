# Simple Task Manager API & Web App

**Description:**

This project provides a simple task management API and a corresponding web application. It allows users to create, read, update, and delete tasks. The backend is built using FastAPI, providing a fast and modern API. The frontend is a basic HTML/CSS/JavaScript application for interacting with the API.

**Why it's useful:**

This project demonstrates a full-stack web application with a RESTful API. It's a good starting point for learning about API development, frontend development, and database interaction.  It's a practical example of a simple task management system that can be easily extended.

**Installation & Setup:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/simple-task-manager.git
    cd simple-task-manager
    ```

2.  **Set up the backend:**
    *   Create a `.env` file in the root directory and populate it with the following environment variables (replace with your actual values):
        ```
        DATABASE_URL=sqlite:///tasks.db
        ```
    *   Run the backend server:
        ```bash
        python app.py
        ```
        (or `uvicorn app:app --reload` if using a production-like setup)

3.  **Set up the frontend:**
    *   Open `index.html` in your web browser.

4.  **Dependencies:**
    *   The `requirements.txt` file lists the necessary Python packages. Install them using:
        ```bash
        pip install -r requirements.txt
        ```

**API Endpoints:**

*   `GET /tasks`: Retrieves all tasks.
*   `GET /tasks/{task_id}`: Retrieves a specific task by ID.
*   `POST /tasks`: Creates a new task.  Request body should be a JSON object with `title` and `description` fields.
*   `PUT /tasks/{task_id}`: Updates an existing task. Request body should be a JSON object with `title` and/or `description` fields.
*   `DELETE /tasks/{task_id}`: Deletes a task.

**Example Usage:**

*   **Create a task:**
    `POST /tasks`
    Request Body:
    ```json
    {
      "title": "Grocery Shopping",
      "description": "Buy milk, eggs, and bread"
    }
    ```
    Response:
    ```json
    {
      "id": 1,
      "title": "Grocery Shopping",
      "description": "Buy milk, eggs, and bread",
      "completed": false
    }
    ```

*   **Get all tasks:**
    `GET /tasks`
    Response:
    ```json
    [
      {
        "id": 1,
        "title": "Grocery Shopping",
        "description": "Buy milk, eggs, and bread",
        "completed": false
      }
    ]
    ```

**License:**

MIT License