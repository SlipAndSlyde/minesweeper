class Tile
{
  constructor(x, y, width, height, alpha)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.img = img.null;
    this.alpha = alpha;
    this.show = true;
  }

  get center()
  {
    return [this.x + this.width/2, this.y + this.height/2];
  }

  get isHover()
  {
    let x = this.center[0], y = this.center[1];

    return (Math.abs(cursor.x - x) < this.width/2 && Math.abs(cursor.y - y) < this.height/2);
  }

  get isClicked()
  {
    return this.isHover && cursor.clicked;
  }

  draw()
  {
    ctx.save();

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.restore();
  }
}

class Number extends Tile
{
  constructor(x, y, width, height, value, alpha)
  {
    super(x, y, width, height, alpha);
    this.value = value;
    this.show = false;
  }

  draw()
  {
    ctx.save();

    ctx.globalAlpha = this.alpha;
    ctx.font = "24px Arial Black";
    ctx.fillStyle = "#261a0d";
    ctx.fillText(this.value, this.x + this.width/3, this.y + this.height/1.5);

    ctx.restore();
  }
}

class Mine extends Tile
{
  constructor(x, y, width, height, alpha)
  {
    super(x, y, width, height, alpha);
    this.img = img.mine;
    this.show = false;
  }
}

class Flag extends Tile
{
  constructor(x, y, width, height, alpha)
  {
    super(x, y, width, height, alpha);
    this.img = img.flag;
  }
}
