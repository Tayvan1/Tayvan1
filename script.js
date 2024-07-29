document.addEventListener('DOMContentLoaded', () => {
    showStart();
});

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
    const timeSelect = document.getElementById('time-select');
    const task = taskInput.value;
    const day = daySelect.value;
    const time = timeSelect.value;

    if (task && time) {
        const tasks = JSON.parse(localStorage.getItem(day)) || {};
        if (!tasks[time]) {
            tasks[time] = [];
        }
        tasks[time].push({ task, completed: false });
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
        const tasks = JSON.parse(localStorage.getItem(day)) || {};
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const dayTitle = document.createElement('h3');
        dayTitle.textContent = capitalize(day);
        dayDiv.appendChild(dayTitle);
        Object.keys(tasks).forEach(time => {
            const timeDiv = document.createElement('div');
            timeDiv.textContent = time;
            tasks[time].forEach((taskObj, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.textContent = taskObj.task;
                if (taskObj.completed) {
                    taskDiv.classList.add('completed');
                }
                taskDiv.appendChild(createDeleteButton(day, time, index));
                timeDiv.appendChild(taskDiv);
            });
            dayDiv.appendChild(timeDiv);
        });
        container.appendChild(dayDiv);
    });
}

function loadAgenda() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const container = document.getElementById('agenda-container');
    container.innerHTML = '';

    days.forEach(day => {
        const tasks = JSON.parse(localStorage.getItem(day)) || {};
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        const dayTitle = document.createElement('h3');
        dayTitle.textContent = capitalize(day);
        dayDiv.appendChild(dayTitle);
        Object.keys(tasks).forEach(time => {
            const timeDiv = document.createElement('div');
            timeDiv.textContent = time;
            tasks[time].forEach((taskObj, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.textContent = taskObj.task;
                if (taskObj.completed) {
                    taskDiv.classList.add('completed');
                }
                taskDiv.addEventListener('click', () => toggleTaskCompletion(day, time, index));
                timeDiv.appendChild(taskDiv);
            });
            dayDiv.appendChild(timeDiv);
        });
        container.appendChild(dayDiv);
    });
}

function toggleTaskCompletion(day, time, index) {
    const tasks = JSON.parse(localStorage.getItem(day));
    tasks[time][index].completed = !tasks[time][index].completed;
    localStorage.setItem(day, JSON.stringify(tasks));
    loadAgenda();
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
}

function saveAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yPosition = 10;

    const days = ['Segunda', 'Terça', '
function saveAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let yPosition = 10;

    const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
    const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    days.forEach((day, dayIndex) => {
        doc.text(day, 10, yPosition);
        yPosition += 10;

        const tasks = JSON.parse(localStorage.getItem(dayKeys[dayIndex])) || {};
        Object.keys(tasks).forEach(time => {
            doc.text(time, 20, yPosition);
            yPosition += 10;

            tasks[time].forEach(task => {
                const taskStatus = task.completed ? '[X] ' : '[ ] ';
                doc.text(taskStatus + task.task, 30, yPosition);
                yPosition += 10;
            });

            yPosition += 10; // extra space between hours
        });

        yPosition += 10; // extra space between days
    });

    doc.save('agenda.pdf');
}

function createDeleteButton(day, time, index) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = () => {
        deleteTask(day, time, index);
    };
    return button;
}

function deleteTask(day, time, index) {
    const tasks = JSON.parse(localStorage.getItem(day));
    tasks[time].splice(index, 1);
    if (tasks[time].length === 0) {
        delete tasks[time];
    }
    localStorage.setItem(day, JSON.stringify(tasks));
    loadTasks();
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
