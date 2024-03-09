document.addEventListener("DOMContentLoaded", function() {
    let basket = [];

    if (localStorage.getItem("basket")) {
        basket = JSON.parse(localStorage.getItem("basket"));
    }

    updateBasketCount();

    function updateBasketCount() {
        const basketCountSpan = document.querySelector(".basket-count");
        const basketTotalPriceSpan = document.querySelector(".basket-total-price");
        let basketCount = 0;
        let basketTotalPrice = 0;
        for (const item of basket) {
            basketCount += item.count;
            basketTotalPrice += item.count * item.price;
        }
        basketCountSpan.innerText = basketCount;
        basketTotalPriceSpan.innerText = '$' + basketTotalPrice.toFixed(2);
    }
    

    function addToBasket(productId, productName, productDesc, productImage, productPrice) {
        let existProduct = basket.find(item => item.id == productId);
        if (existProduct) {
            existProduct.count++;
        } else {
            basket.push({
                id: productId,
                name: productName,
                description: productDesc,
                image: productImage,
                price: productPrice,
                count: 1
            });
        }
        localStorage.setItem("basket", JSON.stringify(basket));
        updateBasketCount();
    }
    

    document.querySelectorAll("#products .add-btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();

            const card = this.closest(".card");
            const productId = card.getAttribute("data-id");
            const productName = card.querySelector(".card-title").innerText;
            const productDesc = card.querySelector(".card-text").innerText;
            const productImage = card.querySelector(".card-img-top").getAttribute("src");
            const productPrice = parseFloat(card.querySelector(".card-price").innerText.replace('$', ''));

            addToBasket(productId, productName, productDesc, productImage, productPrice);
        });
    });
});
