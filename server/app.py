from flask import Flask, jsonify

app = Flask(__name__)

import psycopg2
import json
import uuid
from flask import jsonify, request

conn = psycopg2.connect(
        host="blackbox.insdosl.com",
        database="postgres",
        user="rd001",
        password="PUe7nhnH")

def create_connection():
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
            lng = pointPair.split(" ")[0]
            lat = pointPair.split(" ")[1]
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
        ttype = "canals"
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
    tipus = bodyParsed['type'].rstrip("s")+"s"

    if(len(bodyParsed['coord']) > 1):
        # multipoints recieved
        # need to transform it to geom
        preGeom = "LINESTRING("
        try: 
            for pairPoints in bodyParsed['coord']:
                preGeom = preGeom+str(pairPoints['lat'])+" "+str(pairPoints['long'])+","
            preGeom = preGeom.rstrip(",")+")"
            sql = "INSERT INTO blackbox.canals(id, geom, element_type, description, status) VALUES ('%s', ST_GeomFromText('%s', 4326), '%s','%s','%s')" % (newId, preGeom, 'canalization',  bodyParsed['desc'], bodyParsed['status'])
            
            cur.execute(sql)
            conn.commit()
        except Exception as e:
            cur.close()
            response="ERROR CREANT OBJECTE tipus 1" + str(e)
            return jsonify(error=True, response=response), 404
    else: 
        # single point
        if tipus == "forats":
            try:
                cur.execute("INSERT INTO blackbox.forats(id, geom, code, description, status) VALUES ('%s', ST_GeomFromText('POINT(%s %s)', 4326), '%s','%s','%s')" % (newId, bodyParsed['coord'][0]['lat'], bodyParsed['coord'][0]['long'], code, bodyParsed['desc'], bodyParsed['status']))
                conn.commit()
            except Exception as e:

                cur.close()
                response="ERROR CREANT OBJECTE tipus 2"
                return jsonify(error=True, response=response), 404
        else: 
            response="pipes cannot be at a single point, they need to be a line (2 or +2 points)"
            return jsonify(error=True, response=response), 404

    cur.close()
    return jsonify(error=False, response=newId), 200


@app.route('/api/elements/<id>', methods=['PUT'])
def modify_element(id):
    cur = create_connection()
    if request.data == None: 
        cur.close()
        response = "success"
        return jsonify(error=False, response=response), 402
    
    bodyParsed = json.loads(request.data)

    tipus = getElementType(id)
    status = bodyParsed['status']
    image = bodyParsed['image']
    try:
        cur.execute("UPDATE blackbox.%s SET status='%s', photo='%s' WHERE id='%s'" % (tipus, status, image, id))
        conn.commit()
    except Exception as e:
        cur.close()
        response = "ERROR ACTUALITZANT OBJECTE"
        return jsonify(error=True, response=response), 404

    cur.close()
    response = "success"
    return jsonify(error=False, response=response), 204

@app.route('/api/elements/<id>', methods=['DELETE'])
def delete_element(id):
    cur = create_connection()
    tipus= getElementType(id)
    tipus =  str(tipus.strip("s"))+"s"
    if(tipus != "canals" and tipus != "forats"):
        # fail.
        response = "No entitiy found"
        return jsonify(error=True, response=response), 404
    cur.execute("DELETE FROM blackbox.%s WHERE id='%s'" % (tipus, id))
    conn.commit()
    cur.close()
    response = "success"
    return jsonify(error=False, response=response), 204

def getElementType(id):
    cur = create_connection()
    
    cur.execute("SELECT * FROM blackbox.forats WHERE id=%s LIMIT 1", (id,),)
    result = cur.fetchall()
    ttype = "forats"
    if(len(result) == 0):
        cur.execute("SELECT * FROM blackbox.canals WHERE id=%s LIMIT 1", (id,),)
        result = cur.fetchall()
        ttype = "canals"
        if(len(result) == 0): 
            return "not-valid"
    result = result[0]
    return ttype

if __name__ == '__main__':
  app.run(debug=True)
