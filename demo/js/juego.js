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
	game.load.image('blueball', 'assets/blueball.png');
	 game.load.image('greenball', 'assets/greenball.png');
    game.load.image('redball', 'assets/redball.png');
	 game.load.image('diamondG', 'assets/diamondG.png');
	  game.load.image('diamondR', 'assets/diamondR.png');
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
var scoreplayer1 = 0;
var scoreplayer2 = 0;
var scoreplayer3 = 0;
var scoreTextPlayer1;
var scoreTextPlayer2;
var scoreTextPlayer3;



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
	starsRojas = game.add.group();
	diamante= game.add.group();
	diamanteG= game.add.group();
	diamanteR= game.add.group();
	ballR= game.add.group();
	ballG= game.add.group();
	ballB= game.add.group();


    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;
	starsVerdes.enableBody = true;
    starsRojas.enableBody = true;
	diamante.enableBody = true;
	diamanteG.enableBody = true;
	diamanteR.enableBody = true;
	ballR.enableBody = true;
	ballG.enableBody = true;
	ballB.enableBody = true;

    //  The score
    scoreTextplayer1 = game.add.text(16, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#2700eb' });
	scoreTextplayer2 = game.add.text(176, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#11610f' });
	scoreTextplayer3 = game.add.text(346, 16, 'Puntaje: 0', { fontSize: '32px', fill: '#eb0042' });

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
        choiseLabel = game.add.text(w/2, h-150, 'Haz click en el recurso de cada color para añadirla al juego', { font: '22px Arial', fill: '#000' });
        choiseLabel.anchor.setTo(0.5, 0.5);
    });

    // Add a input listener that can help us return from being paused
    game.input.onDown.add(unpause, self);

    // And finally the method that handels the pause menu
    function unpause(event){
			console.log("entra pausa");
			pausarProcesadores();
        // Only act if paused
        if(game.paused){

            // Calculate the corners of the menu
            var x1 = w/2 - 270/2, x2 = w/2 + 270/2,
                y1 = h/2 - 180/2, y2 = h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){


            // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['Everde', 'Erosa', 'Eazul', 'Bverde', 'Brosa', 'Bazul','Dverde', 'Drosa', 'Dazul'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice
                var choise = Math.floor(x / 80.5) + 3*Math.floor(y / 80.5);

                // Display the choice
                choiseLabel.text = 'tu elegiste: ' + choisemap[choise];
				if(choisemap[choise]=='Erosa'){
					console.log("estrellaroja");
					CreacionProcesos("2","EstrellaRoja","PolvoEstelar");
					var starRoja = starsRojas.create(game.world.randomX, game.world.randomY,'starR');
					//  Let gravity do its thing
						starRoja.body.gravity.y = 30;
						//  This just gives each star a slightly random bounce value
						starRoja.body.bounce.y = 0.7 + Math.random() * 0.2;
				}
				if(choisemap[choise]=='Everde'){
					CreacionProcesos("3","EstrellaVerde","PolvoEstelar");
					var starVerde = starsVerdes.create(game.world.randomX, game.world.randomY,'starG');
					//  Let gravity do its thing
						starVerde.body.gravity.y = 30;
						//  This just gives each star a slightly random bounce value
						starVerde.body.bounce.y = 0.7 + Math.random() * 0.2;
				}
				if(choisemap[choise]=='Eazul'){

					CreacionProcesos("1","EstrellaAzul","PolvoEstelar");
						//  Create a star inside of the 'stars' group
						var starAzul = stars.create(game.world.randomX, game.world.randomY, 'starA');

						//  Let gravity do its thing
						starAzul.body.gravity.y = 30;


						//  This just gives each star a slightly random bounce value
						starAzul.body.bounce.y = 0.7 + Math.random() * 0.2;

				}
				if(choisemap[choise]=='Bazul'){

					CreacionProcesos("1","BolaAzul","FactoryBall");
						//  Create a star inside of the 'stars' group
						var bazul = ballB.create(game.world.randomX, game.world.randomY, 'blueball');

						//  Let gravity do its thing
						bazul.body.gravity.y = 30;


						//  This just gives each star a slightly random bounce value
						bazul.body.bounce.y = 0.7 + Math.random() * 0.2;

				}

				if(choisemap[choise]=='Bverde'){

					CreacionProcesos("3","BolaVerde","FactoryBall");
						//  Create a star inside of the 'stars' group
						var bverde = ballG.create(game.world.randomX, game.world.randomY, 'greenball');

						//  Let gravity do its thing
						bverde.body.gravity.y = 30;


						//  This just gives each star a slightly random bounce value
						bverde.body.bounce.y = 0.7 + Math.random() * 0.2;

				}
				if(choisemap[choise]=='Brosa'){

					CreacionProcesos("2","BolaRoja","FactoryBall");
						//  Create a star inside of the 'stars' group
						var brosa = ballR.create(game.world.randomX, game.world.randomY, 'redball');

						//  Let gravity do its thing
						brosa.body.gravity.y = 30;


						//  This just gives each star a slightly random bounce value
						brosa.body.bounce.y = 0.7 + Math.random() * 0.2;

				}

				if(choisemap[choise]=='Drosa'){

				CreacionProcesos("2","DiamondRojo","MinnerDiamond");

						//  Create a star inside of the 'stars' group
						var drosa = diamanteR.create(game.world.randomX, game.world.randomY, 'diamondR');

						//  Let gravity do its thing
						drosa.body.gravity.y = 30;


						//  This just gives each star a slightly random bounce value
						drosa.body.bounce.y = 0.7 + Math.random() * 0.2;

				}

				if(choisemap[choise]=='Dazul'){

					CreacionProcesos("1","DiamondAzul","MinnerDiamond");
						//  Create a star inside of the 'stars' group
						var dazul = diamante.create(game.world.randomX, game.world.randomY, 'diamond');

						//  Let gravity do its thing
						dazul.body.gravity.y = 30;


						//  This just gives each star a slightly random bounce value
						dazul.body.bounce.y = 0.7 + Math.random() * 0.2;

				}
				if(choisemap[choise]=='Dverde'){

					CreacionProcesos("3","DiamondVerde","MinnerDiamond");
						//  Create a star inside of the 'stars' group
						var dverde = diamanteG.create(game.world.randomX, game.world.randomY, 'diamondG');

						//  Let gravity do its thing
						dverde.body.gravity.y = 30;


						//  This just gives each star a slightly random bounce value
						dverde.body.bounce.y = 0.7 + Math.random() * 0.2;

				}
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();
								console.log("fuera menu");
								ejecutarhilos();
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
    game.physics.arcade.collide(starsVerdes, platforms);
	game.physics.arcade.collide(player3, platforms);
    game.physics.arcade.collide(starsRojas, platforms);
	game.physics.arcade.collide(diamante, platforms);
	game.physics.arcade.collide(diamanteG, platforms);
	game.physics.arcade.collide(diamanteR, platforms);
	game.physics.arcade.collide(ballR, platforms);
	game.physics.arcade.collide(ballG, platforms);
    game.physics.arcade.collide(ballB, platforms);


    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
	game.physics.arcade.overlap(player, diamante, collectStar, null, this);
	game.physics.arcade.overlap(player2, diamanteG, collectStar2, null, this);
	game.physics.arcade.overlap(player3, diamanteR, collectStar3, null, this);
	game.physics.arcade.overlap(player3, ballR, collectStar3, null, this);
	game.physics.arcade.overlap(player2, ballG, collectStar2, null, this);
	game.physics.arcade.overlap(player, ballB, collectStar, null, this);
	game.physics.arcade.overlap(player2, starsVerdes, collectStar2, null, this);
	game.physics.arcade.overlap(player3, starsRojas, collectStar3, null, this);

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
    scoreplayer1 += 10;
    scoreTextplayer1.text = 'Puntaje: ' + scoreplayer1;

}





function collectStar2 (player2, starVerde) {

    // Removes the star from the screen
    starVerde.kill();

    //  Add and update the score
    scoreplayer2 += 10;
    scoreTextplayer2.text = 'Puntaje: ' + scoreplayer2;

}

function collectStar3 (player3, starRoja) {

    // Removes the star from the screen
    starRoja.kill();

    //  Add and update the score
    scoreplayer3 += 10;
    scoreTextplayer3.text = 'Puntaje: ' + scoreplayer3;

}


function updateCounter() {

    counter++;

    text.setText('Counter: ' + counter);

}

function render() {

    //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 550, 32);
    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 64);

}
