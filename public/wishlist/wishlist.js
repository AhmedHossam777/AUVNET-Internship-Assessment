const apiUrl = 'http://localhost:3000/wishlists'; // Replace with your actual API URL

document.addEventListener('DOMContentLoaded', () => {
	loadWishlist();

	document
		.getElementById('createWishlistBtn')
		.addEventListener('click', createWishlist);
});

async function loadWishlist() {
	const response = await fetch(apiUrl, {
		headers: {
			Authorization: 'Bearer YOUR_TOKEN_HERE', // Add your token if required
		},
	});
	const data = await response.json();

	const wishlist = document.getElementById('wishlist');
	wishlist.innerHTML = '';

	data.wishlists.forEach((item) => {
		const li = document.createElement('li');
		li.innerHTML = `
            <strong>Product ID: ${item.product._id}</strong> - ${item.product.name}
            <button onclick="deleteWishlist('${item._id}')">Remove</button>
        `;
		wishlist.appendChild(li);
	});
}

async function createWishlist() {
	const product = document.getElementById('product').value;

	const response = await fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer YOUR_TOKEN_HERE',
			body: JSON.stringify({ product }),
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadWishlist();
		document.getElementById('product').value = '';
	} else {
		alert('Failed to add to wishlist: ' + data.message);
	}
}

async function deleteWishlist(id) {
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: 'Bearer YOUR_TOKEN_HERE',
		},
	});

	const data = await response.json();
	if (data.status === 'success') {
		loadWishlist();
	} else {
		alert('Failed to remove from wishlist: ' + data.message);
	}
}