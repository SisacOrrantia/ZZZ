export const states = {
    reposo: {
        name: "Reposo",
        bpmRange: { min: 60, max: 80, target: 70 }
    },
    dormir: {
        name: "Dormir",
        bpmRange: { min: 45, max: 65, target: 55 }
    },
    despertar: {
        name: "Despertar",
        bpmRange: { min: 70, max: 100, target: 85 }
    },
    caminar: {
        name: "Caminar",
        bpmRange: { min: 90, max: 120, target: 105 }
    },
    correr: {
        name: "Correr",
        bpmRange: { min: 140, max: 180, target: 160 }
    },
    susto: {
        name: "Susto",
        bpmRange: { min: 120, max: 200, target: 170 }
    }
};
