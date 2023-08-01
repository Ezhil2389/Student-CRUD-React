from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from models import db
from services import StudentService
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://ezhilr:pass@localhost/stable'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


api = Api(app)
student_service = StudentService()

class StudentResource(Resource):
    def get(self):
        students = student_service.get_students()
        result = [
            {
                'id': student.id,
                'name': student.name,
                'rollnumber': student.rollnumber,
                'class': student.class_name,
                'classTeacher': student.class_teacher,
                'GPA': student.gpa,
                'feeStatus': student.fee_status,
            }
            for student in students
        ]
        return jsonify(result)

    def post(self):
        data = request.get_json()
        name = data['name']
        rollnumber = data['rollnumber']
        class_name = data['class']
        class_teacher = data['classTeacher']
        gpa = data['GPA']
        fee_status = data['feeStatus']

        new_student = Student(
            name=name,
            rollnumber=rollnumber,
            class_name=class_name,
            class_teacher=class_teacher,
            gpa=gpa,
            fee_status=fee_status,
        )
        db.session.add(new_student)
        db.session.commit()

        return {'message': 'Student added successfully'}, 201

    def put(self):
        data = request.get_json()
        rollnumber = data['rollnumber']
        new_gpa = data['newGPA']
        new_fee_status = data['newFeeStatus']

        if student_service.update_student(rollnumber, new_gpa, new_fee_status):
            return {'message': 'Student updated successfully'}
        else:
            return {'error': 'Student not found'}, 404
        
    def delete(self):
        data = request.get_json()
        rollnumber = data['rollnumber']

        if student_service.delete_student(rollnumber):
            return {'message': 'Student deleted successfully'}
        else:
            return {'error': 'Student not found'}, 404

api.add_resource(StudentResource, '/students', endpoint='students')

if __name__ == '__main__':
    app.run(debug=True)
