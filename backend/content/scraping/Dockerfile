FROM python:3.10

RUN mkdir /content
WORKDIR /content

COPY requirements.txt /content
RUN pip install -r requirements.txt

COPY . /content/

CMD ["python", "scraping.py"]