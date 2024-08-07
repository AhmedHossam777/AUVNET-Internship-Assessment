const apiUrl = 'http://localhost:3000/brands';

document.addEventListener('DOMContentLoaded', () => {
	loadBrands();

	document
		.getElementById('createBrandBtn')
		.addEventListener('click', createBrand);
});

async function loadBrands() {
	const response = await fetch(apiUrl, {
		headers: {
			Authorization: 'Bearer YOUR_TOKEN_HERE',
		},
	});
	const data = await response.json();

	const brands = document.getElementById('brands');
	brands.innerHTML = '';

	data.brands.forEach((item) => {
		const li = document.createElement('li');
		li.innerHTML = `
            <strong>Brand: ${item.name}</strong>
            <button onclick="deleteBrand('${item._id}')">Remove</button>
        `;
		brands.appendChild(li);
	});
}

async function createBrand() {
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
		loadBrands();
		document.getElementById('name').value = '';
	} else {
		alert('Failed to add brand: ' + data.message);
	}
}

async function deleteBrand(id) {
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer YOUR_TOKEN_HERE',
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadBrands();
	} else {
		alert('Failed to remove brand: ' + data.message);
	}
}