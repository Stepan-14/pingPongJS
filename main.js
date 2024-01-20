let scoreL = document.getElementById("scoreL");
let scoreR = document.getElementById("scoreR");
let scoreNL = 0;
let scoreNR = 0;

let ldp = 0;
let rdp = 0;
let lup = 0;
let rup = 0;

let ballColor = "#eb5959";
let plateColor = "#fafafa";

let dead = 0;

let rectW = 20;
let rectH = 150;
let rectYch = 0;
let rectYchL = 0;

let dirCh = 0;
let dr = 0;
let dl = 0;
let ur = 0;
let ul = 0;

let xch = Math.floor(Math.random() * 2) + 1;
let ych = Math.floor(Math.random() * 2) + 1;

// let canvCL = document.getElementById("canvCL");
let canv = document.getElementById("canvas");
ctx = canv.getContext("2d");
ctxS = canv.getContext("2d");
ctxL = canv.getContext("2d");
ctxCL = canv.getContext("2d");
canv.width = 1000;
canv.height = 600;

let x0 = canv.width/2;
let y0 = canv.height/2;
let r = 8;

initCanv();
initCL();
initScore();
dirRand();

setInterval(function() {
  if (ur) {
    clearBall();
    moveUR();
  }

  if (dr) {
    clearBall();
    moveDR();
  }

  if (ul) {
    clearBall();
    moveUL();
  }

  if (dl) {
    clearBall();
    moveDL();
  }
}, 1);

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 38) { //up
    rup = 1;
  }
  if (e.keyCode == 40) { //down
    rdp = 1;
  }

  if (e.keyCode == 87) { //up Left
    lup = 1;
  }
  if (e.keyCode == 83) { //down Left
    ldp = 1;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 38) {
    rup = 0;
  }
  if (e.keyCode == 40) {
    rdp = 0;
  }

  if (e.keyCode == 87) {
    lup = 0;
  }
  if (e.keyCode == 83) {
    ldp = 0;
  }
});

let movePlatTim = setInterval(() => {
  if (rup) {
      if (rectYch < -(canv.height/2 - rectH/2)) {
        rectYch = -(canv.height/2 - rectH/2);
      }
      else {
        ctxS.beginPath();
        ctxS.clearRect(canv.width - rectW, canv.height/2 - rectH/2 + rectYch, rectW, rectH);

        rectYch -= 1;

        ctxS.beginPath();
        ctxS.fillStyle = "#fafafa";
        ctxS.fillRect(canv.width - rectW, canv.height/2 - rectH/2 + rectYch, rectW, rectH);
      }
    }
  if (rdp) {
    if (rectYch > (canv.height/2 - rectH/2)) {
      rectYch = (canv.height/2 - rectH/2);
    }
    else {
      ctxS.beginPath();
      ctxS.clearRect(canv.width - rectW, canv.height/2 - rectH/2 + rectYch, rectW, rectH);

      rectYch += 1;

      ctxS.beginPath();
      ctxS.fillStyle = "#fafafa";
      ctxS.fillRect(canv.width - rectW, canv.height/2 - rectH/2 + rectYch, rectW, rectH);
    }
  }

  if (lup) {
    if (rectYchL < -(canv.height/2 - rectH/2)) {
      rectYchL = -(canv.height/2 - rectH/2);
    }
    else {
      ctxL.beginPath();
      ctxL.clearRect(0, canv.height/2 - rectH/2 + rectYchL, rectW, rectH);

      rectYchL -= 1;

      ctxL.beginPath();
      ctxL.fillStyle = "#fafafa";
      ctxL.fillRect(0, canv.height/2 - rectH/2 + rectYchL, rectW, rectH);
    }
  }
  if (ldp) {
    if (rectYchL > (canv.height/2 - rectH/2)) {
      rectYchL = (canv.height/2 - rectH/2);
    }
    else {
      ctxL.beginPath();
      ctxL.clearRect(0, canv.height/2 - rectH/2 + rectYchL, rectW, rectH);

      rectYchL += 1;

      ctxL.beginPath();
      ctxL.fillStyle = "#fafafa";
      ctxL.fillRect(0, canv.height/2 - rectH/2 + rectYchL, rectW, rectH);
    }
  }
}, 1);

let lineTim = setInterval(() => {
  initCL();
}, 1);

function death() {
  dead = 1;

  dr = 0;
  dl = 0;
  ur = 0;
  ul = 0;
  initCanv();

  setTimeout(() => {
    dead = 0;
    dirRand();
  }, 1200);
}

function clearBall() {
  ctx.beginPath();
  ctx.fillStyle = getComputedStyle(canv).backgroundColor;
  ctx.arc(x0, y0, r + 1, 0, Math.PI*2);
  ctx.fill();
}

function moveUR() {
  y0 -= ych;
  x0 += xch;
  drawBall();

  if (y0 <= r) {
    ur = 0;
    dr = 1;

    changeRand();
  }

  if (y0 >= canv.height/2 - rectH/2 + rectYch && y0 <= canv.height/2 + rectH/2 + rectYch) {
    if (x0 >= canv.width - r - 2 - rectW) {
      ur = 0;
      ul = 1;

      changeRand();
    }
  }
  if (x0 > canv.width - rectW) {
    if (x0 >= canv.width - r) {
      scoreNL++;
      scoreL.textContent = scoreNL;
      initScore();
      death();
    }
  }
}

function moveDR() {
  y0 += ych;
  x0 += xch;
  drawBall();

  if (y0 >= canv.height - r) {
    ur = 1;
    dr = 0;

    changeRand();
  }

  if (y0 >= canv.height/2 - rectH/2 + rectYch && y0 <= canv.height/2 + rectH/2 + rectYch) {
    if (x0 >= canv.width - r - 2 - rectW) {
      dr = 0;
      dl = 1;

      changeRand();
    }
  }

  if (x0 > canv.width - rectW) {
    if (x0 >= canv.width - r) {
      scoreNL++;
      scoreL.textContent = scoreNL;
      initScore();
      death();
    }
  }
}

function moveUL() {
  y0 -= ych;
  x0 -= xch;
  drawBall();

  if (y0 <= r) {
    ul = 0;
    dl = 1;

    changeRand();
  }

  if (y0 >= canv.height/2 - rectH/2 + rectYchL && y0 <= canv.height/2 + rectH/2 + rectYchL) {
    if (x0 <= r + rectW + 2) {
      ul = 0;
      ur = 1;

      changeRand();
    }
  }

  if (x0 <= rectW) {
    if (x0 <= r) {
      scoreNR++;
      scoreR.textContent = scoreNR;
      initScore();
      death();
    }
  }
}

function moveDL() {
  y0 += ych;
  x0 -= xch;
  drawBall();

  if (y0 >= canv.height - r) {
    dl = 0;
    ul = 1;

    changeRand();
  }

  if (y0 >= canv.height/2 - rectH/2 + rectYchL && y0 <= canv.height/2 + rectH/2 + rectYchL) {
    if (x0 <= r + rectW + 2) {
      dl = 0;
      dr = 1;

      changeRand();
    }
  }

  if (x0 <= rectW) {
    if (x0 <= r) {
      scoreNR++;
      scoreR.textContent = scoreNR;
      initScore();
      death();
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = ballColor;
  ctx.arc(x0, y0, r, 0, Math.PI*2);
  ctx.fill();
}

function dirRand() {
  dirCh = Math.floor(Math.random() * 4);
  if (dirCh == 0) {
    dr = 1;
    dl = 0;
    ur = 0;
    ul = 0;
  }
  if (dirCh == 1) {
    dr = 0;
    dl = 1;
    ur = 0;
    ul = 0;
  }
  if (dirCh == 2) {
    dr = 0;
    dl = 0;
    ur = 1;
    ul = 0;
  }
  if (dirCh == 3) {
    dr = 0;
    dl = 0;
    ur = 0;
    ul = 1;
  }
}

function changeRand() {
  xch = Math.floor(Math.random() * 2) + 1;
  if (xch == 2) {
    ych = 0.5;
  }
  else {
    ych = 1;
  }
}

function initScore() {
  scoreL.style.left = ((canv.width/2 - 100) - (String(scoreL.textContent).length - 1) * 50) + "px";
  scoreL.style.bottom = canv.height + "px";
  scoreR.style.left = (canv.width/2 + 55) + "px";
  scoreR.style.bottom = (canv.height + 50) + "px";
}

function initCanv() {
  ctx.beginPath();
  ctx.clearRect(0, 0, canv.width, canv.height);

  //centred ball
  x0 = canv.width/2;
  y0 = canv.height/2;
  drawBall();

  //centred right plate
  rectYch = 0;
  ctxS.beginPath();
  ctxS.fillStyle = plateColor;
  ctxS.fillRect(canv.width - rectW, canv.height/2 - rectH/2, canv.width, rectH);

  //centred left plate
  rectYchL = 0;
  ctxL.beginPath();
  ctxL.fillStyle = plateColor;
  ctxL.fillRect(0, canv.height/2 - rectH/2, rectW, rectH);
}

function initCL() {
  // center line
  ctxCL.beginPath();
  ctxCL.strokeStyle = "#fafafa";
  ctxCL.lineWidth = 5;
  ctxCL.moveTo(canv.width/2, 0);
  ctxCL.lineTo(canv.width/2, canv.height);
  ctxCL.stroke();
}
