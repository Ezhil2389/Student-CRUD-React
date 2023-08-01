from models import db, Student

class StudentService:
    

    def get_students(self):
        return Student.query.all()

    def update_student(self, rollnumber, new_gpa, new_fee_status):
        student = Student.query.filter_by(rollnumber=rollnumber).first()
        if student:
            student.gpa = new_gpa
            student.fee_status = new_fee_status
            db.session.commit()
            return True
        return False
    
    def delete_student(self, rollnumber):
        student = Student.query.filter_by(rollnumber=rollnumber).first()
        if student:
            db.session.delete(student)
            db.session.commit()
            return True  # Student deleted successfully
        return False  # Student with the given rollnumber not found
