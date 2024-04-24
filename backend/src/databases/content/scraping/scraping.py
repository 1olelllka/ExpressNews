from bs4 import BeautifulSoup
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

class Scraping:
    def __init__(self, url):
        self.src_url = url
        self.client = MongoClient(os.environ['DATABASE_URL'])

    def stories_scraping(self):
        page = requests.get(url=self.src_url)
        soup = BeautifulSoup(page.text, 'html.parser')
        pages = soup.find_all('a', attrs={'class':'container__link--type-article'})

        for i in pages:
            print('Processing: ' + 'https://edition.cnn.com' + i.attrs['href'])
            try:
                self.story_scraping('https://edition.cnn.com' + i.attrs['href'])
            except:
                print("Error processing: " + 'https://edition.cnn.com' + i.attrs['href'])

    def story_scraping(self, url):
        page = requests.get(url=url)
        soup = BeautifulSoup(page.text, 'html.parser')

        header = soup.find('h1', attrs={'class':'headline__text inline-placeholder'}).text.strip()
        author = soup.find('div', attrs={'class':'byline__names'}).text.strip()
        date = soup.find('div', attrs={'class':'timestamp'}).text.strip()
        image = soup.find('img', attrs={'class':'image__dam-img'})
        article_content = soup.find_all('p', attrs={'class':'paragraph inline-placeholder'})
        category = soup.find('a', attrs={'class':'breadcrumb__parent-link'})
        subcategory = soup.find('a', attrs={'class':'breadcrumb__child-link'})

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
        'category':str(category.text.strip()) if category else '',
        'subcategory':str(subcategory.text.strip()) if subcategory else ''
        }
        db = self.client.get_database("ExpressNews")
        if db.stories.find_one({'header': post['header']}):
            return
        db.stories.insert_one(post)

    def category_scraping(self):
        page = requests.get(url=self.src_url)
        soup = BeautifulSoup(page.text, 'html.parser')

        def sub_category_scraping(url, name):
                page = requests.get(url=url)
                soup = BeautifulSoup(page.text, 'html.parser')

                to_db = {
                    'name': name,
                    'subcategories':[]
                }
                link = soup.find_all('a', attrs={'class':'header__nav-item-link'})

                exists = []
                for i in link:
                    if i.text.strip() != 'More' and i.text.strip() not in exists:
                        exists.append(i.text.strip())
                        to_db['subcategories'].append({
                            'name': i.text.strip(),
                        })
                
                db = self.client.get_database("ExpressNews")
                db.categories.insert_one(to_db)

        link = soup.find_all('a', attrs={'class':'header__nav-item-link'})
        for i in link:
            if i.text.strip() != 'More':
                sub_category_scraping(i.attrs['href'], i.text.strip()) 
    
    
# RUN

scraping = Scraping('https://edition.cnn.com/')
# Categories Scraping
# scraping.category_scraping()

# Stories Scraping
scraping.stories_scraping()