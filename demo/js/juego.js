var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render:render });

var w = 800, h = 600;

function preload() {
	game.canvas.id="CanvasGame";
    game.load.image('sky', 'assets/montain.png');
	game.load.image('menu','assets/number-buttons-90x90.png', 270, 180);
    game.load.image('ground', 'assets/platform.png');
    game.load.image('starA', 'assets/starA.png');
	 game.load.image('starG', 'assets/starG.png');
	  game.load.image('starR', 'assets/starR.png');
	game.load.image('diamond', 'assets/diamond.png');
    game.load.spritesheet('dude', 'assets/blue.png', 32, 48);game.load.spritesheet('green', 'assets/green.png', 32, 48);
	game.load.spritesheet('rose', 'assets/rose.png', 32, 48);



}

var player;
var player2;
var player3;
var platforms;
var cursors;
var izquierda
var derecha;
var arriba;
var arr;
var izq;
var der;

var counter = 0;
var starA;
var starG;
var starR;
var score = 0;
var scoreText;



function create() {
	 text = game.add.text(game.world.centerX, game.world.centerY, 'Counter: 0', { font: "64px Arial", fill: "#000000", align: "center" });

	   game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    text.anchor.setTo(0.5, 0.5);
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

	var ledge = platforms.create(180, 120, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;


    ledge = platforms.create(650, 220, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');
	player3 = game.add.sprite(142, game.world.height - 150, 'rose');
	player2 = game.add.sprite(272, game.world.height - 150, 'green');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);
	 game.physics.arcade.enable(player2);
	  game.physics.arcade.enable(player3);



    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
	player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 300;
    player2.body.collideWorldBounds = true;
	player3.body.bounce.y = 0.2;
    player3.body.gravity.y = 300;
    player3.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
	player2.animations.add('left', [0, 1, 2, 3], 10, true);
    player2.animations.add('right', [5, 6, 7, 8], 10, true);
	player3.animations.add('left', [0, 1, 2, 3], 10, true);
    player3.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();
	starsVerdes = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
	starsVerdes.enableBody = true;


    //  Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        //  Create a star inside of the 'stars' group
        var starAzul = stars.create(i * 70, 0, 'starA');

        //  Let gravity do its thing
        starAzul.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        starAzul.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
	//var starRoja = stars.create(100,300,'starR');
	//var starVerde = starsVerdes.create(200,300,'starG');

    //  The score
    scoreText = game.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
	izquierda = game.input.keyboard.addKey(Phaser.Keyboard.A);
	arriba = game.input.keyboard.addKey(Phaser.Keyboard.W);
	derecha = game.input.keyboard.addKey(Phaser.Keyboard.D);
	izq = game.input.keyboard.addKey(Phaser.Keyboard.G);
	arr = game.input.keyboard.addKey(Phaser.Keyboard.Y);
	der = game.input.keyboard.addKey(Phaser.Keyboard.J);
	
	
	    /*
        Code for the pause menu
    */

    // Create a label to use as a button
    pause_label = game.add.text(w - 100, 20, 'Pausa', { font: '24px Arial', fill: '#fff' });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        game.paused = true;

        // Then add the menu
        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = game.add.text(w/2, h-150, 'Haz click en la estrellita de cada color para añadirla al juego', { font: '22px Arial', fill: '#000' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handels the pause menu
    function unpause(event){
        // Only act if paused
        if(game.paused){
            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['verde', 'rosa', 'azul', 'verde', 'rosa', 'azul'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                choiseLabel.text = 'tu elegiste una estrellita: ' + choisemap[choise];
				
				if(choisemap[choise]=='verde'){
					var starVerde = starsVerdes.create(200,300,'starG');
				}
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    };




}

function update() {

	

    //  Collide the player and the stars with the platforms
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(player2, platforms);
    //game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(player3, platforms);
    //game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
	game.physics.arcade.overlap(player2, starsVerdes, collectStar2, null, this);

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
	player2.body.velocity.x = 0;
	player3.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -350;
    }
//controles para player 2

	if (izquierda.isDown)
    {
        //  Move to the left
        player2.body.velocity.x = -150;

        player2.animations.play('left');
    }
    else if (derecha.isDown)
    {
        //  Move to the right
        player2.body.velocity.x = 150;

        player2.animations.play('right');
    }
    else
    {
        //  Stand still
        player2.animations.stop();

        player2.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (arriba.isDown && player2.body.touching.down)
    {
        player2.body.velocity.y = -350;
    }

	//controles para player 3

	if (izq.isDown)
    {
        //  Move to the left
        player3.body.velocity.x = -150;

        player3.animations.play('left');
    }
    else if (der.isDown)
    {
        //  Move to the right
        player3.body.velocity.x = 150;

        player3.animations.play('right');
    }
    else
    {
        //  Stand still
        player3.animations.stop();

        player3.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (arr.isDown && player3.body.touching.down)
    {
        player3.body.velocity.y = -350;
    }


	 
}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Puntaje: ' + score;

}
function collectStar2 (player2, starVerde) {

    // Removes the star from the screen
    starVerde.kill();

    //  Add and update the score
    score += 10;
    scoreText.text = 'Puntaje: ' + score;

}

function updateCounter() {

    counter++;

    text.setText('Counter: ' + counter);

}

function render() {

    //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 550, 32);
    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}
