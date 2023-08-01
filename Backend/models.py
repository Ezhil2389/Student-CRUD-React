from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    rollnumber = db.Column(db.String(20), unique=True, nullable=False)
    class_name = db.Column(db.String(50))
    class_teacher = db.Column(db.String(100))
    gpa = db.Column(db.Float)
    fee_status = db.Column(db.Boolean, default=False)
