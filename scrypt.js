let currentProductIndex = 0;

// Lista de produtos
const products = [
    {
        name: "PRÉ VENDA (ATÉ 31/10)",
        description: "Compre 2 e leve 3!!!. Na compra de duas de nossas camisetas até o dia 31 de Outubro, você leva uma terceira totalmente de graça!.",
        price: "NÃO PERCA!!!",
        image: "assets/imgs/sale.png"
    },
    {
        name: "Camisa Oversized KING",
        description: "Sinta-se no topo com a nossa camisa KING, conforto e estilo no seu treino.",
        price: "R$ 100,00",
        image: "assets/imgs/KING C.jpg"
    },
    {
        name: "Camisa Oversized TRUE NATTY",
        description: "Para aqueles que são 100% TRUE NATTY e querem mostrar isso no estilo.",
        price: "R$ 100,00",
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
        name: "Camisa oversized KING",
        price: "R$ 89,90",
        image: "assets/imgs/KING C.jpg",
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
    }
];

let productsLoaded = 0; 


function renderProduct(product) {
    const productGrid = document.getElementById('product-grid');
    const productCard = `
        <div class="product-card">
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <button class="btn" onclick="openModal('${product.name}', '${product.image}', '${product.sizeImage}',)">Mais detalhes</button>
    <button class="btn secondary" onclick="window.open('https://wa.me/5511954619955?text=Estou%20interessado%20neste%20produto%20${product.name}', '_blank')">
        Comprar no WhatsApp <i class='bx bxl-whatsapp'></i>
    </button>
</div>
    `;
    productGrid.innerHTML += productCard;
}

// Função para abrir o modal
function openModal(name, image, sizeImage,) {
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


function loadMoreProducts() {
    const productsToLoad = catalogProducts.slice(productsLoaded, productsLoaded + 3);
    productsToLoad.forEach(product => renderProduct(product));
    productsLoaded += productsToLoad.length;

   
    updateButtonsVisibility();
}


function loadLessProducts() {
    const productGrid = document.getElementById('product-grid');
    const cardsToRemove = Array.from(productGrid.children).slice(-3);
    cardsToRemove.forEach(card => card.remove());
    productsLoaded -= cardsToRemove.length;

    
    updateButtonsVisibility();
}


function updateButtonsVisibility() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const loadLessBtn = document.getElementById('loadLessBtn');

    
    if (productsLoaded >= catalogProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }

    
    if (productsLoaded > 3) {
        loadLessBtn.style.display = 'block';
    } else {
        loadLessBtn.style.display = 'none';
    }
}


window.onload = function() {
    loadMoreProducts();
}


document.getElementById('loadMoreBtn').addEventListener('click', function(event) {
    event.preventDefault();
    loadMoreProducts();
});

document.getElementById('loadLessBtn').addEventListener('click', function(event) {
    event.preventDefault();
    loadLessProducts();
});

function changeImage(imageId, imagePath) {
    document.getElementById(imageId).src = imagePath;
}

