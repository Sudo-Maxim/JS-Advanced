Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://via.placeholder.com/50x100',
            addedItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.addedItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.addedItems.push(prod);
                        }
                    }
                    else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        this.addedItems.splice(this.addedItems.indexOf(item), 1);
                    }
                })
        },
    },
    created() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    if (this.addedItems.length != 0) {
                        this.addedItems.push(el);
                    }

                }
            });
    },
    template: `
        <div class="btn-cart-wrap">
            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
            <div class="cart-block" v-show="showCart">
                <p v-if="addedItems.length == 0">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of addedItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="remove">
                </cart-item>
            </div>
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
                <div class="cart-item">
                    <div class="product-bio" >
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за шт.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">Удалить</button>
                    </div>
                </div>
    `
});
