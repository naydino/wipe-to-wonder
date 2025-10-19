// --- Garotos Bonitos: 90s Fan Girl Edition ---
// absurd, glittery, and mobile-ready ✨

let capture, foreground, img;
let sparkles = [], hearts = [], stars = [], squiggles = [], stickers = [];
let gradientTop, gradientBottom;
let shineX = 0; // chrome title shine

let swipeHint;         // animated finger hint
let hasInteracted = false;
let hintSparkles = [];



function preload() {
  img = loadImage("F7104C74-08F4-4484-9918-D826D9A03A01.PNG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // webcam
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();

  // overlay poster to wipe
  foreground = createGraphics(width, height);
  foreground.image(img, 0, 0, width, height);

  gradientTop = color('#ffc8ff');
  gradientBottom = color('#9fd7ff');

  // sparkles
  for (let i = 0; i < 140; i++) {
    sparkles.push({ x: random(width), y: random(height), r: random(1, 3), s: random(0.01, 0.05) });
  }

  // floating deco
  for (let i = 0; i < 24; i++) hearts.push(new Heart());
  for (let i = 0; i < 34; i++) stars.push(new Star());
  for (let i = 0; i < 12; i++)  squiggles.push(new Squiggle());

 

  // “Refresh” button
  const refreshBtn = createButton('🔄 Refresh');
  refreshBtn.position(20, 20);
  refreshBtn.style('font-size', '18px');
  refreshBtn.style('background', 'linear-gradient(90deg, #ff8af0, #a7c4ff)');
  refreshBtn.style('border', 'none');
  refreshBtn.style('border-radius', '12px');
  refreshBtn.style('padding', '8px 14px');
  refreshBtn.style('color', 'white');
  refreshBtn.style('cursor', 'pointer');
  refreshBtn.mousePressed(resetForeground);
  swipeHint = new SwipeHint();
  
  
}

function draw() {
  // dreamy gradient
  setGradient(gradientTop, gradientBottom);
  drawScanlines();

  // deco layers
  drawMemphis();

  // video + poster
  image(capture, 0, 0, width, height);
  image(foreground, 0, 0, width, height);

  // stickers floating on top
  stickers.forEach(s => { s.update(); s.show(); });

  // glitter border + confetti
  drawGlitterBorder();
  sprinkleConfetti();

  // ambient sparkles
  drawSparkles();

  // chrome title + fan-club badge
  drawChromeTitle();
  drawFanClubBadge();

  
    // swipe hint sits above everything, until user interacts
  if (!hasInteracted && swipeHint) {
    swipeHint.update();
    swipeHint.show();
  }

  // prompt
  drawPrompt();
  
  
  y=sin(frameCount/10)
  y=map(y,-1,1,100,300)
  
  y2=cos(frameCount/10)
  y2=map(y2,-1,1,100,300)
  
  //dolphin
  textSize(64)
  textAlign(CENTER,CENTER)
  text("🐬",200,y)
  
   //dolphin
  textSize(64)
  textAlign(CENTER,CENTER)
  text("🐬",800,y)
  
   //fish
  textSize(64)
  textAlign(CENTER,CENTER)
  text("🐟",100,y2)
  
    //fish
  
  textSize(64)
  textAlign(CENTER,CENTER)
  text("🐟",600,y2)
  
}

/* ---------- Chrome Title Sticker ---------- */
function drawChromeTitle() {
  push();
  const base = min(width, height);
  const ts = constrain(floor(base * 0.09), 34, 92);
  const y = ts * 1.2;

  textAlign(CENTER, CENTER);
  textSize(ts);

 

  // chrome inner shine sweep
  let g = drawingContext.createLinearGradient(0, 0, width, 0);
  g.addColorStop(0,   'rgba(255,255,255,0)');
  g.addColorStop(0.5, 'rgba(255,255,255,0.9)');
  g.addColorStop(1,   'rgba(255,255,255,0)');
  drawingContext.globalCompositeOperation = 'lighter';
  drawingContext.fillStyle = g;

  // sweeping rectangle over the text area
  shineX = (shineX + max(3, width*0.005)) % (width + 200);
  push();
  translate(shineX - 100, y - ts);
  rotate(-PI/12);
  rect(-40, 0, 200, ts*1.8);
  pop();

  drawingContext.globalCompositeOperation = 'source-over';
  pop();
}

/* ---------- Fan Club Badge ---------- */
function drawFanClubBadge() {
  push();
  const r = 40;
  const x = width - r - 80;
  const y = 24 + r + 6 + 4 * sin(frameCount * 0.08); // bounce
  // badge circle
  noStroke();
  fill('#ff64c3'); circle(x, y, r*2);
  fill('#ffe6ff'); circle(x, y, r*1.7);
  // text
  fill('#ff64c3');
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('FAN CLUB', x, y-2);
  pop();
}

/* ---------- Decorations ---------- */


function drawMemphis() {
  drawingContext.shadowColor = 'rgba(255, 105, 180, 0.35)';
  drawingContext.shadowBlur = 12;
  hearts.forEach(h => { h.update(); h.show(); });
  stars.forEach(s => { s.update(); s.show(); });
  squiggles.forEach(q => { q.update(); q.show(); });
  drawingContext.shadowBlur = 0;
}

class Heart {
  constructor() {
    this.x = random(width); this.y = random(height);
    this.s = random(14, 28);
    this.dx = random([-0.6, -0.4, 0.4, 0.6]);
    this.dy = random(-0.4, -0.1);
    this.c = color(random(['#ff72d2', '#ff94a7', '#ffb3ef']));
    this.spin = random(TWO_PI);
    this.spinSpeed = random(0.005, 0.02);
  }
  update(){ this.x+=this.dx*0.6; this.y+=this.dy; this.spin+=this.spinSpeed;
    if(this.y<-40||this.x<-40||this.x>width+40){ this.x=random(width); this.y=height+40; } }
  show(){ push(); translate(this.x,this.y); rotate(0.15*sin(this.spin));
    noStroke(); fill(this.c); heartShape(0,0,this.s); pop(); }
}

class Star {
  constructor(){ this.x=random(width); this.y=random(height); this.r=random(6,14); this.tw=random(0.02,0.06); }
  update(){ this.y-=0.15; if(this.y<-10){ this.y=height+10; this.x=random(width);} }
  show(){ push(); translate(this.x,this.y); noStroke();
    const a=180+75*sin(frameCount*this.tw); fill(255,255,255,a); starShape(0,0,this.r,this.r*0.5,5); pop(); }
}

class Squiggle {
  constructor(){ this.x=random(width); this.y=random(height);
    this.w=random(60,120); this.h=random(10,18); this.t=random(TWO_PI);
    this.c=color(random(['#a6f0ff','#ffd6a6','#e7b5ff'])); }
  update(){ this.t+=0.01; this.x += 0.2*sin(this.t); this.y += 0.15*cos(this.t*0.7); this.wrap(); }
  wrap(){ if(this.x>width+60)this.x=-60; if(this.x<-60)this.x=width+60; if(this.y>height+60)this.y=-60; if(this.y<-60)this.y=height+60; }
  show(){ push(); noFill(); stroke(this.c); strokeWeight(6);
    const seg=8; beginShape(); for(let i=0;i<=seg;i++){ const u=i/seg;
      const px=this.x+(u-0.5)*this.w; const py=this.y+sin(u*TWO_PI+this.t)*this.h; curveVertex(px,py);}
    endShape(); pop();}
}



/* ---------- Helpers ---------- */
function heartShape(x,y,s){
  push(); translate(x,y); beginShape();
  for(let a=0;a<TWO_PI;a+=0.1){
    const px=s*0.5*16*pow(sin(a),3);
    const py=-s*0.5*(13*cos(a)-5*cos(2*a)-2*cos(3*a)-cos(4*a));
    vertex(px,py);
  } endShape(CLOSE); pop();
}

function starShape(x,y,r1,r2,n){
  let angle=TWO_PI/n, half=angle/2;
  beginShape();
  for(let a=0;a<TWO_PI;a+=angle){
    let sx=x+cos(a)*r1, sy=y+sin(a)*r1; vertex(sx,sy);
    sx=x+cos(a+half)*r2; sy=y+sin(a+half)*r2; vertex(sx,sy);
  } endShape(CLOSE);
}

function setGradient(c1,c2){
  for(let y=0;y<height;y++){ let t=map(y,0,height,0,1); stroke(lerpColor(c1,c2,t)); line(0,y,width,y); }
}

function drawScanlines(){ stroke(255,18); for(let y=0;y<height;y+=3) line(0,y,width,y); noStroke(); }

function drawGlitterBorder(){
  push(); noFill(); stroke(255,200); strokeWeight(6); rect(12,12,width-24,height-24,22);
  pop();
}

function drawSparkles(){
  noStroke();
  for (let s of sparkles) {
    fill(255,255,255,160+95*sin(frameCount*s.s));
    circle(s.x,s.y,s.r*2);
  }
}

function sprinkleConfetti(){
  push(); noStroke();
  for(let i=0;i<10;i++){
    fill(random(['#ff86d4','#9fe0ff','#ffe08a','#c6b3ff']));
    circle(random(width), random(height), random(2,4));
  } pop();
}

function drawPrompt(){
  textAlign(CENTER, CENTER);
  let base=min(width,height), ts=constrain(floor(base*0.055), 26, 56);
  textSize(ts);
  stroke(255,180); strokeWeight(8); fill(255);
  text('✨ wipe to reveal ✨', width/2, height - ts*0.9);
}

/* ---------- Reveal logic ---------- */
function resetForeground(){ 
  foreground.clear(); 
  foreground.image(img,0,0,width,height); 
    hasInteracted = false;
  if (swipeHint) swipeHint.reset();

}
function mouseDragged() {
  hasInteracted = true;
  eraseAt(mouseX, mouseY);
}

function touchMoved() {
  hasInteracted = true;
  eraseAt(touchX, touchY);
  return false;
}

function eraseAt(x,y){ const d=max(90, min(width,height)*0.12); foreground.erase(); foreground.circle(x,y,d); foreground.noErase(); }
function windowResized(){ resizeCanvas(windowWidth, windowHeight); foreground=createGraphics(width,height); foreground.image(img,0,0,width,height); }

/* ---------- Swipe Hint (animated finger + sparkles) ---------- */
class SwipeHint {
  constructor() {
    this.t = 0;              // time
    this.alpha = 255;        // fade
    this.life = 9 * 60;      // frames to auto-hide (~9s @60fps)
    this.fadeOut = false;
  }
  reset() {
    this.t = 0;
    this.alpha = 255;
    this.life = 9 * 60;
    this.fadeOut = false;
  }
  update() {
    this.t += 1;
    this.life--;
    if (this.life <= 0) this.fadeOut = true;
    if (this.fadeOut) this.alpha = max(0, this.alpha - 8);

    // spawn a sparkle at fingertip every few frames
    if (frameCount % 4 === 0 && this.alpha > 0) {
      const p = this.fingerPos();
      hintSparkles.push(new HintSparkle(p.x, p.y));
      if (hintSparkles.length > 120) hintSparkles.shift();
    }
    // update sparkles
    hintSparkles.forEach(s => s.update());
  }
  show() {
    if (this.alpha <= 0) return;

    // path: ease L→R then back (yo-yo)
    const baseY = height * 0.72;
    const margin = min(width, height) * 0.18;
    const L = margin, R = width - margin;
    const period = 160; // frames for one L→R pass
    const phase = floor(this.t / period) % 2 === 0 ? (this.t % period) / period
                                                   : 1 - ((this.t % period) / period);
    const x = lerp(L, R, easeInOutCubic(phase));
    const y = baseY + 8 * sin(this.t * 0.08);

    // draw “Swipe” label
    push();
    textAlign(CENTER, CENTER);
    const ts = constrain(floor(min(width, height) * 0.045), 20, 40);
    textSize(ts);
    stroke(255, 180); strokeWeight(6); fill(255, this.alpha);
    text('swipe here', width/2, baseY - ts * 1.8);
    pop();

    // trail sparkles
    hintSparkles.forEach(s => s.show(this.alpha));

    // finger
    push();
    translate(x, y);
    scale(1); // tweak if you want larger/smaller
    noStroke();
    const skin = color('#ffd7c2'); skin.setAlpha(this.alpha);
    const nail = color('#ffe9f0'); nail.setAlpha(this.alpha);

    // palm
   // fill(skin); rect(-26, -18, 40, 40, 14);
    // thumb
    //rect(-34, -6, 16, 20, 10);
    // index finger (pointing)
    //rect(10, -28, 16, 52, 10);
    // nail highlight
   // fill(nail); rect(10, -28, 16, 10, 8);

    // little sparkle on fingertip
    push();
    translate(18, -28);
    drawMiniStar(8, this.alpha);
    pop();

    // motion arrows (tiny chevrons moving right)
    const arrowY = -44;
    const w = 12;
    for (let i = -2; i <= 2; i++) {
      const ax = i * 26 - (frameCount % 26);
      stroke(255, this.alpha); strokeWeight(3); noFill();
      line(ax, arrowY, ax + w, arrowY);
      line(ax + w, arrowY, ax + w - 6, arrowY - 6);
      line(ax + w, arrowY, ax + w - 6, arrowY + 6);
    }

    pop();
  }
  fingerPos() {
    const margin = min(width, height) * 0.18;
    const L = margin, R = width - margin;
    const period = 160;
    const phase = floor(this.t / period) % 2 === 0 ? (this.t % period) / period
                                                   : 1 - ((this.t % period) / period);
    return { x: lerp(L, R, easeInOutCubic(phase)) + 18, y: height * 0.72 - 28 };
  }
}

class HintSparkle {
  constructor(x, y) {
    this.x = x + random(-6, 6);
    this.y = y + random(-6, 6);
    this.vx = random(-0.4, 0.4);
    this.vy = random(-0.8, -0.2);
    this.a = 255;
    this.r = random(2, 4);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.a -= 10;
  }
  show(alphaParent = 255) {
    if (this.a <= 0) return;
    const a = min(this.a, alphaParent);
    noStroke();
    fill(255, 255, 255, a);
    circle(this.x, this.y, this.r * 2);
  }
}

/* tiny star used on fingertip */
function drawMiniStar(r=8, a=255){
  push(); noStroke(); fill(255, a);
  beginShape();
  for (let i = 0; i < 5; i++) {
    let ang = i * TWO_PI / 5;
    vertex(cos(ang) * r, sin(ang) * r);
    ang += TWO_PI / 10;
    vertex(cos(ang) * r * 0.45, sin(ang) * r * 0.45);
  }
  endShape(CLOSE);
  pop();
}

/* easing for smooth finger motion */
function easeInOutCubic(t){ return t<0.5 ? 4*t*t*t : 1 - pow(-2*t+2,3)/2; }

