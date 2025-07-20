document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('searchInput');
    let allProducts = [];

    // Fetch products from JSON   
    fetch('js/products.json')
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        });

    function displayProducts(products) {
        productList.innerHTML = ''; // Clear previous list
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price} บาท</p>
            `;
            productList.appendChild(card);
        });
    }

    // Improved Search
    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (searchTerm === '') {
            // ถ้า searchInput ว่าง ให้แสดงสินค้าทั้งหมด
            displayProducts(allProducts);
            return;
        }

        const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        displayProducts(filteredProducts);
    });
});
