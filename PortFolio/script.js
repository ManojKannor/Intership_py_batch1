console.log("hello world");
let menu_btn = document.querySelector(".menu");
let navbar = document.querySelector("nav");

menu_btn.addEventListener("click", () =>{
    navbar.classList.add(".nav-show");
})