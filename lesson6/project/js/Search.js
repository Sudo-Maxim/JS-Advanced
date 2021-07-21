Vue.component('search', {
    data() {
        return {
            searchProduct: ''
        }
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(searchProduct), $parent.$refs.error.setError(searchProduct)">
                <input type="text" class="search-field" v-model="searchProduct">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
});
