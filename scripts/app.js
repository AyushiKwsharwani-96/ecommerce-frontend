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

