let char = document.getElementById('main_char');
let cnv_all = document.getElementById("main_map");

let screenH = window.screen.height;
let screenW = window.screen.width;

var img = new Image();
let pepega = new Image();
var canvas = document.getElementById("maps");


let ctx = canvas.getContext("2d");
let step = 1;

pepega.src = "./sprites/pepega_main_char/right_step.png";


window.addEventListener('resize', resizeCanvas, false);


img.onload = resizeCanvas;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  img.width = canvas.width;
  img.height = canvas.height;
  drawBackground();
}

let pepegaWidth = 100;
let pepegaHeight = 100;
let startPepegaY = screenH/1.24;
let startPepegaX = 10;

let endJumpY = startPepegaY-100;
let fallJumpY = endJumpY-1;

let pepega_person = {
  x: startPepegaX,
  y: startPepegaY
}

function drawBackground(){
  console.log(img.width + "\n" + img.height + "\n");
  ctx.drawImage(img, 0, 0);
  ctx.drawImage(pepega, startPepegaX, startPepegaY, pepegaWidth, pepegaHeight);
}

let keys = {
  left: {
    pressed: false
  },
  right: {
    pressed: false
  },
  jump: {
    pressed: false
  }
}

let l_counter = 0;
let r_counter = 0;
let j_counter = 0;
let jmp, block_jmp = false;
let j_check = false;
let j_current_check = false;

let stopgame = true;

function drawPeepa(){
  window.requestAnimationFrame(drawPeepa);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  ctx.drawImage(pepega, pepega_person.x, pepega_person.y, pepegaWidth, pepegaHeight);

  step = 4;
  jmp = 10;
  // pepega_person.y = 450;

  continueJump();

  if(keys.right.pressed === true && l_counter === 0 && stopgame===false){
    pepega_person.x+=step;
    // console.log(keys.jump.pressed)
  }
  if(keys.left.pressed === true && r_counter === 0 && stopgame===false)
    pepega_person.x-=step;
  // else if(keys.right.pressed === true && lastkey === "'" && keycounter>1)
  if(keys.jump.pressed === true && block_jmp===false && stopgame===false){
    pepega_person.y-=jmp;
    // console.log(pepega_person.y)
    if(pepega_person.y===endJumpY && stopgame===false){
      block_jmp = true;
      keys.jump.pressed = false;
    }
  }
  if(keys.jump.pressed === false && pepega_person.y>fallJumpY
    && block_jmp===true && stopgame===false){
    pepega_person.y+=jmp;
    if(pepega_person.y===startPepegaY){
      block_jmp = false;
      j_counter = 0;
    }
  }

  if(pepega_person.x===startPepegaX){
    keys.left.pressed = false;
    r_counter++;
  }
  if(pepega_person.x===screenW-pepegaWidth-pepegaWidth/2){
    keys.right.pressed = false;
    l_counter++;
  }
}drawPeepa();


window.addEventListener("keydown", function(press){
  let key = String.fromCharCode(press.keyCode);
  if(key===right_btn.innerHTML && stopgame===false){
    pepega.src="./sprites/pepega_main_char/right_step.png";
    keys.right.pressed = true;
    r_counter++;
    // console.log("right");
  }
  if(key===left_btn.innerHTML && stopgame===false){
    pepega.src="./sprites/pepega_main_char/left_step.png";
    keys.left.pressed = true;
    l_counter++;
    // console.log("left");
  }
  if(key===jump_btn.innerHTML && j_counter===0 && j_check===false && stopgame===false){
    keys.jump.pressed = true;
    j_check = true;
    j_current_check = true;
    j_counter++;
  }
  if((key===left_btn.innerHTML && j_check===true && pepega_person.y===startPepegaY && stopgame===false) ||
     (key===right_btn.innerHTML && j_check===true && pepega_person.y===startPepegaY && stopgame===false)){
       keys.jump.pressed = true;
       j_current_check = true;
       j_counter++;
  }
  // if((key==="&" && keys.left.pressed===true) ||
  //    (key==="&" && keys.right.pressed===true)){
  //     console.log("hmm_222")
  // }
});

window.addEventListener("keyup", function(press){
  let key = String.fromCharCode(press.keyCode);
  if(key===right_btn.innerHTML){
    keys.right.pressed = false;
    r_counter = 0;
    if(l_counter>0)
      pepega.src = "./sprites/pepega_main_char/left_step.png";
    // console.log("riiiiiiiiiiiiiiii")
  }
  else if(key===left_btn.innerHTML){
    keys.left.pressed = false;
    l_counter = 0;
    if(r_counter>0)
      pepega.src = "./sprites/pepega_main_char/right_step.png";
    // console.log("liiiiiiiiiiiiiiii")
  }
  else if(key===jump_btn.innerHTML && j_check===true){
    j_check = false;
    j_current_check = false;
    // console.log("ммм вкусное дерьмо")
  }
  // console.log(key + "\n" + block_jmp)
});

function continueJump(){
  if(j_current_check===true && r_counter===0 &&
      keys.jump.pressed===false && pepega_person.y===startPepegaY && block_jmp===false && stopgame===false ||
    j_current_check===true && l_counter===0 &&
      keys.jump.pressed===false && pepega_person.y===startPepegaY && block_jmp===false && stopgame===false){
        keys.jump.pressed = true;
        j_counter++;
  }
}







let setting = document.querySelectorAll(".setting");
let first_page = document.getElementById("first_page");
let second_page = document.getElementById('second_page');

setting[0].onclick=()=>{
  first_page.style.display="none";
  second_page.style.cssText="";
}

setting[1].onclick=()=>{
  fourth_page.style.display="none";
  second_page.style.cssText="";
}

let current_img = document.querySelector(".main_map");

let back = document.querySelector(".menu_item_back");
back.onclick=()=>{
  if(current_img.classList.contains("map_active_1")){
    first_page.style.cssText="";
    second_page.style.display="none";
  }else if(current_img.classList.contains("map_active_2")){
    fourth_page.style.cssText="";
    second_page.style.display="none";
  }
}

let language = document.querySelectorAll(".language");
let third_page = document.getElementById('third_page');

language[0].onclick=()=>{
  first_page.style.display="none";
  third_page.style.cssText="";
}

language[1].onclick=()=>{
  fourth_page.style.display="none";
  third_page.style.cssText="";
}

let back_3 = document.querySelector(".menu_item_back-3");

back_3.onclick=()=>{
  if(current_img.classList.contains("map_active_1")){
    third_page.style.display="none";
    first_page.style.cssText="";
  }else if(current_img.classList.contains("map_active_2")){
    third_page.style.display="none";
    fourth_page.style.cssText="";
  }
}

let current_language = document.querySelector(".change-game-lang");
let menu_language = document.querySelector(".item_game-language");

var language_counter = 0;
var touch_elem_counter = 0;
current_language.onclick=()=>{
  language_counter++;
  touch_elem_counter++;
  if(language_counter>1){
    menu_language.style.display="none";
    language_counter = 0;
    touch_elem_counter = 0;
  }
  else menu_language.style.cssText="";
}
let body = document.querySelector("body");
body.onclick=()=>{
  if(menu_language.style.cssText==="" && touch_elem_counter>0 && touch_elem_counter!=2){
    touch_elem_counter++;
  }else if(menu_language.style.cssText==="" && touch_elem_counter===2){
    touch_elem_counter = 0;
    language_counter = 0;
    menu_language.style.display="none";
  }
}

let change_language = document.querySelector(".hov-language");

let startgame = document.querySelectorAll(".start_game_rus");
let setting_now = document.querySelectorAll(".setting_rus");
let language_now = document.querySelectorAll(".language_rus");
let right = document.querySelector(".right_rus");
let left = document.querySelector(".left_rus");
let jump = document.querySelector(".jump_rus");
let back_now = document.querySelector(".back_rus");
let back_now_2 = document.querySelector(".back_rus-2");
let text = document.querySelector(".text_rus");

change_language.onclick=()=>{
  let remember_lng = current_language.innerHTML;
  current_language.innerHTML = change_language.innerHTML;
  change_language.innerHTML = remember_lng;
  menu_language.style.display="none";
  language_counter = 0;
  touch_elem_counter = 0;
  if(current_language.innerHTML==="English"){

    startgame[0].classList.remove("start_game_rus");
    startgame[1].classList.remove("start_game_rus");
    setting_now[0].classList.remove("setting_rus");
    setting_now[1].classList.remove("setting_rus");
    language_now[0].classList.remove("language_rus");
    language_now[1].classList.remove("language_rus");
    right.classList.remove("right_rus");
    left.classList.remove("left_rus");
    jump.classList.remove("jump_rus");
    back_now.classList.remove("back_rus");
    back_now_2.classList.remove("back_rus-2");
    text.classList.remove("text_rus");

    startgame[0].classList.add("start_game_eng");
    startgame[1].classList.add("start_game_eng");
    setting_now[0].classList.add("setting_eng");
    setting_now[1].classList.add("setting_eng");
    language_now[0].classList.add("language_eng");
    language_now[1].classList.add("language_eng");
    right.classList.add("right_eng");
    left.classList.add("left_eng");
    jump.classList.add("jump_eng");
    back_now.classList.add("back_eng");
    back_now_2.classList.add("back_eng-2")
    text.classList.add("text_eng");

    if(startgame[0].classList.contains("start_game_eng"))
      startgame[0].innerHTML = "Start game";
    if(startgame[1].classList.contains("start_game_eng"))
      startgame[1].innerHTML = "Return";
    if(setting_now[0].classList.contains("setting_eng"))
      setting_now[0].innerHTML = "Setting";
    if(setting_now[1].classList.contains("setting_eng"))
      setting_now[1].innerHTML = "Setting";
    if(language_now[0].classList.contains("language_eng"))
      language_now[0].innerHTML = "Language";
    if(language_now[1].classList.contains("language_eng"))
      language_now[1].innerHTML = "Language";
      if(left.classList.contains("left_eng"))
      left.innerHTML = "left step:";
    if(right.classList.contains("right_eng"))
      right.innerHTML = "right step:";
    if(jump.classList.contains("jump_eng"))
      jump.innerHTML = "jump:";
    if(back_now.classList.contains("back_eng"))
      back_now.innerHTML = "Back";
    if(back_now_2.classList.contains("back_eng-2"))
      back_now_2.innerHTML = "Back";
    if(text.classList.contains("text_eng"))
      text.innerHTML = "text:";

  }else{
    console.log(startgame);
    startgame[0].classList.remove("start_game_eng");
    startgame[1].classList.remove("start_game_eng");
    setting_now[0].classList.remove("setting_eng");
    setting_now[1].classList.remove("setting_eng");
    language_now[0].classList.remove("language_eng");
    language_now[1].classList.remove("language_eng");
    right.classList.remove("right_eng");
    left.classList.remove("left_eng");
    jump.classList.remove("jump_eng");
    back_now.classList.remove("back_eng");
    back_now_2.classList.remove("back_eng-2");
    text.classList.remove("text_eng");

    startgame[0].classList.add("start_game_rus");
    startgame[1].classList.add("start_game_rus");
    setting_now[0].classList.add("setting_rus");
    setting_now[1].classList.add("setting_rus");
    language_now[0].classList.add("language_rus");
    language_now[1].classList.add("language_rus");
    right.classList.add("right_rus");
    left.classList.add("left_rus");
    jump.classList.add("jump_rus");
    back_now.classList.add("back_rus");
    back_now_2.classList.add("back_rus-2")
    text.classList.add("text_rus");

    if(startgame[0].classList.contains("start_game_rus"))
      startgame[0].innerHTML = "Начать игру";
    if(startgame[1].classList.contains("start_game_rus"))
      startgame[1].innerHTML = "Возобновить";
    if(setting_now[0].classList.contains("setting_rus"))
      setting_now[0].innerHTML = "Настройки";
    if(setting_now[1].classList.contains("setting_rus"))
      setting_now[1].innerHTML = "Настройки";
    if(language_now[0].classList.contains("language_rus"))
      language_now[0].innerHTML = "Язык";
    if(language_now[1].classList.contains("language_rus"))
      language_now[1].innerHTML = "Язык";
      if(left.classList.contains("left_rus"))
      left.innerHTML = "влево:";
    if(right.classList.contains("right_rus"))
      right.innerHTML = "вправо:";
    if(jump.classList.contains("jump_rus"))
      jump.innerHTML = "прыжок:";
    if(back_now.classList.contains("back_rus"))
      back_now.innerHTML = "Назад";
    if(back_now_2.classList.contains("back_rus-2"))
      back_now_2.innerHTML = "Назад";
    if(text.classList.contains("text_rus"))
      text.innerHTML = "текст:";
  }
}


let start_game_now = document.querySelectorAll(".startgame");

change_img_counter = 0;
start_game_now[0].onclick=()=>{
  change_img_counter++;
  if(change_img_counter<2){
    current_img.src = "";
    current_img.style.display = "none";
    img.src = "./imgs/maps/2.jpg";
    current_img.classList.add("map_active_2");
    current_img.classList.remove("map_active_1");
    first_page.style.display="none";
    char.style.cssText="";
    stopgame = false;
  }
}

start_game_now[1].onclick=()=>{
  fourth_page.style.display="none";
  esc_counter = 0;
  stopgame = false;
}


let fourth_page = document.getElementById("fourth_page");
let esc_counter = 0;
window.addEventListener("keydown", function(press){
  let key = String.fromCharCode(press.keyCode);
  if(key==="" && esc_counter===0 && first_page.style.display==="none" &&
  second_page.style.display==="none" && third_page.style.display==="none"){
    fourth_page.style.cssText="";
    esc_counter++;

    stopgame = true;

  }else if(key==="" && esc_counter>0 && first_page.style.display==="none" &&
  second_page.style.display==="none" && third_page.style.display==="none"){
    fourth_page.style.display="none";
    esc_counter=0;
    stopgame = false;
  }
});


let left_btn = document.querySelector(".left");
let right_btn = document.querySelector(".right");
let jump_btn = document.querySelector(".jump");

var left_counter = 0;
var right_counter = 0;
var jump_counter = 0;

let active_left_btn = false;
let active_right_btn = false;
let active_jump_btn = false;
let keydown_counter = 0;

var body_left_counter = 0;
var body_right_counter = 0;
var body_jump_counter = 0;

left_btn.onclick=()=>{
  if(active_right_btn===true || active_jump_btn===true){
    keydown_counter = 0;
    active_right_btn = false;
    active_jump_btn = false;
    body_right_counter = 0;
    body_jump_counter = 0;
    right_counter = 0;
    jump_counter = 0;
    right_btn.classList.remove("right_ch_btn");
    jump_btn.classList.remove("jump_ch_btn");
  }
  left_counter++;
  keydown_counter++;
  body_left_counter=0;
  active_left_btn = true;
  left_btn.classList.add("left_ch_btn");

  if(left_counter>1){
    left_counter = 0;
    keydown_counter = 0;
    active_left_btn = false;
    left_btn.classList.remove("left_ch_btn");
  }
}

window.onkeydown=(press)=>{
  let press_btn = String.fromCharCode(press.keyCode);
  if(active_left_btn===true && keydown_counter===1){
    keydown_counter = 0;
    left_counter = 0;
    left_btn.classList.remove("left_ch_btn");
    left_btn.innerHTML=press_btn;
  }

  else if(active_right_btn===true && keydown_counter===1){
    keydown_counter = 0;
    right_counter = 0;
    right_btn.classList.remove("right_ch_btn");
    right_btn.innerHTML=press_btn;
  }

  else if(active_jump_btn===true && keydown_counter===1){
    keydown_counter = 0;
    jump_counter = 0;
    jump_btn.classList.remove("jump_ch_btn");
    jump_btn.innerHTML=press_btn;
  }
}

body.onclick=()=>{
  if(keydown_counter===1 && active_left_btn===true && body_left_counter===0){
    body_left_counter++;
  }else if(keydown_counter===1 && active_left_btn===true && body_left_counter===1){
    active_left_btn = false;
    keydown_counter = 0;
    left_counter = 0;
    body_left_counter = 0;
    console.log("work?*")
    left_btn.classList.remove("left_ch_btn");
  }

  else if(keydown_counter===1 && active_right_btn===true && body_right_counter===0){
    body_right_counter++;
  }else if(keydown_counter===1 && active_right_btn===true && body_right_counter===1){
    active_right_btn = false;
    keydown_counter = 0;
    right_counter = 0;
    body_right_counter = 0;
    right_btn.classList.remove("right_ch_btn");
  }

  else if(keydown_counter===1 && active_jump_btn===true && body_jump_counter===0){
    body_jump_counter++;
  }else if(keydown_counter===1 && active_jump_btn===true && body_jump_counter===1){
    active_jump_btn = false;
    keydown_counter = 0;
    jump_counter = 0;
    body_jump_counter = 0;
    jump_btn.classList.remove("jump_ch_btn");
  }
}


right_btn.onclick=()=>{
  if(active_left_btn===true || active_jump_btn===true){
    active_left_btn = false;
    keydown_counter = 0;
    body_left_counter = 0;
    body_jump_counter = 0;
    active_jump_btn = false;
    left_counter = 0;
    jump_counter = 0;
    left_btn.classList.remove("left_ch_btn");
    jump_btn.classList.remove("jump_ch_btn");
  }
  right_counter++;
  keydown_counter++
  body_right_counter = 0;
  active_right_btn = true;
  right_btn.classList.add("right_ch_btn");
  if(right_counter>1){
    right_counter = 0;
    keydown_counter = 0;
    active_right_btn = false;
    right_btn.classList.remove("right_ch_btn");
  }
}

jump_btn.onclick=()=>{
  if(active_left_btn===true || active_right_btn===true){
    active_left_btn = false;
    keydown_counter = 0;
    body_left_counter = 0;
    body_right_counter = 0;
    active_right_btn = false;
    left_counter = 0;
    right_counter = 0;
    left_btn.classList.remove("left_ch_btn");
    right_btn.classList.remove("right_ch_btn");
  }
  jump_counter++;
  keydown_counter++;
  body_jump_counter = 0;
  active_jump_btn = true;
  jump_btn.classList.add("jump_ch_btn");
  if(jump_counter>1){
    jump_counter = 0;
    keydown_counter = 0;
    active_jump_btn = false;
    jump_btn.classList.remove("jump_ch_btn");
  }
}
