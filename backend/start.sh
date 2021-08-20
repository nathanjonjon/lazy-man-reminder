#!/bin/bash
python manage.py migrate
python manage.py createsuperuser --no-input --username=nathan --email=nathan_cona@yahoo.com.tw
python manage.py runserver 0.0.0.0:8000