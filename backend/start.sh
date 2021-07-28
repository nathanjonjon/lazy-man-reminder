#!/bin/bash
python manage.py migrate
python manage.py createsuperuser --no-input --username=admin --email=nathan_cona@yahoo.com.tw
# python manage.py shell < create_user_moment_data_script.py
python manage.py runserver 0.0.0.0:8000