FROM python:3.7
ENV PYTHONUNBUFFERED 1

# For Mac M1 compatibility
ENV BLIS_ARCH generic

RUN apt-get update

# sqlite3 CLI
RUN apt-get install -y sqlite3 libsqlite3-dev

WORKDIR /backend
COPY . /backend

# Install other requirements
RUN pip install -r requirements.txt

ENV DJANGO_SETTINGS_MODULE lazy_man_reminder.settings
ENV DJANGO_SUPERUSER_PASSWORD lazyman

EXPOSE 8000
EXPOSE 3000
EXPOSE 6379


