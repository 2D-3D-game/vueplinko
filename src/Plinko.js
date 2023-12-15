import Matter from "matter-js";
import * as PIXI from "pixi.js";

export function Plinko(element) {
  /*--------------------------
  Setup
  --------------------------*/

  // Matter Modules
  const Engine = Matter.Engine;
  const Render = Matter.Render;
  const Runner = Matter.Runner;
  const Bodies = Matter.Bodies;
  const Body = Matter.Body;
  const Composite = Matter.Composite;
  const Events = Matter.Events;

  // Scene Container
  const canvasWidth = element.offsetWidth;
  const canvasHeight = element.offsetHeight;

  /*--------------------------
  Engine
  --------------------------*/

  const engine = Engine.create();

  /*--------------------------
  Scene Objects
  --------------------------*/

  const sceneObjects = [];
  const splashObjects = [];

  /*--------------------------
  Pixi
  --------------------------*/

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    resizeTo: element,
    width: canvasWidth,
    height: canvasWidth,
    antialias: true,
    resolution: 2,
    autoDensity: true,
  });

  element.appendChild(app.view);

  /*--------------------------
  Pixi Frame Updates
  --------------------------*/

  app.ticker.add(() => {
    sceneObjects.forEach((object) => {
      object.sprite.position = object.body.position;
      object.sprite.rotation = object.body.angle;
    });
  });

  /*--------------------------
  Run
  --------------------------*/

  Runner.run(engine);

  Events.on(engine, "collisionStart", collision);

  /*--------------------------
  Game
  --------------------------*/

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
    // console.log(body);
    for (let i = 0; i < sceneObjects.length; i++) {
      if (sceneObjects[i].body.id === body.id) {
        console.log(body.id);
        Composite.remove(engine.world, sceneObjects[i].body);
        app.stage.removeChild(sceneObjects[i].sprite);
        sceneObjects.splice(i, 1);
      }
    }
  }

  function Basket(x, y, gap, text) {
    const options = {
      isStatic: true,
    };

    const metter = Bodies.rectangle(x, y, gap, gap, options);
    metter.label = "basket";
    Composite.add(engine.world, metter);

    const pixiText = new PIXI.Text(text, {
      fontSize: "12px",
      fill: "#b2de27",
    });
    pixiText.x = x;
    pixiText.y = y;
    app.stage.addChild(pixiText);
  }

  function collision(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      console.log(bodyA, bodyB);
      if (bodyA.label === "point") new Splash(bodyA);
      if (bodyB.label === "point") new Splash(bodyB);
      if (bodyA.label === "particle" && bodyB.label === "point")
        Road(bodyA, bodyB);
      if (bodyB.label === "particle" && bodyA.label === "point")
        Road(bodyB, bodyA);
      if (bodyA.label === "basket" && bodyB.label === "particle")
        RemoveParticle(bodyB);
      if (bodyB.label === "basket" && bodyA.label === "particle")
        RemoveParticle(bodyA);
    }
  }

  function Road(body, point) {
    Body.setStatic(body, true);
    if (!body.road.id.includes(point.id)) {
      const road = body.road.list.shift();
      console.log(point.position.y);
      Body.setPosition(body, {
        x: point.position.x,
        y: point.position.y - point.circleRadius * 2,
      });
      setTimeout(() => {
        Body.setVelocity(body, {
          x: road === 0 ? -1 : 1,
          y: -3,
        });
      }, 0);
      body.road.id.push(point.id);
    }
    Body.setStatic(body, false);
  }

  function Splash(body) {
    const graphics = new PIXI.Graphics();
    // graphics.beginFill("0xb2de27");
    // graphics.drawCircle(
    //   body.position.x,
    //   body.position.y,
    //   body.circleRadius * 2
    // );

    setTimeout(() => {
      graphics.beginFill("0xffffff");
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 2
      );
      graphics.beginHole();
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 2 - 15
      );
      graphics.endHole();
      graphics.alpha = 0.2;
      graphics.zIndex = 1;
      graphics.endFill();
    }, 50);
    setTimeout(() => {
      graphics.beginFill("0xffffff");
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 2
      );
      graphics.beginHole();
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 2 - 10
      );
      graphics.endHole();
      graphics.alpha = 0.2;
      graphics.zIndex = 1;
      graphics.endFill();
    }, 100);
    setTimeout(() => {
      graphics.beginFill("0xffffff");
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 2
      );
      graphics.beginHole();
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 2 - 5
      );
      graphics.endHole();
      graphics.alpha = 0.2;
      graphics.zIndex = 1;
      graphics.endFill();
    }, 150);

    // graphics.alpha = 0.2;
    // graphics.zIndex = 1;
    // graphics.endFill();
    app.stage.addChild(graphics);

    splashObjects.push(graphics);

    setTimeout(() => {
      app.stage.removeChild(graphics);
    }, 200);
  }

  function map(rows) {
    let col = 3;
    const increment = 1;
    const radius = PointRadius * 9 / rows.length;
    const gap = radius * 2 * MapGap;

    for (let i = 1; i <= rows.length; i++) {
      const space = (canvasWidth - gap * col) / 2;
      // console.log(space);
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
  }

  function add(road) {
    const for_road = road.slice(0, -1);
    const row_num = road.slice(-1)[0];
    new Particle(canvasWidth / 2, 0, ParticleRadius * 9 / row_num, for_road);
  }

  function clear() {
    Composite.clear(engine.world);
    app.stage.removeChildren();
  }

  /*--------------------------
  Return
  --------------------------*/

  return {
    map,
    add,
    clear,
  };
}
