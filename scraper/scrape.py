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
            'section text': ''
        }
        for sibling in header.next_siblings:
            if sibling.name in ['h2', 'h3']:
                break
            if sibling.name:
                section['section text'] += sibling.text.strip() + '\n'
        sections.append(section)

    article['sections'] = sections

    return article

# Example usage
article_url = "https://atlas.utdallas.edu/TDClient/30/Portal/KB/ArticleDet?ID=399"
scraped_article = scrape_article(article_url)

# Save to JSON file
with open('utdallas_article.json', 'w', encoding='utf-8') as f:
    json.dump(scraped_article, f, ensure_ascii=False, indent=2)

print("Scraping completed. Data saved to utdallas_article.json")