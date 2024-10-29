let currentProductIndex = 0;

// Lista de produtos
const products = [
    {
        name: "PRÉ VENDA (ATÉ 31/10)",
        description: "Compre 2 e leve 3!!!. Na compra de duas de nossas camisas Oversized até o dia 31 de Outubro, você leva uma terceira totalmente de graça!.",
        price: "NÃO PERCA!!!",
        image: "assets/imgs/sale.png"
    },
    {
        name: "Camisa Oversized ZEUS",
        description: "Sinta-se no topo do Olimpo com a nossa camisa ZEUS, conforto e estilo no seu treino.",
        price: "R$ 89,90",
        image: "assets/imgs/ZEUS C P.jpg"
    },
    {
        name: "Camisa Oversized TRUE NATTY",
        description: "Para aqueles que são 100% TRUE NATTY e querem mostrar isso no estilo.",
        price: "R$ 89,90",
        image: "assets/imgs/NATTY C B.jpg"
    }
];

// Atualiza o conteúdo do card com o produto correto
function updateProduct(index) {
    const productCard = document.getElementById('highlight-product');
    const productImage = productCard.querySelector('.product-image');
    const productName = productCard.querySelector('.product-details h2');
    const productDescription = productCard.querySelector('.product-details p');
    const productPrice = productCard.querySelector('.product-details .price');

    productImage.src = products[index].image;
    productName.textContent = products[index].name;
    productDescription.textContent = products[index].description;
    productPrice.textContent = products[index].price;

    
    updateDots(index);
}


function nextProduct() {
    currentProductIndex = (currentProductIndex + 1) % products.length;
    updateProduct(currentProductIndex);
}


function previousProduct() {
    currentProductIndex = (currentProductIndex - 1 + products.length) % products.length;
    updateProduct(currentProductIndex);
}


function setProduct(index) {
    currentProductIndex = index;
    updateProduct(index);
}


function updateDots(index) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}


updateProduct(0);


const catalogProducts = [
    {
        name: "Camisa oversized NO DAYS OFF preta",
        price: "R$ 89,90",
        image: "assets/imgs/CLASSICA C P.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized NO DAYS OFF branca",
        price: "R$ 89,90",
        image: "assets/imgs/CLASSICA C B.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized ZEUS preta",
        price: "R$ 89,90",
        image: "assets/imgs/ZEUS C P.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized ZEUS branca",
        price: "R$ 89,90",
        image: "assets/imgs/ZEUS C B.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized TRUE NATTY preta",
        price: "R$ 89,90",
        image: "assets/imgs/NATTY C.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized TRUE NATTY branca",
        price: "R$ 89,90",
        image: "assets/imgs/NATTY C B.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized KING",
        price: "R$ 89,90",
        image: "assets/imgs/KING C.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized O MESMO DE ONTEM",
        price: "R$ 89,90",
        image: "assets/imgs/O MESMO DE ONTEM C.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
    {
        name: "Camisa oversized QUIMICA",
        price: "R$ 89,90",
        image: "assets/imgs/QUIMICA C P.jpg",
        sizeImage: "assets/imgs/Sizes.jfif",
    },
];

let productsLoaded = catalogProducts.length; // Inicialmente, carrega todos os produtos

// Renderiza um único produto
function renderProduct(product) {
    const productGrid = document.getElementById('product-grid');
    const productCard = `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="btn" onclick="openModal('${product.name}', '${product.image}', '${product.sizeImage}')">Mais detalhes</button>
            <button class="btn secondary" onclick="window.open('https://wa.me/5511954619955?text=Estou%20interessado%20neste%20produto%20${product.name}', '_blank')">
                Comprar no WhatsApp <i class='bx bxl-whatsapp'></i>
            </button>
        </div>
    `;
    productGrid.innerHTML += productCard;
}

// Renderiza todos os produtos no carregamento inicial da página
function renderAllProducts() {
    catalogProducts.forEach(product => renderProduct(product));
    updateButtonsVisibility();
}

// Carrega mais produtos (3 de cada vez)
function loadMoreProducts() {
    const productsToLoad = catalogProducts.slice(productsLoaded, productsLoaded + 3);
    productsToLoad.forEach(product => renderProduct(product));
    productsLoaded += productsToLoad.length;

    updateButtonsVisibility();
}

// Remove os últimos 3 produtos carregados
function loadLessProducts() {
    const productGrid = document.getElementById('product-grid');
    const cardsToRemove = Array.from(productGrid.children).slice(-3);
    cardsToRemove.forEach(card => card.remove());
    productsLoaded -= cardsToRemove.length;

    updateButtonsVisibility();
}

// Atualiza a visibilidade dos botões de "Carregar mais" e "Carregar menos"
function updateButtonsVisibility() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadLessBtn = document.getElementById('loadLessBtn');

    // Esconde o botão "Carregar mais" quando todos os produtos estão carregados
    if (productsLoaded >= catalogProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }

    // Mostra o botão "Carregar menos" apenas quando mais de 3 produtos estão carregados
    if (productsLoaded > 3) {
        loadLessBtn.style.display = 'block';
    } else {
        loadLessBtn.style.display = 'none';
    }
}

// Carrega todos os produtos ao abrir a página
window.onload = function() {
    renderAllProducts();
};

// Função para abrir o modal
function openModal(name, image, sizeImage) {
    document.getElementById('modalProductName').textContent = name;
    document.getElementById('modalProductImage').src = image;
    document.getElementById('modalSizesImage').src = sizeImage;

    const modal = document.getElementById('productModal');
    modal.style.display = "block";

    document.querySelector('.close').onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
}

// Adiciona os eventos para os botões de "Carregar mais" e "Carregar menos"
document.getElementById('loadMoreBtn').addEventListener('click', function(event) {
    event.preventDefault();
    loadMoreProducts();
});

document.getElementById('loadLessBtn').addEventListener('click', function(event) {
    event.preventDefault();
    loadLessProducts();
});
