class MainController
{
  constructor()
  {
    this.grid = new Grid(canvas.width, canvas.height, 10, 0.2);
  }

  init()
  {

  }

  tick()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let gameEnd;
    const grid = this.grid;

    if(cursor.clicked)
    {
      gameEnd = grid.tick();
    }
    grid.draw();
    cursor.tick();

    if(!gameEnd)
    {
      window.requestAnimationFrame(() => {
        this.tick();
      });
    } else
    {
      console.log("Game ended!");
    }
  }

  runProgram()
  {
    this.init();
    this.tick();
  }
}
