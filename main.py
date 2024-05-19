from flask import Flask, jsonify, request
from flask_cors import CORS
from best_stock import best_stock_advice

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return jsonify({"message": "Hello world!"})

# post
@app.get("/beststock")
def best_stock_res():
    companies = request.args.get('companies') 
    # split the companies by comma
    companies = companies.split(',')
    print('hello beta')
    res = best_stock_advice(*companies)
    
    return jsonify({"recc": res})
    


if __name__ == '__main__':
    app.run(debug=True)
