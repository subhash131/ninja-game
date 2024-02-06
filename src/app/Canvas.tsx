"use client";
import React, { useEffect } from "react";
import { Sprite } from "./Sprite";

const Canvas = () => {
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    const canvasContext = canvas?.getContext("2d");

    if (canvasContext && canvas) {
      canvas.width = 1024;
      canvas.height = 576;
      canvasContext.fillRect(0, 0, canvas?.width, canvas?.height);
      const player = new Sprite({ x: 0, y: 0 }, canvasContext);
      player.draw();
    }
  }, []);
  return <canvas></canvas>;
};

export default Canvas;
