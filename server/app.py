from flask import Flask

app = Flask(__name__)

import psycopg2
import json

def create_connection():
    conn = psycopg2.connect(
        host="blackbox.insdosl.com",
        database="postgres",
        user="rd001",
        password="PUe7nhnH")
    cur = conn.cursor()
    return cur

# get all manhole, and canalitzations, 
# put status dels dos
# put image 
# post de qualsevol dels dos 

@app.route('/api/elements', methods=['GET']) # get All
def retrieve_all():
    cur = create_connection()
    cur.execute("SELECT id,ST_AsText(geom) as geom, code, description FROM blackbox.forats LIMIT 4")
    forats = cur.fetchall()
    foratFinal = []
    for forat in forats: 
        coords = str(forat[1])[6:].split(" ")
        lat = coords[0]
        lng = coords[1].strip(")")
        foratFinal.append(
            {
                'id': forat[0], 
                'lng' : lng,
                'lat' : lat,
                'code' : forat[2],
                'description' : forat[3],
            }
        )

    cur.execute("SELECT * FROM blackbox.canals LIMIT 4")
    canals = cur.fetchall()

    cur.close()
    return json.dumps({'forats': foratFinal, 'canals':canals})


if __name__ == '__main__':
  app.run(debug=True)
