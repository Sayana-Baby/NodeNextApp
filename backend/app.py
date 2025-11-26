import os
from flask import Flask
from smart_task_manager.user import routes as user_routes
from smart_task_manager.database import db

app = Flask(__name__)

# PostgreSQL config - SECURELY load from environment variable
database_url = os.environ.get('DATABASE_URL')
if not database_url:
    print("WARNING: DATABASE_URL environment variable not set. Using insecure default for local development.")
    database_url = 'postgresql://postgres:12345678@localhost:5432/smart_task_db'

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db.init_app(app)

# Register blueprints
app.register_blueprint(user_routes.user_bp, url_prefix="/user")

if __name__ == "__main__":
    with app.app_context():
        db.create_all()  # create tables if not exist
    app.run(debug=True)
