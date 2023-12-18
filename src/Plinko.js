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
  engine.timing.timeScale = 0.9;

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
  let score = 10000;
  let scoreArray = [];
  const Points = [];

  function Point(x, y, r, color = 0xd3d3d3) {
    const options = {
      isStatic: true,
    };

    const metter = Bodies.circle(x, y, r, options);
    metter.label = "point";
    Composite.add(engine.world, metter);

    const graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawCircle(x, y, r);
    graphics.zIndex = 2;
    graphics.endFill();
    app.stage.addChild(graphics);
    let Point = [x, y, r];
    Points.push(Point);
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

    let color = 0x05121c;
    switch (parseFloat(text)) {
      case 10:
      case parseFloat(Math.pow(10, 1.4).toFixed(2)):
      case parseFloat(Math.pow(10, 2).toFixed(2)):
        color = 0xfb3434;
        break;
      case 7.2:
      case parseFloat(Math.pow(7.2, 1.4).toFixed(2)):
      case parseFloat(Math.pow(7.2, 2).toFixed(2)):
        color = 0xef6060;
        break;
      case 5.6:
      case parseFloat(Math.pow(5.6, 1.4).toFixed(2)):
      case parseFloat(Math.pow(5.6, 2).toFixed(2)):
        color = 0xea842c;
        break;
      case 3.6:
      case parseFloat(Math.pow(3.6, 1.4).toFixed(2)):
      case parseFloat(Math.pow(3.6, 2).toFixed(2)):
        color = 0xfaa425;
        break;
      case 2.1:
      case parseFloat(Math.pow(2.1, 1.4).toFixed(2)):
      case parseFloat(Math.pow(2.1, 2).toFixed(2)):
        color = 0xd9a425;
        break;
      case 1.2:
      case parseFloat(Math.pow(1.2, 1.4).toFixed(2)):
      case parseFloat(Math.pow(1.2, 2).toFixed(2)):
        color = 0xdad323;
        break;
      case 1:
        color = 0xb2d023;
        break;
      case 0.8:
      case parseFloat(Math.pow(0.8, 1.4).toFixed(2)):
      case parseFloat(Math.pow(0.8, 2).toFixed(2)):
        color = 0x5dc421;
        break;
      case 0.5:
      case parseFloat(Math.pow(0.5, 1.4).toFixed(2)):
      case parseFloat(Math.pow(0.5, 2).toFixed(2)):
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

    pixiText.anchor.set(0.5);
    pixiText.x = x;
    pixiText.y = y;

    app.stage.addChild(rectangle);
    app.stage.addChild(pixiText);
    metter.metter = {
      text: text,
      color: color,
    };
  }

  function collision(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      if (bodyA.label === "point") new Splash(bodyA);
      if (bodyB.label === "point") new Splash(bodyB);
      if (bodyA.label === "particle" && bodyB.label === "point") {
        Road(bodyA, bodyB);
      }
      if (bodyB.label === "particle" && bodyA.label === "point") {
        Road(bodyB, bodyA);
      }
      if (bodyA.label === "basket" && bodyB.label === "particle") {
        RemoveParticle(bodyB);
        new BucketSplash(bodyA);
        updateScore(bodyA);
      }
      if (bodyB.label === "basket" && bodyA.label === "particle") {
        RemoveParticle(bodyA);
        new BucketSplash(bodyB);
        updateScore(bodyB);
      }
    }
  }

  function Road(body, point) {
    Body.setStatic(body, true);
    Body.setPosition(body, {
      x: point.position.x,
      y: point.position.y - point.circleRadius * 2,
    });
    if (!body.road.id.includes(point.id)) {
      const road = body.road.list.shift();
      if (road === 0) {
        setTimeout(() => {
          Body.setVelocity(body, {
            x: -3.2,
            y: -3,
          });
        }, 0);
      } else if (road === 1) {
        setTimeout(() => {
          Body.setVelocity(body, {
            x: 3.2,
            y: -3,
          });
        }, 0);
      } else if (road === 2) {
        setTimeout(() => {
          Body.setVelocity(body, {
            x: -1,
            y: -3,
          });
        }, 0);
      } else if (road === 3) {
        setTimeout(() => {
          Body.setVelocity(body, {
            x: 1,
            y: -3,
          });
        }, 0);
      } else if (road === 4) {
        setTimeout(() => {
          Body.setVelocity(body, {
            x: 1,
            y: -3,
          });
        }, 0);
      } else if (road === 5) {
        setTimeout(() => {
          Body.setVelocity(body, {
            x: -1,
            y: -3,
          });
        }, 0);
      } else {
        setTimeout(() => {
          Body.setVelocity(body, {
            x: 0,
            y: -3,
          });
        }, 0);
      }
      body.road.id.push(point.id);
    } else {
      setTimeout(() => {
        Body.setVelocity(body, {
          x: Math.random() < 0.5 ? -1 : 1,
          y: -3,
        });
      }, 0);
    }
    Body.setStatic(body, false);
  }

  function updateScore(body) {
    const text = body.metter.text;
    score += (text - 1) * 100;
    scoreArray.push(text);

    const startIndex = Math.max(scoreArray.length - 4, 0);
    const lastFourScores = scoreArray.slice(startIndex);

    for (let i = 0; i < lastFourScores.length; i++) {
      Basket(
        canvasWidth - 100,
        50 + (30 * i) / scale,
        50 / scale,
        lastFourScores[i]
      );
    }
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
        graphics.lineStyle(r, body.metter.color, opacity);
      } else {
        graphics.lineStyle(r, body.metter.color, opacity);
      }
      graphics.beginFill(0, 0);

      const rectWidth = 60;
      const rectHeight = 40;
      const rectX = body.position.x - rectWidth / 2;
      const rectY = body.position.y - rectHeight / 2;
      graphics.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 10);

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

  function getIndexFromCoordinate(row, col) {
    return (row * (row - 1)) / 2 + (row - 1) * 2 + col;
  }

  function map(rows) {
    app.stage.position._x = 0;
    let col = 3;
    const increment = 1;
    const radius = PointRadius;
    const gap = PointRadius * 2 * MapGap;
    // let resultRoute = searchRoute(8, 3);

    for (let i = 1; i <= rows.length; i++) {
      const space = (canvasWidth - gap * col) / 2;
      for (let j = 1; j <= col; j++) {
        if (i < rows.length) {
          // const index = getIndexFromCoordinate(i, j);
          // console.log("getIndex", i, j, index);
          // if (resultRoute.indexOf(index) >= 0) {
          // new Point(
          //   space + j * gap - radius * MapGap,
          //   i * gap,
          //   radius,
          //   0xff0000
          // );
          // } else {
          new Point(space + j * gap - radius * MapGap, i * gap, radius);
          // }
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

  function add(rowNum, target) {
    let [routes, dirRoute] = searchRoute(rowNum, target);
    routes.reverse();
    // dirRoute.reverse();
    // console.log(dirRoute);

    // let col = 3;
    // const increment = 1;
    // const radius = PointRadius;
    // const gap = PointRadius * 2 * MapGap;
    // for (let i = 1; i <= rowNum; i++) {
    //   const space = (canvasWidth - gap * col) / 2;
    //   for (let j = 1; j <= col; j++) {
    //     if (i <= rowNum) {
    //       const index = getIndexFromCoordinate(i, j);
    //       // console.log("getIndex", i, j, index);
    //       if (routes.indexOf(index) >= 0) {
    //         new Point(
    //           space + j * gap - radius * MapGap,
    //           i * gap,
    //           radius,
    //           0xff0000
    //         );
    //       } else {
    //         new Point(space + j * gap - radius * MapGap, i * gap, radius);
    //       }
    //     }
    //   }
    //   col += increment;
    // }
    new Particle(canvasWidth / 2, 0, ParticleRadius, dirRoute);
  }

  function clear() {
    Composite.clear(engine.world);
    app.stage.removeChildren();
  }

  let last = 0;
  function searchRoute(rowNum, target) {
    // console.log(1);
    let selfPos = 0;
    const result = [];
    const dirResult = [];
    let gapLeft = target - 1;
    let gapRight = rowNum + 1 - target;
    let currentIndex = getIndexFromCoordinate(rowNum, target);
    for (let i = rowNum; i > 0; i--) {
      let flag = gapLeft > 0 ? (Math.random() > 0.5 ? 0 : 1) : 1;
      if (gapRight === 0) {
        flag = 0;
      }
      if (flag === 0) {
        // last = Math.random() > 0.5 ? 1 : 3;
        last = Math.random() > 0.2 ? 1 : Math.random() > 0.5 ? 3 : 6;
        if (last === 6) {
          selfPos = 3;
        }
        gapLeft--;
      }
      if (flag === 1) {
        // last = Math.random() > 0.5 ? 0 : 2;
        last = Math.random() > 0.2 ? 0 : Math.random() > 0.5 ? 2 : 6;
        if (last === 6) {
          selfPos = 2;
        }
        gapRight--;
      }
      currentIndex += flag;
      result.push(currentIndex);
      if (last === 1 || last === 0) {
        dirResult.push(last);
        dirResult.push(last + 4);
      } else if (last === 6) {
        dirResult.push(last);
        dirResult.push(selfPos);
      } else {
        dirResult.push(last);
      }
      currentIndex -= i + 2;
    }
    // console.log(dirResult);
    return [result, dirResult];

    /*
    if (rowNum > 0) {
      const lastNum = ((rowNum + 2) * (rowNum + 3)) / 2 - 3;
      const ParticleNum = rowNum + 2;
      const firstNum = lastNum - ParticleNum + 1;
      let left = firstNum + target - 2;
      let prevTarget;
      if (left < firstNum) {
        prevTarget = left + 1;
      } else if (left + 1 > lastNum) {
        prevTarget = left;
      } else {
        prevTarget = Math.random() > 0.5 ? left + 1 : left;
      }
      routes.push(prevTarget);
      // routes.push(prevTarget === left ? 1 : 0);
      searchRoute(rowNum - 1, prevTarget - firstNum + 1, routes);
    } else {
      return routes;
    }
    */
  }

  return {
    map,
    add,
    clear,
  };
}
