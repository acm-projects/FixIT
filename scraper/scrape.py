import requests
from bs4 import BeautifulSoup
import json

def scrape_article(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    article = {}

    # Extract article title
    article['article title'] = soup.find('h1', class_='gutter-top').text.strip()

    # Extract tags
    tags = soup.find('div', id='ctl00_ctl00_cpContent_cpContent_divTags')
    article['tags'] = [tag.text.strip() for tag in tags.find_all('a')] if tags else []

    # Extract sections
    sections = []
    content = soup.find('div', class_='col-md-8')
    for header in content.find_all(['h2', 'h3']):
        section = {
            'section title': header.text.strip(),
            'section text': '',
            'images': []  # To store images in each section
        }
        for sibling in header.next_siblings:
            if sibling.name in ['h2', 'h3']:
                break
            if sibling.name:
                section['section text'] += sibling.text.strip() + '\n'

            # Check for images inside paragraphs, list items, etc.
            if sibling.name in ['p', 'ul', 'li', 'div']:  # Add blocks like <ul>, <li>, <p>, and <div>
                # Look for images in these blocks
                images = sibling.find_all('img')
                for img in images:
                    img_url = img.get('src')
                    if img_url:  # Ensure there is an image source
                        section['images'].append(img_url)

        sections.append(section)

    article['sections'] = sections

    return article

article_urls = ["https://atlas.utdallas.edu/TDClient/30/Portal/Requests/ServiceDet?ID=177",
                "https://atlas.utdallas.edu/TDClient/30/Portal/KB/ArticleDet?ID=850",
                "https://atlas.utdallas.edu/TDClient/30/Portal/KB/ArticleDet?ID=152",
                "https://atlas.utdallas.edu/TDClient/30/Portal/KB/ArticleDet?ID=279",
                "https://atlas.utdallas.edu/TDClient/30/Portal/KB/ArticleDet?ID=4",]

# Save to JSON file
i = 0
for article_url in article_urls:
    scraped_article = scrape_article(article_url)
    with open("scraped_article_" + str(i) + ".json", 'w', encoding='utf-8') as f:
        json.dump(scraped_article, f, ensure_ascii=False, indent=2)
    i += 1

print("Scraping completed. Data saved to scraped_article.json")