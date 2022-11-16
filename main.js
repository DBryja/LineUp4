document.addEventListener("DOMContentLoaded", function () {
  let player = true; //true = red , false = yellow
  const gameboard = document.querySelector(".gameboard");
  let cols = 7;
  let rows = 6;

  function drawBoard(cols, rows) {
    // clears gameboard
    gameboard.innerHTML = "";
    // builds gameboard
    let id = 1;
    for (let i = 1; i <= rows; i++) {
      for (let a = 1; a <= cols; a++) {
        div = document.createElement("div");
        div.classList.add("field");
        div.setAttribute("data-row", i);
        div.setAttribute("data-col", a);
        div.setAttribute("data-id", id);
        id++;
        gameboard.appendChild(div);
      }
    }
    //  sets gameboard style
    gameboard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gameboard.style.aspectRatio = `${cols}/${rows}`;
  }

  // colors the field and changes current player
  function fieldOnclick() {
    const fields = document.querySelectorAll(".field");
    //  adds eventlistener for each field
    fields.forEach((field) => {
      field.addEventListener("click", (e) => {
        // downloads id of clicked column
        const clickedColumn = e.target.dataset.col;
        const clickedColumnFields = document.querySelectorAll(`[data-col='${clickedColumn}']`);
        // creates an array containing free rows
        const numbers = [];
        clickedColumnFields.forEach((item) => {
          if (!(item.classList.contains("red") || item.classList.contains("yellow"))) {
            numbers.push(eval(item.dataset.row));
          }
        });
        // picks the lowest spot possible in current column
        const lowestRow = Math.max.apply(Math, numbers);

        // checks if the board wont overflow and sets a disc on an intented field
        const disc = document.querySelector(`[data-col='${clickedColumn}'][data-row='${lowestRow}']`);
        if (lowestRow >= 1) {
          if (player) {
            disc.classList.add("red");
            disc.setAttribute("data-color", "red");
          } else {
            disc.classList.add("yellow");
            disc.setAttribute("data-color", "ylw");
          }
        } else {
          return;
        }

        checkWin();
        player = !player;
      });
    });
  }

  function checkWin() {
    for (i = 1; i <= rows * cols; i++) {
      // check horizontal
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.col <= cols - 3 &&
        document.querySelector(`[data-id="${i + 3}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i + 1}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i + 2}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i + 3}"]`).dataset.color
        ) {
          alert("win horizontal");
        }
      }
      // check vertical
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.row > rows - 3 &&
        document.querySelector(`[data-id="${i - 3 * cols}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - cols}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 2 * cols}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 3 * cols}"]`).dataset.color
        ) {
          alert("win vertical");
        }
      }
      // check diagonal ↘ (from right to left and from bottom to top)
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.col >= cols - 3 &&
        document.querySelector(`[data-id="${i}"]`).dataset.row > rows - 3 &&
        document.querySelector(`[data-id="${i - 3 * cols - 3}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - cols - 1}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 2 * cols - 2}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 3 * cols - 3}"]`).dataset.color
        ) {
          alert("win diagonal ↘");
        }
      }
      // check diagonal ↙ (from right to left and from bottom to top)
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.col <= cols - 3 &&
        document.querySelector(`[data-id="${i}"]`).dataset.row > rows - 3 &&
        document.querySelector(`[data-id="${i - 3 * cols + 3}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - cols + 1}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 2 * cols + 2}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 3 * cols + 3}"]`).dataset.color
        ) {
          alert("win diagonal ↙");
        }
      }
    }
  }

  drawBoard(cols, rows);
  fieldOnclick();
});
