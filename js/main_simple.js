import { states } from './states.js';

const AppState = {
    currentBPM: 72,
    targetBPM: 72,
    currentState: 'reposo',
    isTransitioning: false
};

let heartChart;
let chartData = [];
const maxDataPoints = 20;

const elements = {};

function init() {
    getElements();
    setupEvents();
    initChart();
    startSimulation();
    updateUI();
}

function getElements() {
    elements.currentBPM = document.getElementById('currentBPM');
    elements.currentState = document.getElementById('currentState');
    
    elements.buttons = {
        reposo: document.getElementById('reposoBtn'),
        dormir: document.getElementById('dormirBtn'),
        despertar: document.getElementById('despertarBtn'),
        caminar: document.getElementById('caminarBtn'),
        correr: document.getElementById('correrBtn'),
        susto: document.getElementById('sustoBtn')
    };
}

function setupEvents() {
    Object.keys(elements.buttons).forEach(state => {
        if (elements.buttons[state]) {
            elements.buttons[state].addEventListener('click', () => changeState(state));
        }
    });
}

function changeState(newState) {
    if (AppState.isTransitioning || newState === AppState.currentState) return;
    
    AppState.currentState = newState;
    AppState.isTransitioning = true;
    
    updateStateButtons();
    
    const range = states[newState].bpmRange;
    AppState.targetBPM = range.target + (Math.random() - 0.5) * 10;
    
    startTransition();
}

function startTransition() {
    const startBPM = AppState.currentBPM;
    const targetBPM = AppState.targetBPM;
    const difference = targetBPM - startBPM;
    const steps = 20;
    const stepSize = difference / steps;
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
        currentStep++;
        AppState.currentBPM = startBPM + (stepSize * currentStep);
        AppState.currentBPM += (Math.random() - 0.5) * 2;
        
        updateBPMDisplay();
        updateChart();
        
        if (currentStep >= steps) {
            clearInterval(interval);
            AppState.isTransitioning = false;
        }
    }, 200);
}

function updateStateButtons() {
    Object.keys(elements.buttons).forEach(state => {
        const button = elements.buttons[state];
        if (button) {
            if (state === AppState.currentState) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        }
    });
}

function updateUI() {
    updateStateButtons();
    updateBPMDisplay();
    if (elements.currentState) {
        elements.currentState.textContent = states[AppState.currentState].name;
    }
}

function updateBPMDisplay() {
    if (elements.currentBPM) {
        const bpm = Math.round(AppState.currentBPM);
        elements.currentBPM.textContent = bpm;
        
        if (bpm < 60) {
            elements.currentBPM.style.color = '#06b6d4';
        } else if (bpm < 100) {
            elements.currentBPM.style.color = '#10b981';
        } else if (bpm < 150) {
            elements.currentBPM.style.color = '#f59e0b';
        } else {
            elements.currentBPM.style.color = '#ef4444';
        }
    }
}

function initChart() {
    const ctx = document.getElementById('heartChart');
    if (!ctx) return;
    
    chartData = Array(maxDataPoints).fill(AppState.currentBPM);
    
    heartChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(maxDataPoints).fill(''),
            datasets: [{
                label: 'BPM',
                data: chartData,
                borderColor: '#ef4444',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: { display: false },
                y: {
                    beginAtZero: false,
                    min: 40,
                    max: 200
                }
            }
        }
    });
}

function updateChart() {
    if (!heartChart) return;
    
    chartData.push(AppState.currentBPM);
    if (chartData.length > maxDataPoints) {
        chartData.shift();
    }
    
    heartChart.data.datasets[0].data = chartData;
    heartChart.update('none');
}

function startSimulation() {
    setInterval(() => {
        if (!AppState.isTransitioning) {
            const variation = (Math.random() - 0.5) * 2;
            AppState.currentBPM += variation;
            
            const range = states[AppState.currentState].bpmRange;
            AppState.currentBPM = Math.max(range.min, Math.min(range.max, AppState.currentBPM));
            
            updateBPMDisplay();
            updateChart();
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', init);

window.AppState = AppState;
window.changeState = changeState;
