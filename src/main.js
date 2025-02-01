"use strict"



let courses=[];
let url="https://webbutveckling.miun.se/files/ramschema_ht24.json";
window.onload = ()=>{
    loadCourses()
}
async function loadCourses(){
    try{
        const response = await fetch(url)
        const data = await response.json();

        console.table()
    }catch(error){
        console.error(error)
    }
}