@echo off
echo Démarrage des serveurs Pokemon...
echo.

REM Ouvrir le backend dans une nouvelle fenêtre PowerShell
echo Lancement du backend sur http://localhost:3000
start PowerShell -NoExit -Command "cd 'c:\Users\hugok\Desktop\Fichiers\Ecole\ECE\2025-2026\Tech_Web\tp_web\tp-back-final-hugokenzi'; node index.js"

REM Attendre 2 secondes avant de lancer le frontend
timeout /t 2 /nobreak

REM Ouvrir le frontend dans une nouvelle fenêtre PowerShell
echo Lancement du frontend sur http://localhost:5173
start PowerShell -NoExit -Command "cd 'c:\Users\hugok\Desktop\Fichiers\Ecole\ECE\2025-2026\Tech_Web\tp_web\tp-front-hugokenzi-main'; npm run dev"

echo.
echo Les deux serveurs devraient démarrer bientôt...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
timeout /t 3 /nobreak
