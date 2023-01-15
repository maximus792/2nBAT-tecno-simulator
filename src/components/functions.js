export const line = (ctx, canvas, values) => {
    //constructor
    var x = values.x;
    var y = canvas.height - values.y;
    var c = values.c ? values.c : "#000000";
    var w = values.w ? values.w : 5;
    var l = values.l ? values.l : 70;
    var r = values.r ? values.r : 0;
  
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = c;
  
    ctx.translate(x, y);
    ctx.rotate((r * Math.PI) / 180);
  
    ctx.moveTo(0, 0);
    ctx.lineTo(l, 0);
    ctx.lineCap = "round";
    ctx.lineWidth = w;
    ctx.stroke();
    ctx.restore();
  };
  
  export const arrow = (ctx, canvas, values) => {
    //constructor
    var x = values.x;
    var y = canvas.height - values.y;
    var c = values.c ? values.c : "#000000";
    var l = values.l ? values.l : 20;
    var w = values.w ? values.w : 10;
    var r = values.r ? values.r : 0;
  
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((r * Math.PI) / 180);
  
    ctx.beginPath();
    ctx.fillStyle = c;
    ctx.moveTo(l, (+10 * w) / 5);
    ctx.lineTo(((l + 10) * w) / 5, 0);
    ctx.lineTo(l, (-10 * w) / 5);
    ctx.fill();
  
    ctx.beginPath();
    ctx.strokeStyle = c;
    ctx.moveTo(0, 0);
    ctx.lineTo(l, 0);
    ctx.lineCap = "round";
    ctx.lineWidth = w;
    ctx.stroke();
    ctx.restore();
  };
  
  export const point = (ctx, canvas, values) => {
    //constructor
    var x = values.x;
    var y = canvas.height - values.y;
    var r = values.r ? values.r : 7;
    var fixed = values.fixed ? values.fixed : false;
  
  
    ctx.save();
    ctx.beginPath();
    if(fixed)
    ctx.fillStyle = "#000";
    else
    ctx.fillStyle = "#fff";
    
  
    ctx.translate(x, y);
  
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.arc(0, 0, r, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
  };
  