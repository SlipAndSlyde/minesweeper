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

let keyList = [];

for(let i = 0; i < 255; i++) {
  keyList.push(false);
}

document.onkeydown = (e) => {
  keyList[event.keyCode] = true;
}

document.onkeyup = (e) => {
  keyList[event.keyCode] = false;
}

window.onload = () => {
  console.log("Hello world!");
  console.log("Make number positioning responsive");
  console.log("Allow player to right click to flag / delete flag");

  cursor.eventHandler();
  const game = new MainController();
  game.runProgram();
}
