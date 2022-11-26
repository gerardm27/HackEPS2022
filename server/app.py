from flask import Flask

app = Flask(__name__)

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://rd001:PUe7nhnH@blackbox.insdosl.com/postgress'
db = SQLAlchemy(app)


@app.route('/')
def hello_world():
    return "Hello World"

class Test(db.Model):
    __tablename__ = 'blackbox."test"'
    id = db.Column(db.Integer, primary_key = True)
    geom = db. Column(db.String(400), nullable = False)
    description = db.Column(db.String(300), nullable = False)
    photo = db.Column(db.String(300), nullable = False)

    def __repr__(self):
        return "<Test %r>" % self.geom

if __name__ == '__main__':
  app.run(debug=True)
