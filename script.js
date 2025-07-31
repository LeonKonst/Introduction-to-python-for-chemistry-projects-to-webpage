

// Reaction Element finder
// -----------------------
let reactionString = document.getElementById("reactionInput");
let elementsInReaction = document.getElementById("elementsInReaction");



reactionString.addEventListener("input", ()=>{
    console.log("changed");
    elementsInReaction.innerText = reactionString.value;
    }
)