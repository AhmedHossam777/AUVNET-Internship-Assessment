const apiUrl = 'http://localhost:3000/subcategories';

document.addEventListener('DOMContentLoaded', () => {
	loadSubCategories();

	document
		.getElementById('createSubCategoryBtn')
		.addEventListener('click', createSubCategory);
});

async function loadSubCategories() {
	const response = await fetch(apiUrl, {
		headers: {
			Authorization: 'Bearer YOUR_TOKEN_HERE',
		},
	});
	const data = await response.json();

	const subcategories = document.getElementById('subcategories');
	subcategories.innerHTML = '';

	data.subCategories.forEach((item) => {
		const li = document.createElement('li');
		li.innerHTML = `
            <strong>SubCategory: ${item.name}</strong>
            <button onclick="deleteSubCategory('${item._id}')">Remove</button>
        `;
		subcategories.appendChild(li);
	});
}

async function createSubCategory() {
	const name = document.getElementById('name').value;

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer YOUR_TOKEN_HERE',
		},
		body: JSON.stringify({ name }),
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadSubCategories();
		document.getElementById('name').value = '';
	} else {
		alert('Failed to add subcategory: ' + data.message);
	}
}

async function deleteSubCategory(id) {
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer YOUR_TOKEN_HERE',
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadSubCategories();
	} else {
		alert('Failed to remove subcategory: ' + data.message);
	}
}