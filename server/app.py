from flask import Flask

app = Flask(__name__)

import psycopg2


@app.route('/')
def hello_world():
    conn = psycopg2.connect(
        host="blackbox.insdosl.com",
        database="postgres",
        user="rd001",
        password="PUe7nhnH")
    cur = conn.cursor()
    cur.execute("SELECT * FROM blackbox.test")
    rows = cur.fetchall()
    return str(rows)

if __name__ == '__main__':
  app.run(debug=True)
