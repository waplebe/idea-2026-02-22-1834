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
    const tas