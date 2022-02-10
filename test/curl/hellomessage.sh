#!/bin/bash
curl --insecure https://localhost:12175/hello > helloactual.txt
var=$(diff helloactual.txt helloexpected.txt)
if [ "$var" == "" ] 
then
	echo 0
else
	echo 1
fi
