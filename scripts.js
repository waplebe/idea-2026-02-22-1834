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
        <button onclick="completeTask(${task.id})">Complete</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

function completeTask(taskId) {
    fetch(`/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ completed: true })
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
            displayTasks();
        }
    })
    .catch(error => console.error('Error:', error));
}

function searchTasks() {
    const query = document.getElementById('search-input').value;
    fetch(`/tasks/search?query=${query}`)
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Clear existing tasks
            data.forEach(task => displayTask(task));
        })
        .catch(error => console.error('Error:', error));
}