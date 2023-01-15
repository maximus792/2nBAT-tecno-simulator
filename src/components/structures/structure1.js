import { line, arrow, point } from "../functions";

export const structure1 = (ctx, canvas, enableF, values) => {
  var xin = values.xin ? values.xin : 5;
  var yin = values.yin ? values.yin : 5;
  var area = values.area ? values.area : 5;
  var fvalue = values.fvalue ? values.fvalue : 5000;
  var gvalue = values.gvalue ? values.gvalue : 9.8;
  var fmax = values.fmax ? values.fmax : 250000;

  if (!enableF) fmax = Infinity;

  console.log(fmax);
  var f = calcForce(fvalue, gvalue, area);
  console.log(colorcalc(f[0], fmax, enableF));

  //lines
  line(ctx, canvas, {
    x: xin,
    y: yin,
    r: -60,
    l: 70,
    w: area,
    c: colorcalc(f[2], fmax, enableF),
  });
  line(ctx, canvas, {
    x: xin + 35,
    y: yin + 35 * Math.sqrt(3),
    r: 60,
    l: 70,
    w: area,
    c: colorcalc(f[3], fmax, enableF),
  });
  line(ctx, canvas, {
    x: xin,
    y: yin,
    r: 0,
    l: 70,
    w: area,
    c: colorcalc(f[0], fmax, enableF),
  });

  line(ctx, canvas, {
    x: xin + 35,
    y: yin + 35 * Math.sqrt(3),
    r: 0,
    l: 70,
    w: area,
    c: colorcalc(f[6], fmax, enableF),
  });
  line(ctx, canvas, {
    x: xin + 70,
    y: yin,
    r: -60,
    l: 70,
    w: area,
    c: colorcalc(f[4], fmax, enableF),
  });

  line(ctx, canvas, {
    x: xin + 70,
    y: yin,
    r: 0,
    l: 70,
    w: area,
    c: colorcalc(f[1], fmax, enableF),
  });
  line(ctx, canvas, {
    x: xin + 140,
    y: yin,
    r: -120,
    l: 70,
    w: area,
    c: colorcalc(f[5], fmax, enableF),
  });

  //points
  point(ctx, canvas, { x: xin, y: yin, r: 6 + area / 10, fixed:true });
  point(ctx, canvas, {
    x: xin + 35,
    y: yin + 35 * Math.sqrt(3),
    r: 6 + area / 10,
  });
  point(ctx, canvas, { x: xin + 70, y: yin, r: 6 + area / 10 });

  point(ctx, canvas, {
    x: xin + 105,
    y: yin + 35 * Math.sqrt(3),
    r: 6 + area / 10,
  });

  point(ctx, canvas, { x: xin + 140, y: yin, r: 6 + area / 10, fixed:true });

  //arrows

  if (enableF) {
    arrow(ctx, canvas, { x: xin + 70, y: yin + 110, r: 90, l: 15, w: 5 });
    arrow(ctx, canvas, {
      x: xin,
      y: yin + 15,
      r: -90,
      l: 15,
      w: 5,
      c: "red",
    });
    arrow(ctx, canvas, {
      x: xin + 140,
      y: yin + 15,
      r: -90,
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
  /* var fv = fvalue / 2;
  var fc = Math.abs((2 * fv) / Math.sqrt(3));
  var fa = Math.abs(fc * (1 / 2));
  var fd = Math.abs(fc * Math.sqrt(3));
  var fg = Math.abs(fc / 2 + (fd * Math.sqrt(3)) / 2);
  var ff = Math.abs(fg / Math.sqrt(3) / 2);
  var fe = ff;
  var fb = fvalue / 2; */


  var fv = fvalue / 2;
  var fc = Math.abs((2*fv) / Math.sqrt(3));
  var fa = Math.abs(fc * (1 / 2));
  var fd = Math.abs(fc * Math.sqrt(3));
  var fg = Math.abs(fc / 2 + (fd * Math.sqrt(3)) / 2);
  var ff = Math.abs(fv*2/Math.sqrt(3));
  var fe = fd;
  var fb = fv / Math.sqrt(3);

  return [fa, fb, fc, fd, fe, ff, fg];
};

const colorcalc = (fvalue, fmax, enableF) => {
  if (!enableF) return "black";
  var red = fvalue / fmax;
  if (red >= 1) return `rgb(220,220,220)`;
  var green = 1 - fvalue / fmax;
  return `rgb(${red * 255},${green * 255},0)`;
};
