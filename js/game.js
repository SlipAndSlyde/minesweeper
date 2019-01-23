class MainController
{
  constructor()
  {
    this.grid = new Grid(canvas.width, canvas.height, 10, 0.25);
  }

  init()
  {

  }

  tick()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grid = this.grid;

    if(cursor.clicked)
    {
      grid.tick();
    }
    grid.draw();
    cursor.tick();

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  runProgram()
  {
    this.init();
    this.tick();
  }
}
