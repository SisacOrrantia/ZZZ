// Utilidades JavaScript - utils.js

/**
 * Formatear fecha a string legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Fecha formateada
 */
function formatDate(date = new Date()) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Formatear hora a string legible
 * @param {Date} date - Fecha a formatear
 * @returns {string} - Hora formateada
 */
function formatTime(date = new Date()) {
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    };
    return date.toLocaleTimeString('es-ES', options);
}

/**
 * Obtener información del navegador
 * @returns {string} - Información del navegador
 */
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    let browserName = "Desconocido";
    
    if (userAgent.indexOf("Chrome") > -1) {
        browserName = "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        browserName = "Safari";
    } else if (userAgent.indexOf("Firefox") > -1) {
        browserName = "Mozilla Firefox";
    } else if (userAgent.indexOf("Edge") > -1) {
        browserName = "Microsoft Edge";
    }
    
    return browserName;
}

/**
 * Generar ID único
 * @returns {string} - ID único
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Validar si una cadena está vacía o solo contiene espacios
 * @param {string} str - Cadena a validar
 * @returns {boolean} - true si está vacía
 */
function isEmpty(str) {
    return !str || str.trim().length === 0;
}

/**
 * Capitalizar primera letra
 * @param {string} str - Cadena a capitalizar
 * @returns {string} - Cadena capitalizada
 */
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Debounce function - retrasa la ejecución de una función
 * @param {Function} func - Función a ejecutar
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} - Función con debounce
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Guardar en localStorage de forma segura
 * @param {string} key - Clave
 * @param {any} value - Valor a guardar
 */
function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error guardando en localStorage:', error);
    }
}

/**
 * Obtener de localStorage de forma segura
 * @param {string} key - Clave
 * @param {any} defaultValue - Valor por defecto
 * @returns {any} - Valor obtenido o valor por defecto
 */
function getFromStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error('Error obteniendo de localStorage:', error);
        return defaultValue;
    }
}

/**
 * Crear elemento HTML con atributos
 * @param {string} tagName - Nombre del elemento
 * @param {Object} attributes - Atributos del elemento
 * @param {string} textContent - Contenido de texto
 * @returns {HTMLElement} - Elemento creado
 */
function createElement(tagName, attributes = {}, textContent = '') {
    const element = document.createElement(tagName);
    
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    if (textContent) {
        element.textContent = textContent;
    }
    
    return element;
}

/**
 * Agregar evento con manejo seguro
 * @param {HTMLElement} element - Elemento
 * @param {string} event - Tipo de evento
 * @param {Function} handler - Manejador del evento
 */
function addEvent(element, event, handler) {
    if (element && typeof handler === 'function') {
        element.addEventListener(event, handler);
    }
}

/**
 * Mostrar notificación simple
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = createElement('div', {
        className: `notification notification-${type}`,
        style: `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            word-wrap: break-word;
        `
    }, message);
    
    // Estilos según el tipo
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#667eea',
        warning: '#ffc107'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 3000);
}

// Agregar estilos de animación para las notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
