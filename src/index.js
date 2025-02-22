import React, { StrictMode } from "react";
import "./styles.css";
import { createRoot } from "react-dom/client";
import startLabel from "./labels/startLabel";

import App from "./App";

import { Container, ImageSprite, RotateTicker, 
canvas, clearAllGameDatas, narration } from "@drincs/pixi-vn"
import { defineAssets } from "./utils/assets-utility";

// Canvas setup with PIXI
const body = document.body;
if (!body) {
  throw new Error("body element not found");
}

canvas
  .initialize(body, 1920, 1080, {
    backgroundColor: "#303030",
  })
  .then(() => {
    // Pixi.JS UI Layer
    // canvas.addLayer(CANVAS_UI_LAYER_NAME, new Container());

    const container = new Container();

    canvas.add("container", container);

    let number = 25;
    for (let i = 0; i < number; i++) {
      const bunny = new ImageSprite(
        {
          x: (i % 5) * 40,
          y: Math.floor(i / 5) * 40,
        },
        "https://pixijs.com/assets/bunny.png"
      );
      bunny.load();
      container.addChild(bunny);
    }

    // Move the container to the center
    container.x = canvas.screen.width / 2;
    container.y = canvas.screen.height / 2;

    // Center the bunny sprites in local container coordinates
    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;

    canvas.addTicker("container", new RotateTicker({ speed: 1 }));

    // React setup with ReactDOM
    const root = document.getElementById("root");
    if (!root) {
        throw new Error("root element not found");
    }

    canvas.initializeHTMLLayout(root);
    if (!canvas.htmlLayout) {
        throw new Error("htmlLayout not found");
    }

    const reactRoot = createRoot(canvas.htmlLayout);
    reactRoot.render(
      <div
        style={{
          color: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        Loading...
      </div>
    );

    defineAssets().then(() => {
      clearAllGameDatas();
      narration.callLabel(startLabel, {}).then(() => {
        reactRoot.render(
            <App />
        );
      });
    });
});

narration.onGameEnd = async () => {
  clearAllGameDatas();
  await narration.jumpLabel(startLabel, {});
};

narration.onStepError = async (_error, { notify, t }) => {
    notify(t("allert_error_occurred"), { variant: "error" });
};