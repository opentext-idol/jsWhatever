#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]]
then
  grunt default push-doc
else
  grunt
fi