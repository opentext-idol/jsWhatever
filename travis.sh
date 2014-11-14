#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]]
  grunt default push-doc
else
  grunt
fi