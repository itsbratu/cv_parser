FROM ubuntu:22.04

WORKDIR /app

RUN apt update -y
RUN apt install python3.10 python3-pip libreoffice -y -q

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

EXPOSE 8000

CMD uvicorn main:app --reload --host 0.0.0.0   