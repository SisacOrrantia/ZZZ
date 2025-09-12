# 💓 Simulador de Ritmo Cardíaco

## 📋 Descripción General

Este proyecto es un simulador interactivo del ritmo cardíaco que muestra cómo cambian los latidos por minuto (BPM) según diferentes estados fisiológicos. El simulador utiliza transiciones progresivas y realistas para simular el comportamiento del corazón humano.

## 🏗️ Arquitectura del Sistema

### Estructura de Archivos
```
ZZZ/
├── index.html          # Interfaz principal
├── css/
│   └── styles.css      # Estilos CSS básicos
├── js/
│   ├── main.js         # Lógica principal del simulador
│   └── states.js       # Definición de estados cardíacos
└── README.md           # Este archivo
```

## 🔧 Tecnologías Utilizadas

### 1. **HTML5**
- Estructura semántica básica
- Canvas para el gráfico
- Elementos de interfaz simples

### 2. **CSS3**
- Flexbox para layout responsive
- Estilos básicos sin frameworks
- Colores adaptativos según BPM
- Diseño minimalista

### 3. **JavaScript ES6+**
- Módulos ES6 (import/export)
- Manipulación del DOM
- Intervalos para simulación en tiempo real
- Event listeners para interactividad

### 4. **Chart.js**
- Librería externa para gráficos
- Gráfico de líneas en tiempo real
- Actualización dinámica de datos

## 📊 Funcionamiento del Sistema

### Estados Cardíacos Definidos

| Estado | BPM Mínimo | BPM Máximo | BPM Objetivo | Descripción |
|--------|------------|------------|--------------|-------------|
| Reposo | 60 | 80 | 70 | Estado de relajación normal |
| Dormir | 45 | 65 | 55 | Sueño profundo, metabolismo bajo |
| Despertar | 70 | 100 | 85 | Transición sueño-vigilia |
| Caminar | 90 | 120 | 105 | Actividad física ligera |
| Correr | 140 | 180 | 160 | Ejercicio intenso |
| Susto | 120 | 200 | 170 | Respuesta de estrés agudo |

### Algoritmo de Transición

1. **Detección de Cambio**: El usuario hace clic en un botón de estado
2. **Cálculo de Objetivo**: Se define un BPM objetivo con variación aleatoria (±5 BPM)
3. **Transición Gradual**: 
   - 20 pasos de transición
   - 200ms por paso (4 segundos total)
   - Interpolación lineal entre BPM actual y objetivo
   - Variación aleatoria de ±1 BPM por paso (simula naturalidad)

### Simulación Continua

- **Intervalo**: Actualización cada 1000ms (1 segundo)
- **Variación Natural**: ±1 BPM aleatorio cuando no hay transición
- **Límites**: El BPM se mantiene dentro del rango del estado actual
- **Actualización**: Gráfico y display se actualizan en tiempo real

## 🎨 Componentes de la Interfaz

### 1. **Monitor Principal**
- **Display BPM**: Número grande (72px) con colores adaptativos
- **Indicador de Estado**: Badge que muestra el estado actual
- **Gráfico**: Chart.js con 20 puntos de datos deslizantes

### 2. **Panel de Control**
- **Botones de Estado**: Grid 2x3 con estados disponibles
- **Indicador Activo**: El botón activo se resalta en azul

### 3. **Colores Adaptativos del BPM**
```javascript
if (bpm < 60)        → #06b6d4 (Cyan - Bradicardia)
else if (bpm < 100)  → #10b981 (Verde - Normal)
else if (bpm < 150)  → #f59e0b (Amarillo - Elevado)
else                 → #ef4444 (Rojo - Taquicardia)
```

## 🔄 Flujo de Datos

```
[Usuario hace clic] → [changeState()] → [Calcula nuevo objetivo] 
                                    ↓
[Actualiza UI] ← [updateChart()] ← [startTransition()]
                                    ↓
[20 pasos graduales] → [updateBPMDisplay()] → [Transición completa]
```

### Estado Global (AppState)
```javascript
{
    currentBPM: 72,        // BPM actual (flotante)
    targetBPM: 72,         // BPM objetivo para transición
    currentState: 'reposo', // Estado actual del simulador
    isTransitioning: false // Flag de transición en progreso
}
```

## 📈 Lógica del Gráfico

- **Tipo**: Gráfico de líneas con Chart.js
- **Datos**: Array de 20 puntos (ventana deslizante)
- **Actualización**: Método FIFO (primero en entrar, primero en salir)
- **Estilo**: Línea roja (#ef4444) con área sombreada
- **Escalas**: Y entre 40-200 BPM, X oculto

## 🎯 Características Técnicas

### Responsive Design
- **Desktop**: Layout de 2 columnas (monitor + controles)
- **Mobile**: Layout vertical apilado
- **Breakpoint**: 768px

### Optimizaciones
- **Actualización**: `update('none')` en Chart.js para mejor rendimiento
- **Prevención**: No permite cambios durante transiciones
- **Límites**: BPM restringido a rangos realistas (40-200)

### Accesibilidad
- **Contraste**: Colores con suficiente contraste
- **Responsive**: Texto se adapta a pantallas pequeñas
- **Interactividad**: Botones con estados visuales claros

## 🚀 Cómo Usar

1. **Abrir**: Abrir `index.html` en cualquier navegador moderno
2. **Interactuar**: Hacer clic en los botones de estado
3. **Observar**: Ver las transiciones graduales en el gráfico y BPM
4. **Experimentar**: Probar diferentes secuencias de estados

## 🧪 Datos de Prueba

### Transiciones Típicas
- **Reposo → Correr**: 70 → 160 BPM (90 BPM de diferencia)
- **Susto → Dormir**: 170 → 55 BPM (115 BPM de diferencia)
- **Despertar → Caminar**: 85 → 105 BPM (20 BPM de diferencia)

### Validación Médica
Los rangos están basados en valores médicos estándar:
- **Adulto en reposo**: 60-100 BPM
- **Durante sueño**: 40-60 BPM
- **Ejercicio moderado**: 100-150 BPM
- **Ejercicio intenso**: 150-200 BPM

## 🎓 Conceptos Programación Utilizados

### JavaScript
- **Módulos ES6**: `import/export`
- **Funciones de Flecha**: `() => {}`
- **Destructuring**: `const {min, max, target} = range`
- **Array Methods**: `forEach()`, `push()`, `shift()`
- **DOM Manipulation**: `getElementById()`, `addEventListener()`
- **Intervals**: `setInterval()`, `clearInterval()`

### CSS
- **Flexbox**: Layout principal
- **Grid**: Organización de botones
- **Media Queries**: Responsive design
- **Pseudo-classes**: `:hover`, `:active`
- **Color Transitions**: Cambios suaves

### Patrones de Diseño
- **Module Pattern**: Separación de responsabilidades
- **State Pattern**: Gestión de estados del simulador
- **Observer Pattern**: Actualización automática de UI

## 🔍 Posibles Mejoras Futuras

1. **Sonidos**: Audio de latidos sincronizados
2. **Animaciones**: Efectos visuales de pulso
3. **Histórico**: Guardado de sesiones en localStorage
4. **Configuración**: Parámetros ajustables por usuario
5. **Más Estados**: Ejercicios específicos, emociones
6. **Realismo**: Curvas de transición más sofisticadas

---

**Autor**: Sistema creado para simulación educativa del ritmo cardíaco  
**Versión**: 1.0  
**Fecha**: Septiembre 2025
