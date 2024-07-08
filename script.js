document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todoForm');
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const categorySelect = document.getElementById('categorySelect');
    const taskList = document.getElementById('taskList');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskPriority = prioritySelect.value;
        const taskCategory = categorySelect.value;

        const taskItem = createTaskElement(taskText, taskPriority, taskCategory);
        taskList.appendChild(taskItem);

        saveTaskToLocalStorage(taskText, taskPriority, taskCategory);

        taskInput.value = '';
    });

    function createTaskElement(taskText, taskPriority, taskCategory) {
        const li = document.createElement('li');
        li.classList.add('task-item', `priority-${taskPriority}`);
        
        const taskContent = document.createElement('div');
        taskContent.textContent = taskText;
        li.appendChild(taskContent);

        const taskDetails = document.createElement('div');
        taskDetails.textContent = `Category: ${taskCategory}`;
        li.appendChild(taskDetails);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function() {
            li.remove();
            removeTaskFromLocalStorage(taskText, taskPriority, taskCategory);
        });
        li.appendChild(deleteButton);

        return li;
    }

    function saveTaskToLocalStorage(taskText, taskPriority, taskCategory) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, priority: taskPriority, category: taskCategory });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function removeTaskFromLocalStorage(taskText, taskPriority, taskCategory) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => !(task.text === taskText && task.priority === taskPriority && task.category === taskCategory));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text, task.priority, task.category);
            taskList.appendChild(taskItem);
        });
    }

    loadTasksFromLocalStorage();
});
