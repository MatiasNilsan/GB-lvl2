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
        this.cartContainer = document.querySelector('.cart-container');
        this.btnsListener();
        this.cartListener();
        this.deleteFromCart();
    }

    cartTotalSum() {

    }

    btnsListener() {
        const btns = document.querySelectorAll('.buy-btn');
        btns.forEach((elem) => {
            elem.addEventListener('click', (event) => {
                const arrItem = [event.target.dataset.price, event.target.dataset.title];
                // if (!this.cartProducts.includes(arrItem)) {
                //     this.cartProducts.push(arrItem);
                // }
                const cartProduct = new CartItem(arrItem);
                this.addToCart(cartProduct.render())
                console.log(this.cartProducts)
            })
        })
    }

    cartListener() {
        let cartList = document.querySelector('.btn-cart');
        cartList.addEventListener('click', () => {
            if (this.cartContainer.style.display == 'none') {
                this.cartContainer.style.display = 'block';
            } else {
                this.cartContainer.style.display = 'none';
            }
        })
    }

    addToCart(item) {
        this.cartContainer.insertAdjacentHTML('beforeend', item)

    }

    deleteFromCart() {
        let containerCart = document.querySelector('.cart-container');
        containerCart.addEventListener('click', (event) => {
            if (event.target.tagName == 'BUTTON') {
                event.target.parentNode.remove();
            }
        })
    }

}

const cart = new Cart();

class CartItem {
    constructor(product) {
        let [price, title] = product;
        this.title = title;
        this.price = price;
        this.quant = 1;

    }



    render() {
        return `<div class="cart-item">
                    <p class="cart-item__title">Наименование: ${this.title}</p>
                    <p class="cart-item__price">Стоимость: ${this.price}</p>
                    <button class="cart-item__delete">Удалить товар из корзины</button>
                </div>`

    }


}
