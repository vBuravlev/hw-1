Вариант 1 "Запуск в докер контейнерах"
1. Выполнить скачивание образа node.js - `docker pull node:18.14-alpine`
2. Выполнить скачивание образа бд - `docker pull mongo:latest`
3. Запустить файл docker compose - `docker-compose up -d`
4. Открыть сайт по адресу http://localhost:3000

P.S. Если возникли трудности с открытие сайта через http в google chrome, то необходимо перейти в "chrome://net-internals/#hsts" и удалить "localhost"

Вариант 2 "Запуск локально"
1. Установить базу данных mongodb локально
2. Запустить базу данных 
3. Установить пакеты npm для сервера `npm i`
4. Запустить приложение `npm run first-start`
5. Открыть сайт по адресу http://localhost:3000

