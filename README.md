# Wirelab Default Craft Installation

## Build instructions
1. `composer create-project roy-veldman/wirecraft [projectname]`
2. `cd` into the project
3. create database
   - `mysql -u [username]` (add `-p` if you have a password)
   - `create database [database-name];`
4. run `./craft setup/index`
5. run `composer update`
6. run `npm install`
7. run `npm run dev`
8. Login to the back-end
   - Setup the homepage
   - Go to settings -> plugins, and install the plugins
   
## Starting instructions
If you created a homepage on the back-end of craft, whether is a single page or a structure you can start with the code below.
* Example of the filename `pages/_entry.twig`

```twig
{% extends 'layouts/_master' %}

{% block content %}

      {# content comes here #} 

{% endblock %}
```
_By Roy Veldman_