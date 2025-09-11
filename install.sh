#!/bin/bash

echo "Instalando dependencias del proyecto ZZZ..."
echo

echo "[1/4] Instalando dependencias raíz..."
npm install

echo
echo "[2/4] Instalando dependencias del backend..."
cd backend
npm install
cd ..

echo
echo "[3/4] Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

echo
echo "[4/4] Copiando archivos de configuración..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Archivo .env creado en backend"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo "Archivo .env creado en frontend"
fi

echo
echo "✅ Instalación completada!"
echo
echo "Para ejecutar el proyecto:"
echo "  npm run dev         - Ejecuta frontend y backend"
echo "  npm run dev:backend - Solo backend"
echo "  npm run dev:frontend - Solo frontend"
echo
