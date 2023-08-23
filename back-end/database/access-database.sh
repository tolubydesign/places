#!/bin/bash
# set -e
echo Accessing docker container with name as root?:
read container_name

echo What is the password?:
read container_password

docker exec -it $container_name mariadb --user root -p$container_password -h localhost
