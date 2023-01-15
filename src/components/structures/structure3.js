import { line, arrow, point } from "../functions";

export const structure3 = (ctx, canvas, enableF, values) => {
  var xin = values.xin ? values.xin : 5;
  var yin = values.yin ? values.yin : 5;
  var area = values.area ? values.area : 5;
  var fvalue = values.fvalue ? values.fvalue : 5000;
  var gvalue = values.gvalue ? values.gvalue : 9.8;
  var fmax = values.fmax ? values.fmax : 250000;

  var l = 70

  if (!enableF) fmax = Infinity;

  console.log(fmax);
  var f = calcForce(fvalue, gvalue, area);
  console.log(colorcalc(f[0], fmax, enableF));

  //lines
  line(ctx, canvas, {
    x: xin,
    y: yin,
    r: -90,
    l: l,
    w: area,
    c: colorcalc(f[1], fmax, enableF),
  });
/*   
line(ctx, canvas, {
    x: xin,
    y: yin,
    r: -30,
    l: l,
    w: area,
    c: colorcalc(f[2], fmax, enableF),
  }); 
  */
  line(ctx, canvas, {
    x: xin,
    y: yin+l,
    r: 30,
    l: 2*l,
    w: area,
    c: colorcalc(f[0], fmax, enableF),
  });
  line(ctx, canvas, {
    x: xin,
    y: yin,
    r: 0,
    l: l*Math.sqrt(3),
    w: area,
    c: colorcalc(f[3], fmax, enableF),
  });

  //points
  point(ctx, canvas, { x: xin, y: yin, r: 6 + area / 10, fixed: true });
  point(ctx, canvas, {
    x: xin,
    y: yin + l,
    r: 6 + area / 10,
    fixed: true,
  });
  point(ctx, canvas, { x: xin + l*Math.sqrt(3), y: yin, r: 6 + area / 10 });
/*   point(ctx, canvas, { x: xin + l*Math.sqrt(3)/2, y: yin+l/2, r: 6 + area / 10 }); */

  //arrows

  if (enableF) {
    arrow(ctx, canvas, { x: xin + l*Math.sqrt(3), y: yin -20, r: 90, l: 20, w: 5 });

    arrow(ctx, canvas, {
      x: xin - 40,
      y: yin + l,
      r: 0,
      l: 15,
      w: 5,
      c: "red",
    });
    arrow(ctx, canvas, {
      x: xin,
      y: yin + l+ 20,
      r: -90,
      l: 15,
      w: 5,
      c: "red",
    });
    arrow(ctx, canvas, {
      x: xin -40,
      y: yin,
      r: 0,
      l: 15,
      w: 5,
      c: "red",
    });
  }
  //text
  ctx.font = "1.5rem Arial";
  ctx.fillText(`F= ${fvalue / 1000} kN`, 10, canvas.height - 10);
};

const calcForce = (fvalue) => {
  var fv = fvalue;
  var fh = Math.sqrt(3)*fvalue
  var Nac = 2*fh/Math.sqrt(3)
  var Nab = fv-Nac/2;
  var Nbc = Nab*2;
  var Nbd = fh + (Nbc*Math.sqrt(3)/2)

  return [Nac,Nab,Nbc,Nbd];
};

const colorcalc = (fvalue, fmax, enableF) => {
  if (!enableF) return "black";
  var red = fvalue / fmax;
  if (red >= 1) return `rgb(220,220,220)`;
  var green = 1 - fvalue / fmax;
  return `rgb(${red * 255},${green * 255},0)`;
};
