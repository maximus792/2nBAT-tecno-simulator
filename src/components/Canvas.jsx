import React, { useRef, useEffect, useState } from "react";

import { structure1 } from "./structures/structure1";
import { structure2 } from "./structures/structure2";
import { structure3 } from "./structures/structure3";

function Canvas(props) {
  const canvasRef = useRef(null);
  var enableF = props.enablef;

  var fvalue = parseInt(props.fvalue);
  var area = parseInt(props.area);
  var structure = parseInt(props.structure);
  var modulo = parseInt(props.modulo) ? parseInt(props.modulo): 5 * 10 ** 8
  var fmax = modulo * (area / 10000);

  const draw = (ctx, canvas) => {
    switch (structure) {
      case 1:
        structure2(ctx, canvas, enableF, {
          xin: canvas.width / 2 - 35,
          yin: canvas.height / 2 - 35,
          area: 5,
          fvalue,
          area,
          fmax,
        });
        break;
      case 2:
        structure1(ctx, canvas, enableF, {
          xin: canvas.width / 2 - 70,
          yin: canvas.height / 2 - 35,
          area: 5,
          fvalue,
          area,
          fmax,
        });
        break;
      case 3:
        structure3(ctx, canvas, enableF, {
          xin: canvas.width / 2 - 35,
          yin: canvas.height / 2 - 35,
          area: 5,
          fvalue,
          area,
          fmax,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.save();

    //draw function
    draw(context, canvas);
  }, [draw, area, fvalue, structure]);

  return <canvas ref={canvasRef} {...props} />;
}

export default Canvas;
