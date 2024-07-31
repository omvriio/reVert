from flask import Flask, jsonify, request
from DataBase import Add_User, Add_Quest, Get_User, Get_User11
from flask_cors import CORS
from main import Finale
import base64

app = Flask(__name__)
CORS(app)


@app.route("/get_user", methods=["POST"])
def get_user():
    id = request.get_json()["id"]
    print(id)
    user = Get_User(int(id))
    print(user)
    print("User Retrieved")
    return jsonify(user)


@app.route("/add_user", methods=["POST"])
def add_user():
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    phone = request.get_json()["phone"]
    Adress = request.get_json()["adress"]
    Add_User(username, password, phone, Adress, 0, 0, 0, 0)
    return jsonify({"message": "User Added"})


@app.route("/login", methods=["POST"])
def login():
    user_name = request.get_json()["username"]
    password = request.get_json()["password"]
    user = Get_User11(user_name, password)
    if user:
        return jsonify({"message": "User Logged in", "user": user})
    else:
        return jsonify({"message": "Invalid Credentials"})


@app.route("/run_model", methods=["POST"])
def run_model():
    data = request.get_json()
    image_base64 = data["image"].split(",")[1]
    result = Finale(image_base64)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
