const productName = document.getElementById("productName")
const imageUrl = document.getElementById("imageUrl")
const description = document.getElementById("description")
const category = document.getElementById("category")
const price = document.getElementById("price")
const discountPrice = document.getElementById("discountPrice")
const count = document.getElementById("count")
const rating = document.getElementById("rating")
const tableBody = document.querySelector(".table-body")
const submit = document.querySelector(".submit")
const baseURL = "http://localhost:3000"

function tableProducts(products) {
    let table = ''
    products.map((product) => {
        table += `
        <tr data-id=${product.id}>
            <td>${product.productName}</td>
            <td><img src=${product.imageUrl} alt=${product.productName}/></td>
            <td>${product.description}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.discountPrice}</td>
            <td>${product.count}</td>
            <td>${product.rating}</td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        </tr>
      `
    })
    tableBody.innerHTML = table
    deleteButtons()
    editButtons()
}

//GET
async function getProducts() {
    try {
        const response = await fetch(baseURL + '/products')
        const data = await response.json()
        console.log("data", data);

        tableProducts(data)
    }
    catch (err) {
        console.log(err);
    }
}



//ADD
async function addProduct(event) {
    event.preventDefault()
    const productData = {
        productName: productName.value,
        imageUrl: imageUrl.value,
        description: description.value,
        category: category.value,
        price: price.value,
        discountPrice: discountPrice.value,
        count: count.value,
        rating: rating.value
    }

    if (Object.values(productData).some(value => value === '')) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in fields",
        });
        return
    }
    try {
        const response = await fetch(baseURL + '/products', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(productData)
        })
        const data = await response.json()
        return data
    }
    catch (err) {
        console.log(err);
    }
}
submit.addEventListener("click", addProduct)
getProducts();



//DELETE
async function deleteProducts(id) {
    try {
        const response = await fetch(baseURL + "/products/" + id, {
            method: "DELETE"
        })
        const data = await response.json()
        getProducts()
        return data
    }
    catch (err) {
        console.log(err);
    }
}

function deleteButtons() {
    const deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const productId = e.target.closest("tr").dataset.id
            Swal.fire({
                title: "Are you Sure Deleted",
                text: "you won't be able to return it",
                icon: "question",
                showCancelButton: true
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteProducts(productId).then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "The operation was performed successfully.",
                            icon: "success"
                        })
                    })
                }
            })
        })
    })
}

// EDIT 
const editProductName = document.getElementById("editProductName")
const editImageUrl = document.getElementById("editImageUrl")
const editDescription = document.getElementById("editDescription")
const editCategory = document.getElementById("editCategory")
const editPrice = document.getElementById("editPrice")
const editDiscountPrice = document.getElementById("editDiscountPrice")
const editCount = document.getElementById("editCount")
const editRating = document.getElementById("editRating")
const editModal = document.getElementById("editModal")
let editProductId
function editButtons() {
    const editBtn = document.querySelectorAll(".editBtn")
    editBtn.forEach((btn) => {
        btn.addEventListener("click", async function (e) {
            editProductId = e.target.closest("tr").dataset.id

            try {
                const response = await fetch(baseURL + "/products/" + editProductId)
                const data = await response.json()

                editProductName.value = data.productName
                editImageUrl.value = data.imageUrl
                editDescription.value = data.description
                editCategory.value = data.category
                editPrice.value = data.price
                editDiscountPrice.value = data.discountPrice
                editCount.value = data.count
                editRating.value = data.rating

                editModal.style.display = 'block'
            }
            catch (err) {
                console.log(err);
            }
        })
    })
}

async function editProducts() {
    const productData = {
        productName: editProductName.value,
        imageUrl: editImageUrl.value,
        description: editDescription.value,
        category: editCategory.value,
        price: editPrice.value,
        discountPrice: editDiscountPrice.value,
        count: editCount.value,
        rating: editRating.value
    }
    if (Object.values(productData).some((value) => value == '')) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill in fields",
        });
        return
    }
    try {
        const response = await fetch(baseURL + "/products/" + editProductId, {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(productData)
        })
        const data = await response.json()
        closeModal()
        getProducts();
        return data
    }
    catch (err) {
        console.log(err);
    }
}

function closeModal() {
    editModal.style.display = 'none'
}
window.addEventListener('click',function(e){
    if(e.target == editModal){
        editModal.style.display = 'none'
    }
})