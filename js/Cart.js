import { CartItem } from './CartItem.js';

export const Cart = {
    components: {
        CartItem
    },
    data() {
        return {
            imgCart: 'https://placehold.it/100x50',
            cartUrl: '/getBasket.json',
            cartProducts: [],
            isVisibleCart: false,
        }
    },

    methods: {
        deleteFromCart(product) {
            this.$root.getJson(`${this.$root.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
                        }
                    }
                });
        },

    },
    mounted() {
        this.$root.getJson(`${this.$root.API + this.cartUrl}`)
            .then(data => {
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