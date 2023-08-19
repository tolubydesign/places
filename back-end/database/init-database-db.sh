#!/bin/bash
# set -e
echo "Initalising database bash"
echo What is the name of the docker container:
read container_name

db="mydb"

# Connect with a mariadb that has not been created by docker.
# echo "create database if not exists mariadatabase" | sudo mariadb -u root -p -h localhost
# sudo mariadb -u root -p mariadatabase < $PWD/database/preload.sql

# Update docker container
# Create database
echo "create database if not exists mariadatabase" | sudo docker exec -i $container_name mariadb --user root -psecret -h localhost

# Import into SQL Database
sudo docker exec -i $container_name mariadb -u root -psecret mariadatabase < $PWD/database/preload.sql
