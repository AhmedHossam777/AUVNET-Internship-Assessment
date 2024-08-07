const apiUrl = 'http://localhost:3000/users';

document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('signupBtn').addEventListener('click', signUp);
	document.getElementById('loginBtn').addEventListener('click', login);
	document.getElementById('loadUsersBtn').addEventListener('click', loadUsers);
});

async function signUp() {
	const email = document.getElementById('signupEmail').value;
	const password = document.getElementById('signupPassword').value;
	const username = document.getElementById('signupUsername').value;

	const response = await fetch(`${apiUrl}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password, username }),
	});

	const data = await response.json();
	console.log(data);
	if (data.status === 'success') {
		alert('Sign up successful');
	} else {
		alert('Sign up failed: ' + data.message);
	}
}

async function login() {
	const email = document.getElementById('loginEmail').value;
	const password = document.getElementById('loginPassword').value;

	const response = await fetch(`${apiUrl}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await response.json();
	if (data.status === 'success') {
		localStorage.setItem('token', data.token);
		alert('Login successful');
		loadUsers();
	} else {
		alert('Login failed: ' + data.message);
	}
}

async function loadUsers() {
	const token = localStorage.getItem('token');
	const response = await fetch(`${apiUrl}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		const userList = document.getElementById('userList');
		userList.innerHTML = '';

		data.users.forEach((user) => {
			const li = document.createElement('li');
			li.innerHTML = `
                <strong>${user.username}</strong> - ${user.email}
                <button onclick="editUser('${user._id}')">Edit</button>
                <button onclick="deleteUser('${user._id}')">Delete</button>
            `;
			userList.appendChild(li);
		});
	} else {
		alert('Failed to load users: ' + data.message);
	}
}

async function deleteUser(id) {
	const token = localStorage.getItem('token');
	const response = await fetch(`${apiUrl}/users/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadUsers();
	} else {
		alert('Failed to delete user: ' + data.message);
	}
}