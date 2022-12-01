let dificuldade;
let guesses;

const gameDiv = document.getElementById("game-div");

async function registerGuessToDB() {
  const username = document.getElementById("nome").value;

  const score = 1000 / (dificuldade + guesses);

  if(score <= 0) return

  const data = {
    name: username,
    score,
  };

  await fetch("http://localhost:3000/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  setTimeout(() => {
    window.location.href = "http://localhost:3000/jogo";
  }, 1000);
}

function createGame() {
  gameDiv.style.display = "block";

  let randomNumber = Math.floor(Math.random() * 100) + 1;

  const game = document.getElementById("game");
  const help = document.getElementById("help");

  const guessesSpan = document.getElementById("guesses");
  guessesSpan.innerText = `Você tem ${guesses} chances`;

  const input = document.getElementById("guess");
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const guess = Number(input.value);
      input.value = "";

      if (guess === randomNumber) {
        guessesSpan.innerText = "Você acertou!";
        registerGuessToDB();
        return;
      }

      guesses -= 1;
      guessesSpan.innerText = `Você tem ${guesses} chances`;

      if (guesses === 0) {
        game.innerText = `Você perdeu! O número era ${randomNumber}`;
        return;
      }

      if (guess > randomNumber) {
        help.innerText = "Seu chute foi muito alto!";
      } else {
        help.innerText = "Seu chute foi muito baixo!";
      }
    }
  });
}

const radios = document.getElementsByName("dificuldade");
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("change", () => {
    if (radios[i].value == "on") {
      dificuldade = radios[i].id;
      guesses = radios[i].id;
      createGame();
    }
  });
}
