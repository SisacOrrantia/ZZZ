# Shared

Esta carpeta contiene código y utilidades compartidas entre el frontend y backend del proyecto ZZZ.

## Contenido

### `utils.js`
Funciones de utilidad que pueden ser usadas tanto en el frontend como en el backend:
- Validadores de datos
- Constantes compartidas
- Funciones de formateo
- Utilidades de texto

## Uso

### En el Backend (Node.js)
```javascript
const { validators, constants, utils } = require('../shared/utils.js');

// Validar email
if (!validators.email(email)) {
  return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
    error: constants.VALIDATION_MESSAGES.INVALID_EMAIL
  });
}
```

### En el Frontend (React)
```javascript
import { validators, constants, utils } from '../shared/utils.js';

// Formatear fecha
const formattedDate = utils.formatDate(user.createdAt);
```

## Estructura Recomendada

```
shared/
├── utils.js          # Utilidades generales
├── validators.js     # Validadores específicos
├── constants.js      # Constantes de la aplicación
├── types.js          # Tipos y esquemas de datos
└── README.md         # Este archivo
```
