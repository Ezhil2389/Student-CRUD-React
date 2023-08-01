import requests

# Replace with the appropriate URL where your Flask server is running
BASE_URL = 'http://127.0.0.1:5000'

def add_student(name, rollnumber, class_name, class_teacher, gpa, fee_status):
    url = f"{BASE_URL}/students"
    data = {
        'name': name,
        'rollnumber': rollnumber,
        'class': class_name,
        'classTeacher': class_teacher,
        'GPA': gpa,
        'feeStatus': fee_status,
    }

    response = requests.post(url, json=data)

    try:
        response_json = response.json()
        return response_json
    except ValueError:
        return {
            'error': f'Invalid response from server. Status code: {response.status_code}, Content: {response.content}'
        }

if __name__ == "__main__":
    student_data = {
        'name': 'Ezhil',
        'rollnumber': '12346',
        'class_name': '10',
        'class_teacher': 'Poonam',
        'gpa': 4.8,
        'fee_status': True,
    }

    result = add_student(**student_data)
    print(result)
