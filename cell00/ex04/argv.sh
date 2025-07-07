#!/bin/bash
if [ "$#" -eq "0" ]; then
    echo "No arguments supplied"
elif [ "$#" -eq "1" ]; then
    echo "$1"
elif [ "$#" -eq "2" ]; then
    echo "$2"
elif [ "$#" -eq "3" ]; then
    echo "$3"
fi