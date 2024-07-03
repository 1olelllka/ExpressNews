from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pika
import json
from newsapi import NewsApiClient
load_dotenv()

newsapi = NewsApiClient(api_key=os.environ['NEWS_API_KEY'])
connection_parameters = pika.ConnectionParameters(os.environ['RABBITMQ_URL'], credentials=pika.PlainCredentials(os.environ['RABBITMQ_USER'], os.environ['RABBITMQ_PASSWORD']))  # Replace with your hostname/IP if different
class Scraping:
    def __init__(self):
        self.client = MongoClient(os.environ['DATABASE_URL'])

    def source_scraping(self):
        sources = newsapi.get_sources(language='en')
        print(sources['sources'])
        for i in sources['sources']:
            db = self.client.get_database('ExpressNews')
            db.sources.insert_one(i)
            print(i['category'])
            if db.categories.count_documents({"name": i['category']}) == 1:
                continue
            db.categories.insert_one({"name": i['category']})
    
    def breaking_news(self):
        connection = pika.BlockingConnection(connection_parameters)
        channel = connection.channel()
        print(" [*] Waiting for messages. To exit press CTRL+C")
        channel.queue_declare(queue='breaking_news', durable=True)
        breaking_news = newsapi.get_top_headlines(language='en')
        print(len(breaking_news['articles']))
        for i in breaking_news['articles']:
            channel.basic_publish(exchange='', routing_key='breaking_news', body=json.dumps(i))
            print(" [x] Sent %r" % i['title'])
        connection.close()
    
    def news_scraping(self):
        db = self.client.get_database('ExpressNews')
        sources = newsapi.get_sources(language='en')
        for i in sources['sources']:
            news = newsapi.get_everything(sources=i['id'], language='en')
            for j in news['articles']:
                j['category'] = i['category']
                if db.stories.count_documents({"title": j['title']}) == 1:
                    continue
                db.stories.insert_one(j)
            # break       # ONLY FOR DEVELOPMENT (CALLS ARE LIMITED)
        


# RUN
scraping = Scraping()

# scraping.source_scraping()
scraping.breaking_news()
# scraping.news_scraping()