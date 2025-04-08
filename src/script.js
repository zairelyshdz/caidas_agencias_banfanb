function toggleSidebar(){
    const sidebar = document.getElementById("sidebar");
    const mainContent =document.getElementById("mainContent");

    if(sidebar.style.width === "250px"){
        //cerrar barra lateral
        sidebar.style.width = "0"
        mainContent.style.marginRight = "0"
    } else {
        sidebar.style.width = "250px"
        mainContent.style.marginRight = "250px"
    }
}

//cerrar al hacer click fuera de la barra lateral 
document.addEventListener("click",(event)=> {
    const sidebar = document.getElementById("sidebar");
    const openBtn = document.querySelector(".open-btn");

    if(event.target !==sidebar&&event.target !==openBtn){
        sidebar.style.width= "0";
        mainContent.style.marginLeft= "0";
    }
});