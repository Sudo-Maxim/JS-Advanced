
class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = []; // data
        this._allProducts = []; // массив экземпляров товаров на основе this._goods

        this._fetchGoods();
        this._render();
        this.sum();
    }

    sum() {
        console.log("Суммв всех товаров: " + this._goods.reduce((sum, { price }) => sum + price, 0));
    }

    _fetchGoods() {
        this._goods = [
            { id: 1, title: 'Notebook', price: 20000 },
            { id: 2, title: 'Mouse', price: 1500 },
            { id: 3, title: 'Keyboard', price: 5000 },
            { id: 4, title: 'Gamepad', price: 4500 },
        ];
    }

    _render() {
        const block = document.querySelector(this.container);
        for (const product of this._goods) {
            const productObject = new ProductItem(product);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://picsum.photos/200') {
        this.title = product.title;
        this.price = product.price;
        this.text = "Купить";
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                    <img src="${this.img}" alt="image">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="by-btn">${this.text}</button>
                </div>`;
    }
}
const catalog = new ProductList();

///////////////////////////
class CartItems {
    _addedElements() {
        // тут должен производится подсчет добавленных продуктов
    }
    _totalPrice() {
        // тут должен производится подсчет цены всех добавленных продуктов
    }
    _remove() {
        // удаление продуктов
    }
    _ammount() {
        // увеличение или уменьшение количества продуктов в корзине
    }
}
class CartElements {
    // унаследованный класс ProductItem для отображения информации в корзине
}

