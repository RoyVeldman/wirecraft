# Wirelab Default Craft Installation

## Build instructions
1. `composer create-project roy-veldman/wirecraft [projectname]`
2. `cd` into the project
3. create database
   - `mysql -u [username]` (add `-p` if you have a password)
   - `create database [database-name];`
4. run `./craft setup/index`
5. run `composer update`
6. copy the env file and fill this in
   - `cp .env.example .env`
7. run `npm run dev`
8. Login to the back-end
   - Setup the homepage
   - Go to settings -> plugins, and install the plugins

_By Roy Veldman_