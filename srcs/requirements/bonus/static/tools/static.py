from flask import Flask, render_template

app = Flask(__name__, template_folder='/var/www/html')

@app.route('/')
def index():
    welcome = 'Welcome to my simple static Flask page'
    numbers = ['one', 'two', 'three', 'four', 'five']
    return render_template('index.html', welcome=welcome, numbers=numbers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
