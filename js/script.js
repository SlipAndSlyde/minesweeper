const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cursor = {
  x: 0,
  y: 0,
  clicked: false,

  eventHandler: function()
  {
    canvas.onmousemove = (e) => {
      let pos = canvas.getBoundingClientRect();
      this.x = e.clientX - pos.left;
      this.y = e.clientY - pos.top;
    }

    canvas.onmouseup = (e) => {
      this.clicked = true;
    }
  },

  tick: function()
  {
    this.clicked = false;
  }
}

window.onload = () => {
  console.log("Hello world!");
  console.log("Make number positioning responsive");
  console.log("Flood fill");
  console.log("Allow player to right click to flag / delete flag");

  cursor.eventHandler();
  const game = new MainController();
  game.runProgram();
}
