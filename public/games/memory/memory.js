let memory = document.querySelectorAll(".memory");

let images = ["A","A","B","B","C",
              "C","D","D","E","E",
              "F","F","G","G","H",
              "H","I","I","J","J"];

//H pour caché, F pour trouvé et S pour affiché
let status = ["H"] * 20;


for(let i=0; i < 20; i++){
    let rnd = Math.floor(Math.random() * 20);

    let tempo = images[i];
    images[i] = images[rnd];
    images[rnd] = tempo;
}

memory.forEach((img) =>{
    img.addEventListener('click',selected);
});

function selected(){
    
}