#!/bin/bash

jest --clearCache
if [ -n "$1" ]; then
   # if test argument is provided, run single test
   jest --watch "$1"
else
   # otherwise run full test
   jest --watchAll
fi
