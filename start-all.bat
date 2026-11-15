@echo off
title Feedback Statement System - Integrated Launcher
color 0B
echo ====================================================================
echo      Starting AI-Powered Feedback Statement System (Integrated)
echo ====================================================================
echo.

:: 1. Start Python AI Microservice
echo [1/3] Launching Python AI Sentiment Service on Port 8000...
start "Python AI Service (Port 8000)" cmd /k "cd /d %~dp0feedback_statement_system && venv\Scripts\activate && uvicorn main:app --reload --port 8000"

:: Wait 3 seconds
timeout /t 3 /nobreak >nul

:: 2. Start Spring Boot Backend
echo [2/3] Launching Spring Boot Backend on Port 8080...
start "Spring Boot Backend (Port 8080)" cmd /k "cd /d %~dp0feedback-service\feedback-service && mvnw.cmd spring-boot:run"

echo.
echo [3/3] Waiting for Spring Boot to initialize, then auto-opening browser...
echo       (This usually takes 8-12 seconds...)
echo.

:: Automatically wait for http://localhost:8080 to become ready, then launch browser
powershell -NoProfile -Command ^
  "$maxWait = 35; $start = Get-Date;" ^
  "while ((Get-Date) -lt $start.AddSeconds($maxWait)) {" ^
  "  try {" ^
  "    $res = Invoke-WebRequest -Uri 'http://localhost:8080' -UseBasicParsing -TimeoutSec 2;" ^
  "    if ($res.StatusCode -eq 200) { break; }" ^
  "  } catch {}" ^
  "  Start-Sleep -Seconds 1;" ^
  "};" ^
  "Start-Process 'http://localhost:8080'"

echo.
echo ====================================================================
echo   Dashboard is now open in your browser: http://localhost:8080
echo ====================================================================
echo.
pause
