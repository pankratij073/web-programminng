const productCatalog = [
  {
    id: 1,
    name: "Zendesk Support",
    description: "Ticketing system for tracking, prioritizing and solving customer requests.",
    category: "Support",
    price: 49,
    rating: 4.8,
    users: "Small teams",
    term: "Monthly",
    image: "assets/images/support.jpg"
  },
  {
    id: 2,
    name: "Zendesk Messaging",
    description: "Messaging service for web, mobile and social customer conversations.",
    category: "Messaging",
    price: 59,
    rating: 4.9,
    users: "Growing teams",
    term: "Monthly",
    image: "assets/images/masseging.jpg"
  },
  {
    id: 3,
    name: "Zendesk Live Chat",
    description: "Live chat tools for quick replies and support during the customer journey.",
    category: "Messaging",
    price: 39,
    rating: 4.7,
    users: "Support teams",
    term: "Monthly",
    image: "assets/images/livechat.jpg"
  },
  {
    id: 4,
    name: "Zendesk Help Center",
    description: "Knowledge base service for self-service articles and help content.",
    category: "Self-service",
    price: 35,
    rating: 4.6,
    users: "Content teams",
    term: "Monthly",
    image: "assets/images/helpCenter.jpg"
  },
  {
    id: 5,
    name: "Zendesk Voice",
    description: "Cloud phone support service for customer calls and voice workflows.",
    category: "Support",
    price: 69,
    rating: 4.7,
    users: "Call teams",
    term: "Monthly",
    image: "assets/images/voice.jpg"
  },
  {
    id: 6,
    name: "Zendesk Answer Bot",
    description: "Automation service that helps answer common customer questions faster.",
    category: "Automation",
    price: 79,
    rating: 4.8,
    users: "Service teams",
    term: "Monthly",
    image: "assets/images/AnswerBot.jpg"
  },
  {
    id: 7,
    name: "Zendesk Analytics",
    description: "Reporting service for support metrics, trends and customer experience data.",
    category: "Analytics",
    price: 89,
    rating: 4.7,
    users: "Managers",
    term: "Monthly",
    image: "assets/images/Analytics.jpg"
  },
  {
    id: 8,
    name: "Zendesk Suite Team",
    description: "Service bundle with support, messaging, help center and basic automation.",
    category: "Suite",
    price: 99,
    rating: 4.8,
    users: "Team plan",
    term: "Monthly",
    image: "assets/images/SuiteTeam.jpg"
  },
  {
    id: 9,
    name: "Zendesk Suite Growth",
    description: "Expanded service bundle for scaling support teams and customer channels.",
    category: "Suite",
    price: 129,
    rating: 4.9,
    users: "Growth plan",
    term: "Monthly",
    image: "assets/images/SuiteGrowth.jpg"
  },
  {
    id: 10,
    name: "Zendesk Suite Professional",
    description: "Professional service package with automation, analytics and collaboration.",
    category: "Suite",
    price: 159,
    rating: 4.9,
    users: "Professional plan",
    term: "Monthly",
    image: "assets/images/SuiteProfessional.jpg"
  },
  {
    id: 11,
    name: "Zendesk Sell",
    description: "Sales CRM service for leads, deals, customer records and sales activity.",
    category: "Sales",
    price: 75,
    rating: 4.6,
    users: "Sales teams",
    term: "Monthly",
    image: "assets/images/Sell.jpg"
  },
  {
    id: 12,
    name: "Zendesk Marketplace",
    description: "App and integration service for connecting support tools with workflows.",
    category: "Platform",
    price: 25,
    rating: 4.5,
    users: "All teams",
    term: "Monthly",
    image: "assets/images/Marketplace.jpg"
  },
  {
    id: 13,
    name: "Zendesk Sunshine",
    description: "Customer data platform service for flexible profiles and custom experiences.",
    category: "Platform",
    price: 119,
    rating: 4.8,
    users: "Developers",
    term: "Monthly",
    image: "assets/images/profile.jpg"
  },
  {
    id: 14,
    name: "Zendesk Enterprise",
    description: "Enterprise service plan for complex support, security and large teams.",
    category: "Enterprise",
    price: 199,
    rating: 4.9,
    users: "Enterprise plan",
    term: "Monthly",
    image: "assets/images/servicePlan.jpg"
  },
  {
    id: 15,
    name: "Zendesk Startups",
    description: "Starter service package for young companies building customer support.",
    category: "Startups",
    price: 0,
    rating: 4.6,
    users: "Startups",
    term: "Limited",
    image: "assets/images/Startups.jpg"
  }
];

const catalogCards = document.getElementById("catalogCards");
const catalogStatus = document.getElementById("catalogStatus");
const searchInput = document.getElementById("catalogSearch");
const sortSelect = document.getElementById("catalogSort");
const categoryList = document.getElementById("categoryList");
const methodButtons = document.querySelectorAll(".method-button");

let activeCategory = "All";
let currentProducts = productCatalog;
let currentLabel = "Full catalog";

function createCard(product) {
  const price = product.price === 0 ? "Free" : `$${product.price}`;

  return `
    <article class="catalog-card">
      <img src="${product.image}" alt="${product.name}" />
      <div class="catalog-card-body">
        <p class="catalog-card-category">${product.category}</p>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <dl>
          <div><dt>Price</dt><dd>${price}</dd></div>
          <div><dt>Rating</dt><dd>${product.rating}</dd></div>
          <div><dt>Users</dt><dd>${product.users}</dd></div>
          <div><dt>Term</dt><dd>${product.term}</dd></div>
        </dl>
      </div>
    </article>
  `;
}

function renderProducts(products) {
  catalogCards.innerHTML = "";

  if (products.length === 0) {
    catalogStatus.textContent = "Products not found.";
    catalogCards.innerHTML = '<p class="empty-message">No products match the selected criteria.</p>';
    return;
  }

  catalogStatus.textContent = `${currentLabel}: ${products.length}`;
  catalogCards.innerHTML = products.map(createCard).join("");
}

function applyCatalogControls() {
  const searchValue = searchInput.value.trim().toLowerCase();
  const sortValue = sortSelect.value;
  let result = currentProducts.slice();

  if (searchValue !== "") {
    result = result.filter((product) =>
      product.name.toLowerCase().includes(searchValue) ||
      product.description.toLowerCase().includes(searchValue)
    );
  }

  if (activeCategory !== "All") {
    result = result.filter((product) => product.category === activeCategory);
  }

  if (sortValue === "price") {
    result = result.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "name") {
    result = result.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortValue === "rating") {
    result = result.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(result);
}

function renderCategories() {
  const categories = ["All", ...new Set(productCatalog.map((product) => product.category))];

  categoryList.innerHTML = categories
    .map((category) => `<button type="button" class="category-button${category === activeCategory ? " active" : ""}" data-category="${category}">${category}</button>`)
    .join("");
}

function setActiveMethod(button) {
  methodButtons.forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
}

function resetControls() {
  searchInput.value = "";
  sortSelect.value = "default";
  activeCategory = "All";
  renderCategories();
}

function runArrayMethod(methodName) {
  if (methodName === "map") {
    currentProducts = productCatalog.map((product) => ({
      ...product,
      name: `${product.name} demo`,
      price: Math.round(product.price * 0.9)
    }));
    currentLabel = "map()";
  }

  if (methodName === "filter") {
    currentProducts = productCatalog.filter((product) => product.category === "Support");
    currentLabel = "filter()";
  }

  if (methodName === "reduce") {
    currentProducts = productCatalog.reduce((result, product) => {
      if (product.price >= 100) {
        result.push(product);
      }
      return result;
    }, []);
    currentLabel = "reduce()";
  }

  if (methodName === "sort") {
    currentProducts = [...productCatalog].sort((a, b) => a.price - b.price);
    currentLabel = "sort()";
  }

  if (methodName === "find") {
    const foundProduct = productCatalog.find((product) => product.rating === 4.9);
    currentProducts = foundProduct ? [foundProduct] : [];
    currentLabel = "find()";
  }

  if (methodName === "some") {
    const hasStartupOffer = productCatalog.some((product) => product.category === "Startups");
    currentProducts = hasStartupOffer ? productCatalog : [];
    currentLabel = "some()";
  }

  if (methodName === "every") {
    const allHaveRating = productCatalog.every((product) => product.rating >= 4.5);
    currentProducts = allHaveRating ? productCatalog : [];
    currentLabel = "every()";
  }

  if (methodName === "slice") {
    currentProducts = productCatalog.slice(0, 5);
    currentLabel = "slice()";
  }

  if (methodName === "reverse") {
    currentProducts = [...productCatalog].reverse();
    currentLabel = "reverse()";
  }

  if (methodName === "splice") {
    const copiedProducts = [...productCatalog];
    currentProducts = copiedProducts.splice(0, 5);
    currentLabel = "splice()";
  }

  resetControls();
  applyCatalogControls();
}

categoryList.addEventListener("click", (event) => {
  if (!event.target.classList.contains("category-button")) {
    return;
  }

  activeCategory = event.target.dataset.category;
  renderCategories();
  applyCatalogControls();
});

methodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setActiveMethod(button);
    runArrayMethod(button.dataset.method);
  });
});

searchInput.addEventListener("input", applyCatalogControls);
sortSelect.addEventListener("change", applyCatalogControls);

renderCategories();
renderProducts(productCatalog);
