const productName = document.getElementById("ProductName");
const imageUrl = document.getElementById("ImageUrl");
const description = document.getElementById("Description");
const category = document.getElementById("Category");
const price = document.getElementById("Price");
const discount = document.getElementById("Discount");
const count = document.getElementById("Count");
const rating = document.getElementById("Rating");
const tableWrapper = document.getElementById("table-body");
const submit = document.querySelector(".submit");

function tableProducts(products) {
  let table = " ";
  products.map(item => {
    table += `
              <tr data-id="${item.id}">
                <td>${item.productName}</td>
                <td><img class="product-image" src="${item.imageUrl}" alt="${item.productName}"></td>
                <td>${item.description}</td>
                <td>${item.category}</td>
                <td>${item.price}</td>
                <td>${item.discount}</td>
                <td>${item.count}</td>
                <td>${item.rating}</td>
                <td>
                  <button class="editBtn">Edit</button>
                  <button class="deleteBtn">Delete</button>
                </td>
              </tr>
            `;
  });
  tableWrapper.innerHTML = table;
  deleteButtons();
  editButtons();
}

const addProduct = async (event) => {
  event.preventDefault();

  const productData = {
    productName: productName.value,
    imageUrl: imageUrl.value,
    description: description.value,
    category: category.value,
    price: parseFloat(price.value),
    discount: parseFloat(discount.value),
    count: parseInt(count.value),
    rating: parseFloat(rating.value)
  };

  if (!productData.productName || !productData.imageUrl || !productData.description ||
    !productData.category || !productData.price || !productData.discount ||
    !productData.count || !productData.rating) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Dəyərləri Əlavə Edin",
    });
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const addedProduct = await response.json();
    fetchProducts();
    productName.value = "";
    imageUrl.value = "";
    description.value = "";
    category.value = "";
    price.value = "";
    discount.value = "";
    count.value = "";
    rating.value = "";

  } catch (error) {
    console.error(error);
  }
};

submit.addEventListener("click", addProduct);

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    tableProducts(data);
  } catch (error) {
    console.error(error);
  }
};



//DELETE
const removePost = async (id) => {
  try {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }); ``

    fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

const deleteButtons = () => {
  const deleteButtons = document.querySelectorAll(".deleteBtn");
  deleteButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      const productId = event.target.closest("tr").dataset.id;
      Swal.fire({
        title: "Əminsiz?",
        text: "Bunu Geri Qaytara Bilməyəcəksiniz!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Silin!"
      }).then((result) => {
        if (result.isConfirmed) {

          removePost(productId).then(() => {
            Swal.fire({
              title: "Silindi!",
              text: "Əməliyyat uğurla yerinə yetirildi.",
              icon: "success"
            })

          });
        }
      });


    });
  });
};

fetchProducts();





//EDIT
const editModal = document.getElementById("editModal");
const editProductName = document.getElementById("EditProductName");
const editImageUrl = document.getElementById("EditImageUrl");
const editDescription = document.getElementById("EditDescription");
const editCategory = document.getElementById("EditCategory");
const editPrice = document.getElementById("EditPrice");
const editDiscount = document.getElementById("EditDiscount");
const editCount = document.getElementById("EditCount");
const editRating = document.getElementById("EditRating");
const baseUrl = 'http://localhost:3000/posts';
let editProductId;

const editButtons = () => {
  const editButtons = document.querySelectorAll(".editBtn");
  editButtons.forEach(button => {
    button.addEventListener("click", async (event) => {
      const tr = event.target.closest("tr");
      editProductId = tr.getAttribute("data-id");

      try {
        const response = await fetch(`${baseUrl}/${editProductId}`);
        const product = await response.json();

        editProductName.value = product.productName;
        editImageUrl.value = product.imageUrl;
        editDescription.value = product.description;
        editCategory.value = product.category;
        editPrice.value = product.price;
        editDiscount.value = product.discount;
        editCount.value = product.count;
        editRating.value = product.rating;

        editModal.style.display = "block";
      } catch (error) {
        console.error(error);
      }
    });
  });
};

function closeEditModal() {
  editModal.style.display = "none";
}

function updateProduct() {
  fetch(`${baseUrl}/${editProductId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      productName: editProductName.value,
      imageUrl: editImageUrl.value,
      description: editDescription.value,
      category: editCategory.value,
      price: parseFloat(editPrice.value),
      discount: parseFloat(editDiscount.value),
      count: parseInt(editCount.value),
      rating: parseFloat(editRating.value)
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      closeEditModal();
      fetchProducts();
    })
    .catch(error => console.error(error));
}



fetchProducts();





































