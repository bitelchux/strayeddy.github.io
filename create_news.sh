#!/bin/bash

NAME=$1

FILENAME=${NAME,,}
echo $FILENAME
FILENAME=${FILENAME// /-}
echo $FILENAME
FILENAME=${FILENAME/'?'/}
echo $FILENAME

# copy latest news
cp -rf "news/the-importance-of-friendship-en.html" "news/$FILENAME-en.html"
cp -rf "news/the-importance-of-friendship-fr.html" "news/$FILENAME-fr.html"

### modify english version

# replace title
sed -i "s/The importance of friendship/$1/g" "news/$FILENAME-en.html"

# replace html
sed -i "s/the-importance-of-friendship/$FILENAME/g" "news/$FILENAME-en.html"
sed -i "s/the-importance-of-friendship/$FILENAME/g" "news/$FILENAME-fr.html"

#replace image number
NB=$(ls news/*-fr.html | wc -l)
NB+=".jpg"
sed -i "s/17.jpg/$NB/g" "news/$FILENAME-en.html"
sed -i "s/17.jpg/$NB/g" "news/$FILENAME-fr.html"

