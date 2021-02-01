
const Shop = {
    data() {
        return {
            API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses',
            catalogUrl: '/catalogData.json',
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
            imgCart: 'https://placehold.it/100x50',
            searchLine: '',
            cartProducts: [],
            isVisibleCart: false,
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },

        addProduct(product) {
            this.getJson(`${this.API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartProducts.find(item => item.id_product === product.id_product);
                        if (find) {
                            find.quantity++
                        } else {
                            let cartItem = {
                                id_product: product.id_product,
                                product_name: product.product_name,
                                price: product.price,
                                quantity: 1
                            };
                            this.cartProducts.push(cartItem);
                        }
                    }
                });
        },

        deleteFromCart(product) {
            this.getJson(`${this.API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--
                        } else {
                            this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
                        }
                    }
                });
        }
    },

    computed: {
        filterProducts: function () {
            let search = this.searchLine;
            return this.products.filter((item) => {
                return item.product_name.includes(search);
            })
        }
    },
    mounted() {
        this.getJson(`${this.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
    }
};

Vue.createApp(Shop).mount('#app');