from flask import Flask
app = Flask(__name__)


@app.route('/create_token', methods=['POST'])
def create_token():
    request_json = request.get_json()
    token_name = request_json['token_name'] # короткое имя токена
    token_full_name =  request_json['token_full_name'] # длинное имя токена
    exchange_rate = request_json['exchange_rate'] # курс обмена в эфир
    amount = request_json['amount'] # общее количество токенов
    dst_addr = request_json['dst_addr'] # куды закинуть токены
    # TODO: хуйню сделать


@app.route('/buy_token', methods=['POST'])
def buy_token():
    request_json = request.get_json()
    src_addr = request_json['src_addr']
    src_private_key = request_json['src_private_key']
    dst_addr = request_json['dst_addr']
    amount = request_json['amount']
    token_name = request_json['token_name']
    # TODO: хуйню сделать

@app.route('/list_tokens', methods=['GET'])
def list_tokens():
    # TODO: get tokens from blockchain
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=False)