from flask import Flask, render_template,send_file

app = Flask(__name__)

@app.route('/manifest.json')
def serve_manifest():
    return send_file ('manifest.json', mimetype='application/manifest+json')

@app.route('/service_worker.js')
def serve_sw():
    return send_file('service_worker.js', mimetype='application/javascript')

@app.route('/')
def home():
    return render_template('index.html')

app.run(host=('0.0.0.0'))


