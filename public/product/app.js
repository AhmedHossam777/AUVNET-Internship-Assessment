const apiUrl = 'http://localhost:3000/products';

document.addEventListener('DOMContentLoaded', () => {
	loadProducts();

	document
		.getElementById('createProductBtn')
		.addEventListener('click', createProduct);
	document
		.getElementById('updateProductBtn')
		.addEventListener('click', updateProduct);
});

async function loadProducts() {
	const response = await fetch(`${apiUrl}`);
	const data = await response.json();

	const productList = document.getElementById('productList');
	productList.innerHTML = '';

	data.products.forEach((product) => {
		const li = document.createElement('li');
		li.innerHTML = `
            <strong>${product.name}</strong> - $${product.price} - ${product.brand}
            <button onclick="editProduct('${product._id}')">Edit</button>
            <button onclick="deleteProduct('${product._id}')">Delete</button>
        `;
		productList.appendChild(li);
	});
}

async function createProduct() {
	try {
		const name = document.getElementById('name').value;
		const price = document.getElementById('price').value;
		const brand = document.getElementById('brand').value;

		const token = localStorage.getItem('token');
		const response = await fetch(`${apiUrl}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ name, price, brand }),
		});

		if (!response.ok) {
			throw new Error(
				`HTTP error! status: ${response.status}, message: ${response.statusText}`,
			);
		}

		const data = await response.json();
		if (data.status === 'success') {
			await loadProducts();
			alert('Product created successfully');
		} else {
			alert(`Error: ${data.message}`);
		}
	} catch (error) {
		console.error('Error creating product:', error);
		alert('Failed to create product. Please try again.');
	}
}

async function editProduct(id) {
	const response = await fetch(`${apiUrl}/${id}`);
	const data = await response.json();

	if (data.status === 'success') {
		const product = data.product;
		document.getElementById('updateName').value = product.name;
		document.getElementById('updatePrice').value = product.price;
		document.getElementById('updateBrand').value = product.brand;

		document.getElementById('updateProductBtn').dataset.id = id;
		document.getElementById('productForm').style.display = 'none';
		document.getElementById('productUpdateForm').style.display = 'block';
	}
}

async function updateProduct() {
	const id = document.getElementById('updateProductBtn').dataset.id;
	const name = document.getElementById('updateName').value;
	const price = document.getElementById('updatePrice').value;
	const brand = document.getElementById('updateBrand').value;

	const token = localStorage.getItem('token');
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ name, price, brand }),
	});

	const data = await response.json();
	if (data.status === 'success') {
		document.getElementById('productForm').style.display = 'block';
		document.getElementById('productUpdateForm').style.display = 'none';
		await loadProducts();
	}
}

async function deleteProduct(id) {
	const token = localStorage.getItem('token');
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		await loadProducts();
	}
}