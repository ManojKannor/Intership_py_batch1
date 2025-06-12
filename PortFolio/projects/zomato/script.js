let body = document.querySelector("body");
let ModeBtn = document.querySelector(".ModeBtn");

let currmode = "light";
ModeBtn.addEventListener("click", () => {
    if(currmode === "light"){
        body.classList.remove("light");
        currmode = "dark";
        body.classList.add("dark");
    }else{
        body.classList.remove("dark");
        body.classList.add("light");
        currmode = "light";
    }

    console.log(currmode);
})