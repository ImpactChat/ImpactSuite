from flask import Flask

app = Flask(__name__, static_folder='../frontend/impactchat/build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')

## Demonstrate multi-file
@app.route('/example')
def example():
    return app.send_static_file('index.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0")