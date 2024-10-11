import requests
from bs4 import BeautifulSoup
import json

def scrape_article(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    article = {}

    # Extract article title
    try:
        article['article title'] = soup.find('h1', class_='gutter-top').text.strip()
    except Exception as e:
        print(f"Error extracting title: {str(e)}")

    # Extract tags
    try:
        tags = soup.find('div', id='ctl00_ctl00_cpContent_cpContent_divTags')
        article['tags'] = [tag.text.strip() for tag in tags.find_all('a')] if tags else []
    except Exception as e:
        print(f"Error extracting tags: {str(e)}")

    # Extract content
    try:
        content = soup.find('div', class_='col-md-8')
        if content:
            sections = []
            current_section = None

            for element in content.find_all(['h2', 'h3', 'p', 'ul', 'ol', 'img']):
                if element.name in ['h2', 'h3']:
                    if current_section:
                        sections.append(current_section)
                    current_section = {
                        'section title': element.text.strip(),
                        'section text': '',
                        'images': []
                    }
                elif element.name == 'img':
                    img_url = element.get('src')
                    if img_url and current_section:
                        current_section['images'].append(img_url)
                    elif img_url:
                        if 'images' not in article:
                            article['images'] = []
                        article['images'].append(img_url)
                else:
                    text = element.text.strip()
                    if current_section:
                        current_section['section text'] += text + '\n'
                    else:
                        if 'text' not in article:
                            article['text'] = ''
                        article['text'] += text + '\n'

            if current_section:
                sections.append(current_section)

            if sections:
                article['sections'] = sections
    except Exception as e:
        print(f"Error extracting content: {str(e)}")

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