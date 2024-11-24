    document.addEventListener('DOMContentLoaded', () => {
        const users = [
            { username: 'Alexis Aguirre', password: '123' },
            { username: 'Alexander Gomez', password: '456' },
            { username: 'Herman Javier', password: '789' },
            { username: 'Daniel Florez', password: '101' }
        ];
    
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
    
            let isAuthenticated = false;
            users.forEach(user => {
                if (user.username === username && user.password === password) {
                    isAuthenticated = true;
                }
            });
    
            if (isAuthenticated) {
                window.location.href = 'index.html';
            } else {
                alert('Incorrect username or password');
            }
        });
    });