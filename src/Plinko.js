import Matter from "matter-js";
import * as PIXI from "pixi.js";

export function Plinko(element) {
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const Runner = Matter.Runner;
  const Bodies = Matter.Bodies;
  const Body = Matter.Body;
  const Composite = Matter.Composite;
  const Events = Matter.Events;

  const canvasWidth = element.offsetWidth;
  const canvasHeight = element.offsetHeight;

  const engine = Engine.create();

  const sceneObjects = [];
  const splashObjects = [];

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: element,
    width: canvasWidth,
    height: canvasWidth,
    antialias: true,
    resolution: 2,
    autoDensity: true,
  });

  let scale = 1;
  app.stage.scale.set(scale);

  element.appendChild(app.view);

  app.ticker.add(() => {
    sceneObjects.forEach((object) => {
      object.sprite.position = object.body.position;
      object.sprite.rotation = object.body.angle;
    });
  });

  Runner.run(engine);

  Events.on(engine, "collisionStart", collision);

  const ParticleRadius = 10;
  const PointRadius = 10;
  const MapGap = 3;

  function Point(x, y, r) {
    const options = {
      isStatic: true,
    };

    const metter = Bodies.circle(x, y, r, options);
    metter.label = "point";
    Composite.add(engine.world, metter);

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xd3d3d3);
    graphics.drawCircle(x, y, r);
    graphics.zIndex = 2;
    graphics.endFill();
    app.stage.addChild(graphics);
  }

  function Particle(x, y, r, road) {
    const options = {
      restitution: 0,
      friction: 0,
      collisionFilter: {
        group: -1,
      },
    };

    const metter = Bodies.circle(x, y, r, options);
    metter.label = "particle";
    metter.road = {
      list: road,
      id: [],
    };
    Composite.add(engine.world, metter);

    const colors = [
      "0xb2de27",
      "0xcf2f74",
      "0xeff5f7",
      "0x284387",
      "0xfaf4d3",
      "0xf7f9f7",
      "0xfbc093",
      "0xefcfe3",
    ];
    const color = colors[Math.ceil(Math.random() * colors.length - 1)];

    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(0, 0, r);
    graphics.endFill();
    app.stage.addChild(graphics);

    sceneObjects.push({
      body: metter,
      sprite: graphics,
    });
  }

  function RemoveParticle(body) {
    for (let i = 0; i < sceneObjects.length; i++) {
      if (sceneObjects[i].body.id === body.id) {
        Composite.remove(engine.world, sceneObjects[i].body);
        app.stage.removeChild(sceneObjects[i].sprite);
        sceneObjects.splice(i, 1);
      }
    }
  }

  // function Basket(x, y, gap, text) {
  //   const options = {
  //     isStatic: true,
  //   };

  //   const metter = Bodies.rectangle(x, y, gap, gap, options);
  //   metter.label = "basket";
  //   Composite.add(engine.world, metter);

  //   if (text === undefined) {
  //     return;
  //   }
  //   const rectangle = new PIXI.Graphics();
  //   rectangle.beginFill(0x05121c);

  //   const cornerRadius = (gap * 10) / 60;
  //   rectangle.drawRoundedRect(
  //     x + 2 - gap / 2,
  //     y - gap / 4,
  //     gap - 4,
  //     gap / 2,
  //     cornerRadius
  //   );

  //   rectangle.endFill();

  //   const pixiText = new PIXI.Text(text, {
  //     fontSize: (gap * 12) / 60 + "px",
  //     fill: "#ffffff",
  //   });
  //   pixiText.x = x - gap / 2 + pixiText.width / 2;
  //   pixiText.y = y - gap / 4 + gap / 4 - pixiText.height / 2;
  //   app.stage.addChild(rectangle);
  //   app.stage.addChild(pixiText);
  // }

  function Basket(x, y, gap, text) {
    const options = {
      isStatic: true,
    };

    const metter = Bodies.rectangle(x, y, gap, gap, options);
    metter.label = "basket";
    Composite.add(engine.world, metter);

    if (text === undefined) {
      return;
    }

    // console.log(Math.pow(5.6, 2).toFixed(2));
    let color = 0x05121c;
    switch (parseFloat(text)) {
      case 10:
      case 100:
      case 1000:
        color = 0xfb3434;
        break;
      case 7.2:
      case parseFloat(Math.pow(7.2, 2).toFixed(2)):
      case parseFloat(Math.pow(7.2, 3).toFixed(2)):
        color = 0xef6060;
        break;
      case 5.6:
      case parseFloat(Math.pow(5.6, 2).toFixed(2)):
      case parseFloat(Math.pow(5.6, 3).toFixed(2)):
        color = 0xea842c;
        break;
      case 2.1:
      case parseFloat(Math.pow(2.1, 2).toFixed(2)):
      case parseFloat(Math.pow(2.1, 3).toFixed(2)):
        color = 0xd9a425;
        break;
      case 1.2:
      case parseFloat(Math.pow(1.2, 2).toFixed(2)):
      case parseFloat(Math.pow(1.2, 3).toFixed(2)):
        color = 0xdad323;
        break;
      case 1:
        color = 0xb2d023;
        break;
      case 0.7:
      case parseFloat(Math.pow(0.7, 2).toFixed(2)):
      case parseFloat(Math.pow(0.7, 3).toFixed(2)):
        color = 0x8ace22;
        break;
      case 0.5:
      case parseFloat(Math.pow(0.5, 2).toFixed(2)):
      case parseFloat(Math.pow(0.5, 3).toFixed(2)):
        color = 0x5dc421;
        break;
      case 0.3:
      case parseFloat(Math.pow(0.3, 2).toFixed(2)):
      case parseFloat(Math.pow(0.3, 3).toFixed(2)):
        color = 0x38c121;
        break;
      default:
        color = 0x38c121;
    }

    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(color);

    const cornerRadius = (gap * 10) / 60;
    const rectangleWidth = gap - 4;
    const rectangleHeight = gap / 2;

    rectangle.drawRoundedRect(
      x + 2 - gap / 2,
      y - gap / 4,
      rectangleWidth,
      rectangleHeight,
      cornerRadius
    );

    rectangle.endFill();

    const pixiText = new PIXI.Text(text, {
      fontSize: (gap * 12) / 60 + "px",
      fill: "#ffffff",
    });

    pixiText.anchor.set(0.5); // Center the text within the rectangle
    pixiText.x = x;
    pixiText.y = y;

    app.stage.addChild(rectangle);
    app.stage.addChild(pixiText);
  }

  function collision(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      if (bodyA.label === "point") new Splash(bodyA);
      if (bodyB.label === "point") new Splash(bodyB);
      if (bodyA.label === "particle" && bodyB.label === "point")
        Road(bodyA, bodyB);
      if (bodyB.label === "particle" && bodyA.label === "point")
        Road(bodyB, bodyA);
      if (bodyA.label === "basket" && bodyB.label === "particle") {
        RemoveParticle(bodyB);
        new BucketSplash(bodyA);
      }
      if (bodyB.label === "basket" && bodyA.label === "particle") {
        RemoveParticle(bodyA);
        new BucketSplash(bodyB);
      }
    }
  }

  function Road(body, point) {
    Body.setStatic(body, true);
    if (!body.road.id.includes(point.id)) {
      const road = body.road.list.shift();
      Body.setPosition(body, {
        x: point.position.x,
        y: point.position.y - point.circleRadius * 2,
      });
      setTimeout(() => {
        Body.setVelocity(body, {
          x: road === 0 ? -1 : 1,
          y: -3,
        });
      }, 50);
      body.road.id.push(point.id);
    }
    Body.setStatic(body, false);
  }

  function Splash(body) {
    const graphics = new PIXI.Graphics();

    var reqAnim;
    var breathSpeed = 1;
    var rMax = 15;
    var rMin = 0;
    var r = rMin;
    var opacity = 0.7;
    var rDiff = rMax - rMin;
    var opacityIncr = 1 / rDiff / 1.2;

    animate();
    function animate() {
      graphics.clear();
      if (
        localStorage.getItem("style") &&
        localStorage.getItem("style") == "light"
      ) {
        graphics.lineStyle(r, 0xb2de27, opacity);
      } else {
        graphics.lineStyle(r, 0xffffff, opacity);
      }
      graphics.lineStyle(r, 0xb2de27, opacity);
      graphics.beginFill(0, 0);
      graphics.drawCircle(body.position.x, body.position.y, body.circleRadius);
      graphics.endFill();

      app.stage.addChild(graphics);
      if (r === rMax) {
        cancelAnimationFrame(reqAnim);
        reqAnim = undefined;
        return;
      }
      r += breathSpeed;
      opacity -= opacityIncr;
      reqAnim = requestAnimationFrame(animate);
    }

    setTimeout(() => {
      app.stage.removeChild(graphics);
    }, 400);
  }

  function BucketSplash(body) {
    const graphics = new PIXI.Graphics();

    var reqAnim;
    var breathSpeed = 1;
    var rMax = 15;
    var rMin = 0;
    var r = rMin;
    var opacity = 0.7;
    var rDiff = rMax - rMin;
    var opacityIncr = 1 / rDiff / 1.2;

    animate();

    function animate() {
      graphics.clear();
      if (
        localStorage.getItem("style") &&
        localStorage.getItem("style") == "light"
      ) {
        graphics.lineStyle(r, 0xb2de27, opacity);
      } else {
        graphics.lineStyle(r, 0xffffff, opacity);
      }
      graphics.beginFill(0, 0);

      // Draw the rectangle
      const rectWidth = 50;
      const rectHeight = 30;
      const rectX = body.position.x - rectWidth / 2;
      const rectY = body.position.y - rectHeight / 2; // Remove y position adjustment
      graphics.drawRect(rectX, rectY, rectWidth, rectHeight);

      graphics.endFill();

      app.stage.addChild(graphics);
      if (r === rMax) {
        cancelAnimationFrame(reqAnim);
        reqAnim = undefined;
        return;
      }
      r += breathSpeed;
      opacity -= opacityIncr;
      reqAnim = requestAnimationFrame(animate);
    }

    setTimeout(() => {
      app.stage.removeChild(graphics);
    }, 400);
  }

  function map(rows) {
    app.stage.position._x = 0;
    let col = 3;
    const increment = 1;
    const radius = PointRadius;
    const gap = radius * 2 * MapGap;

    for (let i = 1; i <= rows.length; i++) {
      const space = (canvasWidth - gap * col) / 2;
      for (let j = 1; j <= col; j++) {
        if (i < rows.length) {
          new Point(space + j * gap - radius * MapGap, i * gap, radius);
        } else {
          if (j > 1) {
            new Basket(
              space + j * gap - radius * MapGap,
              i * gap,
              gap,
              rows[j - 2]
            );
          }
        }
      }
      col += increment;
    }
    scale = 9 / rows.length;
    app.stage.scale.set(scale);
    app.stage.position._x += ((1 - scale) * canvasWidth) / 2;
  }

  function add(road) {
    new Particle(canvasWidth / 2, 0, ParticleRadius, road);
  }

  function clear() {
    Composite.clear(engine.world);
    app.stage.removeChildren();
  }

  return {
    map,
    add,
    clear,
  };
}
