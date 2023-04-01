mycoursescli
============

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)

<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ cd mycoursescli
$ npm install
$ ./bin/run COMMAND
running command...
$ mycoursescli (-v|--version|version)
mycoursescli/1.0.0 win32-x64 node-v18.12.1
$ mycoursescli --help [COMMAND]
USAGE
  $ mycoursescli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`./bin/run add ENTITY`](#./bin/run-add-entity)
* [`./bin/run courses`](#./bin/run-courses)
* [`./bin/run help [COMMAND]`](#./bin/run-help-command)
* [`./bin/run lessons`](#./bin/run-lessons-entity)
* [`./bin/run login`](#./bin/run-login-name)
* [`./bin/run logout`](#./bin/run-logout)
* [`./bin/run update ENTITY`](#./bin/run-update-entity)

## `add ENTITY`

Добавить курс или лекцию в базу данных

```
USAGE
  $ ./bin/run add ENTITY

ARGUMENTS
  ENTITY  (course|lesson) Тип добавленного объекта
```

## `courses`

Отображение доступных курсов

```
USAGE
  $ ./bin/run courses
```

## `help [COMMAND]`

Показать справку

```
USAGE
  $ ./bin/run help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

## `lessons`

Отображение доступных лекций в курсе

```
USAGE
  $ ./bin/run lessons

```

## `login`

Авторизация

```
USAGE
  $ ./bin/run login
```

## `logout`

Деавторизация

```
USAGE
  $ ./bin/run logout
```

## `update ENTITY (course or lesson)`

Обновить курс или лекцию

```
USAGE
  $ ./bin/run update course
  $ ./bin/run update lesson

ARGUMENTS
  ENTITY     (course|lessons) Тип обновленного объекта
   course  курс
   lesson  лекция
```
<!-- commandsstop -->
