import { Product } from './Product.js';


export const Products = {
    inject: ['API', 'getJson'],
    components: {
        Product,
    },
    data() {
        return {
            imgCatalog: 'https://placehold.it/200x150',
            catalogUrl: '/catalogData.json',
            products: [],
        }
    },
    mounted() {
        this.getJson(`/api/products`)
            .then(data => {
                if (!data) {
                    return;
                }
                for (let product of data) {
                    this.products.push(product);
                }
            });
    },
    computed: {
        filterProducts: function () {
            return this.products.filter((item) => {
                if (this.$root.$refs.search.searchLine) {
                    let lowCase = item.product_name.toLowerCase();
                    return lowCase.includes(this.$root.$refs.search.searchLine.toLowerCase());
                }
                return this.products;
            })
        }
    },
    template: `<div class="products" ref="catalog">
                    <Product v-for='el of filterProducts' :key='el.id_product' :img='imgCatalog' :product="el "></Product>
               </div>`
}   