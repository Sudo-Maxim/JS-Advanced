const products = [
    { id: 1, title: 'Notebook', price: 20000 },
    { id: 2, title: 'Mouse', price: 1500 },
    { id: 3, title: 'Keyboard', price: 5000 },
    { id: 4, title: 'Gamepad', price: 4500 },
];

const renderProduct = (title, price, text, img) => {
    return `<div class="product-item">
                <img src="${img}" alt="image">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">${text}</button>
              </div>`;
};

const renderProducts = (list = [], text = 'Добавить в корзину', img = 'https://picsum.photos/200') => {
    const productList = list.map((item) => renderProduct(item.title, item.price, text, img));
    document.querySelector('.products').innerHTML = productList.join(""); // убрал зарятую с помощью join. Запятая появляется из-за того что мы выводим массив.
}

renderProducts(products);
