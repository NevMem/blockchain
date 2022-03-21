FROM python:3.9

COPY src/ /app
WORKDIR /app

RUN python3 -m pip install -r requirements.txt

ENTRYPOINT ["python3"]
CMD ["main.py", "--port", "8080", "--host", "0.0.0.0"]
EXPOSE 8080
