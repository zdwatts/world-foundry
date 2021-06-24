FROM node:12 AS build-stage

WORKDIR /client
COPY client/. .

ENV REACT_APP_BASE_URL=https://world-foundry.herokuapp.com/

RUN npm install
RUN npm run build

FROM python:3.8

ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 5000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /client/build/* app/static/

RUN pip install -r requirements.txt
RUN pip install psycopg2

CMD gunicorn app:app
