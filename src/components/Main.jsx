import React, { useState } from "react";
import "../App.css";
import Canvas from "./Canvas";
import useWindowDimensions from "./getWindowDimensions";
import { Button } from "react-bootstrap";

function Main() {
  const [enableF, setenableF] = useState(true);
  const [fvalue, setfvalue] = useState(50);
  const [area, setarea] = useState(5);
  const [modulo, setmodulo] = useState(5 * 10 ** 8);
  const [animInstance, setanimInstance] = useState(false);
  const [structure, setstructure] = useState(1);
  const { height, width } = useWindowDimensions();

  var i = 0;

  function animation() {
    setTimeout(function () {
      setfvalue(i.toFixed(0));
      i += area / 5;
      if (i <= area * 200) {
        animation();
      } else {
        setanimInstance(false);
      }
    }, area / 10);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Structure Simulator
          </a>
          {/* <select
            className="form-select"
            onChange={(v) => {
              setmodulo(v.target.value);
            }}
            aria-label="Default select example"
            style={{ width: "20vw" }}
          >
            <option selected value={5 * 10 ** 8}>
              Steel (5GPa)
            </option>
            <option value={7*10**4}>Wood (10GPa)</option>
            <option value={55*10**6}>Aluminum (55MPa)</option> 
          </select>
 */}
          <select
            className="form-select"
            onChange={(v) => {
              setstructure(v.target.value);
            }}
            aria-label="Default select example"
            style={{ width: "20vw" }}
          >
            <option selected value={1}>
              Structure 1
            </option>
            <option value={2}>Structure 2</option>
            <option value={3}>Structure 3</option>
          </select>
        </div>
      </nav>

      <Canvas
        style={{
          border: "3px solid #e1e1e1",
          borderRadius: "10px",
          margin: "1rem",
        }}
        width={width - 100}
        height={height / 3}
        enablef={enableF}
        fvalue={fvalue * 1000}
        area={area}
        structure={structure}
        modulo={modulo}
      />
      <div className="container">
        <div className="container2">
          <Button
            style={{ margin: ".5rem" }}
            onClick={() => {
              setenableF((curr) => !curr);
            }}
          >
            {enableF ? "Disable " : "Enable "}
            Forces
          </Button>
          <Button
            disabled={animInstance}
            style={{ margin: ".5rem" }}
            onClick={() => {
              animation();
              setanimInstance(true);
            }}
          >
            Start Animation
          </Button>
        </div>

        <div className="container" style={{ marginTop: "1rem", width: "100%" }}>
          <label className="form-label">
            <b>Force value(kN):</b> {fvalue}kN
          </label>
          <input
            type="range"
            className="form-range"
            value={fvalue}
            onChange={(v) => {
              setfvalue(v.target.value);
            }}
            id="customRange1"
            min="1"
            max={200 * area}
          />
          <label className="form-label" style={{ marginTop: "2rem" }}>
            <b>
              Area of the tube(cm<sup>2</sup>):
            </b>{" "}
            {area}cm<sup>2</sup> - d=
            {Math.sqrt((2 * area) / Math.PI).toFixed(2)}cm
          </label>
          <input
            type="range"
            className="form-range"
            value={area}
            onChange={(v) => {
              setarea(v.target.value);
              if (fvalue > v.target.value * 200)
                setfvalue(v.target.value * 200);
            }}
            id="customRange2"
            min="1"
            max="25"
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
