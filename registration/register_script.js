document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById("register_form");
    const nameInput = document.getElementById("name");
    const lastNameInput = document.getElementById("last_name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm_password");
    const nameError = document.getElementById("name_error");
    const lastNameError = document.getElementById("last_name_error");
    const emailError = document.getElementById("email_error");
    const passwordError = document.getElementById("password_error");
    const confirmPasswordError = document.getElementById("confirm_password_error");

    form.addEventListener("submit", function(event){
        nameError.style.display = "none";
        lastNameError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
        confirmPasswordError.style.display = "none";

        let isValid = true;

        const nameValue = nameInput.value.trim();
        if(nameValue === "") {
            nameError.textContent = "Будь ласка, введіть ваше ім'я";
            nameError.style.display = "block";
            isValid = false;
        }

        const lastNameValue = lastNameInput.value.trim();
        if(lastNameValue === "") {
            lastNameError.textContent = "Будь ласка, введіть ваше прізвище";
            lastNameError.style.display = "block";
            isValid = false;
        }

        const emailValue = emailInput.value.trim();
        if(emailValue === "") {
            emailError.textContent = "Будь ласка, введіть електронну пошту";
            emailError.style.display = "block";
            isValid = false;
        } 
        else if(!emailValue.includes("@") || !emailValue.includes(".")) {
            emailError.textContent = "Будь ласка, введіть коректну електронну пошту";
            emailError.style.display = "block";
            isValid = false;
        }

        const passwordValue = passwordInput.value.trim();
        if(passwordValue === ""){
            passwordError.textContent = "Будь ласка, придумайте пароль";
            passwordError.style.display = "block";
            isValid = false;
        } 
        else if(passwordValue.length < 6){
            passwordError.textContent = "Пароль повинен містити не менше 6 символів";
            passwordError.style.display = "block";
            isValid = false;
        }

        const confirmPasswordValue = confirmPasswordInput.value.trim();
        if(confirmPasswordValue === "") {
            confirmPasswordError.textContent = "Будь ласка, підтвердіть пароль";
            confirmPasswordError.style.display = "block";
            isValid = false;
        } 
        else if (confirmPasswordValue !== passwordValue) {
            confirmPasswordError.textContent = "Паролі не збігаються! Перевірте правильність.";
            confirmPasswordError.style.display = "block";
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});