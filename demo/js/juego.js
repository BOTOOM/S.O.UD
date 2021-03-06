var game = new Phaser.Game(1000, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render:render });

var w = 1000, h = 600;


function preload() {
	game.canvas.id="CanvasGame";
    game.load.image('sky', 'assets/montain3.png');
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
	game.load.image('posRed', 'assets/PoscionRoja.png');
	game.load.image('posBlue', 'assets/PoscionAzul.png');
	game.load.image('posGreen', 'assets/PoscionVerde.png');
	game.load.image('polRed', 'assets/PolvoRojo.png');
	game.load.image('polBlue', 'assets/PolvoAzul.png');
	game.load.image('polGreen', 'assets/PolvoVerde.png');
	game.load.image('velRed', 'assets/VelaRoja.png');
	game.load.image('velBlue', 'assets/VelaAzul.png');
	game.load.image('velGreen', 'assets/VelaVerde.png');
    game.load.spritesheet('dude', 'assets/blue.png', 32, 48);
	game.load.spritesheet('green', 'assets/green.png', 32, 48);
	game.load.spritesheet('rose', 'assets/fma.png', 21, 32);
	//game.load.image('diosverde', 'assets/diosverde.png');
    //game.load.image('diosrojo', 'assets/diosrojo.png');
	 //game.load.image('diosazul', 'assets/diosazul.png');
	// game.load.spritesheet('diosverde', 'assets/diosverde.png',32,48);
    //game.load.spritesheet('diosrojo', 'assets/diosrojo.png',32,48);
	game.load.spritesheet('angelazul', 'assets/angelazulcurando.png',72.35,79);
	game.load.spritesheet('angelverde', 'assets/angelverdecurando.png',72.35,79);
	game.load.spritesheet('angelrojo', 'assets/angelrojocurando.png',72.35,79);
	game.load.spritesheet('azulcastigando', 'assets/azulcastigando.png',93,96);
	game.load.spritesheet('verdecastigando', 'assets/verdecastigando.png',93,96);
	game.load.spritesheet('rojocastigando', 'assets/rojocastigando.png',93,96);
	game.load.spritesheet('azulcreando', 'assets/azulcreando.png',73,82);
	game.load.spritesheet('verdecreando', 'assets/verdecreando.png',73,82);
	game.load.spritesheet('rojocreando', 'assets/rojocreando.png',73,82);




}

var player;
var player2;
var player3;
var platforms;
var cursors;
var izquierda;
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
var diosazul;
var diosrojo;
var diosverde;
var diosaparicion;
var angelazulcurando;
var angelverdecurando;
var angelrojocurando;
var walk;



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

	var ledge = platforms.create(150, 100, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-430, 250, 'ground');
    ledge.body.immovable = true;


    ledge = platforms.create(690, 220, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');
	player3 = game.add.sprite(142, game.world.height - 150, 'rose');
	player2 = game.add.sprite(272, game.world.height - 150, 'green');
	 //diosazul = game.add.sprite(880, 50, 'angelazul');
	 //diosrojo = game.add.sprite(500, 190, 'diosrojo');
	 //diosverde = game.add.sprite(80, 50, 'diosverde');
	 angelazulcurando = game.add.sprite(150, 150, 'angelazul');
	// walk = angelazulcurando.animations.add('walk',[1, 2, 3], 5, true);
	///angelazulcurando.animations.play('walk');
	 angelverdecurando = game.add.sprite(250, 150, 'angelverde');
	 angelrojocurando = game.add.sprite(350, 150, 'angelrojo');
	/*
	var angelverdecurando = game.add.sprite(250, 150, 'angelverde');
	var walk = angelverdecurando.animations.add('walk',[1, 2, 3], 5, true);
	angelverdecurando.animations.play('walk');

	var angelrojocurando = game.add.sprite(350, 150, 'angelrojo');
	var walk = angelrojocurando.animations.add('walk',[1, 2, 3], 5, true);
	angelrojocurando.animations.play('walk');


	var azulcastigando = game.add.sprite(450, 100, 'azulcastigando');
	var walk = azulcastigando.animations.add('walk',[0,1, 2, 3], 5, true);
	azulcastigando.animations.play('walk');


	var rojocastigando = game.add.sprite(50, 100, 'rojocastigando');
	var walk = rojocastigando.animations.add('walk',[0,1, 2, 3], 5, true);
	rojocastigando.animations.play('walk');


	var verdecastigando = game.add.sprite(750, 100, 'verdecastigando');
	var walk = verdecastigando.animations.add('walk',[0,1, 2, 3], 5, true);
	verdecastigando.animations.play('walk');

	var azulcreando = game.add.sprite(130, 380, 'azulcreando');
	var walk = azulcreando.animations.add('walk',[0,1,2], 5, true);
	azulcreando.animations.play('walk');

	var verdecreando = game.add.sprite(330, 420, 'verdecreando');
	var walk = verdecreando.animations.add('walk',[0,1,2], 5, true);
	verdecreando.animations.play('walk');

	var rojocreando = game.add.sprite(130, 280, 'rojocreando');
	var walk = rojocreando.animations.add('walk',[0,1,2], 5, true);
	rojocreando.animations.play('walk');  */



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
	player3.animations.add('left', [0, 1, 2], 10, true);
    player3.animations.add('right', [4, 5, 6], 10, true);


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
	posA= game.add.group();
	posG = game.add.group();
	posR = game.add.group();
	velA = game.add.group();
	velG = game.add.group();
	velR = game.add.group();
	polA = game.add.group();
	polG = game.add.group();
	polR = game.add.group();


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
	posA.enableBody = true;
	posG.enableBody = true;
	posR.enableBody = true;
	velA.enableBody = true;
	velG.enableBody = true;
	velR.enableBody = true;
	polA.enableBody = true;
	polG.enableBody = true;
	polR.enableBody = true;

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
	diosaparicion=game.input.keyboard.addKey(Phaser.Keyboard.N);


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
					randomx=game.world.randomX;
					randomy=game.world.randomY;
					CreacionProcesos("2","EstrellaRoja","PolvoEstelar","1",randomx,randomy);

				}
				if(choisemap[choise]=='Everde'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;
					CreacionProcesos("3","EstrellaVerde","PolvoEstelar","1",randomx,randomy);
				}
				if(choisemap[choise]=='Eazul'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;
					//alert("estrella:"+randomx+","+randomy);
					CreacionProcesos("1","EstrellaAzul","PolvoEstelar","1",randomx,randomy);

				}
				if(choisemap[choise]=='Bazul'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;

					CreacionProcesos("1","BolaAzul","FactoryBall","1",randomx,randomy);

				}

				if(choisemap[choise]=='Bverde'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;
					CreacionProcesos("3","BolaVerde","FactoryBall","1",randomx,randomy);
						//  Create a star inside of the 'stars' group


				}
				if(choisemap[choise]=='Brosa'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;
					CreacionProcesos("2","BolaRoja","FactoryBall","1",randomx,randomy);
						//  Create a star inside of the 'stars' group


				}

				if(choisemap[choise]=='Drosa'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;
				CreacionProcesos("2","DiamondRojo","MinnerDiamond","1",randomx,randomy);

						//  Create a star inside of the 'stars' group

				}

				if(choisemap[choise]=='Dazul'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;
					CreacionProcesos("1","DiamondAzul","MinnerDiamond","1",randomx,randomy);
						//  Create a star inside of the 'stars'

				}
				if(choisemap[choise]=='Dverde'){
					randomx=game.world.randomX;
					randomy=game.world.randomY;
					CreacionProcesos("3","DiamondVerde","MinnerDiamond","1",randomx,randomy);
						//  Create a star inside of the 'stars' group


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
    game.physics.arcade.collide(posA, platforms);
		game.physics.arcade.collide(posR, platforms);
		game.physics.arcade.collide(posG, platforms);
		game.physics.arcade.collide(velA, platforms);
		game.physics.arcade.collide(velG, platforms);
		game.physics.arcade.collide(velR, platforms);
		game.physics.arcade.collide(polA, platforms);
		game.physics.arcade.collide(polR, platforms);
		game.physics.arcade.collide(polG, platforms);


    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
	game.physics.arcade.overlap(player, diamante, collectStar, null, this);
	game.physics.arcade.overlap(player2, diamanteG, collectStar2, null, this);
	game.physics.arcade.overlap(player3, diamanteR, collectStar3, null, this);
	game.physics.arcade.overlap(player3, ballR, collectStar3, null, this);
	game.physics.arcade.overlap(player2, ballG, collectStar2, null, this);
	game.physics.arcade.overlap(player, ballB, collectStar, null, this);
	game.physics.arcade.overlap(player2, starsVerdes, collectStar2, null, this);
	game.physics.arcade.overlap(player, posA, collectposA, null, this);
	game.physics.arcade.overlap(player3, posR, collectposR, null, this);
	game.physics.arcade.overlap(player2, posG, collectposG, null, this);
	game.physics.arcade.overlap(player, polA, collectpolA, null, this);
	game.physics.arcade.overlap(player2, polG, collectpolG, null, this);
	game.physics.arcade.overlap(player3, polR, collectpolR, null, this);
	game.physics.arcade.overlap(player, velA, collectvelA, null, this);
	game.physics.arcade.overlap(player2, velG, collectvelG, null, this);
	game.physics.arcade.overlap(player3, velR, collectvelR, null, this);

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

        player3.frame = 3;
    }

    //  Allow the player to jump if they are touching the ground.
    if (arr.isDown && player3.body.touching.down)
    {
        player3.body.velocity.y = -350;
    }
		if (diosaparicion.isDown){
			muerteDiosAzul(500,20);
		}


}

function collectStar (player, star) {

    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    scoreplayer1 += 10;
    scoreTextplayer1.text = 'Puntaje: ' + scoreplayer1;

}

function muerteDiosAzul(x,y){
//alert(""+x+","+y)

	angelazulcurando.kill();
	angelazulcurando = game.add.sprite(x,y, 'angelazul');
		walk = angelazulcurando.animations.add('walk',[1, 2, 3], 5, true);
	 angelazulcurando.animations.play('walk');
	//diosazul = game.add.sprite(x,y, 'diosazul');


}

function muerteDiosRojo(x,y){


	angelrojocurando.kill();
	angelrojocurando = game.add.sprite(x, y, 'angelrojo');
	 walk = angelrojocurando.animations.add('walk',[1, 2, 3], 5, true);
	angelrojocurando.animations.play('walk');iosrojo = game.add.sprite(x,y, 'diosrojo');


}

function muerteDiosVerde(x,y){

angelverdecurando.kill();
	 angelverdecurando = game.add.sprite(x, y, 'angelverde');
	 walk = angelverdecurando.animations.add('walk',[1, 2, 3], 5, true);
	angelverdecurando.animations.play('walk');
//	angelazulcurando = game.add.sprite(x,y, 'angelazul');
//	walk = angelazulcurando.animations.add('walk',[1, 2, 3], 5, true);
 //angelazulcurando.animations.play('walk');


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


function collectposA (player, posA) {

    // Removes the star from the screen
    posA.kill();

    //  Add and update the score
    scoreplayer1 -= 5;
    scoreTextplayer1.text = 'Puntaje: ' + scoreplayer1;

}

function collectposG (player2, posG) {

    // Removes the star from the screen
    posG.kill();

    //  Add and update the score
    scoreplayer2 -= 5;
    scoreTextplayer2.text = 'Puntaje: ' + scoreplayer2;

}

function collectposR (player3, posR) {

    // Removes the star from the screen
    posR.kill();

    //  Add and update the score
    scoreplayer3 -= 5;
    scoreTextplayer3.text = 'Puntaje: ' + scoreplayer3;

}

function collectvelA (player, velA) {

    // Removes the star from the screen
    velA.kill();

    //  Add and update the score
    scoreplayer1 -= 15;
    scoreTextplayer1.text = 'Puntaje: ' + scoreplayer1;

}

function collectvelG (player2, velG) {

    // Removes the star from the screen
    velG.kill();

    //  Add and update the score
    scoreplayer2 -= 15;
    scoreTextplayer2.text = 'Puntaje: ' + scoreplayer2;

}

function collectvelR (player3, velR) {

    // Removes the star from the screen
    velR.kill();

    //  Add and update the score
    scoreplayer3 -= 15;
    scoreTextplayer3.text = 'Puntaje: ' + scoreplayer3;

}
function collectpolA (player, polA) {

    // Removes the star from the screen
    polA.kill();

    //  Add and update the score
    scoreplayer2 += 2;
    scoreTextplayer2.text = 'Puntaje: ' + scoreplayer2;
		scoreplayer1 += 2;
    scoreTextplayer1.text = 'Puntaje: ' + scoreplayer1;
		scoreplayer3 += 2;
    scoreTextplayer3.text = 'Puntaje: ' + scoreplayer3;
}

function collectpolG (player2, polG) {

    // Removes the star from the screen
    polG.kill();

    //  Add and update the score
    scoreplayer2 += 2;
    scoreTextplayer2.text = 'Puntaje: ' + scoreplayer2;
		scoreplayer1 += 2;
    scoreTextplayer1.text = 'Puntaje: ' + scoreplayer1;
		scoreplayer3 += 2;
    scoreTextplayer3.text = 'Puntaje: ' + scoreplayer3;

}

function collectpolR (player3, polR) {

    // Removes the star from the screen
    polR.kill();

    //  Add and update the score
    scoreplayer2 += 2;
    scoreTextplayer2.text = 'Puntaje: ' + scoreplayer2;
		scoreplayer1 += 2;
    scoreTextplayer1.text = 'Puntaje: ' + scoreplayer1;
		scoreplayer3 += 2;
    scoreTextplayer3.text = 'Puntaje: ' + scoreplayer3;
}



function muerteDiosAzul2(x,y){
//alert(""+x+","+y)

	angelazulcurando.kill();
	angelazulcurando = game.add.sprite(x,y,  'azulcastigando');
		walk = angelazulcurando.animations.add('walk',[0,1, 2, 3], 5, true);
	 angelazulcurando.animations.play('walk');
	//diosazul = game.add.sprite(x,y, 'diosazul');





}

function muerteDiosRojo2(x,y){


	angelrojocurando.kill();
	angelrojocurando = game.add.sprite(x, y, 'rojocastigando');
	 walk = angelrojocurando.animations.add('walk',[0,1, 2, 3], 5, true);
	angelrojocurando.animations.play('walk');


}

function muerteDiosVerde2(x,y){

angelverdecurando.kill();
	 angelverdecurando = game.add.sprite(x, y, 'verdecastigando');
	 walk = angelverdecurando.animations.add('walk',[0,1, 2, 3], 5, true);
	angelverdecurando.animations.play('walk');
//	angelazulcurando = game.add.sprite(x,y, 'angelazul');
//	walk = angelazulcurando.animations.add('walk',[1, 2, 3], 5, true);
 //angelazulcurando.animations.play('walk');


}


function muerteDiosAzul3(x,y){
//alert(""+x+","+y)

	angelazulcurando.kill();
	angelazulcurando = game.add.sprite(x,y,  'azulcreando');
		walk = angelazulcurando.animations.add('walk',[0,1,2], 5, true);
	 angelazulcurando.animations.play('walk');
	//diosazul = game.add.sprite(x,y, 'diosazul');

}

function muerteDiosRojo3(x,y){


	angelrojocurando.kill();
	angelrojocurando = game.add.sprite(x, y, 'rojocreando');
	 walk = angelrojocurando.animations.add('walk',[0,1,2], 5, true);
	angelrojocurando.animations.play('walk');



}

function muerteDiosVerde3(x,y){

angelverdecurando.kill();
	 angelverdecurando = game.add.sprite(x, y, 'verdecreando');
	 walk = angelverdecurando.animations.add('walk',[0,1,2], 5, true);
	angelverdecurando.animations.play('walk');
//	angelazulcurando = game.add.sprite(x,y, 'angelazul');
//	walk = angelazulcurando.animations.add('walk',[1, 2, 3], 5, true);
 //angelazulcurando.animations.play('walk');


}
