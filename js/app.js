// ** get the input field value

const getInputFieldValue = id => {
    const inputValue = document.getElementById(id).value;
    document.getElementById(id).value = ``;
    return inputValue;
}

// ** addToCart() button functionality

const addToCart = ()=>{
    // ** get the product name 

    const productName = getInputFieldValue('product-input');
    const productQuantity = getInputFieldValue('quntity-input')

    // ** First input should be string
    
    if (isNaN(productName) && Number.isInteger(Number(productQuantity)))  {

        // ** product-display
        setLocalStorage(productName,productQuantity);
        displayFromLsToUi()
    };

   
};

// ** product display to ui

const productDisplay = (productName,productQuantity)=>{

    // ** Where to display

    const displayConatiner = document.getElementById('product-display');

    const tr = document.createElement('tr')

    tr.innerHTML = `
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${productName}
                    ${productQuantity}
                </th>
    
    `;

    displayConatiner.appendChild(tr)
};

// ** get the data from localStorage

const getProductsFromLocalStorage = ()=>{
    let savedProducts = JSON.parse(localStorage.getItem('allProducts')); // object will get here or null value

    savedProducts === null && (savedProducts = {});

    return savedProducts;

};

// ** set the localStorage value 

const setLocalStorage = (productName,productQuantity)=>{
    const savedProducts = getProductsFromLocalStorage();
    
    console.log(savedProducts[productName])
    
    
    if (savedProducts[productName]) {
        savedProducts[productName] = parseInt(savedProducts[productName]) + parseInt(productQuantity);
        document.getElementById('stock-out').classList.add('hidden')
        if (savedProducts[productName] <= 0) {
            document.getElementById('stock-out').classList.remove('hidden')
            return;
        }
    } else{
        savedProducts[productName] = productQuantity;
        document.getElementById('stock-out').classList.add('hidden')
    }

    // ** set value to ls

    localStorage.setItem('allProducts', JSON.stringify(savedProducts));
};

// ** display from ls

const displayFromLsToUi = ()=>{
    // ** Where to display

    const displayConatiner = document.getElementById('product-display');
    const savedProducts = getProductsFromLocalStorage();

    displayConatiner.textContent = ``
    
    for (const key in savedProducts) {
        const nameProduct = key;
        const quantityProduct = savedProducts[key];

        const tr = document.createElement('tr')

        tr.innerHTML = `
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${nameProduct}
                        ${quantityProduct}
                        <button onclick="deleteHandler('${nameProduct}')">Delete</button>
                    </th>
        
        `;

        displayConatiner.appendChild(tr)
    }
};

const deleteHandler = (nameProduct)=>{
    const savedProducts = getProductsFromLocalStorage();
    
    delete savedProducts[nameProduct]

    localStorage.setItem('allProducts',JSON.stringify(savedProducts));
    displayFromLsToUi()
}

displayFromLsToUi()