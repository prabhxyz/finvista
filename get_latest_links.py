import requests
from bs4 import BeautifulSoup

def get_latest_news_links(company_name):
    query = company_name.replace(' ', '+')
    url = f"https://news.google.com/search?q={company_name}&hl=en-CA&gl=CA&ceid=CA%3Aen"
    print(url)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return f"Failed to fetch news: {response.status_code}"

    soup = BeautifulSoup(response.text, 'html.parser')
    news_links = []

    for item in soup.find_all('article'):
        print(item)
        # parse div>div>a
        href = item.find('a')['href']
        # links start with ./ so we need to remove it and add news.google.com at the beginning
        if href.startswith("./"):
            href = f"https://news.google.com{href[1:]}"
            news_links.append(href)

    return news_links

"""
# Example usage
company_name = "Tesla"
latest_news_links = get_latest_news_links(company_name)

for idx, link in enumerate(latest_news_links, start=1):
    print(f"{idx}. {link}")
"""