import stock_advice
import info_extractor

def best_stock_advice(*followed_companies):
    # A summary prompt
    summary_prompt = """Given the following bullet points regarding the companies' latest news, please write the investment advice for each company's stock. Follow these specific instructions:
    
    1. Provide the advice in bullet points.
    2. Do not include any product-related information.
    3. Use the exact format below for each company:
    
    Company Name:
    (Buy/Sell/Hold): Reasoning for the advice. Do not include any additional text or formatting outside the specified structure. Just Buy, Sell, or Hold.
    
    Ensure the output includes nothing more or less than specified. Only bold the Company Name. Do not add any additional text or formatting outside the specified structure.
    """
    links_data = {}
    # Collect stock advice for each company and add it to the prompt
    for company in followed_companies:
        advice, top_links = stock_advice.get_stock_advice(company)
        links_data[company] = top_links
        summary_prompt += f"\n\n{company}:\n{advice}"

    # Print the final prompt
    print(summary_prompt)
    print("-------------\n\n")
    # Get and print the final investment advice
    answer = stock_advice.create_advice(summary_prompt)
    print(answer)


    # Call the function and print the results
    print("-------------\n\n")
    companies_info = info_extractor.extract_information(answer)
    print(companies_info)
    return companies_info, links_data
