//Fait un popup indiquant qui est le gagnant s'il y en a un
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
    
    // État initial
    line.style.width = "8px"; // L'épaisseur de ta ligne verticale
    line.style.height = "0%"; // La hauteur part de zéro

    // Animation vers l'état final
    setTimeout(() => {
        line.style.height = "100%"; 
    }, 50); // 50ms laisse le temps au navigateur d'appliquer le 0% d'abord
}

function horizontalLine(row){
    let line = createLine();
    
    // Positionnement
    line.style.top = (16 + 33 * row) + "%";
    line.style.left = "0%";
    
    // État initial
    line.style.height = "8px"; // L'épaisseur de ta ligne horizontale
    line.style.width = "0%";   // La largeur part de zéro

    // Animation vers l'état final
    setTimeout(() => {
        line.style.width = "100%"; 
    }, 50);
}

function diagonalLine(direction){
    let line = createLine();
    
    // État initial (identique pour les deux diagonales)
    line.style.height = "8px"; 
    line.style.width = "0%";
    
    //De Haut-Gauche vers Bas-Droite (cases 0, 4, 8)
    if (direction === 1) {
        line.style.top = "0%";
        line.style.left = "0%";
        line.style.transformOrigin = "top left"; // Point d'ancrage en haut à gauche
        line.style.transform = "rotate(45deg)";
    }
    //De Bas-Gauche vers Haut-Droite (cases 6, 4, 2) 
    else if (direction === 2) {
        line.style.top = "100%"; // On part tout en bas
        line.style.left = "0%";
        line.style.transformOrigin = "bottom left"; // Point d'ancrage en bas à gauche
        line.style.transform = "rotate(-45deg)";
    }

    // Animation vers l'état final (~141% pour atteindre l'autre bout du carré)
    setTimeout(() => {
        line.style.width = "141.4%"; 
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
    if(tictactoe[0] === tictactoe[4] && tictactoe[0] === tictactoe[8] && tictactoe[0] !== "-"){
        diagonalLine(1);
        return tictactoe[0];
    }
    //diagonale /
    if(tictactoe[6] === tictactoe[4] && tictactoe[6] === tictactoe[2] && tictactoe[6] !== "-"){
        diagonalLine(2);
        return tictactoe[6];
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