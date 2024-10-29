document.addEventListener('DOMContentLoaded', () => {
    const quantityInput = document.getElementById('quantity');
    const productOptionInput = document.getElementById("product-option");
    const serviceTypeRadios = document.querySelectorAll('input[name="service-type"]');
    const optionsContainer = document.getElementById("options-container");
    const checkboxContainer = document.getElementById("checkbox-container");
    const resultElement = document.getElementById("result"); 
    const form = document.getElementById("order-form");

    const basePrices = {
        type1: 100,
        type2: 150, 
        type3: 200  
    };

    const featurePrice = 1000;

    const quantityPattern = /^[1-9][0-9]*$/;

    function calculateTotalCost() {
        const quantity = quantityInput.value.trim();
        const selectedServiceType = document.querySelector('input[name="service-type"]:checked').value;
       

        if (!quantityPattern.test(quantity)) {
            resultElement.innerText = "Ошибка: введите корректное количество (целое положительное число).";
            return;
        }

        let totalCost = basePrices[selectedServiceType] * quantity;

        if (selectedServiceType === "type2" && productOptionInput.value) {
            totalCost += parseInt(productOptionInput.value);
        }

        if (selectedServiceType === "type3" && document.querySelector('input[name="product-feature"]').checked) {
            totalCost += featurePrice;
        }

        resultElement.innerText = "Стоимость заказа: " + totalCost + " руб.";
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        calculateTotalCost();
    });

    serviceTypeRadios.forEach(radio => radio.addEventListener("change", () => {
        const selectedServiceType = document.querySelector('input[name="service-type"]:checked').value;
    
        if (selectedServiceType == "type1") {
            optionsContainer.style.display = "none";
            checkboxContainer.style.display = "none";
        } else if (selectedServiceType == "type2") {
            optionsContainer.style.display = "block";
            checkboxContainer.style.display = "none";
        } else if (selectedServiceType == "type3") {
            optionsContainer.style.display = "none";
            checkboxContainer.style.display = "block";
        }
        calculateTotalCost()
    }));

    quantityInput.addEventListener("input", calculateTotalCost);
    productOptionInput.addEventListener("change", calculateTotalCost);
    checkboxContainer.addEventListener("change", calculateTotalCost);

    calculateTotalCost()
});
