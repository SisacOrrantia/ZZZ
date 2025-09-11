@echo off
echo Instalando dependencias del proyecto ZZZ...
echo.

echo [1/4] Instalando dependencias raiz...
call npm install

echo.
echo [2/4] Instalando dependencias del backend...
cd backend
call npm install
cd ..

echo.
echo [3/4] Instalando dependencias del frontend...
cd frontend
call npm install
cd ..

echo.
echo [4/4] Copiando archivos de configuracion...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Archivo .env creado en backend
)

if not exist frontend\.env (
    copy frontend\.env.example frontend\.env
    echo Archivo .env creado en frontend
)

echo.
echo ✅ Instalacion completada!
echo.
echo Para ejecutar el proyecto:
echo   npm run dev       - Ejecuta frontend y backend
echo   npm run dev:backend - Solo backend
echo   npm run dev:frontend - Solo frontend
echo.
pause
