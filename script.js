const yesButton = document.getElementById('yes');
const noButton = document.getElementById('no');
const gif = document.getElementById('gif');
let yesSize = 1;
let gifIndex = 0; // Track the current GIF index

const gifs = [
  'https://i.pinimg.com/originals/d7/f5/87/d7f587da442a54025daf47091fe26ba0.gif',
  'https://i.pinimg.com/originals/64/d0/9c/64d09cfbed528b8b8348b4e2cfbf012d.gif',
  'https://i.pinimg.com/originals/c7/eb/5b/c7eb5bbae52025b4d2ad9b8224022bd4.gif',
  'https://cdn.dribbble.com/users/385237/screenshots/5683659/pirate_soldier_sad_animation.gif',
  'https://i.pinimg.com/originals/3f/c3/03/3fc30363de044bb4e326924e2bc44d95.gif'
];

const noTexts = [
  "Are you sure?",
  "Really sure?",
  "SURE NA BA TALAGA",
  "AYOKOOO",
  "AYAW",
  "IHHHHHHHHHHHHH",
  "PLS PLS PLS",
  "MAG YES KA NALANG PLS",
  "RAWR YOKO",
  "BLEHHHHHHHHH",
  "BLEH AYAN YES KA NA KASI",
  "NYENYENYNEYE",
  "dedma :P",
  "T^T pls",
  "NAURRRR, DAPAT YES LANG!",
  "AYAW MO TALAGA? OH ETO!"
];

let noTextIndex = 0;

function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 100); // Adjusts for button width
  const y = Math.random() * (window.innerHeight - 50); // Adjusts for button height
  return { x, y };
}

noButton.addEventListener('click', () => {
  yesSize += 1.0;
  yesButton.style.transform = `scale(${yesSize})`;

  // Change the GIF in order
  gif.src = gifs[gifIndex];
  gifIndex = (gifIndex + 1) % gifs.length; // Loop back to the start when reaching the end

  // Change the text of "No" button
  noButton.textContent = noTexts[noTextIndex];
  noTextIndex = (noTextIndex + 1) % noTexts.length; // Loop through different texts

  // Move "No" button to a random position
  const { x, y } = getRandomPosition();
  noButton.style.position = 'absolute';
  noButton.style.left = `${x}px`;
  noButton.style.top = `${y}px`;

  // Hide "No" button if "Yes" button gets too big
  if (yesSize >= 18) {
    noButton.style.display = 'none';
  }
});

yesButton.addEventListener('click', () => {
  document.body.innerHTML = `
    <div class="container">
      <img src="https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif" alt="Happy GIF">
      <h1>YAYY! MWEHEHEHE ^_______^</h1>
      <button id="nextPage" class="styled-button">Pindutin mo aq</button>
    </div>
    <style>
      .styled-button {
        background: linear-gradient(45deg, #ff6b6b, #ff9a9e);
        color: white;
        padding: 15px 25px;
        font-size: 20px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      }
      .styled-button:hover {
        background: linear-gradient(45deg, #ff9a9e, #ff6b6b);
        transform: scale(1.1);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
      }
    </style>
  `;

  document.getElementById('nextPage').addEventListener('click', () => {
    window.location.href = 'flower.html';
  });
});
