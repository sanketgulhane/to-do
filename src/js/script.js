// This file contains JavaScript functions to handle form submission, validation, and interactive elements on the login page.

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (validateForm(username, password)) {
            login(username, password);
        }
    });

    function validateForm(username, password) {
        if (username === '' || password === '') {
            alert('Please fill in all fields.');
            return false;
        }
        // Additional validation logic can be added here
        return true;
    }

    function login(username, password) {
        fetch('/api/read', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0 && data[0].password === password) {
                    alert('Login successful');
                    // Redirect to another page or perform other actions
                } else {
                    document.getElementById('error-message').innerText = 'Invalid username or password';
                }
            })
            .catch(error => console.error('Error:', error));
    }

    function createUser(username, password) {
        fetch('/api/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    function updateUser(username, newPassword) {
        fetch('/api/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, newPassword })
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    function deleteUser(username) {
        fetch('/api/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }

    // Example usage:
    // createUser('testuser', 'password123');
    // console.log(readUser('testuser'));
    // updateUser('testuser', 'newpassword');
    // deleteUser('testuser');
});