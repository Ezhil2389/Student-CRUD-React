import requests

# Replace this URL with the correct endpoint of your Flask app
base_url = 'http://127.0.0.1:5000'

def test_delete_student():
    rollnumber_to_delete = "12345"
    delete_url = f"{base_url}/students"

    data = {
        "rollnumber": rollnumber_to_delete
    }

    response = requests.delete(delete_url, json=data)
    if response.status_code == 200:
        print("Student deleted successfully!")
    elif response.status_code == 404:
        print("Student not found!")
    else:
        print(f"Error occurred: {response.text}")

if __name__ == '__main__':
    test_delete_student()
