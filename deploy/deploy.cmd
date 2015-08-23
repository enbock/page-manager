@echo off

echo Update gsutil...
call gsutil update

echo Upload corejs...
call gsutil cp -r ..\node_modules\corejs-w3c\src gs://page-manager.itbock.de/node_modules/corejs-w3c/
echo Upload project...
call gsutil cp -r ..\src gs://page-manager.itbock.de/
call gsutil cp -r ..\index.html gs://page-manager.itbock.de/index.html
call gsutil cp -r ..\favicon.ico gs://page-manager.itbock.de/favicon.ico

rem echo Set ACL to read for the world...
rem call gsutil -m acl ch -u AllUsers:R -r gs://page-manager.itbock.de

echo Deploy done.
pause