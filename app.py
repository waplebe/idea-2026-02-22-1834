from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import sqlite3

DATABASE_URL = "sqlite:///tasks.db"

app = FastAPI()

# Database setup
def create_db():
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT FALSE
        )
    """)
    conn.commit()
    conn.close()

create_db()

# Data model
class Task(BaseModel):
    id: int
    title: str
    description: str | None = None
    completed: bool = False

@app.get("/tasks", response_model=List[Task])
async def read_tasks():
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    conn.close()

    task_list = []
    for task in tasks:
        task_list.append(Task(id=task[0], title=task[1], description=task[2], completed=task[3]))
    return task_list

@app.get("/tasks/{task_id}", response_model=Task)
async def read_task(task_id: int):
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    task = cursor.fetchone()
    conn.close()

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return Task(id=task[0], title=task[1], description=task[2], completed=task[3])

@app.post("/tasks", response_model=Task)
async def create_task(task: Task):
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)",
                   (task.title, task.description, task.completed))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()
    return Task(id=task_id, title=task.title, description=task.description, completed=task.completed)

@app.put("/tasks/{task_id}", response_model=Task)
async def update_task(task_id: int, task: Task):
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?",
                   (task.title, task.description, task.completed, task_id))
    conn.commit()
    conn.close()

    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    updated_task = cursor.fetchone()
    conn.close()

    return Task(id=updated_task[0], title=updated_task[1], description=updated_task[2], completed=updated_task[3])

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return {"message": "Task deleted"}

@app.get("/tasks/search", response_model=List[Task])
async def search_tasks(query: str = None):
    conn = sqlite3.connect(DATABASE_URL)
    cursor = conn.cursor()
    if query:
        cursor.execute("SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ?", ('%' + query + '%', '%' + query + '%'))
    else:
        cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    conn.close()

    task_list = []
    for task in tasks:
        task_list.append(Task(id=task[0], title=task[1], description=task[2], completed=task[3]))
    return task_list