//hello world of phaser = basdic game = single scene in spin & win game
//how to create the basic skeleton for the game -> game loop

// Game[config]: W, H, Canvas, Scene
// game -> config -> scene

let prizes_config = {
    count: 12,
    prize_names: ["3000 Credits", "35% off", "Hard Luck", "70% off", "Swag Pack", "100% off", "netflix subs", "50% off", "amazon voucher", "2 extra spin", "CB tshirt", "CB Book"],
}

let config = {
    type : Phaser.canvas,
    width : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    }
    
};

let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
    //load object, load some image
    this.load.image('background','../Assets/back.jpg');
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    this.load.image('spinbutton','../Assets/spinbutton.jpg');
    this.load.audio('spinsound','../Assets/spinsound.mp3'); 
}

function create(){
    console.log("Create");
    //create the background image
    let W = game.config.width;
    let H = game.config.height;
    //in phaser, images are also called 'sprites'
    let background = this.add.sprite(0,0,'background');
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
    //let's create a wheel object
    
    //this.wheel : wheel is now property of the scene, can be used anywhere in code under the scene
    this.wheel = this.add.sprite(W/2,H/2,"wheel");
    this.wheel.setScale(0.25); //used to inc or dec size
    //wheel.scaleX = 2; for X asis scaling
    //wheel.scaleY = 0.5; for Y axis scaling
    this.wheel.depth = 1; //depth is used to define the backward forward placement of the image
    //this.wheel.alpha = 0.5; //now 50% transperent wheel
    // alpha = 1 -> opaque
    // alpha = 0 -> vanish
    
    //let's create a pin
    
    let pin = this.add.sprite(W/2,H/2-250,"pin");
    pin.setScale(0.25);
    pin.depth = 2;
    
    //let's create a stand
    
    let stand = this.add.sprite(W/2,H/2+250,"stand");
    stand.setScale(0.25);
    stand.depth = 0;
    
    //lets create a spin button
    this.spinbutton = this.add.sprite(0,0,"spinbutton");
    
    //add event listener for mouse click
    this.input.on('spinbutton', spinwheel,this);
    //this.input.on("pointerdown",spinwheel,this);
    
    //lets create text object
    font_style = {
        font: "bold 20px Roboto",
        align: "center",
        color: "red",
    }
    this.game_text = this.add.text(10,10,"welcome to spin & win",font_style);
    
    //audio added
    this.soundd=this.sound.add('spinsound');
    
    
}

//game loop
function update(){
    console.log("Inside Update");
    //this.wheel.angle += 2;
    // we can add alpha, scaleX, scaleY etc, it maybe like the animation
}

function spinwheel(){
    console.log("you clicked the mouse");
    console.log("spin start");
    
    //play sound
    this.sound.play('spinsound');
    
    //this.game_text.setText("You clicked the mouse!");
    
    let rounds = Phaser.Math.Between(2,4);
    //console.log(rounds);
    let degrees = Phaser.Math.Between(0,11)*30;
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx_prize = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    //create a tween, for the gradual wheel spin animation, stops after a particular time
    //her, it will take 'angle' value from 0 to 1700 in the duration of 3000
    //we can change multiple properties all at same time in tween
    tween =this.tweens.add({
        targets: this.wheel,
        angle: total_angle, //generate this number randomly, otherwise it would be a cheating
        ease: "Cubic.easeOut", //earlier wheel was stoping suddenly. now it will be gradually
        //there are more effects, we can find on tha phaser' site
        duration: 7000,
        callbackScope: this,
        //callbackScope will give 'this' method to onComplete function, without calllback we will face error
        onComplete: function(){
            this.game_text.setText("you won " + prizes_config.prize_names[idx_prize] + " !");
        },
    });
    
    
}



