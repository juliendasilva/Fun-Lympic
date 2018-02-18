import Phaser from 'phaser'
import WebFont from 'webfontloader'
import constant from './constant'
import responsive from '../responsive_helper'
import store from '../../store'
const Swipe = require('../../vendor/swipe')

const pallier = [
  {height: responsive.getHeightFromPercentage(39)},
  {height: responsive.getHeightFromPercentage(53)},
  {height: responsive.getHeightFromPercentage(66)}
]

export default class extends Phaser.State {
  init() {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
    this.life = 3
    this.score = 0
  }

  preload() {
    WebFont.load({
      custom: {
        families: ['myfrida_bold'],
        urls: ["../../css/font.css"]
      }
    })
    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    this.load.image('background', './assets/images/swimming_background.jpg')
    this.load.image('coeur', './assets/images/coeur.png')
    this.load.image('jury', './assets/images/swimming_jury.png')
    this.load.image('juryHappy', './assets/images/swimming_jury_happy.png')
    this.load.image('juryUnhappy', './assets/images/swimming_jury_unhappy.png')
    this.load.image('home', './assets/images/home.svg')
    this.load.image('play', './assets/images/play.svg')
    this.load.image('pause', './assets/images/pause.svg')
    this.load.image('share', './assets/images/share.png')
    this.load.image('btn1', './assets/images/swimming_BTN_1.png')
    this.load.image('btn2', './assets/images/swimming_BTN_2.png')
    this.load.image('btn3', './assets/images/swimming_BTN_3.png')
    this.load.image('btn4', './assets/images/swimming_BTN_4.png')
    this.load.image('oval', './assets/images/swimming_oval.png')
    this.load.image('record', './assets/images/swimming_record.png')
    this.load.image('newRecord', './assets/images/swimming_new_record.png')
    this.load.image('perfect', './assets/images/swimming_perfect.png')
    this.load.image('fail', './assets/images/swimming_fail.png')
    this.load.image('pose1Nag1', './assets/images/swimming_Pose1_nag1.png')
    this.load.image('pose1Nag2', './assets/images/swimming_Pose1_nag2.png')
    this.load.image('pose1Nag3', './assets/images/swimming_Pose1_nag3.png')
    this.load.image('pose2Nag1', './assets/images/swimming_Pose2_nag1.png')
    this.load.image('pose2Nag2', './assets/images/swimming_Pose2_nag2.png')
    this.load.image('pose2Nag3', './assets/images/swimming_Pose2_nag3.png')
    this.load.image('pose3Nag1', './assets/images/swimming_Pose3_nag1.png')
    this.load.image('pose3Nag2', './assets/images/swimming_Pose3_nag2.png')
    this.load.image('pose3Nag3', './assets/images/swimming_Pose3_nag3.png')
    this.load.spritesheet('star', './assets/images/swimming_stars.png', 280, 500)
    // this.load.spritesheet('nageuse', './assets/images/swimming_nageuse3.png', 255, 820)
    this.load.spritesheet('nageuse1', './assets/images/swimming_little_nageuse1.png', 60, 213)
    this.load.spritesheet('nageuse2', './assets/images/swimming_little_nageuse2.png', 84, 214)
    this.load.spritesheet('nageuse3', './assets/images/swimming_little_nageuse3.png', 67, 215)
  }

  render() {
    // if (this.fontsReady) {
    // }
  }

  fontsLoaded() {
    this.fontsReady = true
  }
  
  create() {
    const scaleRatio = window.devicePixelRatio / 3
    this.background = game.add.sprite(0, 0, 'background');
    this.background.scale.setTo(responsive.getRatioFromHeight(this.background.height), responsive.getRatioFromHeight(this.background.height))
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL

    // Count the click of the user on the circle
    this.clickArr = [];
    // Count the number of times the circles appeared
    this.spawnArr = [];

    // Jury
    this.jury = game.add.sprite(game.width - 300, 70, 'jury');
    this.juryHappy = game.add.sprite(game.width - 301, 67, 'juryHappy');
    this.juryUnhappy = game.add.sprite(game.width - 301, 67, 'juryUnhappy');
    this.juryHappy.visible = false;
    this.juryUnhappy.visible = false;

    // Stance Nageuse
    this.pos1Nageuse = this.game.add.sprite(responsive.getWidthFromPercentage(40), responsive.getHeightFromPercentage(54), 'pose1Nag1')
    this.pos1Nageuse2 = this.game.add.sprite(responsive.getWidthFromPercentage(10), responsive.getHeightFromPercentage(39), 'pose1Nag2')
    this.pos1Nageuse3 = this.game.add.sprite(responsive.getWidthFromPercentage(65), responsive.getHeightFromPercentage(39), 'pose1Nag3')
    this.pos2Nageuse = this.game.add.sprite(responsive.getWidthFromPercentage(30), responsive.getHeightFromPercentage(54), 'pose2Nag1')
    this.pos2Nageuse2 = this.game.add.sprite(responsive.getWidthFromPercentage(0), responsive.getHeightFromPercentage(39), 'pose2Nag2')
    this.pos2Nageuse3 = this.game.add.sprite(responsive.getWidthFromPercentage(55), responsive.getHeightFromPercentage(39), 'pose2Nag3')
    this.pos3Nageuse = this.game.add.sprite(responsive.getWidthFromPercentage(30), responsive.getHeightFromPercentage(54), 'pose3Nag1')
    this.pos3Nageuse2 = this.game.add.sprite(responsive.getWidthFromPercentage(0), responsive.getHeightFromPercentage(39), 'pose3Nag2')
    this.pos3Nageuse3 = this.game.add.sprite(responsive.getWidthFromPercentage(55), responsive.getHeightFromPercentage(39), 'pose3Nag3')

    this.arrPos = [
      [this.pos1Nageuse, this.pos1Nageuse3, this.pos1Nageuse2], 
      [this.pos2Nageuse, this.pos2Nageuse3, this.pos2Nageuse2],
      [this.pos3Nageuse, this.pos3Nageuse3, this.pos3Nageuse2],
    ];
    for(let i = 0; i<this.arrPos.length; i++){
      for(let u = 0; u<this.arrPos[i].length; u++){
        this.arrPos[i][u].visible = false;
        this.arrPos[i][u].scale.setTo(0.4);
      }
    }

    // Nageuse
    this.nageuse = this.game.add.sprite(responsive.getWidthFromPercentage(45), responsive.getHeightFromPercentage(55), 'nageuse1')
    this.nageuse2 = this.game.add.sprite(responsive.getWidthFromPercentage(10), responsive.getHeightFromPercentage(40), 'nageuse2')
    this.nageuse3 = this.game.add.sprite(responsive.getWidthFromPercentage(70), responsive.getHeightFromPercentage(40), 'nageuse3')
    let nageuseArr = [this.nageuse, this.nageuse3, this.nageuse2];
    this.nageuse.animations.add('run')
    this.nageuse2.animations.add('run')
    this.nageuse3.animations.add('run')
    this.nageuse.play('run', 8, true)
    this.nageuse2.play('run', 8, true)
    this.nageuse3.play('run', 8, true)

    //Stars
    this.star = this.game.add.sprite(responsive.getWidthFromPercentage(45), responsive.getHeightFromPercentage(55), 'star')
    this.star2 = this.game.add.sprite(responsive.getWidthFromPercentage(70), responsive.getHeightFromPercentage(40), 'star')    
    this.star3 = this.game.add.sprite(responsive.getWidthFromPercentage(15), responsive.getHeightFromPercentage(40), 'star')
    this.star.scale.setTo(responsive.getRatioFromHeight(1760), responsive.getRatioFromHeight(1440))
    this.star2.scale.setTo(responsive.getRatioFromHeight(1760), responsive.getRatioFromHeight(1440))
    this.star3.scale.setTo(responsive.getRatioFromHeight(1760), responsive.getRatioFromHeight(1440))
    
    this.star.animations.add('run')
    this.star2.animations.add('run')
    this.star3.animations.add('run')
    this.star.visible = false;
    this.star2.visible = false;
    this.star3.visible = false;

    let starArray = [this.star, this.star2, this.star3];

    //Informations
    this.record = game.add.sprite(game.world.centerX, 32, 'record');
    let newRecord = game.add.sprite(game.world.centerX, 70, 'newRecord');
    this.fail = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'fail');
    this.perfect = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'perfect');
    this.record.anchor.setTo(0.5);
    newRecord.anchor.setTo(0.5);
    newRecord.visible = false;
    this.fail.anchor.setTo(0.5);
    this.perfect.anchor.setTo(0.5);

    let styleRecord = {font: "1.6em myfrida-bold", fill: "#ffffff"};
    let styleScoreFinal = {font: "14em myfrida-bold", fill: "#ffffff", align: "center", boundsAlignV: "middle"};
    let styleScore = {font: "4.5em myfrida-bold", fill: "#ffffff", align: "center", boundsAlignV: "middle"};
    this.rec = 5;

    let textScore = game.add.text(game.world.centerX, 50, '0', styleScore);
    let textScoreFinal = game.add.text(game.world.centerX, 80, '0', styleScoreFinal);
    this.textRecord = game.add.text(game.world.centerX - 45,  22, 'RECORD :', styleRecord);
    let textFail = game.add.text(game.world.centerX,  game.world.centerY + 200, 'RATE', styleRecord);
    let textPerfect = game.add.text(game.world.centerX,  game.world.centerY + 200, 'PARFAIT', styleRecord);
    
    this.textRecord.text = 'Record : ' + this.rec;
    textScore.anchor.setTo(0.5, 0);
    textScoreFinal.anchor.setTo(0.5, 0);
    textScore.stroke = '#69629A';
    textScoreFinal.stroke = '#69629A';
    textScore.strokeThickness = 4;
    textScoreFinal.strokeThickness = 8;

    textFail.anchor.setTo(0.5);
    textPerfect.anchor.setTo(0.5);
    textFail.visible = false;
    textPerfect.visible = false;
    this.perfect.visible = false;
    textScoreFinal.visible = false;
    this.fail.visible = false;

    //Circle
    this.circle1 = game.add.sprite(responsive.getWidthFromPercentage(4), responsive.getHeightFromPercentage(83.5), 'oval')
    this.circle2 = game.add.sprite(responsive.getWidthFromPercentage(29), responsive.getHeightFromPercentage(83.5), 'oval')
    this.circle3 = game.add.sprite(responsive.getWidthFromPercentage(54), responsive.getHeightFromPercentage(83.5), 'oval')
    this.circle4 = game.add.sprite(responsive.getWidthFromPercentage(79), responsive.getHeightFromPercentage(83.5), 'oval')

    this.circleArr = [this.circle1, this.circle2, this.circle3, this.circle4];

    this.circle1.inputEnabled = true;
    this.circle2.inputEnabled = true;
    this.circle3.inputEnabled = true;
    this.circle4.inputEnabled = true;

    this.circle1.visible = false;
    this.circle2.visible = false;
    this.circle3.visible = false;
    this.circle4.visible = false;
  
    this.circle1.events.onInputDown.add(perfect, this);
    this.circle2.events.onInputDown.add(perfect, this);
    this.circle3.events.onInputDown.add(perfect, this);
    this.circle4.events.onInputDown.add(perfect, this);

    //Button
    let btn1 = game.add.sprite(responsive.getWidthFromPercentage(6.2), responsive.getHeightFromPercentage(85), 'btn1');
    let btn2 = game.add.sprite(responsive.getWidthFromPercentage(31.2), responsive.getHeightFromPercentage(85), 'btn2');
    let btn3 = game.add.sprite(responsive.getWidthFromPercentage(56.2), responsive.getHeightFromPercentage(85), 'btn3');
    let btn4 = game.add.sprite(responsive.getWidthFromPercentage(81.2), responsive.getHeightFromPercentage(85), 'btn4');
    btn1.scale.setTo(0.5, 0.5)
    btn2.scale.setTo(0.5, 0.5)
    btn3.scale.setTo(0.5, 0.5)
    btn4.scale.setTo(0.5, 0.5)

    let btnArray = [btn1, btn2, btn3, btn4];

    //Heart
    let heart1 = game.add.sprite(game.width - 50, 20, 'coeur');
    let heart2 = game.add.sprite(game.width - 80, 20, 'coeur');
    let heart3 = game.add.sprite(game.width - 110, 20, 'coeur');
    heart1.scale.setTo(1.5, 1.5);
    heart2.scale.setTo(1.5, 1.5);
    heart3.scale.setTo(1.5, 1.5);
    let heart = [heart1, heart2, heart3];
  
    // Create menu
    let image = game.add.sprite(20, 20, 'pause');
    let share = game.add.sprite(game.width - 70, 20, 'share');
    share.visible = false;
    image.inputEnabled = true;
    image.events.onInputDown.add(listener, this);

    let graphics = this.game.add.graphics();
    graphics.beginFill(0x000000, 0.5);
    graphics.drawRect(0, 0, game.width, 2000);
    graphics.visible = false;

    var style = { font: "5em myfrida-bold", fill: "#ffffff", align: "center" };

    var home = game.add.sprite(game.world.centerX - 60, game.world.centerY, 'home');
    var play = game.add.sprite(game.world.centerX + 60, game.world.centerY, 'play');
    var text = game.add.text(game.world.centerX, game.world.centerY - 150, 'Pause', style);
    text.anchor.setTo(0.5, 0);
    home.anchor.setTo(0.5)
    play.anchor.setTo(0.5)
    play.visible = false;
    home.visible = false;
    text.visible = false;
    play.inputEnabled = true;
    home.inputEnabled = true;
    play.events.onInputDown.add(unpaused, this);
    home.events.onInputDown.add(redirect, this);
   
    // Element for mobile device in 18/9
    var bg = document.createElement('div');
    let bgSty = bg.style;
    bg.id = "bg";
    document.getElementById('wrapper').appendChild(bg);
    bgSty.position = "relative";
    bgSty.height = "200px";
    bgSty.width = "100%";
    bgSty.background = "#93DFF6";

    var div = document.createElement('div');
    let divSty = div.style;
    document.getElementById('bg').appendChild(div);
    divSty.position = "relative";
    divSty.display = "none";
    divSty.marginTop = "-10px";
    divSty.height = "100%";
    divSty.width = "100%";
    divSty.background = "#000000";
    divSty.opacity = "0.5";

    function redirect(){
      location.replace("/#/");
    }

    function listener() {
      divSty.display = "block";
      game.paused = true;
      text.visible = true;
      graphics.visible = true;
      play.visible = true;
      home.visible = true;
      image.visible = false;
    }  

    function unpaused(){
      divSty.display = "none";
      game.paused = false;
      play.visible = false;
      home.visible = false;
      graphics.visible = false;
      text.visible = false;
      image.visible = true;
    }

    //Test random circle
    var numCircle; 
    this.timeRandom = 9;
    let cirLength = this.circleArr.length -1;
    this.sec = 2;
    var myLoop1 = game.time.events.loop(Phaser.Timer.SECOND * this.sec, setNumCircle, this);
    
    function setNumCircle(){
      numCircle = Math.round(Math.random() * 2);
    }
    var myLoop2 = game.time.events.loop(Phaser.Timer.SECOND * Math.round(Math.random() * this.timeRandom) +2, displayCircle, this);
    
    function displayCircle(e){
      let last = this.spawnArr[this.spawnArr.length-1]
      if(numCircle == 2){
        this.spawnArr.push(1);
        this.spawnArr.push(1);
        var showCircle = Math.round(Math.random() * cirLength);
        
        var otherCircle = showCircle +1;
        if((otherCircle) > (this.circleArr.length - 1)){
          otherCircle -=2;
        }

        this.circleArr[showCircle].visible = true;
        this.circleArr[otherCircle].visible = true;
      }else{
        this.spawnArr.push(1);
        var showCircle = Math.round(Math.random() * cirLength);
        
        this.circleArr[showCircle].visible = true;
      }
        setTimeout(()=>{
          this.circleArr[showCircle].visible = false;
          (otherCircle != undefined) ? this.circleArr[otherCircle].visible = false : '';
          if(this.clickArr.length != this.spawnArr.length){
    
            //Fail to refactor (call function in function ?)
            if(this.perfect.visible == true){
              this.perfect.visible = false;
              textPerfect.visible = false;
            }
            this.fail.visible = true;
            this.juryUnhappy.visible = true;
            this.jury.visible = false;
            textFail.visible = true;
            setTimeout(()=>{
              this.fail.visible = false;
              this.jury.visible = true;
              this.juryUnhappy.visible = false;
              textFail.visible = false;
            }, 1000)
            heart[this.life-1].visible = false;
            nageuseArr[this.life-1].kill();
            for(let i = 0; i<this.arrPos[this.life-1].length; i++){
              this.arrPos[i][this.life-1].kill();
            }
            
            starArray[this.life-1].kill();
            this.life--;
      
            if(this.life == 0){
              if(parseFloat(textScore.text) >= this.rec) {
                newRecord.visible = true;
              }
              game.time.events.remove(myLoop1);
              game.time.events.remove(myLoop2);
              textScoreFinal.text = textScore.text;
              image.visible = false;
              textScore.visible = false;
              this.textRecord.visible = false;
              this.record.visible = false;
              share.visible = true;
              textScoreFinal.visible = true;
              for(var i = 0; i<btnArray.length; i++){
                btnArray[i].visible = false;
              }
              for(var i = 0; i<this.circleArr.length; i++){
                this.circleArr[i].visible = false;
              }
            }
            
            //Re-balancing of length
            if(this.spawnArr.length > this.clickArr.length){
              let diff = this.spawnArr.length - this.clickArr.length;
              (diff == 1) ? this.clickArr.push(2) : this.clickArr.push.apply(this.clickArr,[2, 2]);
            }else if(this.spawnArr.length < this.clickArr.length){
              let diff = this.clickArr.length - this.spawnArr.length;
              (diff == 2) ? this.spawnArr.push(2) : this.spawnArr.push.apply(this.spawnArr,[2, 2]);
            }
          }
        }, 1000);
      
    }

    // function displayCircle(){
    //     this.spawnArr.push(1);
    //     this.spawnArr.push(1);
    //     console.log(this.spawnArr);
    //     var showCircle = Math.round(Math.random() * cirLength);
        
    //     var otherCircle = showCircle +1;
    //     if((otherCircle) > (this.circleArr.length - 1)){
    //       otherCircle -=2;
    //     }

    //     this.circleArr[showCircle].visible = true;
    //     this.circleArr[otherCircle].visible = true;

    //     setTimeout(()=>{
    //       this.circleArr[showCircle].visible = false;
    //       (otherCircle != undefined) ? this.circleArr[otherCircle].visible = false : '';
    //       if(this.clickArr.length != this.spawnArr.length){
    
    //         //Fail to refactor (call function in function ?)
    //         this.fail.visible = true;
    //         this.juryUnhappy.visible = true;
    //         this.jury.visible = false;
    //         textFail.visible = true;
    //         setTimeout(()=>{
    //           this.fail.visible = false;
    //           this.jury.visible = true;
    //           this.juryUnhappy.visible = false;
    //           textFail.visible = false;
    //         }, 1000)
    //         heart[this.life-1].visible = false;
    //         nageuseArr[this.life-1].kill();
    //         this.arrPos[this.life-1].kill();
    //         starArray[this.life-1].kill();
    //         this.life--;
      
    //         if(this.life == 0){
    //           if(parseFloat(textScore.text) >= rec) {
    //             newRecord.visible = true;
    //           }
    //           textScoreFinal.text = textScore.text;
    //           image.visible = false;
    //           textScore.visible = false;
    //           textRecord.visible = false;
    //           this.record.visible = false;
    //           share.visible = true;
    //           textScoreFinal.visible = true;
    //           for(var i = 0; i<btnArray.length; i++){
    //             btnArray[i].visible = false;
    //           }
    //           for(var i = 0; i<this.circleArr.length; i++){
    //             this.circleArr[i].visible = false;
    //           }
    //         }
            
    //         //Re-balancing of length
    //         if(this.spawnArr.length > this.clickArr.length){
    //           let diff = this.spawnArr.length - this.clickArr.length;
    //           (diff == 1) ? this.clickArr.push(1) : this.clickArr.push.apply(this.clickArr,[1, 1]);
    //         }else if(this.spawnArr.length < this.clickArr.length){
    //           let diff = this.clickArr.length - this.spawnArr.length;
    //           (diff == 1) ? this.spawnArr.push(1) : this.spawnArr.push.apply(this.spawnArr,[1, 1]);
    //         }
    //       }
    //     }, 1000);
    // }

    //Check if two arrays are equals
    Array.prototype.equals = function (array) {
      if (!array)
          return false;
      if (this.length != array.length)
          return false;
      for (var i = 0, l=this.length; i < l; i++) {
          if (this[i] instanceof Array && array[i] instanceof Array) {
              if (!this[i].equals(array[i]))
                  return false;       
          }           
          else if (this[i] != array[i]) { 
              return false;   
          }           
      }       
    return true;
    }

    Object.defineProperty(Array.prototype, "equals", {enumerable: false});
    let ten = [1,1,1,1,1,1,1,1,1,1];
    let twenty = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

    function perfect(e){
      e.visible = false;
      this.perfect.visible = true;
      this.juryHappy.visible = true;
      this.jury.visible = false;
      textPerfect.visible = true;
      this.clickArr.push(1);
      
      setTimeout(()=>{
        this.perfect.visible = false;
        this.jury.visible = true;
        this.juryHappy.visible = false;
        textPerfect.visible = false;
      }, 1000)
      if(this.spawnArr.slice(this.spawnArr.length-11, this.spawnArr.length-1).equals(ten)){
        this.score += 10;
      }else if((this.spawnArr.slice(this.spawnArr.length-21, this.spawnArr.length-1).equals(twenty))){
        this.score += 20;
        this.spawnArr.push(2);
        this.clickArr.push(2);
      }else{
        this.score += 1;
      }
            
      textScore.text = this.score;
      
      if(this.score > this.rec){
        this.textRecord.text = 'Record : ' + this.score;
      }
      let v = Math.round(Math.random() * 2);
      for(let u = 0; u< this.life; u++){
        this.arrPos[v][u].visible = true;
      }

      for(var i = 0; i < this.life; i++ ){
        starArray[i].visible = true;
        nageuseArr[i].visible = false;
        starArray[i].play('run', 8)
      }
      setTimeout(()=>{
        for(var i = 0; i < this.life; i++ ){
          this.arrPos[v][i].visible = false;
          starArray[i].visible = false;
          nageuseArr[i].visible = true;
        }
      }, 1000)
    }
    store.commit('isSwimmingLoaded', true)
  }
  update () {
    // Condition to review
    //Use if/else for performance and not switch
    if(this.score > 200){
      this.timeRandom--
    }
    if(this.score > 400){
      this.timeRandom--
    }
    if(this.score > 800){
      this.timeRandom--
    }
    if(this.score > 1200){
      this.timeRandom--
    }
    if(this.score > 30000){
      this.timeRandom--
    }
    
  }
}