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
        }

        x += this.tileWidth;
      });

      y += this.tileHeight;
    });

    return tiles;
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
    this.tiles.forEach((tile) => {
      if(tile.isClicked)
      {
        tile.show = true;
      }
    });
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
