/**
 * Simulador de Tiempo - Convierte 24 horas reales en 5-10 minutos de simulación
 * Velocidad configurable: 1x = 10 minutos, 5x = 2 minutos para simular un día completo
 */

export class TimeSimulator {
    constructor() {
        // Configuración base: 10 minutos = 24 horas (1440 minutos reales)
        // Esto significa que 1 segundo real = 2.4 minutos simulados
        this.baseSpeed = 144; // Multiplicador base (1440/10)
        this.currentSpeed = 3; // Velocidad seleccionada (1-5)
        this.isRunning = false;
        this.isPaused = false;
        
        // Tiempo simulado en minutos desde las 00:00
        this.simulatedMinutes = 6 * 60; // Empezamos a las 06:00
        this.startTime = null;
        this.pausedTime = 0;
        
        this.callbacks = [];
        this.intervalId = null;
    }

    /**
     * Inicia la simulación
     */
    start() {
        if (this.isRunning && !this.isPaused) return;
        
        this.isRunning = true;
        this.isPaused = false;
        this.startTime = Date.now() - this.pausedTime;
        
        // Actualizar cada 100ms para suavidad visual
        this.intervalId = setInterval(() => {
            this.update();
        }, 100);
        
        console.log('Simulación iniciada');
    }

    /**
     * Pausa la simulación
     */
    pause() {
        if (!this.isRunning || this.isPaused) return;
        
        this.isPaused = true;
        this.pausedTime = Date.now() - this.startTime;
        clearInterval(this.intervalId);
        
        console.log('Simulación pausada');
    }

    /**
     * Reinicia la simulación
     */
    reset() {
        this.isRunning = false;
        this.isPaused = false;
        this.simulatedMinutes = 6 * 60; // Volver a las 06:00
        this.startTime = null;
        this.pausedTime = 0;
        
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        
        this.notifyCallbacks();
        console.log('Simulación reiniciada');
    }

    /**
     * Actualiza el tiempo simulado basado en el tiempo real transcurrido
     */
    update() {
        if (!this.isRunning || this.isPaused) return;
        
        const now = Date.now();
        const realElapsed = (now - this.startTime) / 1000; // segundos reales
        
        // Calcular minutos simulados basados en velocidad
        const speedMultiplier = this.baseSpeed * this.currentSpeed;
        const simulatedElapsed = realElapsed * (speedMultiplier / 60); // convertir a minutos simulados
        
        this.simulatedMinutes = (6 * 60) + simulatedElapsed; // Empezar desde las 06:00
        
        // Si completamos un día (24 horas), reiniciar
        if (this.simulatedMinutes >= 24 * 60) {
            this.simulatedMinutes = 0; // Volver a las 00:00
            this.startTime = now; // Reiniciar contador
        }
        
        this.notifyCallbacks();
    }

    /**
     * Cambia la velocidad de simulación
     * @param {number} speed - Velocidad de 1 a 5
     */
    setSpeed(speed) {
        if (speed >= 1 && speed <= 5) {
            this.currentSpeed = speed;
            console.log(`Velocidad cambiada a ${speed}x`);
        }
    }

    /**
     * Obtiene la hora actual simulada en formato HH:MM
     * @returns {string}
     */
    getCurrentTime() {
        const hours = Math.floor(this.simulatedMinutes / 60) % 24;
        const minutes = Math.floor(this.simulatedMinutes % 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    /**
     * Obtiene los minutos simulados totales
     * @returns {number}
     */
    getCurrentMinutes() {
        return this.simulatedMinutes;
    }

    /**
     * Obtiene el tiempo real transcurrido en formato MM:SS
     * @returns {string}
     */
    getRealTimeElapsed() {
        if (!this.startTime) return '0:00';
        
        const elapsed = this.isPaused ? 
            this.pausedTime : 
            (Date.now() - this.startTime);
        
        const seconds = Math.floor(elapsed / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    /**
     * Verifica si una hora específica ya pasó
     * @param {string} time - Hora en formato "HH:MM"
     * @returns {boolean}
     */
    hasTimePassed(time) {
        const [hours, minutes] = time.split(':').map(Number);
        const targetMinutes = hours * 60 + minutes;
        return this.simulatedMinutes >= targetMinutes;
    }

    /**
     * Verifica si estamos en un rango de tiempo específico
     * @param {string} startTime - Hora inicio "HH:MM"
     * @param {string} endTime - Hora fin "HH:MM"
     * @returns {boolean}
     */
    isInTimeRange(startTime, endTime) {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;
        
        // Manejar casos donde el rango cruza medianoche
        if (endTotalMinutes < startTotalMinutes) {
            return this.simulatedMinutes >= startTotalMinutes || 
                   this.simulatedMinutes <= endTotalMinutes;
        }
        
        return this.simulatedMinutes >= startTotalMinutes && 
               this.simulatedMinutes <= endTotalMinutes;
    }

    /**
     * Registra callback para notificaciones de cambio de tiempo
     * @param {Function} callback
     */
    onTimeUpdate(callback) {
        this.callbacks.push(callback);
    }

    /**
     * Notifica a todos los callbacks registrados
     */
    notifyCallbacks() {
        const timeData = {
            currentTime: this.getCurrentTime(),
            currentMinutes: this.getCurrentMinutes(),
            realTimeElapsed: this.getRealTimeElapsed(),
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            speed: this.currentSpeed
        };
        
        this.callbacks.forEach(callback => callback(timeData));
    }

    /**
     * Estado actual del simulador
     * @returns {Object}
     */
    getState() {
        return {
            isRunning: this.isRunning,
            isPaused: this.isPaused,
            currentTime: this.getCurrentTime(),
            speed: this.currentSpeed
        };
    }
}
