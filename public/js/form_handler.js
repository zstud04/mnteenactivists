var currentTab=0;
showTab(currentTab);

function showTab(n){
    var tabs= document.getElementsByClassName("tab");
    x[n].style.display="block";

}

document.getElementsByClassName("progressTab");

document.addEventListener("click", advanceTab);

function advanceTab(){
    currentTab++;
    showTab(currentTab);
}