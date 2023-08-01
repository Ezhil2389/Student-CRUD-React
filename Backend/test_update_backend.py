import requests

# Replace with the appropriate URL where your Flask server is running
BASE_URL = 'http://127.0.0.1:5000'

def update_student(rollnumber, new_gpa, new_fee_status):
    url = f"{BASE_URL}/students"
    data = {
        'rollnumber': rollnumber,
        'newGPA': new_gpa,
        'newFeeStatus': new_fee_status,
    }

    response = requests.put(url, json=data)
    return response.json()

if __name__ == "__main__":
    # Example: Update GPA and fee status for a student with roll number '12345'
    rollnumber = '12345'
    new_gpa = 4.9
    new_fee_status = True

    result = update_student(rollnumber, new_gpa, new_fee_status)
    print(result)
