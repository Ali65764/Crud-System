const input = document.getElementById('input');
const cardDiv = document.getElementById('cardDiv');
const border = document.querySelector(".border");

let jsonData = [];

async function fetchJSONData() {
    try {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function displayCards(Search = '') {
    cardDiv.innerHTML = '';

    jsonData = await fetchJSONData();

    jsonData.map(item => {
        if (item.productName.toLowerCase().includes(Search.toLowerCase()) || item.description.toLowerCase().includes(Search.toLowerCase())) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="cardss"> 
                    <div class="images cards"><img class="image" src="${item.imageUrl}" alt="${item.productName}"></div>
                    <div class="name cards">Name: ${item.productName}</div>
                    <div class="description cards">Desc: ${item.description}</div>
                    <div class="category cards">Category: ${item.category}</div>
                    <div class="price cards">Price: ${item.price}</div>
                    <div class="discount cards">Discount Price: ${item.discount}</div>
                    <div class="count cards">Current Price: ${item.price - item.discount}</div>
                    <button class="button" data-id="${item.id}"><i class="fas fa-eye"></i></button>
                </div>`;
            cardDiv.appendChild(card);
        }
    });



    async function fetchItemData(id) {
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            const item = await fetchItemData(id);
            border.innerHTML = '';
            const card2 = document.createElement('div');
            card2.classList.add('card2');
            card2.innerHTML = `
                <div class="cardss2">
                    <div class="images2 cards2"><img class="image2" src="${item.imageUrl}" alt="${item.productName}"></div>
                    <div class="name2 cards2">Name: ${item.productName}</div>
                    <div class="description2 cards2">Desc: ${item.description}</div>
                    <div class="category2 cards2">Category: ${item.category}</div>
                    <div class="price2 cards2">Price: ${item.price}</div>
                    <div class="discount2 cards2">Discount Price: ${item.discount}</div>
                    <div class="rating2 cards2">Rating: ${item.rating}</div>
                    <div class="count2 cards2">Current Price: ${item.price - item.discount}</div>
                </div>`;
            border.appendChild(card2);
        });
    });
}


input.addEventListener('input', function () {
    displayCards(this.value);
});

displayCards();