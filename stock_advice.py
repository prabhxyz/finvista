import google.generativeai as genai
from api_keys import gemini_key
import get_latest_links

def create_advice(the_prompt):
    model = genai.GenerativeModel('gemini-1.0-pro-latest')
    response = model.generate_content(the_prompt)
    return response.text

def get_stock_advice(company):
    genai.configure(api_key = gemini_key)

    latest_news_links = get_latest_links.get_latest_news_links(company)[:10]

    prompt = f"Can you summarize only the links below in a few bullet points? ONLY use the information in the links."

    for idx, link in enumerate(latest_news_links, start=1):
        print(f"{idx}. {link}")
        prompt += "\n" + f"{idx}. {link}"

    print("------------------")
    return create_advice(prompt)

print(get_stock_advice("Samsung"))