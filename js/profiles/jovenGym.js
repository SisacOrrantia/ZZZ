/**
 * Perfil: Joven Gym - Rutina enfocada en fitness e hipertrofia
 * Horarios: Despertar 6am, gym 12pm, escuela 5-9pm, dormir 11-12pm
 */

export class JovenGym {
    constructor() {
        this.name = "Joven Fitness";
        this.emoji = "💪";
        this.currentActivity = "Durmiendo";
        this.currentStatus = "sleeping";
        
        // Rutina diaria optimizada para hipertrofia
        this.schedule = [
            { time: "06:00", activity: "Despertar", emoji: "🌅", duration: 10, status: "waking", intensity: "low" },
            { time: "06:10", activity: "Hidratación", emoji: "💧", duration: 5, status: "hydrating", intensity: "low" },
            { time: "06:15", activity: "Cardio ligero", emoji: "🏃", duration: 30, status: "cardio", intensity: "medium" },
            { time: "06:45", activity: "Aeróbicos", emoji: "🤸", duration: 30, status: "aerobics", intensity: "high" },
            { time: "07:15", activity: "Estiramiento", emoji: "🧘", duration: 15, status: "stretching", intensity: "low" },
            { time: "07:30", activity: "Ducha post-cardio", emoji: "🚿", duration: 15, status: "shower", intensity: "low" },
            { time: "07:45", activity: "Preparar batido proteico", emoji: "🥤", duration: 10, status: "prep_nutrition", intensity: "low" },
            { time: "07:55", activity: "Desayuno proteico", emoji: "🍳", duration: 35, status: "eating", intensity: "low" },
            { time: "08:30", activity: "Suplementación", emoji: "💊", duration: 5, status: "supplements", intensity: "low" },
            { time: "08:35", activity: "Preparación mental", emoji: "🧠", duration: 25, status: "mental_prep", intensity: "low" },
            { time: "09:00", activity: "Transporte al gym", emoji: "🚗", duration: 30, status: "transport", intensity: "low" },
            { time: "09:30", activity: "Pre-entreno", emoji: "⚡", duration: 15, status: "pre_workout", intensity: "medium" },
            { time: "09:45", activity: "Calentamiento gym", emoji: "🔥", duration: 15, status: "gym_warmup", intensity: "medium" },
            { time: "10:00", activity: "Entrenamiento de fuerza", emoji: "🏋️", duration: 90, status: "strength_training", intensity: "extreme" },
            { time: "11:30", activity: "Cardio post-entreno", emoji: "💨", duration: 20, status: "post_cardio", intensity: "high" },
            { time: "11:50", activity: "Estiramiento final", emoji: "🤲", duration: 10, status: "cool_down", intensity: "low" },
            { time: "12:00", activity: "Ducha del gym", emoji: "🚿", duration: 15, status: "shower", intensity: "low" },
            { time: "12:15", activity: "Post-entreno drink", emoji: "🥛", duration: 10, status: "recovery_drink", intensity: "low" },
            { time: "12:25", activity: "Regreso a casa", emoji: "🏠", duration: 35, status: "transport", intensity: "low" },
            { time: "13:00", activity: "Almuerzo alto en proteínas", emoji: "🥩", duration: 45, status: "eating", intensity: "low" },
            { time: "13:45", activity: "Descanso digestivo", emoji: "😌", duration: 45, status: "digesting", intensity: "low" },
            { time: "14:30", activity: "Preparación escuela", emoji: "🎒", duration: 30, status: "school_prep", intensity: "low" },
            { time: "15:00", activity: "Transporte escuela", emoji: "🚌", duration: 30, status: "transport", intensity: "low" },
            { time: "15:30", activity: "Clases", emoji: "📚", duration: 210, status: "studying", intensity: "medium" }, // 3.5 horas
            { time: "19:00", activity: "Regreso de escuela", emoji: "🏃‍♂️", duration: 30, status: "transport", intensity: "low" },
            { time: "19:30", activity: "Merienda proteica", emoji: "🥜", duration: 20, status: "eating", intensity: "low" },
            { time: "19:50", activity: "Tiempo libre/Social", emoji: "🎮", duration: 70, status: "free_time", intensity: "low" },
            { time: "21:00", activity: "Cena balanceada", emoji: "🍽️", duration: 40, status: "eating", intensity: "low" },
            { time: "21:40", activity: "Suplementos nocturnos", emoji: "🌙", duration: 5, status: "supplements", intensity: "low" },
            { time: "21:45", activity: "Relajación", emoji: "📱", duration: 75, status: "relaxing", intensity: "low" },
            { time: "23:00", activity: "Rutina pre-sueño", emoji: "🛏️", duration: 15, status: "preparing_sleep", intensity: "low" },
            { time: "23:15", activity: "Dormir", emoji: "💤", duration: 405, status: "sleeping", intensity: "recovery" } // 6h 45min
        ];
        
        this.currentActivityIndex = this.findCurrentActivity();
        this.completedActivities = 0;
        
        // Estadísticas específicas del gym
        this.motivationLevel = 85; // Nivel de motivación (0-100)
        this.energyLevel = 80; // Energía física (0-100)
        this.muscleGrowth = 0; // Progreso de hipertrofia (0-100)
        this.strengthLevel = 70; // Nivel de fuerza (0-100)
        this.proteinIntake = 0; // Gramos de proteína del día
        this.caloriesBurned = 0; // Calorías quemadas
    }

    /**
     * Encuentra la actividad actual basada en la hora simulada
     */
    findCurrentActivity(currentMinutes = 6 * 60) {
        for (let i = 0; i < this.schedule.length; i++) {
            const activity = this.schedule[i];
            const [hours, minutes] = activity.time.split(':').map(Number);
            const activityMinutes = hours * 60 + minutes;
            
            const nextActivity = this.schedule[i + 1];
            let nextActivityMinutes = 24 * 60;
            
            if (nextActivity) {
                const [nextHours, nextMins] = nextActivity.time.split(':').map(Number);
                nextActivityMinutes = nextHours * 60 + nextMins;
                // Manejar el caso donde el próximo día empieza (dormir -> despertar)
                if (nextActivityMinutes < activityMinutes) {
                    nextActivityMinutes += 24 * 60;
                }
            }
            
            if (currentMinutes >= activityMinutes && currentMinutes < nextActivityMinutes) {
                return i;
            }
        }
        
        return this.schedule.length - 1; // Durmiendo
    }

    /**
     * Actualiza el estado basado en el tiempo actual
     */
    update(currentMinutes) {
        const newActivityIndex = this.findCurrentActivity(currentMinutes);
        
        if (newActivityIndex !== this.currentActivityIndex) {
            // Completar actividad anterior
            if (this.currentActivityIndex < this.schedule.length - 1) {
                this.completedActivities++;
                this.updateFitnessStats(this.schedule[this.currentActivityIndex]);
            }
            
            this.currentActivityIndex = newActivityIndex;
        }
        
        const currentActivity = this.schedule[this.currentActivityIndex];
        this.currentActivity = currentActivity.activity;
        this.currentStatus = currentActivity.status;
        
        return this.getStatus();
    }

    /**
     * Actualiza estadísticas basadas en la actividad completada
     */
    updateFitnessStats(activity) {
        switch (activity.status) {
            case 'strength_training':
                this.muscleGrowth += 8;
                this.strengthLevel += 5;
                this.energyLevel -= 25;
                this.motivationLevel += 15;
                this.caloriesBurned += 400;
                break;
            case 'cardio':
                this.energyLevel -= 10;
                this.motivationLevel += 8;
                this.caloriesBurned += 150;
                break;
            case 'aerobics':
                this.energyLevel -= 15;
                this.motivationLevel += 10;
                this.caloriesBurned += 200;
                break;
            case 'eating':
                this.energyLevel += 15;
                this.proteinIntake += Math.random() * 25 + 10; // 10-35g por comida
                break;
            case 'supplements':
                this.energyLevel += 5;
                this.proteinIntake += 25; // Batido proteico
                break;
            case 'sleeping':
                this.energyLevel = 100;
                this.motivationLevel = 90;
                this.muscleGrowth += 5; // Recuperación nocturna
                break;
            case 'stretching':
            case 'cool_down':
                this.energyLevel += 5;
                this.motivationLevel += 3;
                break;
            case 'studying':
                this.energyLevel -= 8;
                this.motivationLevel -= 5;
                break;
            case 'free_time':
                this.energyLevel += 8;
                this.motivationLevel += 10;
                break;
            default:
                this.energyLevel -= 2;
                break;
        }
        
        // Mantener valores en rango
        this.motivationLevel = Math.max(0, Math.min(100, this.motivationLevel));
        this.energyLevel = Math.max(0, Math.min(100, this.energyLevel));
        this.muscleGrowth = Math.max(0, Math.min(100, this.muscleGrowth));
        this.strengthLevel = Math.max(0, Math.min(100, this.strengthLevel));
    }

    /**
     * Obtiene la siguiente actividad
     */
    getNextActivity() {
        const nextIndex = (this.currentActivityIndex + 1) % this.schedule.length;
        return this.schedule[nextIndex];
    }

    /**
     * Obtiene el progreso del entrenamiento del día
     */
    getWorkoutProgress() {
        const workoutActivities = this.schedule.filter(a => 
            ['cardio', 'aerobics', 'strength_training', 'stretching'].includes(a.status)
        ).length;
        
        const completedWorkouts = this.schedule
            .slice(0, this.currentActivityIndex)
            .filter(a => ['cardio', 'aerobics', 'strength_training', 'stretching'].includes(a.status))
            .length;
        
        return Math.round((completedWorkouts / workoutActivities) * 100);
    }

    /**
     * Obtiene el estado completo del perfil
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
                intensity: current.intensity,
                time: current.time
            },
            nextActivity: {
                name: next.activity,
                emoji: next.emoji,
                time: next.time
            },
            stats: {
                completedActivities: this.completedActivities,
                workoutProgress: this.getWorkoutProgress(),
                motivationLevel: this.motivationLevel,
                energyLevel: this.energyLevel,
                muscleGrowth: this.muscleGrowth,
                strengthLevel: this.strengthLevel,
                proteinIntake: Math.round(this.proteinIntake),
                caloriesBurned: Math.round(this.caloriesBurned)
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
        this.motivationLevel = 85;
        this.energyLevel = 80;
        this.muscleGrowth = 0;
        this.proteinIntake = 0;
        this.caloriesBurned = 0;
    }

    /**
     * Obtiene descripción del estado actual
     */
    getStatusDescription() {
        const activity = this.schedule[this.currentActivityIndex];
        const motivationDesc = this.motivationLevel > 80 ? "súper motivado" : 
                             this.motivationLevel > 60 ? "motivado" : 
                             this.motivationLevel > 40 ? "normal" : "desmotivado";
        
        const energyDesc = this.energyLevel > 70 ? "con mucha energía" : 
                          this.energyLevel > 40 ? "con energía moderada" : "cansado";
        
        return `${activity.emoji} ${activity.activity} - ${motivationDesc} y ${energyDesc}`;
    }

    /**
     * Obtiene stats específicos de fitness
     */
    getFitnessStats() {
        return {
            workoutIntensity: this.getCurrentIntensity(),
            dailyProtein: `${Math.round(this.proteinIntake)}g`,
            caloriesBurned: this.caloriesBurned,
            muscleGrowthProgress: `${Math.round(this.muscleGrowth)}%`
        };
    }

    /**
     * Obtiene la intensidad actual del entrenamiento
     */
    getCurrentIntensity() {
        const current = this.schedule[this.currentActivityIndex];
        return current.intensity || 'low';
    }
}
