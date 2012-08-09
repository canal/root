cd ..\1.0.0.0\js
set combressed_folder=..\
set combressed_file=idxm-create-all-min.js
copy/b nul %combressed_folder%\%combressed_file%
copy/b empty.js %combressed_folder%\%combressed_file%
set YUI_LIB_PATH="\\nyc-fs-03\_portal\software\yuiCompressor\2.4.2\build\yuicompressor-2.4.2.jar"
for /r %%f in ( "*.js" ) do copy/b %combressed_folder%\%combressed_file% +"%%f" "%combressed_folder%\%combressed_file%"
java -jar %YUI_LIB_PATH% --type js -o %combressed_folder%\%combressed_file% %combressed_folder%\%combressed_file%
