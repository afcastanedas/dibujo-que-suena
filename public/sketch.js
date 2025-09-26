// sketch.js
let synth;
let drawing = [];
let isDrawing = false;

function setup() {
  createCanvas(windowWidth * 0.9, 500);
  background(34);
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: 'triangle',
    },
    envelope: {
      attack: 0.05,
      decay: 0.2,
      sustain: 0.3,
      release: 1.2
    }
  }).toDestination();
  Tone.Transport.bpm.value = 110;
}

function draw() {
  noFill();
  stroke(255, 0, 128);
  strokeWeight(3);
  beginShape();
  for (let pt of drawing) {
    vertex(pt.x, pt.y);
  }
  endShape();
}

function mousePressed() {
  if (mouseY > 0 && mouseY < height) {
    isDrawing = true;
    drawing = [];
    playSynth(mouseX, mouseY);
  }
}

function mouseDragged() {
  if (isDrawing && mouseY > 0 && mouseY < height) {
    drawing.push({ x: mouseX, y: mouseY });
    playSynth(mouseX, mouseY);
  }
}

function mouseReleased() {
  isDrawing = false;
}

function playSynth(x, y) {
  // Map X to note, Y to velocity
  const notes = ['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6'];
  let noteIdx = floor(map(x, 0, width, 0, notes.length));
  noteIdx = constrain(noteIdx, 0, notes.length - 1);
  let velocity = map(y, 0, height, 1, 0.2);
  synth.triggerAttackRelease(notes[noteIdx], '8n', undefined, velocity);
}

function clearCanvas() {
  background(34);
  drawing = [];
}

function windowResized() {
  resizeCanvas(windowWidth * 0.9, 500);
  background(34);
  drawing = [];
}
