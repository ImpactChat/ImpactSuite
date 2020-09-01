# ImpactSuite

## Table of content
 - [Installation](#installation) 
   - [Using docker](#installation-with-docker)
   - [Manually](#manual-installation)

## Installation

### Installation with docker

#### 0 - Install docker
See the [docker installation docs](https://docs.docker.com/get-docker/)

#### 1 - docker-compose.yml
Create a `docker-compose.yml` file with the following content:
```yml
version: '2.0'

services:
  redis:
    image: redis
    container_name: redis

  postgres:
    image: postgres
    container_name: postgres
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres

  web:
    image: impactsuite/impact-suite
    ports:
      - "8000:8000"
    depends_on:
      - redis
      - postgres
```

#### 2 - Start docker
Run `docker-compose up`

#### 3 - Updating
To uupdate the image, run `docker pull impactsuite/impact-suite`

### Manual installation

#### 0 - Set the secret key variable
 - OSX/Linux
   - `export IMPACT_SECRET_KEY=secret_key`
 - Windows
   - `set IMPACT_SECRET_KEY=secret_key`

#### 1 - Start a REDIS instance
 - OSX - with [brew](https://brew.sh/)
    - `brew install redis`  
    - `brew services start redis`  
 - Linux
    - `sudo apt update`
    - `sudo apt install redis-server`
    - `sudo systemctl restart redis.service`
    - I didn't test this
 - Other
    - Get a redis server running at localhost 6379,
 - If you what you're doing change `CHANNEL_LAYERS` entry in `settings.py`

#### 2 - Start a database instance
 - SQLite3
    - Change to `DATABASES` entry in `settings.py` to:
    ```py
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3'
            }
        }
    ```
    - Note: SQLite3 probably shouldn't be used in production (but that depends on you)
 - PostgreSQL
   - Change to `DATABASES` entry in `settings.py` to:
    ```py
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'dbname',
            'USER': 'dbuser',
            'PASSWORD': 'dbpassword',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    }
    ```
    - OSX - with [brew](https://brew.sh/)
      - Install:
      - `brew install postgresql`
      - `brew services start postgresql`
      - List available databases:
      - `psql -l`
      - Create a database:
      - `psql`
      - `username=# CREATE DATABASE dbname`

#### 3 - Make the translations
 - `python3 manage.py makemessages -l fr -l en -i "env/*"` (Optional)  
 - `python3 manage.py compilemessages`

#### 4 - Compile React
 - `cd ui-components`
 - `npm i`
 - `npm run build-web`  
 OR 
 - `npm run watch-web`  
 OR 
 - Download the latest build from github actions
 - Unzip
 - Put the dist folder in a folder called static at the top level of your project

#### 5 - Collect static files (prod only)
 - `python3 manage.py collectstatic`  

#### 6 - Create a super user
 - `python3 manage.py createsuperuser`

#### 7 - Make migrations
 - `python3 manage.py makemigrations`
 - `python3 manage.py migrate`

#### 8 - Start server
 - `python3 manage.py runserver 0.0.0.0:8000`

