// ** get the input field value

const getInputFieldValue = id => document.getElementById(id).value;

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
    
    
    if (savedProducts[productName]) {
        savedProducts[productName] = parseInt(savedProducts[productName]) + parseInt(productQuantity)
    } else{
        savedProducts[productName] = productQuantity;
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
                    </th>
        
        `;

        displayConatiner.appendChild(tr)
    }
}

displayFromLsToUi()