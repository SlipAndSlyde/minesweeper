class Grid
{
  constructor(width, height, noTiles, chanceMines)
  {
    this.noTiles = noTiles;

    this.width = width;
    this.height = height;
    this.alpha = 1;

    this.chanceMines = chanceMines;
    this.mapMines = this.generateNewMines();

    this.tiles = this.refreshTiles();
  }

  get tileWidth()
  {
    return this.width / this.noTiles;
  }

  get tileHeight()
  {
    return this.height / this.noTiles;
  }

  get isSweeped()
  {
    let isSweeped = true;

    this.tiles.forEach((tile) =>
    {

      if(!tile.show && tile.id !== "mine")
      {
        isSweeped = false;
      }
    });
    return isSweeped;
  }

  generateNewMines()
  {
    let data = [];

    for(let i = 0; i < this.noTiles; i++)
    {
      data.push(new Array());

      for(let j = 0; j < this.noTiles; j++)
      {
        let char, num = Math.random();
        if(num < this.chanceMines)
        {
          char = "x";
        } else
        {
          char = 0;
        }

        data[i].push(char);
      }
    }

    let mapMines = this.generateNumbers(data);
    return mapMines;
  }

  generateNumbers(mines)
  {
    let mapMines = mines;

    mapMines.forEach((arr, j) => {
      arr.forEach((tile, i) => {
        let count = 0, occupied = false;

        for(let iOffset = -1; iOffset <= 1; iOffset++)
        {
          for(let jOffset = -1; jOffset <= 1; jOffset++)
          {
            try
            {
              let target = mines[i+iOffset][j+jOffset];
              if(target === "x")
              {
                count++;

                if(iOffset === 0 && jOffset === 0) occupied = true;
              }
            } catch (e) {
              //do nothing
            }
          }
        }

        if(!occupied) mapMines[i][j] = count;
      });
    });

    return mapMines;
  }

  refreshTiles()
  {
    let x, y = 0, tileWidth = this.tileWidth, tileHeight = this.tileHeight;
    let tiles = [];

    this.mapMines.forEach((arr, i) => {
      x = 0;

      arr.forEach((char, j) => {
        if(char === "x")
        {
          tiles.push(new Mine(x, y, tileWidth, tileHeight, this.alpha));
        } else if(char !== 0)
        {
          tiles.push(new Number(x, y, tileWidth, tileHeight, char, this.alpha));
        } else
        {
          tiles.push(new Number(x, y, tileWidth, tileHeight, "", this.alpha));
        }

        x += this.tileWidth;
      });

      y += this.tileHeight;
    });

    return tiles;
  }

  floodFill(i, j, empty, func)
  {
    let tile = this.tiles.find((target) => {
      return target.i === i && target.j === j;
    });
    if(tile.show) return;
    tile.show = true;

    let node = this.mapMines[i][j];
    if(node !== empty) return;

    if(tile.i < this.noTiles - 1) this.floodFill(tile.i + 1, tile.j, empty);
    if(tile.i > 0) this.floodFill(tile.i - 1, tile.j, empty);
    if(tile.j < this.noTiles - 1) this.floodFill(tile.i, tile.j + 1, empty);
    if(tile.j > 0) this.floodFill(tile.i, tile.j - 1, empty);

    return;
  }

  detonateMines()
  {
    this.tiles.forEach((tile) => {
      if(tile.id === "mine")
      {
        tile.show = true;
      }
    });
  }

  drawBackground()
  {
    let x, y = 0;

    for(let i = 0; i < this.noTiles; i++)
    {
      x = 0;

      for(let j = 0; j < this.noTiles; j++)
      {
        ctx.save();

        let id = i % 2 + j;
        if(id % 2)
        {
          ctx.fillStyle = "#f1e5da";
        } else
        {
          ctx.fillStyle = "#ebd8c7";
        }

        ctx.fillRect(x, y, this.tileWidth, this.tileHeight);
        x += this.tileWidth;

        ctx.restore();
      }

      y += this.tileHeight;
    }
  }

  tick()
  {

    let status = "playing";

    this.tiles.forEach((tile) => {
      if(tile.isClicked && !tile.show)
      {
        if(tile.value === "") this.floodFill(tile.i, tile.j, 0);

        if(tile.id === "mine")
        {
          this.detonateMines();
          status = "lose";
        }
        tile.show = true;
      }
    });

    if(this.isSweeped) status = "win";

    return status
  }

  draw()
  {
    this.drawBackground();

    this.tiles.forEach((tile) => {
      if(tile.show)
      {
        tile.draw();
      }
    });
  }

}
