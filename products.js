const baseURL = "http://localhost:3000"
const products = document.getElementById("products")
const productDetail = document.querySelector(".product-detail")
const input = document.getElementById("search-product")
let jsonData = []

async function getProducts() {
    try {
        const response = await fetch(baseURL + "/products")
        const data = await response.json()
        return data
    }
    catch (err) {
        console.log(err);
    }
}

async function displayCards(Search = '') {
    jsonData = await getProducts()
    products.innerHTML = ''
    jsonData.map((item) => {
        if (item.productName.toLowerCase().includes(Search.toLowerCase()) || item.description.toLowerCase().includes(Search.toLowerCase())) {
            const cards = document.createElement("div")
            cards.classList.add("cards")
            cards.innerHTML = `
            <div class="card"> 
                <div class="product-image">
                    <img src=${item.imageUrl} alt=${item.productName}/>
                </div>
                <div>Name: ${item.productName}</div>
                <div>Desc: ${item.description}</div>
                <div>Category: ${item.category}</div>
                <div>Price: ${item.price}</div>
                <div>Discount Price: ${item.discountPrice}</div>
                <div>Current Price: ${item.price - item.discountPrice}</div>
                <button class='eye-button' data-id=${item.id}><i class="fas fa-eye"></i></button>
            </div>
        `
            products.appendChild(cards)
        }
    })


    const eyeButton = document.querySelectorAll(".eye-button")
    eyeButton.forEach((btn) => {
        btn.addEventListener('click', async function () {
            const id = btn.getAttribute("data-id")
            productDetail.innerHTML = ''
            const item = await getSingleProducts(id)
            const singleCard = document.createElement("div")
            singleCard.classList.add("singleCard")
            singleCard.innerHTML = `
                <div class = 'single-card-detail'>
                    <div class = "single-card-image">
                        <img src=${item.imageUrl} alt=${item.productName}/>
                    </div>
                    <div class = "single-card-name"><b>Name: ${item.productName}</b></div>
                    <div>Desc: ${item.description}</div>
                    <div>Category: ${item.category}</div>
                    <div>Price: ${item.price}</div>
                    <div>Discount Price: ${item.discountPrice}</div>
                    <div>Rating: ${item.rating}</div>
                    <div>Current Price: ${item.price - item.discountPrice}</div>
                </div>
            `
            productDetail.appendChild(singleCard)
        })
    })
}


async function getSingleProducts(id) {
    try {
        const response = await fetch(baseURL + "/products/" + id)
        const data = await response.json()
        return data
    }
    catch (err) {
        console.log(err);
    }
}

input.addEventListener("input", function (e) {
    displayCards(e.target.value)
})

displayCards()

