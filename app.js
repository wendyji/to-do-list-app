// Get elements from the DOM
const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('todo-input');
const taskList = document.getElementById('todo-list');

// Filter buttons
const filterAllButton = document.getElementById('filter-all');
const filterActiveButton = document.getElementById('filter-active');
const filterCompletedButton = document.getElementById('filter-completed');

// Function to add a task
function addTask() {
    const taskText = taskInput.value;  // Get the task text from the input field

    // Check if the input is empty
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new list item (li)
    const li = document.createElement('li');

    // Create a checkbox for marking task as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', saveTasks); // Update storage when the checkbox changes

    // Create a span to hold the task text
    const span = document.createElement('span');
    span.textContent = taskText;  // Assign the input value (taskText) correctly

    // Create a button to remove the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Delete';
    removeButton.addEventListener('click', removeTask);

    // Append the checkbox, span, and remove button to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Save the task in localStorage
    saveTasks();

    // Clear the input field
    taskInput.value = '';
}

// Function to remove a task
function removeTask(e) {
    const li = e.target.parentElement;
    taskList.removeChild(li);
    saveTasks();
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('span').textContent;
        const completed = li.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Function to filter tasks
function filterTasks(status) {
    const allTasks = taskList.querySelectorAll('li');

    allTasks.forEach(task => {
        const completed = task.querySelector('input[type="checkbox"]').checked;

        // Show all tasks
        if (status === 'all') {
            task.style.display = 'flex';
        }

        // Show only active (incomplete) tasks
        if (status === 'active') {
            task.style.display = completed ? 'none' : 'flex';
        }

        // Show only completed tasks
        if (status === 'completed') {
            task.style.display = completed ? 'flex' : 'none';
        }
    });
}

// Add event listeners for filtering
filterAllButton.addEventListener('click', () => filterTasks('all'));
filterActiveButton.addEventListener('click', () => filterTasks('active'));
filterCompletedButton.addEventListener('click', () => filterTasks('completed'));

// Add event listener to the "Add Task" button
addTaskButton.addEventListener('click', addTask);

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadTasks);
