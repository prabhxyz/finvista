import numpy as np
import pandas as pd
import yfinance as yf
import datetime
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM, Dropout
import json

def stock_price_prediction_to_json(company):
    def load_data(company, start, end):
        data = yf.download(company, start=start, end=end)
        return data

    def prepare_data(data, prediction_days):
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(data['Close'].values.reshape(-1, 1))

        x_train = []
        y_train = []

        for x in range(prediction_days, len(scaled_data) - 1):
            x_train.append(scaled_data[x - prediction_days:x, 0])
            y_train.append(scaled_data[x, 0])  # Predict the next day's price

        x_train, y_train = np.array(x_train), np.array(y_train)
        x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

        return x_train, y_train, scaler

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

    def predict_future(model, data, scaler, prediction_days):
        data = data.values.reshape(-1, 1)
        scaled_data = scaler.transform(data)

        x_test = [scaled_data[-prediction_days:]]

        x_test = np.array(x_test)
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))

        predicted_prices = []
        for _ in range(3):  # Predict the next 3 days
            pred_price = model.predict(x_test)
            predicted_prices.append(pred_price[0, 0])
            x_test = np.append(x_test[:, 1:, :], [[pred_price]], axis=1)

        predicted_prices = np.array(predicted_prices).reshape(-1, 1)
        predicted_prices = scaler.inverse_transform(predicted_prices)

        return predicted_prices.flatten()

    end = datetime.datetime.now()
    start = end - datetime.timedelta(days=5*365)

    data = load_data(company, start, end)
    prediction_days = 3
    x_train, y_train, scaler = prepare_data(data, prediction_days)

    model = build_model((x_train.shape[1], 1))
    model.fit(x_train, y_train, epochs=2, batch_size=32)

    predicted_prices = predict_future(model, data['Close'], scaler, prediction_days)

    future_dates = [end + datetime.timedelta(days=i) for i in range(1, 4)]
    df = pd.DataFrame({
        'Date': future_dates,
        'Predicted Prices': predicted_prices
    })

    # Convert DataFrame to a list of dictionaries
    json_records = df.to_dict(orient='records')

    # Adding metadata for better JSON structure
    result = {
        "company": company,
        "prediction_days": prediction_days,
        "data": json_records
    }

    # Convert the result to a JSON string with indentation
    json_data = json.dumps(result, indent=4, default=str)
    return json_data
