# Calculate Risk Tolerance from questionnaire (All 1-10) find the total number, and then from that we can separate into 3 groups
# How experienced are you with investing? 
# How comfortable are with taking financial risks?
# How important is it for you to achieve high returns, even if it means taking on more risk? 
# How long do you plan to keep your investments before needing to access the funds? 
# How would you feel if your investment lost 20% of its value in a short period
# How stable is your income? 
# How manageable are your current debt levels? 
# How stressed do you get when thinking about financial losses? 
# Assist client in deciding what type of investment to go into
# Bonds for lower risk tolerance(0-32)
# Stocks for medium risk tolerance (32-63)
# Penny Stocks for High Risk Tolerance (64-80)

def calculate_risk_tolerance(user_data):
    risk_tolerance = 0
    risk_tolerance += user_data['experience_investing']
    risk_tolerance += user_data['comfort_with_risk']
    risk_tolerance += user_data['importance_of_returns']
    risk_tolerance += user_data['investment_horizon']
    risk_tolerance += user_data['reaction_to_loss']
    risk_tolerance += user_data['income_stability']
    risk_tolerance += user_data['debt_level']
    risk_tolerance += user_data['stress_level']
    
    return risk_tolerance

# User data
user_data = {
    'experience_investing': 5,
    'comfort_with_risk': 8,
    'importance_of_returns': 7,
    'investment_horizon': 6,
    'reaction_to_loss': 4,
    'income_stability': 7,
    'debt_level': 6,
    'stress_level': 5
}

# Calculate risk tolerance
risk_tolerance = calculate_risk_tolerance(user_data)
print(f"Risk Tolerance: {risk_tolerance}")

# Determine investment type based on risk tolerance
if risk_tolerance <= 32:
    print("Low Risk Tolerance: Consider the following investments:")
    print("- Government Bonds")
    print("- Municipal Bonds")
    print("- High-Quality Corporate Bonds")
    print("- Certificate of Deposits (CDs)")
    print("- Money Market Funds")
elif risk_tolerance <= 63:
    print("Medium Risk Tolerance: Consider the following investments:")
    print("- Blue-chip Stocks")
    print("- Diversified Mutual Funds")
    print("- Exchange-Traded Funds (ETFs)")
    print("- Real Estate Investment Trusts (REITs)")
    print("- Dividend-Paying Stocks")
else:
    print("High Risk Tolerance: Consider the following investments:")
    print("- Penny Stocks")
    print("- Emerging Market Stocks")
    print("- Cryptocurrency")
    print("- Small-Cap Stocks")
    print("- High-Yield Bonds")