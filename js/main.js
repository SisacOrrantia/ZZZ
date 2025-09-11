// JavaScript principal - main.js

// Estado de la aplicación
const AppState = {
    counter: 0,
    todos: []
};

// Elementos del DOM
const elements = {
    // Contador
    counterValue: null,
    incrementBtn: null,
    decrementBtn: null,
    resetBtn: null,
    
    // Todos
    todoInput: null,
    addTodoBtn: null,
    todoList: null,
    
    // Información
    currentDate: null,
    currentTime: null,
    browserInfo: null
};

/**
 * Inicializar la aplicación
 */
function init() {
    // Obtener elementos del DOM
    getElements();
    
    // Cargar datos guardados
    loadSavedData();
    
    // Configurar eventos
    setupEvents();
    
    // Actualizar información del usuario
    updateUserInfo();
    
    // Actualizar interfaz
    updateCounter();
    renderTodos();
    
    console.log('✅ Aplicación inicializada correctamente');
}

/**
 * Obtener referencias a elementos del DOM
 */
function getElements() {
    // Contador
    elements.counterValue = document.getElementById('counterValue');
    elements.incrementBtn = document.getElementById('incrementBtn');
    elements.decrementBtn = document.getElementById('decrementBtn');
    elements.resetBtn = document.getElementById('resetBtn');
    
    // Todos
    elements.todoInput = document.getElementById('todoInput');
    elements.addTodoBtn = document.getElementById('addTodoBtn');
    elements.todoList = document.getElementById('todoList');
    
    // Información
    elements.currentDate = document.getElementById('currentDate');
    elements.currentTime = document.getElementById('currentTime');
    elements.browserInfo = document.getElementById('browserInfo');
}

/**
 * Cargar datos guardados del localStorage
 */
function loadSavedData() {
    AppState.counter = getFromStorage('counter', 0);
    AppState.todos = getFromStorage('todos', []);
}

/**
 * Configurar eventos de la aplicación
 */
function setupEvents() {
    // Eventos del contador
    addEvent(elements.incrementBtn, 'click', incrementCounter);
    addEvent(elements.decrementBtn, 'click', decrementCounter);
    addEvent(elements.resetBtn, 'click', resetCounter);
    
    // Eventos de todos
    addEvent(elements.addTodoBtn, 'click', addTodo);
    addEvent(elements.todoInput, 'keypress', handleTodoKeypress);
    
    // Actualizar hora cada segundo
    setInterval(updateTime, 1000);
}

// ===== FUNCIONALIDAD DEL CONTADOR =====

/**
 * Incrementar contador
 */
function incrementCounter() {
    AppState.counter++;
    updateCounter();
    saveToStorage('counter', AppState.counter);
    showNotification(`Contador incrementado: ${AppState.counter}`, 'success');
}

/**
 * Decrementar contador
 */
function decrementCounter() {
    AppState.counter--;
    updateCounter();
    saveToStorage('counter', AppState.counter);
    showNotification(`Contador decrementado: ${AppState.counter}`, 'info');
}

/**
 * Resetear contador
 */
function resetCounter() {
    AppState.counter = 0;
    updateCounter();
    saveToStorage('counter', AppState.counter);
    showNotification('Contador reseteado', 'warning');
}

/**
 * Actualizar display del contador
 */
function updateCounter() {
    if (elements.counterValue) {
        elements.counterValue.textContent = AppState.counter;
        
        // Cambiar color según el valor
        if (AppState.counter > 0) {
            elements.counterValue.style.color = '#28a745';
        } else if (AppState.counter < 0) {
            elements.counterValue.style.color = '#dc3545';
        } else {
            elements.counterValue.style.color = '#667eea';
        }
    }
}

// ===== FUNCIONALIDAD DE TODOS =====

/**
 * Agregar nueva tarea
 */
function addTodo() {
    const text = elements.todoInput.value.trim();
    
    if (isEmpty(text)) {
        showNotification('Por favor escribe una tarea', 'error');
        return;
    }
    
    const todo = {
        id: generateId(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    AppState.todos.push(todo);
    elements.todoInput.value = '';
    
    renderTodos();
    saveToStorage('todos', AppState.todos);
    showNotification('Tarea agregada correctamente', 'success');
}

/**
 * Manejar tecla presionada en input de todo
 */
function handleTodoKeypress(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
}

/**
 * Alternar estado completado de una tarea
 */
function toggleTodo(id) {
    const todo = AppState.todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        saveToStorage('todos', AppState.todos);
        
        const message = todo.completed ? 'Tarea completada' : 'Tarea marcada como pendiente';
        const type = todo.completed ? 'success' : 'info';
        showNotification(message, type);
    }
}

/**
 * Eliminar tarea
 */
function deleteTodo(id) {
    const index = AppState.todos.findIndex(t => t.id === id);
    if (index !== -1) {
        AppState.todos.splice(index, 1);
        renderTodos();
        saveToStorage('todos', AppState.todos);
        showNotification('Tarea eliminada', 'warning');
    }
}

/**
 * Renderizar lista de tareas
 */
function renderTodos() {
    if (!elements.todoList) return;
    
    elements.todoList.innerHTML = '';
    
    if (AppState.todos.length === 0) {
        const emptyMessage = createElement('li', {
            className: 'todo-item',
            style: 'text-align: center; font-style: italic; opacity: 0.6;'
        }, 'No hay tareas. ¡Agrega una nueva!');
        
        elements.todoList.appendChild(emptyMessage);
        return;
    }
    
    AppState.todos.forEach(todo => {
        const todoItem = createElement('li', {
            className: `todo-item ${todo.completed ? 'completed' : ''}`
        });
        
        const todoText = createElement('span', {
            className: 'todo-text'
        }, todo.text);
        
        const actionsContainer = createElement('div', {
            className: 'todo-actions',
            style: 'display: flex; gap: 0.5rem;'
        });
        
        const toggleBtn = createElement('button', {
            className: `btn ${todo.completed ? 'btn-secondary' : 'btn-primary'}`,
            style: 'font-size: 0.8rem; padding: 0.3rem 0.6rem;'
        }, todo.completed ? 'Deshacer' : 'Completar');
        
        const deleteBtn = createElement('button', {
            className: 'btn btn-danger'
        }, 'Eliminar');
        
        // Eventos
        addEvent(toggleBtn, 'click', () => toggleTodo(todo.id));
        addEvent(deleteBtn, 'click', () => deleteTodo(todo.id));
        
        // Ensamblar elemento
        actionsContainer.appendChild(toggleBtn);
        actionsContainer.appendChild(deleteBtn);
        
        todoItem.appendChild(todoText);
        todoItem.appendChild(actionsContainer);
        
        elements.todoList.appendChild(todoItem);
    });
}

// ===== INFORMACIÓN DEL USUARIO =====

/**
 * Actualizar información del usuario
 */
function updateUserInfo() {
    updateDate();
    updateTime();
    updateBrowserInfo();
}

/**
 * Actualizar fecha actual
 */
function updateDate() {
    if (elements.currentDate) {
        elements.currentDate.textContent = formatDate();
    }
}

/**
 * Actualizar hora actual
 */
function updateTime() {
    if (elements.currentTime) {
        elements.currentTime.textContent = formatTime();
    }
}

/**
 * Actualizar información del navegador
 */
function updateBrowserInfo() {
    if (elements.browserInfo) {
        elements.browserInfo.textContent = getBrowserInfo();
    }
}

// ===== EVENTOS GLOBALES =====

/**
 * Manejar errores globales
 */
window.addEventListener('error', function(event) {
    console.error('Error global:', event.error);
    showNotification('Ha ocurrido un error inesperado', 'error');
});

/**
 * Manejar cambios de visibilidad de la página
 */
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // La página se volvió visible, actualizar información
        updateUserInfo();
    }
});

/**
 * Manejar el evento de carga del DOM
 */
document.addEventListener('DOMContentLoaded', init);

// ===== FUNCIONES DE DEMOSTRACIÓN =====

/**
 * Función de demostración para mostrar capacidades
 */
function demoFunction() {
    console.log('🚀 Demostración de JavaScript vanilla');
    console.log('Estado actual:', AppState);
    console.log('Elementos del DOM:', elements);
    
    // Ejemplo de uso de utilidades
    const demoDate = formatDate();
    const demoTime = formatTime();
    const demoBrowser = getBrowserInfo();
    
    console.log(`Fecha: ${demoDate}`);
    console.log(`Hora: ${demoTime}`);
    console.log(`Navegador: ${demoBrowser}`);
}

// Exportar función para debugging (disponible en la consola)
window.demoFunction = demoFunction;
window.AppState = AppState;

console.log('📝 JavaScript cargado. Usa demoFunction() para ver capacidades.');
