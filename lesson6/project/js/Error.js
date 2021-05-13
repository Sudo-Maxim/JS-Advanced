Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setError(error) {
            this.text = `Продукт "${error}" не найден!`;
        }
    },
    computed: {
        isVisible() {
            if (this.$parent.$refs.products.showProducts == true) {
                return true;
            }
        }
    },
    template: `
    <div class="error-block" v-if="isVisible"> 
        <p class="error-msg">
            {{ text }}
        </p>
    </div>
    `
});
