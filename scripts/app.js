console.log("E-Commerce Website Loaded");

  function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
  }


  const productGrid = document.getElementById("productGrid");

  async function fetchProducts() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const products = await res.json();

      productGrid.innerHTML = products
        .map(
          (product) => `
        <div class="product-card">
          <img src="${product.image}" alt="${product.title}" loading="lazy" />
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">$${product.price}</p>
          <button class="product-btn" onclick="addToCart('${product.title}')">
            Add to Cart
          </button>
        </div>
      `
        )
        .join("");
    } catch (error) {
      productGrid.innerHTML = "<p>Failed to load products.</p>";
      console.error(error);
    }
  }

  function addToCart(productName) {
    alert(`${productName} added to cart!`);
  }

  fetchProducts();


  const API_URL = "https://fakestoreapi.com/products";
  
  const loading = document.getElementById("loading");
  const errorBox = document.getElementById("error");

  async function fetchProducts() {
    loading.classList.remove("hidden");
    errorBox.classList.add("hidden");

    try {
      // Check cache first
      const cachedData = localStorage.getItem("products");
      if (cachedData) {
        displayProducts(JSON.parse(cachedData));
        loading.classList.add("hidden");
        return;
      }

      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("API Error");

      const products = await response.json();

      // Cache data
      localStorage.setItem("products", JSON.stringify(products));

      displayProducts(products);
    } catch (error) {
      errorBox.classList.remove("hidden");
      console.error("Fetch Error:", error);
    } finally {
      loading.classList.add("hidden");
    }
  }

  function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-desc">${product.description.substring(0, 80)}...</p>
        <p class="product-price">$${product.price}</p>
        <button class="product-btn">Add to Cart</button>
      `;

      productGrid.appendChild(card);
    });
  }

  fetchProducts();

