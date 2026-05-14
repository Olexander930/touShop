document.addEventListener("DOMContentLoaded", function(){

    const form =
        document.getElementById("productForm");

    form.addEventListener("submit", function(event){

        const name =
            document.querySelector(
                'input[name="p_name"]'
            ).value;

        const price =
            document.querySelector(
                'input[name="p_price"]'
            ).value;

        if(name.length < 3){

            alert("Назва мінімум 3 символи");

            event.preventDefault();
        }

        if(price <= 0){

            alert("Ціна має бути більше 0");

            event.preventDefault();
        }

    });

});