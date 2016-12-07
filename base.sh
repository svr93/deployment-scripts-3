#!/usr/bin/env bash

# default project name
projectName='__project'

while [[ "$1" != "" ]]; do
    case $1 in
        -name )                     shift
                                    projectName=$1
                                    ;;

        * )                         echo 'error: bad param'
                                    ;;
    esac
    shift
done

projectDir='../'${projectName}

mkdir ${projectDir}

cp example-.gitignore ${projectDir}'/.gitignore'

mkdir ${projectDir}'/client'

srcDir=${projectDir}'/client/src'
mkdir ${srcDir}
