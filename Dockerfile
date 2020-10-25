FROM python:3

ENV PYTHONUNBUFFERED 1
ENV IMPACT_SECRET_KEY "<SECRET_KEY>"
# ENV RUNNING_DOCKER true
ENV REDIS_URL "redis://redis:6379"

RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt install -y nodejs
RUN npm run build

RUN apt-get update && apt-get install -y gettext


CMD [ "python", "manage.py", "start" ]
