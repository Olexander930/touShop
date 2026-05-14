document.addEventListener("DOMContentLoaded", function(){
    const deleteButtons =
        document.querySelectorAll(".btn-delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function(event){
            const confirmDelete =
                confirm("Видалити товар?");
            if(!confirmDelete){
                event.preventDefault();
            }
        });
    });
});