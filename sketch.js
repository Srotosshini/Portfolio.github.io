// Declare variables for assets
let chair, hb;
let hl = [], hr = [], hf = [];

// Preload all assets
function preload() {
  chair = loadImage('assets/chair.png');
  hb = loadImage('assets/hb.png');
  
  // Load left strands
  for (let i = 1; i <= 5; i++) {
    hl.push(loadImage(`assets/hl${i}.png`));
  }
  
  // Load right strands
  for (let i = 1; i <= 7; i++) {
    hr.push(loadImage(`assets/hr${i}.png`));
  }
  
  // Load fringes
  for (let i = 1; i <= 4; i++) {
    hf.push(loadImage(`assets/hf${i}.png`));
  }
}

// Setup canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Draw loop
function draw() {
  background(255);
  
  // Draw chair (topmost layer)
  image(chair, 0, 0, width, height);
  
  // Draw hair base
  image(hb, 0, 0, width, height);
  
  // Animate left strands
  let leftSwing = sin(frameCount * 0.05) * (mouseX - width / 2) * 0.002;
  for (let i = 0; i < hl.length; i++) {
    if (i <= floor(map(mouseX, 0, width, 0, hl.length))) {
      image(hl[i], leftSwing * (i + 1), 0, width, height);
    }
  }
  
  // Animate right strands
  let rightSwing = sin(frameCount * 0.05) * (mouseX - width / 2) * -0.002;
  for (let i = 0; i < hr.length; i++) {
    if (i <= floor(map(mouseX, width, 0, 0, hr.length))) {
      image(hr[i], rightSwing * (i + 1), 0, width, height);
    }
  }
  
  // Animate fringes (quicker movement)
  let fringeSwing = sin(frameCount * 0.1) * 10; // Fringe moves faster and within a smaller range
  for (let i = 0; i < hf.length; i++) {
    image(hf[i], fringeSwing + i * 5, 0, width, height); // Spread out fringes slightly
  }
}
