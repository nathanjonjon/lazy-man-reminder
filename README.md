# lazy-man-reminder

## Table of contents
* [General info](#general-info)
* [Project Structure](#project-structure)
* [Technologies](#technologies)
* [Usage](#usage)

## General Info
A full-stack project for users to create todo list with timer reminding them of deadlines of the tasks.
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
* Django Rest Frame Work
* Websocket / Django Channels
* Django-Q

## Usage
- To run this project, install it locally using `docker-compose`
  ```
  $ docker-compose build
  $ docker-compose up
  ```
- Open your browser, go to `http://localhost:3000/` and log in as admin with password: `lazyman`
- For more details, go to `http://localhost:8000/playground` and play with the Swagger API document
