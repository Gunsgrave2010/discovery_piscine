#!/bin/bash
if [ $# -eq 0 ]
then
	echo "No arguments supplied"
	exit
fi

count=0
for i in "$@"
do
	if [ $count -ge 3 ]; then
		break
	fi
	echo $i
	count=$((count+1))
done