#!/bin/bash

# combine css and js files
cat vendor/bootstrap/css/bootstrap.css css/agency.css vendor/font-awesome/css/font-awesome.css css/fonts.css > css/all.css
cat js/vendors.min.js js/agency.js > js/all.js

# minify css and js
minify -o css/all.min.css css/all.css
minify -o js/all.min.js js/all.js
