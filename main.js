document.addEventListener("DOMContentLoaded", function () {
  let player = true; //true = red , false = yellow
  const gameboard = document.querySelector(".gameboard");

  function drawBoard(cols, rows) {
    // clears gameboard
    gameboard.innerHTML = "";
    // builds gameboard
    for (let i = 1; i <= rows; i++) {
      for (let a = 1; a <= cols; a++) {
        div = document.createElement("div");
        div.classList.add("field");
        div.setAttribute("data-row", i);
        div.setAttribute("data-col", a);
        gameboard.appendChild(div);
      }
    }
    //  sets gameboard style
    gameboard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    gameboard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    gameboard.style.aspectRatio = `${cols}/${rows}`;

    const fields = document.querySelectorAll(".field");
    //  adds eventlistener for each field
    fields.forEach((field) => {
      field.addEventListener("click", (e) => {
        if (e.target.classList.contains("red") || e.target.classList.contains("yellow")) {
          return;
        }

        //   const clickedColumn = document.querySelectorAll(`[data-col='${e.target.dataset.col}']`);
        //   clickedColumn.forEach((item) => {
        //     if (!item.classList.contains("red") || item.classList.contains("yellow")) {
        //       console.log(item.dataset.row);
        //     }
        //   });

        if (player) {
          e.target.classList.add("red");
        } else {
          e.target.classList.add("yellow");
        }

        player = !player;
      });
    });
  }

  drawBoard(7, 6);
});
