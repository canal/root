set combressed_folder=..\1.0.0.0
xcopy/b ..\..\extensions\1.0.0.0\uradix-extensions-min.js %combressed_folder%\js /Y
xcopy/b ..\..\fileupload\1.0.0.0\uradix-fileupload-min.js %combressed_folder%\js /Y
xcopy/b ..\..\utilities\1.0.0.0\uradix-utilities-min.js %combressed_folder%\js /Y
xcopy/b ..\..\validation\1.0.0.0\uradix-validation-min.js %combressed_folder%\js /Y

cd ..\1.0.0.0\js
set combressed_folder=..\
set combressed_js_file=uradix-all-min.js
copy/b nul %combressed_folder%\%combressed_js_file%
copy/b empty.js %combressed_folder%\%combressed_js_file%
set YUI_LIB_PATH="\\nyc-fs-03\_portal\software\yuiCompressor\2.4.2\build\yuicompressor-2.4.2.jar"
for /r %%f in ( "*.js" ) do copy/b %combressed_folder%\%combressed_js_file% +"%%f" "%combressed_folder%\%combressed_js_file%"
java -jar %YUI_LIB_PATH% --type js -o %combressed_folder%\%combressed_js_file% %combressed_folder%\%combressed_js_file%


xcopy/b ..\..\..\extensions\1.0.0.0\css %combressed_folder%\css /E /Y
xcopy/b ..\..\..\fileupload\1.0.0.0\css %combressed_folder%\css /E /Y

cd ..\css
set combressed_folder=..\css
set combressed_css_file=uradix-all-min.css
copy/b nul %combressed_folder%\%combressed_css_file%
copy/b empty.css %combressed_folder%\%combressed_css_file%
set YUI_LIB_PATH="\\nyc-fs-03\_portal\software\yuiCompressor\2.4.2\build\yuicompressor-2.4.2.jar"
for /r %%f in ( "*.css" ) do copy/b %combressed_folder%\%combressed_css_file% +"%%f" "%combressed_folder%\%combressed_css_file%"
java -jar %YUI_LIB_PATH% --type css -o %combressed_folder%\%combressed_css_file% %combressed_folder%\%combressed_css_file%

set combressed_folder=..\images

xcopy/b ..\..\..\extensions\1.0.0.0\images %combressed_folder% /E /Y

