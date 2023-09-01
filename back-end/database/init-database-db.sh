#!/bin/bash
# set -e
echo "Initalising database bash"

read -p "What is the name of the docker container?: " container_name
container_name=${container_name:-placesmariadbcontainer}
echo $container_name

read -p "What is the password?: " container_password
container_password=${container_password:-secret}
echo $container_password

db="mydb"

# Connect with a mariadb that has not been created by docker.
# echo "create database if not exists mariadatabase" | sudo mariadb -u root -p -h localhost
# sudo mariadb -u root -p mariadatabase < $PWD/database/preload.sql

# Update docker container
# Create database
echo "create database if not exists mariadatabase" | sudo docker exec -i $container_name mariadb --user root -p$container_password -h localhost

# Import into SQL Database
sudo docker exec -i $container_name mariadb -u root -p$container_password mariadatabase < $PWD/database/preload.sql
