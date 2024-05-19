import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import yfinance as yf
import datetime
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout


# Load Data
def load_data(company, start, end):
    data = yf.download(company, start=start, end=end)
    return data


# Prepare Data
def prepare_data(data, prediction_days):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data['Close'].values.reshape(-1, 1))

    x_train = []
    y_train = []

    for x in range(prediction_days, len(scaled_data)):
        x_train.append(scaled_data[x - prediction_days:x, 0])
        y_train.append(scaled_data[x, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    return x_train, y_train, scaler


# Build Model
def build_model(input_shape):
    model = Sequential()

    model.add(LSTM(units=50, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50))
    model.add(Dropout(0.2))
    model.add(Dense(units=1))

    model.compile(optimizer='adam', loss='mean_squared_error')
    return model


# Predict Future Prices
def predict_future(model, data, scaler, prediction_days):
    data = data.values.reshape(-1, 1)
    scaled_data = scaler.transform(data)

    x_test = []

    for x in range(prediction_days, len(scaled_data)):
        x_test.append(scaled_data[x - prediction_days:x, 0])

    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

    predicted_prices = model.predict(x_test)
    predicted_prices = scaler.inverse_transform(predicted_prices)

    return predicted_prices


# Save to CSV
def save_to_csv(actual_prices, predicted_prices, filename):
    # Ensure the arrays are of the same length
    actual_prices = actual_prices[-len(predicted_prices):]

    df = pd.DataFrame({
        'Actual Prices': actual_prices,
        'Predicted Prices': predicted_prices.flatten()
    })
    df.to_csv(filename, index=False)


# Main
if __name__ == "__main__":
    company = 'TSLA'
    start = datetime.datetime(2000, 1, 1)
    end = datetime.datetime(2020, 1, 1)

    # Load and prepare data
    data = load_data(company, start, end)
    prediction_days = 5
    x_train, y_train, scaler = prepare_data(data, prediction_days)

    # Build and train model
    model = build_model((x_train.shape[1], 1))
    model.fit(x_train, y_train, epochs=2, batch_size=32)

    # Predict future prices
    test_start = datetime.datetime(2020, 1, 1)
    test_end = datetime.datetime.now()
    test_data = load_data(company, test_start, test_end)
    actual_prices = test_data['Close'].values
    predicted_prices = predict_future(model, test_data['Close'], scaler, prediction_days)

    # Save predictions to CSV
    save_to_csv(actual_prices, predicted_prices, 'data/prices.csv')

    # Plot predictions
    plt.plot(actual_prices[-len(predicted_prices):], color='black', label=f'Actual {company} Price')
    plt.plot(predicted_prices, color='green', label=f'Predicted {company} Price')
    plt.title(f'{company} Share Price')
    plt.xlabel('Time')
    plt.ylabel(f'{company} Share Price')
    plt.legend()
    plt.show()

    # Predict next day price
    model_inputs = scaler.transform(test_data['Close'].values.reshape(-1, 1))
    real_data = [model_inputs[len(model_inputs) + 1 - prediction_days:len(model_inputs) + 1, 0]]
    real_data = np.array(real_data)
    real_data = np.reshape(real_data, (real_data.shape[0], real_data.shape[1], 1))

    prediction = model.predict(real_data)
    prediction = scaler.inverse_transform(prediction)
    print(f'Next day prediction: {prediction[0][0]}')
