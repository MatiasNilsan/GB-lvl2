

const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Keyboard', price: 200 },
    { id: 3, title: 'Mouse', price: 100 },
    { id: 4, title: 'Gamepad', price: 87 },
];


const renderProduct = (title = Good, price = 150) => {
    return `<div class="products-item">
                <h3 class="products-item__title">${title}</h3>
                <p class="products-item__price">${price}</p>
            </div>`
};

const render = productsList => {
    document.querySelector('.products').innerHTML = productsList.map(item => renderProduct(item.title, item.price)).join('');
};


render(products);