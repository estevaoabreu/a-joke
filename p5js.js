let yret1, yret2, rneve, montanhas, plano, planoWhite, xm, vxm, trenosolo, trenofr, trenov, xt, yt, quantneve, raioneve, frcount, bumpspeed, texto, xtexto, ytexto, letrasMudarQuant, textoNovo, textChangeSpeed, narracao1, narracao2, narracao3, narracao4, frate, comecar, opacidade, olho1, olho2, pedra, arvore, objMov, quantObj, volFundo, somFundo1, largTexto, somFundo2, somFundo3, maxneve, planox, planoy, credito_at;
const ns = 8;
let neve = [];
let treno = [];
let letrasMudar = [];
let objChoose = [];
let escalaObj = [];
let xobj = [];
let yobj = [];
let newTimeObj = [];
let maxraioneve = 75;
let creditos = [];
let creditos_x = [];
let creditos_y = [];
let creditos_vel = [];

function preload() {
  comecar = false;
  fonte = loadFont('fonts/IbarraRealNova-Regular.woff');
  montanhas = loadImage('imgs/bg.png');
  soundFormats('mp3');
  narracao1 = loadSound('audio/narracao_min.mp3');
  narracao2 = loadSound('audio/narracao_mid1.mp3');
  narracao3 = loadSound('audio/narracao_mid2.mp3');
  narracao4 = loadSound('audio/narracao_max.mp3');
  somFundo1 = loadSound('audio/fundo_min.mp3');
  somFundo2 = loadSound('audio/fundo_mid.mp3');
  somFundo3 = loadSound('audio/fundo_max.mp3');
  plano = loadImage('imgs/plano.png');
  planoWhite = loadImage('imgs/plano_sl.png');
  treno[0] = loadImage('imgs/treno1.png');
  treno[1] = loadImage('imgs/treno2.png');
  treno[2] = loadImage('imgs/treno3.png');
  trenosolo = loadImage('imgs/treno.png');
  olho1 = loadImage('imgs/olho1.png');
  olho2 = loadImage('imgs/olho2.png');
  pedra = loadImage('imgs/pedra.png');
  arvore = loadImage('imgs/arvore.png');
}

function setup() {
  createCanvas(document.body.offsetWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  frate = 30;
  frameRate(frate);
  frcount = 0;

  xm = 0;
  vxm = 0.5;

  credito_at = 0;

  treno[0].resize(250, 250);
  treno[1].resize(250, 250);
  treno[2].resize(250, 250);
  trenosolo.resize(trenosolo.width / 15, trenosolo.height / 15);
  yt = 60;
  trenofr = 0;
  planox = 0; planoy = 0;
  creditos = ["Produced by Alexandra Costa", "Estêvão Abreu", "João Luís Marques", "Maria Branco", "Faculty of Sciences and Technology", "University of Coimbra", "Project 3 - Multimedia Applications", "Bachelor’s Degree in Design and Multimedia", "2023/2024", "Supervised by Ana Boavida", "Luís Lucas Pereira", "Adaptation of “A Joke”", "Written by Anton Chekhov", "1886", ""];
  for (let i = 0; i < creditos.length; i++) {
    creditos_x[i] = random(textWidth(creditos[i]), width - textWidth(creditos[i]) * 3);
    creditos_y[i] = -50;
    creditos_vel[i] = 0.1;
  }

  for (let i = 0; i < 10; i++) {
    newTimeObj[i] = random(-500, -5000);
    if (width >= 1000) {
      xobj[i] = random(width * 0.4, width * 0.85);
      yobj[i] = height;
    } else {
      xobj[i] = width;
      yobj[i] = random(height * map(height, 300, 1000, 0.55, 0.9), height);
    }
    objChoose[i] = random(100);
    escalaObj[i] = random(0.5, 1);
  }

  maxneve = windowWidth * 1.5;
  for (let i = 0; i < maxneve / 2; i++) {
    let x = random(width);
    let y = random(height);
    neve.push(new Neve(x, y, 0, 0.2, maxraioneve / 2));
  }

  sliders = new Array(ns);
  for (let i = 0; i < ns; i++) {
    let margem;
    if (document.body.offsetWidth > 500)
      margem = width / 6;
    else if (document.body.offsetWidth < 300)
      margem = width / 15;
    else margem = width / 8;
    let espaco = (width - 2 * margem) / (ns - 1)
    let x = margem + i * espaco;
    if (i == 7 || i == 1)
      sliders[i] = new Slider(x, height - 30, 100, 15, 25, 0);
    else if (i == 2 || i == 3 || i == 5)
      sliders[i] = new Slider(x, height - 30, 100, 15, 25, 1);
    else
      sliders[i] = new Slider(x, height - 30, 100, 15, 25, 0.5);
  }

  textFont(fonte);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  textSize(16);
  texto = "";

  intervaloTotal = 0;
  tempoMutado = 0;
  tempoUnmutado = 0;
  muteSpeed = 0;

  if (document.body.offsetWidth <= 500) {
    xt = (width * 0.05);
    xtexto = (width * 0.5);
    ytexto = (windowHeight / 2);
    largTexto = (width * 0.8);
  }
  else {
    xtexto = (width / 8) * 6.4;
    ytexto = 320;
    largTexto = (width / 8) * 2.5;
    xt = 170;
  }
}

function creditos_f() {
  textAlign(LEFT, TOP);
  background(255);
  for (let i = 0; i < creditos.length; i++) {
    text(creditos[i], creditos_x[i], creditos_y[i]);
  }
  if (creditos_y[credito_at] >= height) {
    if (credito_at < creditos.length - 1)
      credito_at++;
    else {
      credito_at = 0;
      for (let i = 0; i < creditos.length; i++) {
        creditos_x[i] = random(textWidth(creditos[i]), width - textWidth(creditos[i]) * 3);
        creditos_y[i] = -50;
        creditos_vel[i] = 0.1;
      }
    }
  }
  creditos_y[credito_at] += creditos_vel[credito_at];
  creditos_vel[credito_at] += 0.3;
}

function desenhotreno() {
  let bump = map(noise(frcount * bumpspeed), 0, 1, -5, 5);
  let bumprot = map(noise(frcount * bumpspeed + 1000), 0, 1, -1, 1);
  push();
  rotate(bumprot);
  translate(0, bump);
  if (trenofr < trenov / 3)
    image(treno[0], xt, yt);
  else if (trenofr < trenov * 2 / 3)
    image(treno[1], xt, yt);
  else
    image(treno[2], xt, yt);
  pop();

  if (trenofr >= trenov)
    trenofr = 0;
  else trenofr++;
}

function desenhomontanhas() {
  let escala = height / montanhas.height;
  montanhas.resize(montanhas.width * escala, montanhas.height * escala);
  push();
  tint(255, opacidade);
  image(montanhas, xm, 0);
  image(montanhas, xm + montanhas.width, 0);
  pop();
  image(planoWhite, planox, planoy);
  image(planoWhite, planox + plano.width, planoy + 42.6 / 56.25 * plano.height);
  push();
  tint(255, opacidade);
  image(plano, planox, planoy);
  image(plano, planox + plano.width, planoy + 42.6 / 56.25 * plano.height);
  pop();
  xm -= vxm;
  if (xm <= -montanhas.width)
    xm = 0;
  planox -= (1 * vxm);
  planoy -= (0.426 * vxm);
  if (planox <= -plano.width) {
    planox = 0;
    planoy = 0;
  }
}

function nevar() {
  let si = neve.length;
  for (let i = 0; i < si; i++) {
    if (i > quantneve)
      neve.pop();
    else {
      let nx = random(width);
      let ny = random(-height / 4, height);
      neve.push(new Neve(nx, ny, 0, 0.2, raioneve));
    }
  }

  for (let i = 0; i < neve.length; i++) {
    let xOff = neve[i].pos.x / width;
    let yOff = neve[i].pos.y / height;
    let nAng = noise(xOff, yOff, 0) * TWO_PI;
    let vH = p5.Vector.fromAngle(nAng);
    vH.mult(0.1);

    neve[i].move();
    neve[i].desenha();
    if (neve[i].pos.y > height) {
      neve.splice(i, 1);
    }
  }
}

function olhos() {
  fill(0);

  push();
  imageMode(CORNER);
  olho1.resize(width, height * 0.72);
  olho2.resize(width, height * 0.72);
  pop();

  yret1 = map(sliders[7].value, 0, 1, -olho1.height, 0);
  yret2 = map(sliders[7].value, 0, 1, height, height - olho1.height);

  image(olho1, 0, yret1);
  image(olho2, 0, yret2);


}

function textoDesenho() {
  letrasMudar = [];

  while (letrasMudar.length < letrasMudarQuant) {
    let randomLetras = int(random(texto.length));
    if (!letrasMudar.includes(randomLetras)) {
      letrasMudar.push(randomLetras);
    }
  }

  if (frcount % textChangeSpeed == 0) {
    textoNovo = "";
    for (let i = 0; i < texto.length; i++) {
      let charA = texto.charAt(i);
      if (charA === ' ') {
        textoNovo += charA;
      } else {
        if (letrasMudar.includes(i)) {
          let randomChar;
          if (/[a-zA-Z]/.test(charA)) {
            if (charA === charA.toUpperCase()) {
              randomChar = String.fromCharCode(int(random('A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1)));
            } else {
              randomChar = String.fromCharCode(int(random('a'.charCodeAt(0), 'z'.charCodeAt(0) + 1)));
            }
          } else {
            randomChar = String.fromCharCode(int(random(33, 127)));
          }
          textoNovo += randomChar;
        } else {
          textoNovo += charA;
        }
      }
    }
  }


  push();
  fill(0, opacidade);
  text(textoNovo, xtexto, ytexto, largTexto);
  pop();
}

function mudarVolumeNarracao() {
  if (muteInterval < 1 / 4) {
    narracao1.setVolume(1);
    narracao2.setVolume(0);
    narracao3.setVolume(0);
    narracao4.setVolume(0);
  }
  else if (muteInterval < 1 / 4 * 2) {
    narracao1.setVolume(0);
    narracao2.setVolume(1);
    narracao3.setVolume(0);
    narracao4.setVolume(0);
  }
  else if (muteInterval < 1 / 4 * 3) {
    narracao1.setVolume(0);
    narracao2.setVolume(0);
    narracao3.setVolume(1);
    narracao4.setVolume(0);
  }
  else {
    narracao1.setVolume(0);
    narracao2.setVolume(0);
    narracao3.setVolume(0);
    narracao4.setVolume(1);
  }
}

function objetos() {

  for (let i = 0; i < 10; i++) {
    xobj[i] -= (1 * vxm);
    yobj[i] -= (0.426 * vxm);
  }

  for (let i = 0; i < quantObj; i++) {
    if (xobj[i] <= newTimeObj[i] || yobj[i] <= newTimeObj[i]) {
      newTimeObj[i] = random(-500, -5000);
      if (width >= 1000) {
        xobj[i] = random(width * 0.4, width * 0.85);
        yobj[i] = height;
      } else {
        xobj[i] = width;
        yobj[i] = random(height * map(height, 300, 1000, 0.4, 0.85), height);
      }
      objChoose[i] = random(100);
      escalaObj[i] = random(0.5, 1);
    }
    push();
    tint(255, opacidade);
    imageMode(CORNER);
    if (objChoose[i] > 50)
      image(arvore, xobj[i], yobj[i], arvore.width * escalaObj[i], arvore.height * escalaObj[i]);
    else
      image(pedra, xobj[i], yobj[i], pedra.width * escalaObj[i], pedra.height * escalaObj[i]);
    pop();
  }
}

function sonsFundo() {
  if (volFundo < 1 / 4) {
    somFundo1.setVolume(0);
    somFundo2.setVolume(0);
    somFundo3.setVolume(0);
  }
  else if (volFundo < 1 / 4 * 2) {
    somFundo1.setVolume(0.3);
    somFundo2.setVolume(0);
    somFundo3.setVolume(0);
  }
  else if (volFundo < 1 / 4 * 3) {
    somFundo1.setVolume(0.3);
    somFundo2.setVolume(0.3);
    somFundo3.setVolume(0);
  }
  else {
    somFundo1.setVolume(0.3);
    somFundo2.setVolume(0.3);
    somFundo3.setVolume(0.3);
  }
}

function draw() {
  if (!comecar) {
    fill(0);
    creditos_f();
    push();
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    image(trenosolo, width / 2, height / 2 + 10);
    text("Click anywhere to begin.", width / 2, height / 2 - 20);
    pop();
    quantneve = 500;
    raioneve = 20;
    nevar();
  } else {
    background(255);

    //Slider 1 - Velocidade animações
    vxm = map(sliders[0].value, 0, 1, 1, 25);
    trenov = map(sliders[0].value, 0, 1, 90, 5);
    bumpspeed = map(sliders[0].value, 0, 1, 0.025, 0.5);
    textChangeSpeed = int(map(sliders[0].value, 0, 1, 30, 3));
    objMov = map(sliders[0].value, 0, 1, 0.3, 0.1);

    //Slider 2 - Codificação do texto
    let textotam = texto.length;
    letrasMudarQuant = int(map(sliders[1].value, 0, 1, 0, textotam));

    //Slider 3 - Volume da narração
    muteInterval = sliders[2].value;

    //Slider 4 - Opacidade
    opacidade = map(sliders[3].value, 0, 1, 0, 255);

    //Slider 5 - Quantidade de obstáculos
    quantObj = int(map(sliders[4].value, 0, 1, 0, 7));

    //Slider 6 - Volume dos sons de fundo
    volFundo = sliders[5].value;

    //Slider 7 - Quantidade de neve
    quantneve = map(sliders[6].value, 0, 1, 0, maxneve);
    raioneve = map(sliders[6].value, 0, 1, 0, maxraioneve);

    desenhomontanhas();
    desenhotreno();
    nevar();
    legendar();
    textoDesenho();
    mudarVolumeNarracao();
    objetos();
    sonsFundo()

    //Slider 8 - Olhos
    olhos();

    for (let i = 0; i < ns; i++) {
      sliders[i].updateValue();
      sliders[i].shapes();
    }

    frcount++;
  }
}

function mouseReleased() {
  for (let i = 0; i < ns; i++)
    sliders[i].active = false;
}

function mousePressed() {
  if (!comecar) {
    comecar = true;
    somFundo1.loop();
    somFundo2.loop();
    somFundo3.loop();
    narracao1.loop();
    narracao2.loop();
    narracao3.loop();
    narracao4.loop();
  }
  for (let i = 0; i < ns; i++)
    sliders[i].checkPos();
}

function windowResized() {
  resizeCanvas(document.body.offsetWidth, windowHeight);
  maxneve = windowWidth * 1.5;
  for (let i = 0; i < ns; i++) {
    let margem;
    if (document.body.offsetWidth > 500)
      margem = width / 6;
    else if (document.body.offsetWidth < 300)
      margem = width / 15;
    else margem = width / 8;
    let espaco = (width - 2 * margem) / (ns - 1)
    let x = margem + i * espaco;
    sliders[i].xl = x;
  }
  if (document.body.offsetWidth <= 500) {
    xt = (width * 0.05);
    xtexto = (width * 0.5);
    ytexto = (windowHeight / 2);
    largTexto = (width * 0.8);

    for (let i = 0; i < creditos.length; i++) {
      creditos_x[i] = width / 2;
    }
  }
  else {
    xtexto = (width / 8) * 6.4;
    ytexto = 320;
    largTexto = (width / 8) * 2.5;
    xt = 170;
    for (let i = 0; i < creditos.length; i++) {
      creditos_x[i] = random(textWidth(creditos[i]), width - textWidth(creditos[i]) * 3);
    }
  }
}

function legendar() {
  if (narracao4.currentTime() < 0) {
    texto = "";
  }
  else if (narracao4.currentTime() < 23) {
    texto = "It was noon of a bright winter's day. The air was crisp with frost, and Nadia, who was walking beside me, found her curls and the delicate down on her upper lip silvered with her own breath. We stood at the summit of a high hill.";
  } else if (narracao4.currentTime() < 47) {
    texto = "The ground fell away at our feet in a steep incline which reflected the sun's rays like a mirror. Near us lay a little sled brightly upholstered with red. 'Let us coast down, Nadia!' I begged. 'Just once! I promise you nothing will happen.'";
  } else if (narracao4.currentTime() < 60 * 1 + 9) {
    texto = "But Nadia was timid. The long slope, from where her little overshoes were planted to the foot of the ice-clad hill, looked to her like the wall of a terrible, yawning chasm. Her heart stopped beating, and she held her breath as she gazed into that abyss while I urged her to take her seat on the sled.";
  } else if (narracao4.currentTime() < 60 * 1 + 27) {
    texto = "What might not happen were she to risk a flight over that precipice! She would die, she would go mad! 'Come, I implore you!' I urged her again. 'Don't be afraid! It is cowardly to fear, to be timid.'";

  } else if (narracao4.currentTime() < 60 * 1 + 49) {
    texto = "At last Nadia consented to go, but I could see from her face that she did so, she thought, at the peril of her life. I seated her, all pale and trembling, in the little sled, put my arm around her, and together we plunged into the abyss.";
  } else if (narracao4.currentTime() < 60 * 2 + 8) {
    texto = "The sled flew like a shot out of a gun. The riven wind lashed our faces; it howled and whistled in our ears, and plucked furiously at us, trying to wrench our heads from our shoulders; it's pressure stifled us;";
  } else if (narracao4.currentTime() < 60 * 2 + 25) {
    texto = "we felt as if the devil himself had seized us in his talons, and were snatching us with a shriek down into the infernal regions. The objects on either hand melted into a long and madly flying streak.";
  }
  else if (narracao4.currentTime() < 60 * 2 + 37) {
    texto = "Another second, and it seemed we must be lost! 'I love you, Nadia!' I whispered.";
  }
  else if (narracao4.currentTime() < 60 * 2 + 58) {
    texto = "And now the sled began to slacken its pace, the howling of the wind and the swish of the runners sounded less terrible, we breathed again, and found ourselves at the foot of the mountain at last. Nadia, more dead than alive, was breathless and pale.";
  }
  else if (narracao4.currentTime() < 60 * 3 + 15) {
    texto = "I helped her to her feet. 'Not for anything in the world would I do that again!' she said, gazing at me with wide, terror-stricken eyes. 'Not for anything on earth. I nearly died!'";
  }
  else if (narracao4.currentTime() < 60 * 3 + 44) {
    texto = "In a few minutes, however, she was herself again, and already her inquiring eyes were asking the question of mine: Had I really uttered those four words, or had she only fancied she heard them in the tumult of the wind? I stood beside her smoking a cigarette and looking attentively at my glove.";
  }
  else if (narracao4.currentTime() < 60 * 4 + 15) {
    texto = "She took my arm and we strolled about for a long time at the foot of the hill. It was obvious that the riddle gave her no peace. Had I spoken those words or not? It was for her a question of pride, of honour, of happiness, of life itself, a very important question, the most important one in the whole world.";
  }
  else if (narracao4.currentTime() < 60 * 4 + 51) {
    texto = "Nadia looked at me now impatiently, now sorrowfully, now searchingly; she answered my questions at random and waited for me to speak. Oh, what a pretty play of expression flitted across her sweet face! I saw that she was struggling with herself; she longed to say something, to ask some question, but the words would not come; she was terrified and embarrassed and happy.";
  }
  else if (narracao4.currentTime() < 60 * 5 + 20) {
    texto = "'Let me tell you something,' she said, without looking at me. 'What?' I asked. 'Let us--let us slide down the hill again!' We mounted the steps that led to the top of the hill. Once more I seated Nadia, pale and trembling, in the little sled, once more we plunged into that terrible abyss;";
  }
  else if (narracao4.currentTime() < 60 * 5 + 40) {
    texto = "once more the wind howled, and the runners hissed, and once more, at the wildest and most tumultuous moment of our descent, I whispered: 'I love you, Nadia!'";
  }
  else if (narracao4.currentTime() < 60 * 6 + 12) {
    texto = "When the sleigh had come to a standstill, Nadia threw a backward look at the hill down which we had just sped, and then gazed for a long time into my face, listening to the calm, even tones of my voice. Every inch of her, even her muff and her hood, every line of her little frame expressed the utmost uncertainty. On her face was written the question:";
  }
  else if (narracao4.currentTime() < 60 * 6 + 45) {
    texto = "'What can it have been? Who spoke those words? Was it he, or was it only my fancy?' The uncertainty of it was troubling her, and her patience was becoming exhausted. The poor girl had stopped answering my questions, she was pouting and ready to cry. 'Had we not better go home?' I asked.";
  } else if (narracao4.currentTime() < 60 * 7 + 8) {
    texto = "'I--I love coasting!' she answered with a blush. 'Shall we not slide down once more?' She loved coasting, and yet, as she took her seat on the sled, she was as trembling and pale as before and scarcely could breathe for terror!";
  } else if (narracao4.currentTime() < 60 * 7 + 30) {
    texto = "We coasted down for the third time and I saw her watching my face and following the movements of my lips with her eyes. But I put my handkerchief to my mouth and coughed, and when we were half-way down I managed to say: 'I love you, Nadia!'";
  } else if (narracao4.currentTime() < 60 * 7 + 58) {
    texto = "So the riddle remained unsolved! Nadia was left pensive and silent. I escorted her home, and as she walked she shortened her steps and tried to go slowly, waiting for me to say those words. I was aware of the struggle going on in her breast, and of how she was forcing herself not to exclaim:";
  }
  else if (narracao4.currentTime() < 60 * 8 + 32) {
    texto = "'The wind could not have said those words! I don't want to think that it said them!'Next day I received the following note: 'If you are going coasting, today, call for me. N.' Thenceforth Nadia and I went coasting every day, and each time that we sped down the hill on our little sled I whispered the words: 'I love you, Nadia!'";
  }
  else if (narracao4.currentTime() < 60 * 8 + 58) {
    texto = "Nadia soon grew to crave this phrase as some people crave morphine or wine. She could no longer live without hearing it! Though to fly down the hill was as terrible to her as ever, danger and fear lent a strange fascination to those words of love, words which remained a riddle to torture her heart.";
  }
  else if (narracao4.currentTime() < 60 * 9 + 20) {
    texto = "Both the wind and I were suspected; which of us two was confessing our love for her now seemed not to  matter; let the draught but be hers, and she cared not for the goblet that held it! One day, at noon, I went to our hill alone.";
  }
  else if (narracao4.currentTime() < 60 * 9 + 50) {
    texto = "There I perceived Nadia. She approached the hill, seeking me with her eyes, and at last I saw her timidly mounting the steps that led to the summit. Oh, how fearful, how terrifying she found it to make that journey alone! Her face was as white as the snow, and she shook as if she were going to her doom, but up she climbed, firmly, without one backward look.";
  }
  else if (narracao4.currentTime() < 60 * 10 + 16) {
    texto = "Clearly she had determined to discover once for all whether those wondrously sweet words would reach her ears if I were not there. I saw her seat herself on the sled with a pale face and lips parted with horror, saw her shut her eyes and push off, bidding farewell for ever to this world. 'zzzzzzz!' hissed the runners.";
  }
  else if (narracao4.currentTime() < 60 * 10 + 43) {
    texto = "What did she hear? I know not--I only saw her rise tired and trembling from the sled, and it was clear from her expression that she could not herself have said what she had heard; on her downward rush terror had robbed her of the power of distinguishing the sounds that came to her ears.";
  }
  else if (narracao4.currentTime() < 60 * 11 + 5) {
    texto = "And now, with March, came the spring. The sun's rays grew warmer and brighter. Our snowy hillside grew darker and duller, and the ice crust finally melted away. Our coasting came to an end.";
  }
  else if (narracao4.currentTime() < 60 * 11 + 22) {
    texto = "Nowhere could poor Nadia now hear the beautiful words, for there was no one to say them; the wind was silent and I was preparing to go to St. Petersburg for a long time, perhaps forever.";
  }
  else if (narracao4.currentTime() < 60 * 11 + 36) {
    texto = "One evening, two days before my departure, I sat in the twilight in a little garden separated from the garden where Nadia lived by a high fence surmounted by iron spikes.";
  }
  else if (narracao4.currentTime() < 60 * 11 + 57) {
    texto = "It was cold and the snow was still on the ground, the trees were lifeless, but the scent of spring was in the air, and the rooks were cawing noisily as they settled themselves for the night. I approached the fence, and for a long time peered through a chink in the boards.";
  }
  else if (narracao4.currentTime() < 60 * 12 + 13) {
    texto = "I saw Nadia come out of the house and stand on the door-step, gazing with anguish and longing at the sky. The spring wind was blowing directly into her pale, sorrowful face.";
  }
  else if (narracao4.currentTime() < 60 * 12 + 36) {
    texto = "It reminded her of the wind that had howled for us on the hillside when she had heard those four words, and with that recollection her face grew very sad indeed, and the tears rolled down her cheeks. The poor child held out her arms as if to implore the wind to bring those words to her ears once more.";
  }
  else if (narracao4.currentTime() < 60 * 13 + 3) {
    texto = "And I, waiting for a gust to carry them to her, said softly: 'I love you, Nadia!' Heavens, what an effect my words had on Nadia! She cried out and stretched forth her arms to the wind, blissful, radiant, beautiful...";
  }
  else if (narracao4.currentTime() < 60 * 13 + 27) {
    texto = "And I went to pack up my things. All this happened a long time ago. Nadia married, whether for love or not matters little. Her husband is an official of the nobility, and she now has three children. But she has not forgotten how we coasted together and how the wind whispered to her:";
  }
  else if (narracao4.currentTime() < 60 * 13 + 45) {
    texto = "'I love you, Nadia!' That memory is for her the happiest, the most touching, the most beautiful one of her life. But as for me, now that I have grown older, I can no longer understand why I said those words and why I jested with Nadia";
  }
}