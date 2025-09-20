/**
 * Perfil: Adulto Mayor - Rutina tradicional de ama de casa
 * Horarios: Despertar 6am, labores domésticas, dormir 10:30pm
 */

export class AdultoMayor {
    constructor() {
        this.name = "Adulta Mayor";
        this.emoji = "👵";
        this.currentActivity = "Durmiendo";
        this.currentStatus = "sleeping";
        
        // Rutina diaria con actividades específicas
        this.schedule = [
            { time: "06:00", activity: "Despertar", emoji: "🌅", duration: 15, status: "waking" },
            { time: "06:15", activity: "Aseo personal", emoji: "🚿", duration: 30, status: "personal_care" },
            { time: "06:45", activity: "Tender la cama", emoji: "🛏️", duration: 15, status: "housework" },
            { time: "07:00", activity: "Atender al esposo", emoji: "☕", duration: 45, status: "care_giving" },
            { time: "07:45", activity: "Preparar desayuno", emoji: "🍳", duration: 30, status: "cooking" },
            { time: "08:15", activity: "Desayunar", emoji: "🥐", duration: 30, status: "eating" },
            { time: "08:45", activity: "Lavar platos", emoji: "🧽", duration: 20, status: "cleaning" },
            { time: "09:05", activity: "Barrer la casa", emoji: "🧹", duration: 45, status: "cleaning" },
            { time: "09:50", activity: "Limpiar baño", emoji: "🚽", duration: 30, status: "cleaning" },
            { time: "10:20", activity: "Organizar habitaciones", emoji: "🏠", duration: 40, status: "organizing" },
            { time: "11:00", activity: "Descanso / Té", emoji: "☕", duration: 30, status: "resting" },
            { time: "11:30", activity: "Preparar almuerzo", emoji: "🍲", duration: 60, status: "cooking" },
            { time: "12:30", activity: "Almorzar", emoji: "🍽️", duration: 45, status: "eating" },
            { time: "13:15", activity: "Lavar platos", emoji: "🧽", duration: 25, status: "cleaning" },
            { time: "13:40", activity: "Siesta", emoji: "😴", duration: 60, status: "resting" },
            { time: "14:40", activity: "Labores varias", emoji: "🧺", duration: 90, status: "housework" },
            { time: "16:10", activity: "Descanso", emoji: "📺", duration: 50, status: "relaxing" },
            { time: "17:00", activity: "Preparar merienda", emoji: "🫖", duration: 30, status: "cooking" },
            { time: "17:30", activity: "Merendar", emoji: "🍪", duration: 30, status: "eating" },
            { time: "18:00", activity: "Cuidar plantas", emoji: "🪴", duration: 30, status: "gardening" },
            { time: "18:30", activity: "Preparar cena", emoji: "🥘", duration: 60, status: "cooking" },
            { time: "19:30", activity: "Cenar", emoji: "🍽️", duration: 45, status: "eating" },
            { time: "20:15", activity: "Lavar platos", emoji: "🧽", duration: 20, status: "cleaning" },
            { time: "20:35", activity: "Ver televisión", emoji: "📺", duration: 105, status: "relaxing" },
            { time: "22:20", activity: "Prepararse para dormir", emoji: "🌙", duration: 10, status: "preparing_sleep" },
            { time: "22:30", activity: "Dormir", emoji: "💤", duration: 450, status: "sleeping" } // 7.5 horas
        ];
        
        this.currentActivityIndex = this.findCurrentActivity();
        this.completedActivities = 0;
        this.moodLevel = 80; // Nivel de satisfacción (0-100)
        this.energyLevel = 70; // Nivel de energía (0-100)
    }

    /**
     * Encuentra la actividad actual basada en la hora simulada
     * @param {number} currentMinutes - Minutos desde las 00:00
     */
    findCurrentActivity(currentMinutes = 6 * 60) {
        for (let i = 0; i < this.schedule.length; i++) {
            const activity = this.schedule[i];
            const [hours, minutes] = activity.time.split(':').map(Number);
            const activityMinutes = hours * 60 + minutes;
            
            const nextActivity = this.schedule[i + 1];
            let nextActivityMinutes = 24 * 60; // Final del día por defecto
            
            if (nextActivity) {
                const [nextHours, nextMins] = nextActivity.time.split(':').map(Number);
                nextActivityMinutes = nextHours * 60 + nextMins;
            }
            
            if (currentMinutes >= activityMinutes && currentMinutes < nextActivityMinutes) {
                return i;
            }
        }
        
        // Si no encuentra nada, está durmiendo
        return this.schedule.length - 1;
    }

    /**
     * Actualiza el estado basado en el tiempo actual
     * @param {number} currentMinutes - Minutos simulados desde las 00:00
     */
    update(currentMinutes) {
        const newActivityIndex = this.findCurrentActivity(currentMinutes);
        
        // Si cambió de actividad
        if (newActivityIndex !== this.currentActivityIndex) {
            // Completar actividad anterior si es válida
            if (this.currentActivityIndex < this.schedule.length - 1) {
                this.completedActivities++;
                this.updateMoodAndEnergy(this.schedule[this.currentActivityIndex]);
            }
            
            this.currentActivityIndex = newActivityIndex;
        }
        
        const currentActivity = this.schedule[this.currentActivityIndex];
        this.currentActivity = currentActivity.activity;
        this.currentStatus = currentActivity.status;
        
        return this.getStatus();
    }

    /**
     * Actualiza estado de ánimo y energía basado en la actividad
     * @param {Object} activity - Actividad completada
     */
    updateMoodAndEnergy(activity) {
        switch (activity.status) {
            case 'cooking':
                this.moodLevel += 5;
                this.energyLevel -= 3;
                break;
            case 'cleaning':
                this.moodLevel += 3;
                this.energyLevel -= 5;
                break;
            case 'resting':
                this.moodLevel += 8;
                this.energyLevel += 10;
                break;
            case 'eating':
                this.moodLevel += 6;
                this.energyLevel += 8;
                break;
            case 'care_giving':
                this.moodLevel += 10;
                this.energyLevel -= 2;
                break;
            case 'sleeping':
                this.moodLevel += 15;
                this.energyLevel = 100;
                break;
            default:
                this.energyLevel -= 2;
                break;
        }
        
        // Mantener valores en rango 0-100
        this.moodLevel = Math.max(0, Math.min(100, this.moodLevel));
        this.energyLevel = Math.max(0, Math.min(100, this.energyLevel));
    }

    /**
     * Obtiene la siguiente actividad
     * @returns {Object|null}
     */
    getNextActivity() {
        const nextIndex = (this.currentActivityIndex + 1) % this.schedule.length;
        return this.schedule[nextIndex];
    }

    /**
     * Obtiene el progreso del día (% de actividades completadas)
     * @returns {number}
     */
    getDayProgress() {
        return Math.round((this.completedActivities / this.schedule.length) * 100);
    }

    /**
     * Obtiene el estado completo del perfil
     * @returns {Object}
     */
    getStatus() {
        const current = this.schedule[this.currentActivityIndex];
        const next = this.getNextActivity();
        
        return {
            name: this.name,
            emoji: this.emoji,
            currentActivity: {
                name: current.activity,
                emoji: current.emoji,
                status: current.status,
                time: current.time
            },
            nextActivity: {
                name: next.activity,
                emoji: next.emoji,
                time: next.time
            },
            stats: {
                completedActivities: this.completedActivities,
                dayProgress: this.getDayProgress(),
                moodLevel: this.moodLevel,
                energyLevel: this.energyLevel
            },
            schedule: this.schedule.map((activity, index) => ({
                ...activity,
                isCompleted: index < this.currentActivityIndex,
                isCurrent: index === this.currentActivityIndex
            }))
        };
    }

    /**
     * Reinicia el perfil para un nuevo día
     */
    reset() {
        this.currentActivityIndex = this.findCurrentActivity();
        this.completedActivities = 0;
        this.moodLevel = 80;
        this.energyLevel = 70;
    }

    /**
     * Obtiene descripción textual del estado actual
     * @returns {string}
     */
    getStatusDescription() {
        const activity = this.schedule[this.currentActivityIndex];
        const moodDesc = this.moodLevel > 75 ? "muy contenta" : 
                        this.moodLevel > 50 ? "contenta" : 
                        this.moodLevel > 25 ? "neutral" : "cansada";
        
        return `${activity.emoji} ${activity.activity} - Se siente ${moodDesc}`;
    }
}
