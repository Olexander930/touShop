document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("auth-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError"); 
    const passwordError = document.getElementById("passwordError");

    form.addEventListener("submit", function(event){
        event.preventDefault();
        emailError.style.display = "none";
        passwordError.style.display = "none";

        let isValid = true;
        const emailValue = email.value.trim();

        if(emailValue === "") {
            emailError.textContent = "Будь ласка, введіть електронну пошту";
            emailError.style.display = "block";
            isValid = false;
        }
        else if(!emailValue.includes("@")) {
            emailError.textContent = "Будь ласка, введіть коректну електронну пошту";
            emailError.style.display = "block";
            isValid = false;
        }

        const passwordValue = password.value.trim();
        if(passwordValue === ""){
            passwordError.textContent = "Будь ласка, введіть пароль";
            passwordError.style.display = "block"; 
            isValid = false;
        }
        else if(passwordValue.length < 8){
            passwordError.textContent = "Пароль повинен містити не менше 8 символів";
            passwordError.style.display = "block";
            isValid = false;
        }
        
        if (isValid === true) {
            alert("Успішний вхід! Вітаємо у кабінеті користувача");
        }
    });
});