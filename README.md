# ZZZ - Proyecto Full Stack JavaScript

Un proyecto full stack moderno desarrollado con JavaScript.

## Estructura del Proyecto

```
ZZZ/
├── frontend/          # Aplicación React con Vite
├── backend/           # API REST con Node.js y Express
├── shared/            # Código compartido entre frontend y backend
└── README.md
```

## Tecnologías

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios para HTTP requests

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Herramientas de Desarrollo
- ESLint
- Prettier
- Concurrently (para ejecutar frontend y backend simultáneamente)

## Instalación

1. Clona el repositorio
2. Instala las dependencias del backend:
   ```bash
   cd backend
   npm install
   ```
3. Instala las dependencias del frontend:
   ```bash
   cd frontend
   npm install
   ```

## Desarrollo

### Ejecutar solo el backend:
```bash
cd backend
npm run dev
```

### Ejecutar solo el frontend:
```bash
cd frontend
npm run dev
```

### Ejecutar ambos simultáneamente (desde la raíz):
```bash
npm run dev
```

## Scripts Disponibles

- `npm run dev` - Ejecuta frontend y backend en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción

## Estructura de URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
