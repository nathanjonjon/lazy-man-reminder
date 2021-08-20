# Lazy Man Reminder

## Table of contents
* [General info](#general-info)
* [Project Structure](#project-structure)
* [Technologies](#technologies)
* [Usage](#usage)

## General Info
A full-stack project for users to create todo list where they can create tasks, set deadlines and change the status of the tasks. There is a reminder implemented with `WebSocket` that notifies the users that a task failed when it remains undone with the deadline expired.
![](https://github.com/nathanjonjon/lazy-man-reminder/blob/main/todo.png)


## Project Structure
- `backend` : Web app implemented with Django Rest Framework.
- `frontend` : Webpage and UI implemented with React.
- `docker-compose.yml` : Configuration of development environment that consists of 4 services
  1. redis
  2. web
  3. frontend
  4. django-q

## Technologies
Project is created with:
* React
* Django Rest Framework
* WebSocket / Django Channels
* Django-Q

## Usage
- To run this project, install it locally using `docker-compose`
  ```
  $ docker-compose build
  $ docker-compose up
  ```
- Open your browser, go to `http://localhost:3000/` and log in as `nathan` with password: `lazyman`
- For more details, go to `http://localhost:8000/playground` and play with the Swagger API document
