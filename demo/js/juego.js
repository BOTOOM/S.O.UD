var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });

function preload() {

    game.load.image('sky', 'assets/montain.png');
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



}

function update() {

	//variables y función que permite pausar y darle play al juego//
pauseButton = this.game.add.sprite(10, 10, 'pauseButton');
	pauseButton.inputEnabled = true;
	pauseButton.events.onInputUp.add(function () {this.game.paused = true;var starVerde = starsVerdes.create(200,300,'starG');},this);
	game.input.onDown.add(function () {if(this.game.paused)this.game.paused = false;},this);
	pauseButton.fixedToCamera = true;

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

    game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 550, 32);
    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}
