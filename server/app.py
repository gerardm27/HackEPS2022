from flask import Flask

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
    cur = conn.cursor()
    return cur

# get all manhole, and canalitzations, 
# put status dels dos
# put image 
# post de qualsevol dels dos 

@app.route('/api/elements', methods=['GET']) # get All
def retrieve_all():
    cur = create_connection()
    cur.execute("SELECT id,ST_AsText(geom) as geom, code, description FROM blackbox.forats LIMIT 2")
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
                'code' : forat[2],
                'description' : forat[3],
            }
        )

    cur.execute("SELECT id,ST_AsText(geom) as geom, element_type, description FROM blackbox.canals LIMIT 2")
    canals = cur.fetchall()
    
    # canalsFinal = []
    # for canal in canals: 
    #     pointsList = str(canal[1])[6:].split("(")[0].split(",")
    #     pointsList[len(pointsList)-1] = pointsList[len(pointsList)-1]
    #     lat = coords[0]
    #     lng = coords[1].strip(")")
    #     canalsFinal.append(
    #         {
    #             'id': canal[0], 
    #             'lng' : lng,
    #             'lat' : lat,
    #             'type' : canal[2],
    #             'description' : canal[3],
    #         }
    #     )

    cur.close()
    return jsonify({'forats': foratFinal, 'canals':canals})

# @app.route('/api/elements/<id>', methods=['GET']) # get by id
# def retrieve_single_element():
#     result1 = cur.execute("SELECT * FROM blackblox.forats WHERE id=?", (id,))
#     if(len(result1.fetchall()) != 0):
#         return json.dumps(result1)
#     else: 
#         result2 = cur.execute("SELECT * FROM blackblox.canals WHERE id=?", (id,))


# @app.route('/api/elements/<id>', methods=['GET']) # PUT STATUS DELS DOS


@app.route('/api/elements', methods=['POST'])
def add_one_element():
    cur = create_connection()
    newId = uuid.uuid4()
    code = uuid.uuid4()

    bodyParsed = json.loads(request.data)
    try:
        cur.execute("INSERT INTO blackbox.forats(id, geom, code, description, status) VALUES ('%s', ST_GeomFromText('POINT(%s %s)', 4326), '%s','%s','%s')" % (newId, bodyParsed['coord'][0]['lat'], bodyParsed['coord'][0]['long'], code, bodyParsed['desc'], bodyParsed['status']))
    except Exception as e:
        cur.close()
        response="ERROR CREANT EL OBJETO"
        return jsonify(error=True, response=response), 404

    cur.close()
    response = "success"
    return jsonify(error=False, response=response), 200




if __name__ == '__main__':
  app.run(debug=True)
