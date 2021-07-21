Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://via.placeholder.com/200x150',
            products: [],
            filtered: [],
            showProducts: true,
        }
    },
    methods: {
        filter(filter) {
            let regexp = new RegExp(filter, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
            if (this.filtered == "") {
                this.showProducts = true;
                console.log(11);
            }
            else {
                this.showProducts = false;
                console.log(22);
            }

        },
    },
    created() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `,
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>
            </div>
    `,
});
