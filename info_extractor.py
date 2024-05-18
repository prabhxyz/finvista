def extract_information(text):
  """
  Extracts company name, buy/sell/hold recommendation, and reason from text.

  Args:
    text: The text containing company information.

  Returns:
    A list of dictionaries, where each dictionary has keys:
      company: The company name.
      recommendation: The buy/sell/hold recommendation.
      reason: The reason for the recommendation.
  """
  companies = []
  for line in text.splitlines():
    if line.startswith("**"):
      company = line.strip("*")
      companies.append({"company": company[:-1]})
    elif line.startswith("-"):
      recommendation, reason = line[2:].split(":", 1)
      companies[-1]["recommendation"] = recommendation.strip()
      companies[-1]["reason"] = reason.strip()
  return companies

