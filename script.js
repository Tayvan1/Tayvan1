document.addEventListener('DOMContentLoaded', () => {
    showLogin();
});

function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (password === 'TAYVAN') {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('main-section').classList.remove('hidden');
        loadTasks();
        showStart();
    } else {
        alert('Senha incorreta!');
    }
}

function showStart() {
    document.getElementById('start-section').classList.remove('hidden');
    document.getElementById('config-section').classList.add('hidden');
    document.getElementById('goals-section').classList.add('hidden');
    loadAgenda();
}

function showConfig() {
    document.getElementById('start-section').classList.add('hidden');
    document.getElementById('config-section').classList.remove('hidden');
    document.getElementById('goals-section').classList.add('hidden');
    loadTasks();
}

function showGoals() {
    document.getElementById('start-section').classList.add('hidden');
    document.getElementById('config-section').classList.add('hidden');
    document.getElementById('goals-section').classList.remove('hidden');
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const daySelect = document.getElementById('day-select');
    const task = taskInput.value;
    const day = daySelect.value;

    if (task) {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        tasks.push({ task, completed: false });
        localStorage.setItem(day, JSON.stringify(tasks));
        taskInput.value = '';
        loadTasks();
    }
}

function loadTasks() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const container = document.getElementById('days-container');
    container.innerHTML = '';

    days.forEach(day => {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const dayTitle = document.createElement('h3');
        dayTitle.textContent = capitalize(day);
        dayDiv.appendChild(dayTitle);
        tasks.forEach((taskObj, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.textContent = taskObj.task;
            if (taskObj.completed) {
                taskDiv.classList.add('completed');
            }
            taskDiv.appendChild(createDeleteButton(day, index));
            dayDiv.appendChild(taskDiv);
        });
        container.appendChild(dayDiv);
    });
}

function loadAgenda() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const container = document.getElementById('agenda-container');
    container.innerHTML = '';

    days.forEach(day => {
        const tasks = JSON.parse(localStorage.getItem(day)) || [];
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const dayTitle = document.createElement('h3');
        dayTitle.textContent = capitalize(day);
        dayDiv.appendChild(dayTitle);
        tasks.forEach((taskObj, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            taskDiv.textContent = taskObj.task;
            if (taskObj.completed) {
                taskDiv.classList.add('completed');
            }
            taskDiv.addEventListener('click', () => toggleTaskCompletion(day, index));
            dayDiv.appendChild(taskDiv);
        });
        container.appendChild(dayDiv);
    });
}

function toggleTaskCompletion(day, index) {
    const tasks = JSON.parse(localStorage.getItem(day));
   
