const apiUrl = 'http://localhost:3000/categories';

document.addEventListener('DOMContentLoaded', () => {
	loadCategories();

	document
		.getElementById('createCategoryBtn')
		.addEventListener('click', createCategory);
	document
		.getElementById('updateCategoryBtn')
		.addEventListener('click', updateCategory);
});

async function loadCategories() {
	const response = await fetch(apiUrl);
	const data = await response.json();

	const categoryList = document.getElementById('categoryList');
	categoryList.innerHTML = '';

	data.categories.forEach((category) => {
		const li = document.createElement('li');
		li.innerHTML = `
            <strong>${category.name}</strong>
            <button onclick="editCategory('${category._id}')">Edit</button>
            <button onclick="deleteCategory('${category._id}')">Delete</button>
        `;
		categoryList.appendChild(li);
	});
}

async function createCategory() {
	const name = document.getElementById('categoryName').value;

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer YOUR_TOKEN_HERE', // Add your token if required
		},
		body: JSON.stringify({ name }),
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadCategories();
		document.getElementById('categoryName').value = '';
	} else {
		alert('Failed to create category: ' + data.message);
	}
}

async function editCategory(id) {
	const response = await fetch(`${apiUrl}/${id}`);
	const data = await response.json();

	if (data.status === 'success') {
		const category = data.category;
		document.getElementById('updateCategoryName').value = category.name;

		document.getElementById('updateCategoryBtn').dataset.id = id;
		document.getElementById('categoryForm').style.display = 'none';
		document.getElementById('categoryUpdateForm').style.display = 'block';
	}
}

async function updateCategory() {
	const id = document.getElementById('updateCategoryBtn').dataset.id;
	const name = document.getElementById('updateCategoryName').value;

	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer YOUR_TOKEN_HERE', // Add your token if required
		},
		body: JSON.stringify({ name }),
	});

	const data = await response.json();
	if (data.status === 'success') {
		document.getElementById('categoryForm').style.display = 'block';
		document.getElementById('categoryUpdateForm').style.display = 'none';
		loadCategories();
	} else {
		alert('Failed to update category: ' + data.message);
	}
}

async function deleteCategory(id) {
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer YOUR_TOKEN_HERE', // Add your token if required
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadCategories();
	} else {
		alert('Failed to delete category: ' + data.message);
	}
}