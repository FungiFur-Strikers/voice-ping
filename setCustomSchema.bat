@echo off
setlocal

set KEY=HKCR\voiceping
set URL_PROTOCOL=VoicePing Protocol
set APP_PATH="%~dp0build\bin\VoicePing.exe"

:: �J�X�^��URL�X�L�[����o�^
reg add "%KEY%" /ve /d "URL:%URL_PROTOCOL%" /f
reg add "%KEY%" /v "URL Protocol" /d "" /f
reg add "%KEY%\shell\open\command" /ve /d "%APP_PATH% \"%%1\"" /f

endlocal
echo �J�X�^��URL�X�L�[�� VoicePing ���o�^����܂����B
pause