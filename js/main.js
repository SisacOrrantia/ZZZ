/**
 * Simulador de Día Completo - Sistema Principal
 * Coordina los 3 perfiles y la simulación de tiempo en tiempo real
 */

import { TimeSimulator } from './utils/timeSimulator.js';
import { AdultoMayor } from './profiles/adultoMayor.js';
import { JovenGym } from './profiles/jovenGym.js';
import { GamerLoL } from './profiles/gamerLoL.js';

class DaySimulator {
    constructor() {
        // Inicializar simulador de tiempo
        this.timeSimulator = new TimeSimulator();
        
        // Inicializar perfiles
        this.adultoMayor = new AdultoMayor();
        this.jovenGym = new JovenGym();
        this.gamerLoL = new GamerLoL();
        
        // Estados de la simulación
        this.isRunning = false;
        this.currentDay = 1;
        this.totalActivitiesCompleted = 0;
        
        // Referencias DOM
        this.initializeDOMReferences();
        
        // Configurar eventos
        this.setupEventListeners();
        
        // Configurar callback del tiempo
        this.timeSimulator.onTimeUpdate(this.onTimeUpdate.bind(this));
        
        // Actualización inicial
        this.updateDisplay();
    }

    /**
     * Inicializa referencias DOM
     */
    initializeDOMReferences() {
        // Controles principales
        this.startBtn = document.getElementById('startBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.speedRange = document.getElementById('speedRange');
        this.speedDisplay = document.getElementById('speedDisplay');
        this.simulatedTime = document.getElementById('simulatedTime');
        
        // Stats generales
        this.realTimeElapsed = document.getElementById('realTimeElapsed');
        this.simulatedDay = document.getElementById('simulatedDay');
        this.completedActivities = document.getElementById('completedActivities');
        
        // Adulto Mayor
        this.statusAdulto = document.getElementById('statusAdulto');
        this.activityAdulto = document.getElementById('activityAdulto');
        this.nextActivityAdulto = document.getElementById('nextActivityAdulto');
        this.scheduleAdulto = document.getElementById('scheduleAdulto');
        
        // Joven Gym
        this.statusJoven = document.getElementById('statusJoven');
        this.activityJoven = document.getElementById('activityJoven');
        this.nextActivityJoven = document.getElementById('nextActivityJoven');
        this.scheduleJoven = document.getElementById('scheduleJoven');
        
        // Gamer LoL
        this.statusGamer = document.getElementById('statusGamer');
        this.activityGamer = document.getElementById('activityGamer');
        this.nextActivityGamer = document.getElementById('nextActivityGamer');
        this.scheduleGamer = document.getElementById('scheduleGamer');
        this.rageLevel = document.getElementById('rageLevel');
        this.rageText = document.getElementById('rageText');
    }

    /**
     * Configura event listeners
     */
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startSimulation());
        this.pauseBtn.addEventListener('click', () => this.pauseSimulation());
        this.resetBtn.addEventListener('click', () => this.resetSimulation());
        
        this.speedRange.addEventListener('input', (e) => {
            const speed = parseInt(e.target.value);
            this.timeSimulator.setSpeed(speed);
            this.speedDisplay.textContent = `${speed}x`;
        });
    }

    /**
     * Inicia la simulación
     */
    startSimulation() {
        this.timeSimulator.start();
        this.isRunning = true;
        
        this.startBtn.disabled = true;
        this.pauseBtn.disabled = false;
        
        console.log('Simulación iniciada');
    }

    /**
     * Pausa la simulación
     */
    pauseSimulation() {
        this.timeSimulator.pause();
        this.isRunning = false;
        
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        console.log('Simulación pausada');
    }

    /**
     * Reinicia la simulación
     */
    resetSimulation() {
        this.timeSimulator.reset();
        
        // Reiniciar perfiles
        this.adultoMayor.reset();
        this.jovenGym.reset();
        this.gamerLoL.reset();
        
        // Reiniciar estados
        this.isRunning = false;
        this.currentDay = 1;
        this.totalActivitiesCompleted = 0;
        
        // Reiniciar controles
        this.startBtn.disabled = false;
        this.pauseBtn.disabled = true;
        
        // Actualizar display
        this.updateDisplay();
        
        console.log('Simulación reiniciada');
    }

    /**
     * Callback cuando el tiempo se actualiza
     */
    onTimeUpdate(timeData) {
        // Actualizar perfiles con el nuevo tiempo
        const adultoStatus = this.adultoMayor.update(timeData.currentMinutes);
        const jovenStatus = this.jovenGym.update(timeData.currentMinutes);
        const gamerStatus = this.gamerLoL.update(timeData.currentMinutes);
        
        // Calcular actividades totales completadas
        this.totalActivitiesCompleted = 
            adultoStatus.stats.completedActivities +
            jovenStatus.stats.completedActivities +
            gamerStatus.stats.completedActivities;
        
        // Actualizar display
        this.updateDisplay(timeData, adultoStatus, jovenStatus, gamerStatus);
    }

    /**
     * Actualiza toda la interfaz
     */
    updateDisplay(timeData = null, adultoStatus = null, jovenStatus = null, gamerStatus = null) {
        // Usar datos actuales si no se proporcionan
        if (!timeData) {
            timeData = {
                currentTime: this.timeSimulator.getCurrentTime(),
                realTimeElapsed: this.timeSimulator.getRealTimeElapsed()
            };
        }
        
        if (!adultoStatus) adultoStatus = this.adultoMayor.getStatus();
        if (!jovenStatus) jovenStatus = this.jovenGym.getStatus();
        if (!gamerStatus) gamerStatus = this.gamerLoL.getStatus();
        
        // Actualizar tiempo y stats generales
        this.updateGeneralStats(timeData);
        
        // Actualizar cada perfil
        this.updateAdultoMayorDisplay(adultoStatus);
        this.updateJovenGymDisplay(jovenStatus);
        this.updateGamerDisplay(gamerStatus);
    }

    /**
     * Actualiza estadísticas generales
     */
    updateGeneralStats(timeData) {
        this.simulatedTime.textContent = timeData.currentTime;
        this.realTimeElapsed.textContent = timeData.realTimeElapsed;
        this.simulatedDay.textContent = this.currentDay;
        this.completedActivities.textContent = this.totalActivitiesCompleted;
    }

    /**
     * Actualiza display del Adulto Mayor
     */
    updateAdultoMayorDisplay(status) {
        this.statusAdulto.textContent = status.currentActivity.name;
        this.activityAdulto.textContent = `${status.currentActivity.emoji} ${status.currentActivity.name}`;
        this.nextActivityAdulto.textContent = `${status.nextActivity.emoji} ${status.nextActivity.name} (${status.nextActivity.time})`;
        
        // Actualizar clase de estado
        const card = document.getElementById('adultoMayor');
        card.className = `profile-card ${status.currentActivity.status}`;
        
        // Actualizar lista de actividades
        this.updateScheduleList(this.scheduleAdulto, status.schedule);
    }

    /**
     * Actualiza display del Joven Gym
     */
    updateJovenGymDisplay(status) {
        this.statusJoven.textContent = status.currentActivity.name;
        this.activityJoven.textContent = `${status.currentActivity.emoji} ${status.currentActivity.name}`;
        this.nextActivityJoven.textContent = `${status.nextActivity.emoji} ${status.nextActivity.name} (${status.nextActivity.time})`;
        
        // Actualizar clase de estado con intensidad
        const card = document.getElementById('jovenGym');
        const intensity = status.currentActivity.intensity || 'low';
        card.className = `profile-card ${status.currentActivity.status} intensity-${intensity}`;
        
        // Actualizar lista de actividades
        this.updateScheduleList(this.scheduleJoven, status.schedule);
    }

    /**
     * Actualiza display del Gamer
     */
    updateGamerDisplay(status) {
        this.statusGamer.textContent = status.currentActivity.name;
        this.activityGamer.textContent = `${status.currentActivity.emoji} ${status.currentActivity.name}`;
        this.nextActivityGamer.textContent = `${status.nextActivity.emoji} ${status.nextActivity.name} (${status.nextActivity.time})`;
        
        // Actualizar barra de rage
        const ragePercentage = status.stats.rageLevel;
        this.rageLevel.style.width = `${ragePercentage}%`;
        this.rageLevel.style.backgroundColor = this.gamerLoL.getRageColor();
        this.rageText.textContent = status.stats.rageDescription;
        
        // Actualizar clase de estado con mood
        const card = document.getElementById('gamerLoL');
        const mood = status.currentActivity.mood || 'neutral';
        card.className = `profile-card ${status.currentActivity.status} mood-${mood}`;
        
        // Actualizar lista de actividades
        this.updateScheduleList(this.scheduleGamer, status.schedule);
    }

    /**
     * Actualiza una lista de horarios
     */
    updateScheduleList(listElement, schedule) {
        if (!listElement) return;
        
        // Generar HTML para la lista
        const listHTML = schedule.map(activity => {
            let className = '';
            if (activity.isCompleted) className = 'completed';
            if (activity.isCurrent) className = 'current';
            
            return `<li class="${className}">${activity.time} - ${activity.activity}</li>`;
        }).join('');
        
        listElement.innerHTML = listHTML;
    }

    /**
     * Obtiene estadísticas detalladas de la simulación
     */
    getDetailedStats() {
        return {
            simulation: {
                currentTime: this.timeSimulator.getCurrentTime(),
                realTimeElapsed: this.timeSimulator.getRealTimeElapsed(),
                currentDay: this.currentDay,
                isRunning: this.isRunning
            },
            adultoMayor: this.adultoMayor.getStatus(),
            jovenGym: this.jovenGym.getStatus(),
            gamerLoL: this.gamerLoL.getStatus()
        };
    }

    /**
     * Exporta datos de la simulación para análisis
     */
    exportSimulationData() {
        const data = this.getDetailedStats();
        const jsonData = JSON.stringify(data, null, 2);
        
        // Crear y descargar archivo
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `simulacion-dia-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Inicializar simulador cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando Simulador de Día Completo');
    
    const simulator = new DaySimulator();
    
    // Hacer disponible globalmente para debugging
    window.simulator = simulator;
    
    console.log('✅ Simulador listo');
    console.log('Controles disponibles:');
    console.log('- simulator.startSimulation()');
    console.log('- simulator.pauseSimulation()');
    console.log('- simulator.resetSimulation()');
    console.log('- simulator.exportSimulationData()');
});
