@echo off
echo ==============================================
echo CLEANUP & ASSETS INITIALIZATION FOR NEXT.JS
echo ==============================================

echo 1. Creating public directories...
if not exist "public" mkdir "public"
if not exist "public\assets" mkdir "public\assets"
if not exist "public\uploads" mkdir "public\uploads"

echo 2. Copying avatar asset...
if exist "assets\avatar.png" (
    copy "assets\avatar.png" "public\assets\avatar.png"
    echo Avatar copied successfully.
) else if exist "public\assets\avatar.png" (
    echo Avatar already copied.
) else (
    echo Warning: assets/avatar.png not found.
)

echo 3. Cleaning up old unused files...
if exist "index.html" (
    del /q "index.html"
    echo Deleted old index.html.
)
if exist "style.css" (
    del /q "style.css"
    echo Deleted old style.css.
)
if exist "script.js" (
    del /q "script.js"
    echo Deleted old script.js.
)
if exist "sbd.sql" (
    del /q "sbd.sql"
    echo Deleted old sbd.sql.
)

echo 4. Cleaning up old backend directory...
if exist "backend" (
    rmdir /s /q "backend"
    echo Deleted old backend folder.
)

echo 5. Cleaning up old assets directory (since it is moved to public)...
if exist "assets" (
    rmdir /s /q "assets"
    echo Deleted old assets folder.
)

echo ==============================================
echo Cleanup completed successfully!
echo Next.js workspace is now clean and organized.
echo ==============================================
pause
