/**
 * Perfil: Gamer LoL - Con problemas de ira y horarios nocturnos
 * Horarios: Escuela 7-3pm, gaming toda la tarde/noche, dormir 1-2am
 */

export class GamerLoL {
    constructor() {
        this.name = "Gamer LoL";
        this.emoji = "🎮";
        this.currentActivity = "Durmiendo";
        this.currentStatus = "sleeping";
        
        // Rutina diaria de un gamer típico
        this.schedule = [
            { time: "06:30", activity: "Despertar (a regañadientes)", emoji: "😴", duration: 15, status: "waking", mood: "grumpy" },
            { time: "06:45", activity: "Luchar contra el despertador", emoji: "⏰", duration: 15, status: "struggling", mood: "annoyed" },
            { time: "07:00", activity: "Ducha rápida", emoji: "🚿", duration: 10, status: "shower", mood: "neutral" },
            { time: "07:10", activity: "Desayuno express", emoji: "🥞", duration: 15, status: "eating", mood: "neutral" },
            { time: "07:25", activity: "Camino a la escuela", emoji: "🎒", duration: 35, status: "transport", mood: "bored" },
            { time: "08:00", activity: "Clases (pensando en LoL)", emoji: "📚", duration: 420, status: "studying", mood: "bored" }, // 7 horas
            { time: "15:00", activity: "¡Por fin libre!", emoji: "🎉", duration: 5, status: "celebrating", mood: "excited" },
            { time: "15:05", activity: "Correr a casa", emoji: "🏃‍♂️", duration: 25, status: "transport", mood: "anxious" },
            { time: "15:30", activity: "Encender la PC", emoji: "💻", duration: 5, status: "booting", mood: "anticipation" },
            { time: "15:35", activity: "Abrir League of Legends", emoji: "⚔️", duration: 5, status: "loading_game", mood: "excited" },
            { time: "15:40", activity: "Primera partida ranked", emoji: "🏆", duration: 45, status: "gaming", mood: "focused", gameResult: "random" },
            { time: "16:25", activity: "Queue para otra partida", emoji: "⏳", duration: 5, status: "queue", mood: "hopeful" },
            { time: "16:30", activity: "Segunda partida", emoji: "🎯", duration: 50, status: "gaming", mood: "focused", gameResult: "random" },
            { time: "17:20", activity: "Snack rápido", emoji: "🍕", duration: 10, status: "eating", mood: "neutral" },
            { time: "17:30", activity: "Tercera partida", emoji: "⚡", duration: 55, status: "gaming", mood: "determined", gameResult: "random" },
            { time: "18:25", activity: "Revisar stats/builds", emoji: "📊", duration: 15, status: "research", mood: "analytical" },
            { time: "18:40", activity: "Cuarta partida", emoji: "🔥", duration: 60, status: "gaming", mood: "intense", gameResult: "random" },
            { time: "19:40", activity: "Cena mientras juega", emoji: "🥡", duration: 20, status: "multitasking", mood: "focused" },
            { time: "20:00", activity: "Quinta partida", emoji: "💀", duration: 65, status: "gaming", mood: "tilted", gameResult: "likely_loss" },
            { time: "21:05", activity: "Sexta partida (revenge)", emoji: "👹", duration: 70, status: "gaming", mood: "angry", gameResult: "likely_loss" },
            { time: "22:15", activity: "Séptima partida", emoji: "🌋", duration: 45, status: "gaming", mood: "rage", gameResult: "loss" },
            { time: "23:00", activity: "Rage quit temporal", emoji: "💥", duration: 15, status: "raging", mood: "furious" },
            { time: "23:15", activity: "Volver al juego", emoji: "🔄", duration: 5, status: "returning", mood: "reluctant" },
            { time: "23:20", activity: "Octava partida", emoji: "🎲", duration: 50, status: "gaming", mood: "desperate", gameResult: "random" },
            { time: "00:10", activity: "Novena partida", emoji: "🌙", duration: 55, status: "gaming", mood: "tired_but_stubborn", gameResult: "random" },
            { time: "01:05", activity: "Última partida (mentira)", emoji: "🤥", duration: 60, status: "gaming", mood: "exhausted", gameResult: "random" },
            { time: "02:05", activity: "Finalmente cerrar LoL", emoji: "❌", duration: 5, status: "closing_game", mood: "defeated" },
            { time: "02:10", activity: "Rutina pre-sueño", emoji: "🛏️", duration: 10, status: "preparing_sleep", mood: "tired" },
            { time: "02:20", activity: "Dormir", emoji: "💤", duration: 250, status: "sleeping", mood: "peaceful" } // 4h 10min
        ];
        
        this.currentActivityIndex = this.findCurrentActivity();
        this.completedActivities = 0;
        
        // Estadísticas específicas del gamer
        this.rageLevel = 0; // Nivel de ira (0-100)
        this.skillLevel = 65; // Habilidad en LoL (0-100)
        this.winStreak = 0; // Racha de victorias/derrotas
        this.gamesPlayed = 0; // Partidas jugadas hoy
        this.gamesWon = 0; // Partidas ganadas
        this.currentMood = "neutral";
        this.energyLevel = 70;
        this.sleepDeprivation = 20; // Nivel de falta de sueño
        
        // Estados específicos de LoL
        this.currentRank = "Silver II";
        this.lpGained = 0; // League Points ganados/perdidos
        this.rageMoments = []; // Historial de rage
    }

    /**
     * Encuentra la actividad actual basada en la hora simulada
     */
    findCurrentActivity(currentMinutes = 6 * 60 + 30) { // Empieza a las 6:30
        // Ajustar para el ciclo de 24 horas que puede pasar de un día a otro
        const adjustedMinutes = currentMinutes % (24 * 60);
        
        for (let i = 0; i < this.schedule.length; i++) {
            const activity = this.schedule[i];
            const [hours, minutes] = activity.time.split(':').map(Number);
            let activityMinutes = hours * 60 + minutes;
            
            // Ajustar actividades del día siguiente (después de medianoche)
            if (activityMinutes < 6 * 60 + 30) { // Si es antes de las 6:30
                activityMinutes += 24 * 60;
            }
            
            const nextActivity = this.schedule[i + 1];
            let nextActivityMinutes = 24 * 60;
            
            if (nextActivity) {
                const [nextHours, nextMins] = nextActivity.time.split(':').map(Number);
                nextActivityMinutes = nextHours * 60 + nextMins;
                
                if (nextActivityMinutes < 6 * 60 + 30) {
                    nextActivityMinutes += 24 * 60;
                }
            }
            
            const currentAdjusted = adjustedMinutes < 6 * 60 + 30 ? 
                                  adjustedMinutes + 24 * 60 : 
                                  adjustedMinutes;
            
            if (currentAdjusted >= activityMinutes && currentAdjusted < nextActivityMinutes) {
                return i;
            }
        }
        
        return this.schedule.length - 1; // Durmiendo por defecto
    }

    /**
     * Actualiza el estado basado en el tiempo actual
     */
    update(currentMinutes) {
        const newActivityIndex = this.findCurrentActivity(currentMinutes);
        
        if (newActivityIndex !== this.currentActivityIndex) {
            // Completar actividad anterior
            if (this.currentActivityIndex >= 0 && this.currentActivityIndex < this.schedule.length) {
                this.completedActivities++;
                this.updateGamerStats(this.schedule[this.currentActivityIndex]);
            }
            
            this.currentActivityIndex = newActivityIndex;
        }
        
        const currentActivity = this.schedule[this.currentActivityIndex];
        this.currentActivity = currentActivity.activity;
        this.currentStatus = currentActivity.status;
        this.currentMood = currentActivity.mood;
        
        // Actualizar rage level dinámicamente durante gaming
        if (currentActivity.status === 'gaming') {
            this.updateRageDuringGame();
        }
        
        return this.getStatus();
    }

    /**
     * Simula el resultado de una partida y actualiza stats
     */
    simulateGameResult(gameResult) {
        let won = false;
        
        switch (gameResult) {
            case 'random':
                won = Math.random() > 0.5; // 50% probabilidad
                break;
            case 'likely_loss':
                won = Math.random() > 0.7; // 30% probabilidad de ganar
                break;
            case 'loss':
                won = false;
                break;
            default:
                won = Math.random() > 0.5;
        }
        
        this.gamesPlayed++;
        
        if (won) {
            this.gamesWon++;
            this.winStreak = Math.max(0, this.winStreak + 1);
            this.rageLevel = Math.max(0, this.rageLevel - 10);
            this.lpGained += Math.floor(Math.random() * 20 + 15); // 15-35 LP
        } else {
            this.winStreak = Math.min(0, this.winStreak - 1);
            this.rageLevel = Math.min(100, this.rageLevel + 20);
            this.lpGained -= Math.floor(Math.random() * 15 + 12); // -12 a -27 LP
            
            // Agregar momento de rage si pierde
            this.rageMoments.push({
                time: this.schedule[this.currentActivityIndex].time,
                reason: "Perdió la partida",
                intensity: this.rageLevel
            });
        }
        
        return won;
    }

    /**
     * Actualiza el nivel de rage durante una partida
     */
    updateRageDuringGame() {
        const currentActivity = this.schedule[this.currentActivityIndex];
        
        // Simular eventos frustrantes durante la partida
        if (Math.random() < 0.1) { // 10% chance por update
            const frustratingEvents = [
                "Teammate hizo int",
                "Jungler no gankea",
                "ADC no farmea",
                "Support roba kills",
                "Enemy team op",
                "Lag en teamfight",
                "Flash en pared"
            ];
            
            const event = frustratingEvents[Math.floor(Math.random() * frustratingEvents.length)];
            this.rageLevel = Math.min(100, this.rageLevel + 5);
            
            if (this.rageLevel > 70) {
                this.rageMoments.push({
                    time: currentActivity.time,
                    reason: event,
                    intensity: this.rageLevel
                });
            }
        }
    }

    /**
     * Actualiza estadísticas basadas en la actividad completada
     */
    updateGamerStats(activity) {
        switch (activity.status) {
            case 'gaming':
                this.energyLevel -= 8;
                this.sleepDeprivation += 2;
                
                // Simular resultado si la actividad lo especifica
                if (activity.gameResult) {
                    this.simulateGameResult(activity.gameResult);
                }
                break;
                
            case 'raging':
                this.rageLevel = 100;
                this.energyLevel -= 15;
                this.rageMoments.push({
                    time: activity.time,
                    reason: "Rage quit",
                    intensity: 100
                });
                break;
                
            case 'sleeping':
                this.energyLevel = 80 - this.sleepDeprivation; // Menos sueño = menos energía
                this.rageLevel = Math.max(0, this.rageLevel - 30);
                this.sleepDeprivation = Math.max(0, this.sleepDeprivation - 10);
                break;
                
            case 'eating':
                this.energyLevel += 5;
                this.rageLevel = Math.max(0, this.rageLevel - 5);
                break;
                
            case 'studying':
                this.energyLevel -= 10;
                this.rageLevel += 5; // La escuela lo frustra
                break;
                
            default:
                this.energyLevel -= 1;
                break;
        }
        
        // Mantener valores en rango
        this.rageLevel = Math.max(0, Math.min(100, this.rageLevel));
        this.energyLevel = Math.max(0, Math.min(100, this.energyLevel));
        this.sleepDeprivation = Math.max(0, Math.min(100, this.sleepDeprivation));
    }

    /**
     * Obtiene la siguiente actividad
     */
    getNextActivity() {
        const nextIndex = (this.currentActivityIndex + 1) % this.schedule.length;
        return this.schedule[nextIndex];
    }

    /**
     * Obtiene descripción del nivel de rage actual
     */
    getRageDescription() {
        if (this.rageLevel < 20) return "Calmado";
        if (this.rageLevel < 40) return "Levemente irritado";
        if (this.rageLevel < 60) return "Frustrado";
        if (this.rageLevel < 80) return "Enojado";
        return "TILTEADO MÁXIMO";
    }

    /**
     * Obtiene estadísticas de gaming
     */
    getGamingStats() {
        const winRate = this.gamesPlayed > 0 ? 
            Math.round((this.gamesWon / this.gamesPlayed) * 100) : 0;
        
        return {
            gamesPlayed: this.gamesPlayed,
            winRate: `${winRate}%`,
            winStreak: this.winStreak,
            lpGained: this.lpGained,
            currentRank: this.currentRank
        };
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
                mood: current.mood,
                time: current.time
            },
            nextActivity: {
                name: next.activity,
                emoji: next.emoji,
                time: next.time
            },
            stats: {
                completedActivities: this.completedActivities,
                rageLevel: this.rageLevel,
                rageDescription: this.getRageDescription(),
                energyLevel: this.energyLevel,
                sleepDeprivation: this.sleepDeprivation,
                ...this.getGamingStats()
            },
            rageMoments: this.rageMoments.slice(-5), // Últimos 5 momentos de rage
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
        this.rageLevel = 0;
        this.gamesPlayed = 0;
        this.gamesWon = 0;
        this.winStreak = 0;
        this.lpGained = 0;
        this.rageMoments = [];
        this.energyLevel = 70;
        this.sleepDeprivation = 20;
    }

    /**
     * Obtiene descripción del estado actual
     */
    getStatusDescription() {
        const activity = this.schedule[this.currentActivityIndex];
        const rageDesc = this.getRageDescription();
        
        return `${activity.emoji} ${activity.activity} - ${rageDesc} (${this.rageLevel}% rage)`;
    }

    /**
     * Obtiene color del nivel de rage para UI
     */
    getRageColor() {
        if (this.rageLevel < 30) return "#4CAF50"; // Verde
        if (this.rageLevel < 60) return "#FFC107"; // Amarillo
        if (this.rageLevel < 80) return "#FF9800"; // Naranja
        return "#F44336"; // Rojo
    }
}
