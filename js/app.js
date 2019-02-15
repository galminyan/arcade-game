
//variables for increasing the enemies speed 
let speedStarter = 100;
let speedFactor = 200;


// list of possible characters
const characters = ['images/char-boy.png', 
                  'images/char-cat-girl.png', 
                  'images/char-horn-girl.png', 
                  'images/char-pink-girl.png',
                  'images/char-princess-girl.png'];
let i = 0; //iterator for choosing character

//variables of score pannel
const counterCollision = document.querySelector('.collisions');
let collision = 0;
const counterScore = document.querySelector('.points');
let score = 0;
const counterLevel = document.querySelector('.levels');
let level = 1;


class Enemy {
    constructor(x, y ,speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {

        this.x += this.speed * dt;
        //the first location and random speed of the enemies, which increasing with the level of the game
        if (this.x > 510) {
            this.x = -50;
            this.speed = speedStarter + Math.floor(Math.random() * speedFactor);
        }
        // collision between enemy and player, move the player to the start location
        if (player.x < this.x + 80 &&
            player.x + 80 > this.x &&
            player.y < this.y + 60 &&
            60 + player.y > this.y) {
            collision += 1;
            counterCollision.innerText = collision;
            soundBeep.play()
            player.x = 202;
            player.y = 405;
        }

    }

// Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.player = 'images/char-princess-girl.png';
    }
    
    update (dt) {
        
    }
    
    render () {
        ctx.drawImage(Resources.get(this.player), this.x, this.y);
    }
    // change the character by pressing enter key
    handleInput (keyPress) {
        if (keyPress == 'enter') {
            this.player = characters[i];
            i++;
            if (i >= 5) { 
                i=0;
            }
        }
        //use the arrow keys to move the player
        if (keyPress == 'left' && this.x > 0) {
            this.x -= 102;
            soundMove.play();
        }
        if (keyPress == 'right' && this.x < 405) {
            this.x += 102;
            soundMove.play();
        }
        if (keyPress == 'up' && this.y > 0) {
            this.y -= 83;
            soundMove.play();
        }
        if (keyPress == 'down' && this.y < 405) {
            this.y += 83;
            soundMove.play();
        }
        /*when the player reach the river, play sound, increase score, level up and increase
        speed of enemies, move the player to start location */
        if (this.y < 0) {
            soundWater.play()
            setTimeout(function () {
                openModal();
                score += 100;
                level += 1;
                counterScore.innerText = score;
                counterLevel.innerText = level;
                player.x = 202;
                player.y = 405;
                speedFactor += 20;
                speedStarter += 20; 
            }, 600);
        }
    }
    
 
}

//list of all new enemy objects and there location
let allEnemies = [];
let enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    const enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy);
});

//create new player object
const player = new Player(202, 405);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


/****************************winning the game****************************/

// Get the modal
const modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
const closeWinModal = document.getElementsByClassName("closeWin")[0];

function openModal() {
    modal.style.display = "block";
}
// When the user clicks on <span> (next level), close the modal
closeWinModal.onclick = function() {
    modal.style.display = "none";
}


/****************************start the game****************************/

// Get the modal
const modalStart = document.getElementById('startModal');
// Get the <span> element that closes the modal
const closeStartModal = document.getElementsByClassName("closeStart")[0];
// display modal on the beginning
modalStart.style.display = "block";

// When the user clicks on <span> (start), close the modal
closeStartModal.onclick = function() {
    modalStart.style.display = "none";
    soundMusic.play();   //play backgroung music when then game begin
}

/****************************sounds****************************/
const soundMove = document.getElementById('audio2');
const soundBeep = document.getElementById('audio3');
const soundWater = document.getElementById('audio4');
const soundMusic = document.getElementById('audioBack');