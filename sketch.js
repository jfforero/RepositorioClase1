let speechRec;
let letters = [];
let gravity = false;

class FloatingLetter {
  constructor(char, x, y) {
    this.char = char;
    this.x = x;
    this.y = y;
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, 0.5);
  }

  update() {
    if (gravity) {
      this.vy += 0.2; // gravedad
    } else {
      // movimiento flotante
      this.vx += random(-0.05, 0.05);
      this.vy += random(-0.05, 0.05);
      this.vx = constrain(this.vx, -1, 1);
      this.vy = constrain(this.vy, -1, 1);
    }

    this.x += this.vx;
    this.y += this.vy;

    // suelo
    if (this.y > height - 20) {
      this.y = height - 20;
      this.vy *= -0.3;
    }
  }

  display() {
    text(this.char, this.x, this.y);
  }
}

function setup() {
  createCanvas(900, 500);
  textSize(32);
  fill(255);

  let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  speechRec = new SpeechRecognition();
  speechRec.lang = "es-ES";
  speechRec.continuous = true;
  speechRec.interimResults = true;

  speechRec.onresult = function (event) {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    addLetters(transcript);
  };

  speechRec.start();
}

function draw() {
  background(20);

  for (let l of letters) {
    l.update();
    l.display();
  }
}

function addLetters(text) {
  for (let c of text) {
    let x = random(width);
    let y = random(height / 2);
    letters.push(new FloatingLetter(c, x, y));
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    gravity = true;
  }
}