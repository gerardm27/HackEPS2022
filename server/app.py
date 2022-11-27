from flask import Flask, jsonify

app = Flask(__name__)

import psycopg2
import json
import uuid
from flask import jsonify, request


def create_connection():
    conn = psycopg2.connect(
        host="blackbox.insdosl.com",
        database="postgres",
        user="rd001",
        password="PUe7nhnH")
    conn.autocommit = True
    cur = conn.cursor()
    return cur

# get all manhole, and canalitzations, 
# put status dels dos
# put image 
# post de qualsevol dels dos

@app.route('/')
def welcome_page():
    return "Hello!"

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
        foratFinal.append({
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

@app.route('/api/elements/<id>', methods=['GET']) # get by id
def retrieve_single_element(id):
    cur = create_connection()
    
    cur.execute("SELECT * FROM blackbox.forats WHERE id=%s LIMIT 1", (id,),)
    result = cur.fetchall()
    ttype = "forats"
    if(len(result) == 0):
        cur.execute("SELECT * FROM blackbox.canals WHERE id=%s LIMIT 1", (id,),)
        result = cur.fetchall()
        ttype = "canal"
        if(len(result) == 0): 
            return "Element not found", 404
    result = result[0]
    return {
        'id' : result[0],
        'geom' : result[1],
        'type' : ttype,
        'description' : result[3],
        'status' : result[4],
        'photo' : result[5],
    }

# @app.routedddee('/api/elements/<id>', methods=['GET']) # PUT STATUS DELS DOS


@app.route('/api/elements', methods=['POST'])
def add_one_element():
    cur = create_connection()
    newId = uuid.uuid4()
    code = uuid.uuid4()

    bodyParsed = json.loads(request.data)
    try:
        cur.execute("INSERT INTO blackbox.forats(id, geom, code, description, status) VALUES ('%s', ST_GeomFromText('POINT(%s %s)', 4326), '%s','%s','%s')" % (newId, bodyParsed['coord'][0]['lat'], bodyParsed['coord'][0]['long'], code, bodyParsed['desc'], bodyParsed['status']))
        conn.commit()
    except Exception as e:
        cur.close()
        response="ERROR CREANT OBJECTE"
        return jsonify(error=True, response=response), 404

    cur.close()
    response = "success"
    return jsonify(error=False, response=response), 200


@app.route('/api/elements/<id>', methods=['PUT'])
def modify_element(id):
    cur = create_connection()
    bodyParsed = json.loads(request.data)

    tipus = bodyParsed['type']
    status = bodyParsed['status']
    image = bodyParsed['image']
    print
    try:
        if tipus=="forats":
            cur.execute("UPDATE blackbox.%s SET status='%s', photo='%s' WHERE id='%s'" % (tipus, status, image, id))

        else:
            cur.execute("UPDATE blackbox.%s SET status='%s' WHERE id='%s'" % (tipus, status, id))
    except Exception as e:
        cur.close()
        response = "ERROR ACTUALITZANT OBJECTE"
        return jsonify(error=True, response=response), 404

    cur.close()
    response = "success"
    return jsonify(error=False, response=response), 204

if __name__ == '__main__':
  app.run(debug=True)
