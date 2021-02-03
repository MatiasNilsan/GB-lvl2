import { Product } from './Product.js';

export const Products = {
    components: {
        Product
    },
    data() {
        return {
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: '/catalogData.json',
            products: [],
        }
    },

    mounted() {
        this.$root.getJson(`${this.$root.API + this.catalogUrl}`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            });
        this.$root.getJson(`getProducts.json`)
            .then(data => {
                for (let product of data) {
                    this.products.push(product);
                }
            })

    },
    // computed: {
    //     filterProducts: function () {
    //         let search = this.searchLine;
    //         return this.products.filter((item) => {
    //             return item.product_name.includes(search);
    //         })
    //     }
    // },
    template: `<div class="products" ref="catalog">
                    <Product v-for='el of products' :key='el.id_product' :img='imgCatalog' :product="el "></Product>
               </div>`
}   