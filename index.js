let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Ezzeldien`;

//setting game options

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;

function generateInput(){
    const inputsContainer = document.querySelector(".inputs");

    //creat main try
    for (let i = 1; i <= numberOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;

        if(i != 1) tryDiv.classList.add("disabled-inputs");  

        //create inputs
        for(let j = 1; j <= numberOfLetters; j++){
            const input = document.createElement("input");
            input.type = "text";
            input.id = `Guess-${i}-Letter-${j}`;
            input.setAttribute("maxLength","1");
            tryDiv.appendChild(input);
        }
        inputsContainer.appendChild(tryDiv);
    }
    inputsContainer.children[0].children[1].focus();

    //disable all inputs except first one
    const inputsInDisabledDiv = document.querySelectorAll(".disabled-inputs > input");   //".disabled-inputs > input" because we are selecting the inputs inside the div with this class.
    inputsInDisabledDiv.forEach((input)=>(input.disabled = true));

    //eventlistner to shift to the second input after writing just one letter
    const inputs = document.querySelectorAll('input');
     //console.log(inputs);
    inputs.forEach((input,index)=> {
        //convert input to UpperCase
        input.addEventListener('input',function(e){
            console.log(e);
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];  
            if(nextInput) nextInput.focus();
        });  

        input.addEventListener("keydown" , function(e){   //evenyhandler for using the arrows
            const currentIndex = Array.from(inputs).indexOf(this);   //another way other than "const nextInput = inputs[index + 1]; "
            if(e.key === "ArrowRight"){
                const nextInput = currentIndex + 1;
                if(nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(e.key === "ArrowLeft"){
                const previousInput = currentIndex - 1;
                if(previousInput >= 0) inputs[previousInput].focus();
            }
        });
    });

} 

window.onload = function(){
    generateInput();
}

