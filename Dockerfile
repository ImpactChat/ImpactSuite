FROM python:3

ENV PYTHONUNBUFFERED 1
ENV IMPACT_SECRET_KEY "<SECRET_KEY>"
ENV RUNNING_DOCKER true
ENV REDIS_URL "redis:6379"

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

RUN apt-get update && apt-get install -y gettext

RUN python manage.py compilemessages
RUN python manage.py collectstatic

ENTRYPOINT [ "sh", "docker-entrypoint.sh" ]
