## Description
NestJS TypeORM API with JWT authentication

## Installation
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Running the app in Docker container
```bash
docker-compose up
```

## OpenAPI (Swagger)
Go url-adress/docs to use swagger for API docs

## Environment file (.env)
```bash
DB_HOST = root
DB_PORT = root
DB_USERNAME = root
DB_PASSWORD = root
DB_NAME = root
DB_ENTITIES_DIR = "dist/**/*.entity.js"

SECRET_KEY_JWT = "secretOrKey"
PRIVATE_JWT_KEY = "private"
```