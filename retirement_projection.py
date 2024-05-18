def calculate_retirement_savings():
    # User data
    user_data = {
        'retirement_age': 65,
        'current_age': 30,
        'income': 100000,
        'percentage_saved': 0.10,
        'retirement_savings': 50000,
        'life_expectancy': 85
    }

    def calculate_retirement_savings(user_data):
        retirement_age = user_data['retirement_age']
        current_age = user_data['current_age']
        income = user_data['income']
        percentage_saved = user_data['percentage_saved']
        interest_rate = 0.0575

        years_to_retirement = retirement_age - current_age
        retirement_savings = user_data['retirement_savings']
        retirement_savings_dict = {current_age: retirement_savings}

        for year in range(current_age + 1, retirement_age):
            # Add income for the current year
            retirement_savings += income * percentage_saved
            # Apply interest rate
            retirement_savings *= (1 + interest_rate)
            # Store the retirement savings for the current year in the dictionary
            retirement_savings_dict[year] = retirement_savings

        return retirement_savings_dict


    # Calculate retirement savings
    retirement_savings_dict = calculate_retirement_savings(user_data)

    # This function will calculate the amount of money you can spend after retirement per year depending on however long you live
    def calculate_retirement_spending(user_data, retirement_savings_dict):
        retirement_age = user_data['retirement_age']
        life_expectancy = user_data['life_expectancy']
        total_retirement_savings = retirement_savings_dict[retirement_age - 1]
        years_alive = life_expectancy - retirement_age

        retirement_spending = total_retirement_savings / years_alive
        return retirement_spending


    # Calculate retirement spending
    retirement_spending = calculate_retirement_spending(user_data, retirement_savings_dict)
    return float(retirement_spending), retirement_savings_dict
