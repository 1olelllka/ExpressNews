from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os
import pika
import json

load_dotenv()

connection_parameters = pika.ConnectionParameters('localhost')  # Replace with your hostname/IP if different
class Scraping:
    def __init__(self, url):
        self.src_url = url
        self.client = MongoClient(os.environ['DATABASE_URL'])

    def stories_scraping(self):
        page = requests.get(url=self.src_url)
        soup = BeautifulSoup(page.text, 'html.parser')
        pages = soup.find_all('a', attrs={'class':'container__link--type-article'})

        for i in pages:
            print('Processing: ' + self.src_url + i.attrs['href'])
            try:
                self.story_scraping(self.src_url + i.attrs['href'])
            except:
                print('Error: ' + self.src_url + i.attrs['href'])
        
        print('Successfully fetched and sent to RabbitMQ')

    def story_scraping(self, url):
        page = requests.get(url=url)
        soup = BeautifulSoup(page.text, 'html.parser')

        header = soup.find('h1', attrs={'class':'headline__text inline-placeholder'}).text.strip()
        author = soup.find('div', attrs={'class':'byline__names'}).text.strip()
        date = soup.find('div', attrs={'class':'timestamp'}).text.strip()
        image = soup.find('img', attrs={'class':'image__dam-img'})
        article_content = soup.find_all('p', attrs={'class':'paragraph inline-placeholder'})
        category_link = soup.find('a', attrs={'class':'brand-logo__theme-link'})
        category = category_link.attrs['href'].split('/')[-1]

        content = ''
        for j in article_content:
            content += j.text.strip()

        post = {
        "header": str(header),
        "author": str(author),
        "date": ' '.join(str(date).split()),
        "image": str(image.attrs['src']) if image else '',
        "content": str(content),
        "source": str(self.src_url)[8:-1],
        'category':str(category) if category else '',
        }
        
        connection = pika.BlockingConnection(connection_parameters)

        channel = connection.channel()
        channel.queue_declare(queue='news_updates', durable=True)

        channel.basic_publish(exchange='', routing_key='news_updates', body=json.dumps(post))
        db = self.client.get_database('ExpressNews')
        db.stories.insert_one(post)
        print(" [x] Sent %r" % post)
        connection.close()

    def category_scraping(self):
        page = requests.get(url=self.src_url)
        soup = BeautifulSoup(page.text, 'html.parser')

        link = soup.find_all('a', attrs={'class':'header__nav-item-link'})
        for i in link:
            if i.text.strip() != 'More':
                db = self.client.get_database('ExpressNews')
                db.categories.insert_one({"name": i.text.strip()})
    
    
# RUN

scraping = Scraping('https://edition.cnn.com')
# Categories Scraping
# scraping.category_scraping()

# Stories Scraping
scraping.stories_scraping()