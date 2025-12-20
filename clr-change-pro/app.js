const getcl=()=>{
    // hax code
    const randomNumber=Math.floor(Math.random()*16777215);
    const randomCode="#" + randomNumber.toString(16);
    document.body.style.backgroundColor=randomCode;
    document.getElementById("clr-cod").innerText=randomCode;
}
document.getElementById("btn").addEventListener("click",getcl)
getcl();