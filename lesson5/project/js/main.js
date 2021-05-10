const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    cartUrl: '/getBasket.json',
    catalogUrl: '/catalogData.json',
    showCart: false,
    showProducts: false,
    products: [],
    addedItems: [],
    filtered: [],
    imgCatalog: 'http://via.placeholder.com/640x360',
    cartCount: 0,
    searchProduct: "",
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          console.log(error);
        })
    },

    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.addedItems.find(el => el.id_product === product.id_product);
            if (find) {
              find.cartCount++;

            } else {
              let prod = Object.assign({ cartCount: 1 }, product);
              this.addedItems.push(prod)
            }
          } else {
            alert('Error');
          }
        })
    },

    remove(item) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result === 1) {
            this.addedItems.splice(this.addedItems.indexOf(item), 1);
          }
        })
    },

    filter(filter) {
      let regexp = new RegExp(this.searchProduct, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
      console.log(this.searchProduct);
      if (this.filtered == "") {
        this.showProducts = true;
      }
      else {
        this.showProducts = false;
      }
    },

  },


  created() {
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
          this.filtered.push(el);
        }
      });
  },
});
