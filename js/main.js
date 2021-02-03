import { Products } from './Products.js';
import { Cart } from './Cart.js';

const Shop = {
    components: {
        Products,
        Cart,
    },
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
            searchLine: '',
            isVisibleCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        console.log(this.$refs.cart.cartProducts)
                        let find = this.$refs.cart.cartProducts.find(item => item.id_product === product.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            let cartItem = {
                                id_product: product.id_product,
                                product_name: product.product_name,
                                price: product.price,
                                quantity: 1
                            };
                            this.$refs.cart.cartProducts.push(cartItem);
                        }
                    }
                });
        },
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
    },


};

Vue.createApp(Shop).mount('#app');