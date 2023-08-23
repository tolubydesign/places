#!/bin/bash
# set -e
echo "Initalising database bash"
echo What is the name of the docker container?:
read container_name

echo What is the password?:
read container_password

db="mydb"

# Connect with a mariadb that has not been created by docker.
# echo "create database if not exists mariadatabase" | sudo mariadb -u root -p -h localhost
# sudo mariadb -u root -p mariadatabase < $PWD/database/preload.sql

# Update docker container
# Create database
echo "create database if not exists mariadatabase" | sudo docker exec -i $container_name mariadb --user root -p$container_password -h localhost

# Import into SQL Database
sudo docker exec -i $container_name mariadb -u root -p$container_password mariadatabase < $PWD/database/preload.sql
