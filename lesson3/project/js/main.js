
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
let arrayItems = [];

function getRequest(url) {
  setTimeout(() => {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.onload = () => resolve(xhr.responseText);
      xhr.onerror = () => reject('Error');
      xhr.send();
    }, 2000)
  });
}

class ProductList {
  constructor(container = '.products',) {
    this.container = container;
    this._goods = []; // data
    this._allProducts = []; // массив экземпляров товаров на основе this._goods
    this._arrayItems = [];
    this._getGoods()
      .then((data) => {
        this._goods = data;
        this._render();
        this._add();
        this._remove();
        this._getList();
      });
  }

  sum() {
    return this._goods.reduce((sum, { price }) => sum + price, 0);
  }

  _getGoods() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json()).catch(error => console.log(error));
  }

  _render() {
    const block = document.querySelector(this.container);

    for (const product of this._goods) {
      const productObject = new ProductItem(product);
      this._allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }

  _add() {
    let btns = document.querySelectorAll(".buy-btn");
    btns.forEach(btn => {
      btn.addEventListener('click', event => {
        arrayItems.push(event.target.parentElement.parentElement.getAttribute('data-id'));
        return arrayItems;
        //console.log(arrayItems);
      });
    });
  }

  _remove() {
    let btnsRem = document.querySelectorAll(".rem-btn");
    btnsRem.forEach(btn => {
      btn.addEventListener('click', event => {
        if (arrayItems.indexOf(event.target.parentElement.parentElement.getAttribute('data-id')) > -1) {
          arrayItems.splice(arrayItems.indexOf(event.target.parentElement.parentElement.getAttribute('data-id')), 1);
        }
        //console.log(arrayItems);
        return arrayItems;
      });
    });
  }
  _getList() {
    let buttonCart = document.querySelectorAll(".btn-cart");
    buttonCart.forEach(btn => {
      btn.addEventListener('click', event => {
        //console.log(arrayItems);
        return arrayItems;
      });
    });
  }
}

class ProductItem {
  constructor(product, img = 'https://picsum.photos/200') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                    <img src="${this.img}" alt="image">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price}</p>
                        <button class="buy-btn">Купить</button>
                        <button class="rem-btn">Удалить</button>
                    </div>
                </div>`;
  }
}
const catalog = new ProductList();

