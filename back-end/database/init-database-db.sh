#!/bin/bash
# set -e
echo "Initalising database bash"
# mysql -h { hostname } -u { user } database < path/to/test.sql
# sudo mariadb -h localhost -u root -c "$(cat $PWD/database/preload.sql)"\

# Create database
# https://stackoverflow.com/questions/2428416/how-to-create-a-database-from-shell-command
echo "create database mariadatabase" | sudo mariadb -u root -p -h localhost
# alt: echo "create database `database-name`" | mysql -u username -p
# Create database and user with access to that database
# alt: mysql -u base_user -pbase_user_pass -e "create database new_db; GRANT ALL PRIVILEGES ON new_db.* TO new_db_user@localhost IDENTIFIED BY 'new_db_user_pass'"

# Import into SQL Database
# https://www.digitalocean.com/community/tutorials/how-to-import-and-export-databases-in-mysql-or-mariadb
sudo mariadb -u root -p mariadatabase < $PWD/database/preload.sql
