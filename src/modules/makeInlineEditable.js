function makeInlineEditable(element, onSave){
    element.addEventListener("dblclick", function(event){
        const originalText = element.textContent;
        const input = document.createElement("input");
        input.type = "text";
        input.value = originalText;
        input.className = element.className; // Preserve styles
        element.replaceWith(input);

        let alreadyHandled = false;

        input.focus();
        function saveChanges(){
            if(alreadyHandled) return;
            alreadyHandled = true;

            const newText = input.value.trim();
            if(newText && newText !== originalText) {
                onSave(newText);
            }
            input.replaceWith(element);
            element.textContent = newText || originalText;
            element.className = input.className;

        }


        input.addEventListener("blur", saveChanges);
        input.addEventListener("keydown", function(event){
            if(event.key === "Enter"){
                saveChanges();
            }else if(event.key === "Escape"){
                alreadyHandled = true;
                input.replaceWith(element);
                element.textContent = originalText;
                element.className = input.className;
            }
        })
    })
}

export default makeInlineEditable;