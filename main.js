document.addEventListener("DOMContentLoaded", function () {
  let player = true; //true = red , false = yellow
  const gameboard = document.querySelector(".gameboard");
  const cursor = document.querySelector(".cursor");
  let cols = 7;
  let rows = 6;

  document.querySelector(".new-game").addEventListener("click", () => {
    drawBoard(cols, rows);
    fieldOnclick();
  });
  document.querySelector(".size-traditional").addEventListener("click", function () {
    cols = 7;
    rows = 6;
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    drawBoard(cols, rows);
    fieldOnclick();
  });
  document.querySelector(".change").addEventListener("click", function (e) {
    e.preventDefault();
    let colsToChange = document.querySelector("#cols").value;
    let rowsToChange = document.querySelector("#rows").value;
    if (colsToChange >= 4 && rowsToChange >= 4) {
      cols = colsToChange;
      rows = rowsToChange;
      drawBoard(cols, rows);
      fieldOnclick();
    } else {
      alert("Selected board is too small");
    }
  });
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      button.animate([{ transform: "scale(0.9)" }], 50);
    });
  });

  function drawBoard(cols, rows) {
    // clears gameboard
    gameboard.innerHTML = "<span class='mask'>PLAY AGAIN</span>";
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
            cursor.style.backgroundColor = "yellow";
          } else {
            disc.classList.add("yellow");
            disc.setAttribute("data-color", "ylw");
            cursor.style.backgroundColor = "red";
          }
        } else {
          return;
        }

        checkWin();
        player = !player;
      });
    });
  }

  function onWinEvent() {
    if (player) {
      document.querySelector(".mask").textContent = "Red Wins";
    } else {
      document.querySelector(".mask").textContent = "Yellow Wins";
    }
    document.querySelector(".mask").style.display = "flex";
    document.querySelector(".mask").animate([{ opacity: 1 }], { duration: 300, fill: "forwards" });
  }

  function checkWin() {
    for (i = 1; i <= rows * cols; i++) {
      // check horizontal
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.col <= cols - 3 &&
        document.querySelector(`[data-id="${i + 1}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i + 1}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i + 2}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i + 3}"]`).dataset.color
        ) {
          onWinEvent();
        }
      }
      // check vertical
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.row >= 4 &&
        document.querySelector(`[data-id="${i - 1 * cols}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - cols}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 2 * cols}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 3 * cols}"]`).dataset.color
        ) {
          onWinEvent();
        }
      }
      // check diagonal ↘ (from right to left and from bottom to top)
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.col >= cols - 3 &&
        document.querySelector(`[data-id="${i}"]`).dataset.row >= 4 &&
        document.querySelector(`[data-id="${i - 1 * cols - 1}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - cols - 1}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 2 * cols - 2}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 3 * cols - 3}"]`).dataset.color
        ) {
          onWinEvent();
        }
      }
      // check diagonal ↙ (from right to left and from bottom to top)
      if (
        document.querySelector(`[data-id="${i}"]`).dataset.col <= cols - 3 &&
        document.querySelector(`[data-id="${i}"]`).dataset.row >= 4 &&
        document.querySelector(`[data-id="${i - 1 * cols + 1}"]`).dataset.color != undefined
      ) {
        if (
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - cols + 1}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 2 * cols + 2}"]`).dataset.color &&
          document.querySelector(`[data-id="${i}"]`).dataset.color ==
            document.querySelector(`[data-id="${i - 3 * cols + 3}"]`).dataset.color
        ) {
          onWinEvent();
        }
      }
    }
  }

  //mouse click effect
  document.body.addEventListener("click", function () {
    cursor.animate([{ transform: "scale(0.9)" }], 50);
  });
  const followCursor = (e) => {
    cursor.style.left = e.pageX - cursor.offsetWidth / 2 + "px";
    cursor.style.top = e.pageY - cursor.offsetWidth / 2 + "px";
  };
  document.addEventListener("mousemove", followCursor);

  drawBoard(cols, rows);
  fieldOnclick();
  followCursor();
});
