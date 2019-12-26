let start = document.getElementById('start');
start.addEventListener('click', startGame);


let arr = [];
let arrEmojis = ['🤖','👺','👽','🥶','🎅','🤬','🙉','👿','🧟','🤖','👺','👽','🥶','🎅','🤬','🙉','👿','🧟'];

let arrRandom = [];
let random; 

let playing = false;


let counter;
counter = document.createElement('h1');

function countDown(){
    counter.classList.add('counter')
    for(let i=47; i>0; i--){
      
      counter.innerHTML = 47-i;
      setTimeout(() => 
      document.body.appendChild(counter)
      , 1000*i);
      setTimeout(() => 
      counter.innerHTML = counter.innerHTML.replace(47-i,47-i-1)
      , 1000*i);
    }
}




function startGame(){

        if(playing){
            playAgain.remove();
        }
        
        for(let i=1; i<=18; i++){
            arr.push('b'+i)
        }
        
        for(let x=0; x<18; x++){
            arr[x] = document.getElementById(arr[x]);
            arr[x].addEventListener('click', displayBtn);
        }
    
        // RANDOM SERIE #18
    
        for(let i=0; i<18; i++){
            random = Math.floor(Math.random() * (18-i)); 
            arrRandom.push(arrEmojis[random]);
            arrEmojis.splice(random, 1);
        } 
    
        start.classList.add('item-done');
    
        countDown();
        setTimeout(restartPlay, 47000);
}




function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
}

let unlock = new Sound('assets/unlock.mp3');





let btnDisplayed = [];
 

function displayBtn(event){

    let btn = event.target.id;
    btn = btn.replace('b','');

    arr[btn-1].innerHTML = arr[btn-1].innerHTML.replace('🔨', arrRandom[btn-1]);
    arr[btn-1].classList.add('display');
    arr[btn-1].classList.add(arrRandom[btn-1]);

    console.log(arr[btn-1]);

    for(let i=0; i<18; i++){
        if(arr[i] !== arr[btn-1]){
            arr[i].removeEventListener('click',displayBtn);
        }
    }


    if(btnDisplayed.length < 2){
        btnDisplayed.push(arr[btn-1])

    } else {

        if(btnDisplayed[0] == btnDisplayed[1]){
            btnDisplayed.splice(1,1);
            btnDisplayed.push(arr[btn-1])
        }
        
        else if(btnDisplayed[0].classList.contains(arrRandom[btn-1]) && btnDisplayed[1].classList.contains(arrRandom[btn-1])){
                    
            btnDisplayed[0].classList.add('item-done');
            btnDisplayed[1].classList.add('item-done')

            unlock.play();

            btnDisplayed = [];
            btnDisplayed.push(arr[btn-1])
                    
        } else{
            btnDisplayed = [];
            btnDisplayed.push(arr[btn-1])
        }
    }

    setTimeout(reverseBtn, 700);

    playing = true;
};


function reverseBtn(event){
    for(let i=0; i<18; i++){
        arr[i].innerHTML = '🔨'
        arr[i].classList.remove('display')
        arr[i].addEventListener('click',displayBtn);
    }
}




let restart;
function restartPlay(){

    for(let i=0; i<18; i++){
        arr[i].removeEventListener('click', displayBtn);
    }

    counter.remove();
    restart = document.createElement('button');
    restart.innerHTML = 'PLAY AGAIN';
    restart.setAttribute('id','restart');
    restart.setAttribute('class','counter');
    document.body.appendChild(restart);



    let refresh = document.getElementById('restart')
    refresh.addEventListener('click', refreshPage)
    
    
    function refreshPage(){
        location.reload(); 
    } 
}

