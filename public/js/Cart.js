import { CartItem } from './CartItem.js';

export const Cart = {
    inject: ['API', 'getJson', 'postJson', 'putJson', 'delJson'],
    components: {
        CartItem
    },
    data() {
        return {
            imgCart: 'https://placehold.it/100x50',
            cartProducts: [],
            isVisibleCart: false,
        }
    },

    methods: {
        deleteFromCart(product) {
            if (product.quantity > 1) {
                this.putJson(`/api/cart/${product.id_product}`, { quantity: -1 })
                    .then(data => {
                        if (data.result) {
                            product.quantity--
                        }
                    });
                return;
            } else {
                this.delJson(`/api/cart/${product.id_product}`)
                    .then(data => {
                        if (data.result) {
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
                        }

                    });
            }

        },
        addProduct(product) {
            let find = this.cartProducts.find(el => el.id_product === product.id_product);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result) {
                            if (find) {
                                find.quantity++
                            }
                        }
                    });
                return;
            } else {
                let cartItem = {
                    id_product: product.id_product,
                    product_name: product.product_name,
                    price: product.price,
                    quantity: 1
                };
                this.postJson(`/api/cart`, cartItem)
                    .then(data => {
                        if (data.result) {
                            this.cartProducts.push(cartItem);
                        }
                    });
            }

        },
    },
    mounted() {
        this.getJson(`/api/cart`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data.contents) {
                    this.cartProducts.push(product);
                }
            });
    },
    template: `<div class="cart" ref='cart'>
                <button @click="isVisibleCart = !isVisibleCart" class="btn-cart" type="button">Корзина</button>
                <div v-show="isVisibleCart" class="cart-block">
                    <div class="cap">{{ cartProducts.length === 0 ? 'Нет данных' : 'Список товаров:'}}</div>
                    <CartItem v-for="el of cartProducts" :key="el.id_product" :img="imgCart" :product="el"></CartItem>
               </div>
               </div>`
}