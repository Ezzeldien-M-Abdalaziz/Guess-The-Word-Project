let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game Created By Ezzeldien`;

//setting game options

let numberOfTries = 6;
let numberOfLetters = 6;
let currentTry = 1;
let NumbsOfHints = 2;

//manage words
let wordToGuess = "";
let words = ["Create","update","delete","Master","branch","Mainly","Elzero","school"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");

//manage Hints
document.querySelector(".hint span").innerHTML = NumbsOfHints;
const letters = wordToGuess.split('');
let randomLetter = '';
    function hinter(){
        randomLetter = letters[Math.floor(Math.random() * letters.length)];
        letters.splice(letters.indexOf(randomLetter),1);
    }
        



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
            input.id = `guess-${i}-Letter-${j}`;
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
            // console.log(e);
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

                            //check word button
    const guessButton = document.querySelector(".check");
    guessButton.addEventListener("click",handelGuesses);
        console.log(wordToGuess);

    function handelGuesses(e){
        let successGuess = true;
        //console.log(wordToGuess);
        for(let i=1; i<=numberOfLetters;i++){
            const inputField = document.querySelector(`#guess-${currentTry}-Letter-${i}`);

            const letter = inputField.value.toLowerCase();
            const actualLetter =  wordToGuess[i - 1];  //first letter of the random word

            //game logic
            if(letter === actualLetter){
                inputField.classList.add("yes-in-place");
            }else if(wordToGuess.includes(letter) && letter !== ''){
                inputField.classList.add("not-in-place");
                successGuess = false;
            }else{
                inputField.classList.add("no");
                successGuess = false;
            }        
        }

        //check if user win or lose 
        if(successGuess){
            messageArea.innerHTML = `you Win The Word Is <span>${wordToGuess}</span>`;
            //add disabled class to all try divs
            let allTries = document.querySelectorAll(".inputs > div");
            allTries.forEach(tryDiv => tryDiv.classList.add("disabled-inputs"))

            //disable guess button
            guessButton.disabled = true;
            hintButton.disabled = true;
        }else{
            document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");

            const currentTryInputs = document.querySelectorAll(`.try-${currentTry} > input`);
            currentTryInputs.forEach((input)=>(input.disabled = true));

            currentTry++;

            const nextTryInputs = document.querySelectorAll(`.try-${currentTry} > input`);
            nextTryInputs.forEach((input)=>(input.disabled = false));


            let el = document.querySelector(`.try-${currentTry}`);
            if(el){

                document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
                document.querySelector(`.try-${currentTry}`).children[1].focus();
                
            }else{
                messageArea.innerHTML = `you lose The Word Is <span>${wordToGuess}</span>`;
                guessButton.disabled = true;
                hintButton.disabled = true;
            }

        }
    }

                                //hint button
    
    const hintButton = document.querySelector('.hint');
    hintButton.addEventListener("click",handelHint);

    function handelHint(e){
        if(NumbsOfHints > 0){
            NumbsOfHints--;
            document.querySelector(".hint span").innerHTML = NumbsOfHints;
        }
            if(NumbsOfHints === 0){
                document.querySelector('.hint').disabled = true;
                document.querySelector(".hint span").innerHTML = `No more`;
            }
            
            //select the inputs from this try
        const enabledInputs = document.querySelectorAll("input:not([disabled])");
            //select the inputs which is empty after pressing hint
        const emptyEnabledInputs = Array.from(enabledInputs).filter((input) => input.value === "");
            // console.log(emptyEnabledInputs);

            if(emptyEnabledInputs){
                const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
                // console.log(randomIndex);
                const randomInput = emptyEnabledInputs[randomIndex];
                // console.log(randomInput);
                const indexToFill = Array.from(enabledInputs).indexOf(randomInput );
                // console.log(indexToFill);
                if(indexToFill !== -1){
                    randomInput.value = wordToGuess[indexToFill].toUpperCase();
                    randomInput.classList.add("yes-in-place");
                }
            }

            //another way to hint a letter
            /*
        let filled = false;
        enabledInputs.forEach((input,index) => {
            if(!filled && !input.value){
                input.value = wordToGuess[index].toUpperCase();
                input.classList.add("yes-in-place");
                filled = true;
            }
        });
        */
    }

    function handleBackSpace(e){
        if(e.key === "Backspace"){
            const inputs = document.querySelectorAll("input:not([disabled])");
            const currentIndex = Array.from(inputs).indexOf(document.activeElement);  //**Important**  document.activeElement => is the input that is active now
            // console.log(currentIndex);
            if(currentIndex > 0){
                if(inputs[currentIndex].value){
                    inputs[currentIndex].value = '';
                }else{
                    inputs[currentIndex - 1].focus();
                    inputs[currentIndex - 1].value = '';
                }
            }
        }
    }

    document.addEventListener("keydown" , handleBackSpace)

window.onload = function(){
    generateInput();
}

