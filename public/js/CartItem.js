export const CartItem = {
    props: ['img', 'product'],
    template: `
                    <div class="cart-item__container">
                        <img :src="img" alt="product.product_name">
                        <div class="cart-item__desc">
                            <h3>{{ product.product_name }}</h3>
                            <p class="quantity">Количество: {{ product.quantity }}</p>
                            <p>Цена: {{ product.price * product.quantity }}</p>
                            <button @click="this.$parent.deleteFromCart(product)">Удалить товар</button>
                        </div>
                    </div>`
}