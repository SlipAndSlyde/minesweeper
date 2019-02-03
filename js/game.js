class MainController
{
  constructor()
  {
    this.status = "playing";
    this.grid = new Grid(canvas.width, canvas.height, 10, 20);
    this.message = document.getElementById("message");
  }

  init()
  {
    this.status = "playing";
  }

  tick()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grid = this.grid;

    if(cursor.clicked)
    {
      this.status = grid.tick();
    }
    grid.draw();
    cursor.tick();

    if(this.status === "playing")
    {
      this.message.innerHTML = "Game in progress";

      window.requestAnimationFrame(() => {
        this.tick();
      });
    } else
    {
      if(this.status === "win")
      {
        console.log("Player wins!");
        this.message.innerHTML = "You win!";
      }

      if(this.status === "lose")
      {
        console.log("Player lose!");
        this.message.innerHTML = "You lose!";
      }
    }
  }

  runProgram()
  {
    this.init();
    this.tick();
  }
}
