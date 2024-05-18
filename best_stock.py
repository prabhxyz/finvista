import stock_advice

followed_companies = ["Samsung", "Apple", "Microsoft"]

# Generate a summary prompt
summary_prompt = "Provide investment advice for the following companies based on the given points:"

# Collect stock advice for each company and add it to the prompt
for company in followed_companies:
    advice = stock_advice.get_stock_advice(company)
    summary_prompt += f"\n\n{company}:\n{advice}"

# Print the final prompt
print(summary_prompt)

# Get and print the final investment advice
answer = stock_advice.create_advice(summary_prompt)
print("\nInvestment Advice:")
print(answer)
