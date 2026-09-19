function endPopUp(winner){
    let color = "white";
    let name;

    if(winner === "X"){
        color = "red";
        name = "Croix";
    }else if(winner === "O"){
        color = "aqua";
        name = "Rond";
    }

    let modal = document.getElementById("modal-victory");
    let texteVictory = document.getElementById("texte-victory");

    if(winner === "D"){
        texteVictory.innerText = "Egalité !";
    }else{
        texteVictory.innerText = "Le Joueur " + name + " a gagné !";
    }
    texteVictory.parentElement.style.backgroundColor = color;

    setTimeout(() => {
        modal.classList.add("active");
    }, 600);
}

//Crée juste le line applique son style et l'ajoute dans le conteneur
function createLine(){
    let line = document.createElement("div");

    line.id = "victory-line";

    let contener = document.querySelector(".tictactoe");
    contener.appendChild(line);

    return line;
}

function verticalelLine(colonne){
   let line = createLine();
    
    // Positionnement
    line.style.top = "0%";
    line.style.left = (16 + 33 * colonne) + "%";
    
    // État initial (État A)
    line.style.width = "8px"; // L'épaisseur de ta ligne verticale
    line.style.height = "0%"; // La hauteur part de zéro

    // Animation vers l'état final (État B)
    setTimeout(() => {
        line.style.height = "100%"; 
    }, 50); // 50ms laisse le temps au navigateur d'appliquer le 0% d'abord
}

function horizontalLine(row){
    let line = createLine();
    
    // Positionnement
    line.style.top = (16 + 33 * row) + "%";
    line.style.left = "0%";
    
    // État initial (État A)
    line.style.height = "8px"; // L'épaisseur de ta ligne horizontale
    line.style.width = "0%";   // La largeur part de zéro

    // Animation vers l'état final (État B)
    setTimeout(() => {
        line.style.width = "100%"; 
    }, 50);
}

function draw(){
    let i=0;
    while(i<9){
        if(tictactoe[i] === "-"){
            return false;
        }
        i++;
    }
    return true;
}


/*Renvoie le gagnant s'il y en a un (soit X, soit O) 
 et s'il n'y en a pas renvoie - sauf en cas d'égalité où il renvoit D */
function whoIsWining(indice){
    //Ligne
    let line = Math.floor(indice/3);
    /*On regarde si sur la ligne où se trouve l'image qu'on vient de cliquer
    s'ils ont tous le même symbole et si oui on renvoie le symbole qui symbolise le gagnant*/
    if(tictactoe[0+line*3] === tictactoe[1+line*3] && 
        tictactoe[0+line*3] === tictactoe[2+line*3]){
        horizontalLine(line)
        return tictactoe[indice];
    }

    //Colonne
    let colonne = indice%3;
    //Comme pour les lignes mais un décalge différent
    if(tictactoe[0+colonne] === tictactoe[3+colonne] && 
        tictactoe[0+colonne] === tictactoe[6+colonne]){
        verticalelLine(colonne)
        return tictactoe[indice];
    }

    //diagonale \
    if(indice === 0 || indice === 4 || indice === 8){
        return tictactoe[indice];
    }
    //diagonale /
    if(indice === 6 || indice === 4 || indice === 2){
        return tictactoe[indice];
    }

    //égalité
    if(draw()){
        return "D";
    }

    return "-";
}



/* selected va changer l'image en fonction du buton sur lequel on clique */
function selected(event){
    let image = event.target;
    let id = image.id;

    if(tictactoe[id] == "-"){
        tictactoe[id] = currentRound;
        if(currentRound == "O"){
            currentRound = "X";
            image.src = "../../assets/cercle_bleu.webp"
        }else{
            currentRound = "O";
            image.src = "../../assets/croix_rouge.webp"
        }
        let winner = whoIsWining(id);
        
        if(winner !== "-"){
            endPopUp(winner);
        }
    }
}

let currentRound = "O";

/*On remplie le tableau de - pour dire qu'il est vide 
et plus tard on mettra soit des X quand c'est une crois 
soit des O quand c'est un rond*/
let tictactoe = [];

for(let i = 0 ; i < 10; i++){
    tictactoe[i] = "-";
}

let images = document.querySelectorAll('.tictactoe');

images.forEach((img) =>{
    img.addEventListener('click',selected);
});

let replayButton = document.getElementById("replay");

replayButton.addEventListener("click", function() {
    location.reload();
});