// Utilidades compartidas entre frontend y backend

// Validadores
export const validators = {
  email: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },
  
  required: (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },
  
  minLength: (value, min) => {
    return value && value.toString().length >= min;
  },
  
  maxLength: (value, max) => {
    return value && value.toString().length <= max;
  }
};

// Constantes compartidas
export const constants = {
  API_ENDPOINTS: {
    USERS: '/api/users',
    HEALTH: '/api/health'
  },
  
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },
  
  VALIDATION_MESSAGES: {
    REQUIRED: 'Este campo es requerido',
    INVALID_EMAIL: 'Email no válido',
    MIN_LENGTH: 'Mínimo {min} caracteres',
    MAX_LENGTH: 'Máximo {max} caracteres'
  }
};

// Funciones de utilidad
export const utils = {
  formatDate: (date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  },
  
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },
  
  slugify: (str) => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};
