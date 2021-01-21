
class Product {
    constructor(product, img = `https://placehold.it/100X50`) {
        let { title, price = 0, id } = product;
        this.title = title;
        this.img = img;
        this.price = price;
        this.id = id;
    }

    render() {
        return `<div id=${this.id} class="product-item">
                    <img src="${this.img}" alt="${this.title}">
                    <div class="desc">
                        <h3 class="product-              item__name">${this.title}</h3>
                        <p class="product-item__price">${this.price}</p>
                        <button data-title='${this.title}' data-price='${this.price}' data-id='${this.id}' class="buy-btn">Купить</button>
                     </div>
                 </div>`

    }
}

class ProductsList {
    constructor(container = '.products') {
        this.data = [];
        this.products = [];
        this.container = document.querySelector(container);
        this._fetchData();
        this._render();
    }

    _fetchData() {
        this.data = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Keyboard', price: 200 },
            { id: 3, title: 'Mouse', price: 100 },
            { id: 4, title: 'Headers', price: 250 },
        ];
    }

    _render() {
        for (let dataEl of this.data) {
            const product = new Product(dataEl);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render())
        }
    }

    calcSum() {
        let sum = 0;
        for (let elem of this.products) {
            sum += elem.price;
        } return sum;
    }


}

const list = new ProductsList();

class Cart {
    constructor() {
        this.cartItem = {
            title: '',
            price: 0,
        };
        this.data = [];
        this.cartProducts = [];
        this.btnsListener();
        this.cartListener();

    }

    cartTotalSum() {

    }

    btnsListener() {
        const btns = document.querySelectorAll('.buy-btn');
        btns.forEach(function (elem) {
            elem.addEventListener('click', (event) => {
                console.log(event.target.dataset.price)
                console.log(this.cartItem.price)
                this.cartItem.price = elem.dataset.price;
                this.cartItem.title = event.target.dataset.title;
                this.cartProducts.push(this.cartItem)
                console.log(this.cartProducts)
            })
        })
    }

    cartListener() {
        let cartList = document.querySelector('.btn-cart');
        let cartContainer = document.querySelector('.cart-container')
        cartList.addEventListener('click', function () {
            if (cartContainer.style.display == 'none') {
                cartContainer.style.display = 'block';
            } else {
                cartContainer.style.display = 'none';
            }
        })
    }


    render() {
        //взаимодействует с DOM вставляя товары в корзину.
    }


}

const cart = new Cart();

class CartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
        this.quant = 1;
    }



    render() {
        return `<div class="cart-item">
                    <p class="cart-item__title">Наименование: ${title}</p>
                    <p class="cart-item__price">Стоимость: ${price}</p>
                    <button class="cart-item__delete">Удалить товар из корзины</button>
                </div>`

    }
}