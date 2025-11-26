from flask import Blueprint, jsonify, request
from smart_task_manager.models import User, Task
from smart_task_manager.database import db
from smart_task_manager.utils import generate_cloudinary_signature

user_bp = Blueprint("user", __name__)

@user_bp.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()  # fetch all tasks from DB
    task_list = []
    for t in tasks:
        task_list.append({
            "id": t.id,
            "title": t.title,
            "assigned_to": t.assigned_user.name,
            "status": t.status
        })
    return jsonify(task_list)

@user_bp.route("/tasks", methods=["POST"])
def create_task():
    data = request.get_json()
    title = data.get("title")
    assigned_to_name = data.get("assigned_to")

    user = User.query.filter_by(name=assigned_to_name).first()
    if not user:
        return jsonify({"error": "User not found"}), 400

    new_task = Task(title=title, assigned_to=user.id)
    db.session.add(new_task)
    db.session.commit()

    return jsonify({
        "id": new_task.id,
        "title": new_task.title,
        "assigned_to": user.name,
        "status": new_task.status
    }), 201

@user_bp.route("/generate-upload-signature", methods=["GET"])
def get_upload_signature():
    """
    Endpoint to provide the frontend with a secure signature for Cloudinary uploads.
    """
    signature_data = generate_cloudinary_signature()
    return jsonify(signature_data)
