from flask import Flask, jsonify

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
    cur.execute("SELECT id,ST_AsText(geom) as geom, description, status, photo FROM blackbox.forats")
    forats = cur.fetchall()
    foratFinal = []
    for forat in forats: 
        coords = str(forat[1])[6:].split(" ")
        lng = coords[0]
        lat = coords[1].strip(")")
        foratFinal.append(
            {
                'id': forat[0], 
                'lat' : lat,
                'lng' : lng,
                'description' : forat[2],
                'status' : forat[3],
                'photo' : forat[4]
            }
        )

    cur.execute("SELECT id,ST_AsText(geom) as geom, description, status, photo FROM blackbox.canals")
    canals = cur.fetchall()
    
    canalsFinal = []
    for canal in canals: 
        coords=[]
        pointsList = str(canal[1])[6:].split("(")[1].split(",")
        pointsList[len(pointsList)-1] = pointsList[len(pointsList)-1][:len(pointsList[len(pointsList)-1])-1]
        for pointPair in pointsList:
            lat = pointPair.split(" ")[0]
            lng = pointPair.split(" ")[1]
            coords.append({'lat':lat, 'lng':lng})
        canalsFinal.append(
            {
                'id': canal[0], 
                'coords' : coords,
                'description' : canal[2],
                'status' : canal[3],
                'photo' : canal[4],
            }
        )

    cur.close()
    return jsonify({'forats': foratFinal, 'canals':canalsFinal})

# @app.route('/api/elements/<id>', methods=['GET']) # get by id
# def retrieve_single_element():
#     result1 = cur.execute("SELECT * FROM blackblox.forats WHERE id=?", (id,))
#     if(len(result1.fetchall()) != 0):
#         return json.dumps(result1)
#     else: 
#         result2 = cur.execute("SELECT * FROM blackblox.canals WHERE id=?", (id,))


# @app.route('/api/elements/<id>', methods=['GET']) # PUT STATUS DELS DOS





if __name__ == '__main__':
  app.run(debug=True)
