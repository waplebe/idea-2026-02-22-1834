function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (title && description) {
        fetch('/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        })
        .then(response => response.json())
        .then(data => {
            displayTask(data);
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter both title and description.');
    }
}

function displayTask(task) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('div');
    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description || ''}</p>
        <p>Completed: ${task.completed ? 'Yes' : 'No'}</p>
        <button onclick="updateTask(${task.id})">Update</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

function updateTask(taskId) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
    .then(response => response.json())
    .then(data => {
        displayTask(data);
    })
    .catch(error => console.error('Error:', error));
}

function deleteTask(taskId) {
    fetch(`/tasks/${taskId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 200) {
            displayTaskList();
        }
    })
    .catch(error => console.error('Error:', error));
}

function displayTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear existing tasks

    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach(task => displayTask(task));
        })
        .catch(error => console.error('Error:', error));
}

searchTasks(); // Initial search on page load