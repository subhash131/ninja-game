"use client";
import React, { useLayoutEffect } from "react";
import { Sprite } from "./Sprite";

const attackDetection = ({
  player,
  enemy,
}: {
  player: Sprite;
  enemy: Sprite;
}) => {
  return (
    player.attackBox.width + player.attackBox.position.x >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height
  );
};

const setCanvasSize = (canvas: HTMLCanvasElement) => {
  canvas.width = 1024;
  canvas.height = 576;
};

const Canvas = () => {
  let player: Sprite, enemy: Sprite;
  useLayoutEffect(() => {
    const canvas = document.querySelector("canvas");
    const canvasC = canvas?.getContext("2d");
    if (canvas) setCanvasSize(canvas);

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "d":
          player.keys.d.pressed = true;
          player.lastKey = "d";
          break;
        case "a":
          player.keys.a.pressed = true;
          player.lastKey = "a";
          break;
        case "w":
          if (player.velocity.y == 0) player.velocity.y = -10;
          break;
        case "ArrowRight":
          enemy.keys.ArrowRight.pressed = true;
          enemy.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          enemy.keys.ArrowLeft.pressed = true;
          enemy.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          if (enemy.velocity.y == 0) enemy.velocity.y = -10;
          break;
        case "ArrowDown":
          enemy.attack();
          break;
        case " ":
          player.attack();
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "d":
          player.keys.d.pressed = false;
          break;
        case "a":
          player.keys.a.pressed = false;
          break;
        case "ArrowRight":
          enemy.keys.ArrowRight.pressed = false;
          break;
        case "ArrowLeft":
          enemy.keys.ArrowLeft.pressed = false;
          break;
      }
    });

    const animate = () => {
      window.requestAnimationFrame(animate);
      if (canvasC) {
        canvasC.fillStyle = "black";
        canvasC?.fillRect(0, 0, canvas?.width!, canvas?.height!);
      }
      if (attackDetection({ enemy, player }) && player.isAttacking) {
        console.log("player attack");
      }
      if (attackDetection({ enemy, player }) && enemy.isAttacking) {
        console.log("enemy attack");
      }
      player.update();
      enemy.update();
    };

    if (canvas) {
      player = new Sprite({
        canvas,
        position: { x: 0, y: 0 },
        velocity: { x: 0, y: 0 },
        offset: { x: 0, y: 0 },
        color: "blue",
      });
      enemy = new Sprite({
        canvas,
        position: { x: 400, y: 100 },
        velocity: { x: 0, y: 1 },
        offset: { x: -50, y: 0 },
        color: "red",
      });
      player.draw();
      enemy.draw();
      animate();
    }
  }, []);
  return <canvas></canvas>;
};

export default Canvas;
