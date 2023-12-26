import Matter from "matter-js";
import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";
import { GlobalFunc } from "./GlobalFunc";

export function Plinko(element) {
  /********** Begin Settings For Engine, PIXI  **********/
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
  engine.timing.timeScale = 1.5;

  const sceneObjects = [];

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

  /********** End Settings For Engine, PIXI  **********/

  /********** Begin Global Variables  **********/
  const globalFunc = GlobalFunc();
  const ParticleRadius = globalFunc.initialDrawValue.ParticleRadius;
  const GapWidth = globalFunc.initialDrawValue.GapWidth;
  const PointRadius = globalFunc.initialDrawValue.PointRadius;
  const MapGap = globalFunc.initialDrawValue.MapGap;
  const screenResolution = window.innerWidth > 920 ? 1 : 2;
  /********** End Global Variables  **********/

  /********** Begin Local Variables  **********/
  let scoreState = 10000;
  let amountState = 0;
  let levelState = "Low";
  let rowNumState = 8;
  let numState = 0;
  let last = 0;
  let currency = 1300;
  let originalY = 0;
  let stageLength = 0;

  let scoreArray = [];
  let objects = [];
  let tweensArray = [];

  const mask = new PIXI.Graphics();
  /********** End Local Variables  **********/

  /********** Begin Draw functions  **********/
  function Point(x, y) {
    const options = {
      isStatic: true,
    };

    const metter = Bodies.circle(x, y, PointRadius, options);
    metter.label = "point";
    Composite.add(engine.world, metter);

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xd3d3d3);
    graphics.drawCircle(x, y, PointRadius);
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
    let texture = PIXI.Texture.from("/image/ball.png?8");
    const sprite = new PIXI.Sprite(texture);
    sprite.width = ParticleRadius * 2;
    sprite.height = ParticleRadius * 2;
    sprite.pivot.set(ParticleRadius * 2, ParticleRadius * 2);
    app.stage.addChild(sprite);

    sceneObjects.push({
      body: metter,
      sprite: sprite,
    });
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

    let color = globalFunc.selectFromText(
      rowNumState,
      levelState,
      text,
      "color"
    );

    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(color);

    const cornerRadius = (gap * 10) / 120;
    rectangle.drawRoundedRect(
      -gap / 2,
      -gap / 4,
      gap - 4,
      gap / 2,
      cornerRadius
    );
    rectangle.endFill();

    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 14,
      fill: "#000000",
      align: "center",
    });

    const label = new PIXI.Text(text + "x", style);
    label.anchor.set(0.5, 0.5);

    const container = new PIXI.Container();
    container.position.x = x;
    container.position.y = y;
    container.interactive = true;
    container.buttonMode = true;
    container.addChild(rectangle);
    container.addChild(label);

    const object = {
      body: metter,
      sprite: container,
    };

    sceneObjects.push(object);
    app.stage.addChild(container);
    // container.on("mouseover", function (e) {
    //   let sum = 0;
    //   for (let i = 0; i < scoreArray.length; i++) {
    //     if (scoreArray[i] === text) {
    //       sum += (scoreArray[i] - 1) * amountState;
    //     }
    //   }
    //   let percent = globalFunc.selectFromText(
    //     rowNumState,
    //     levelState,
    //     text,
    //     "percent"
    //   );
    //   document.getElementById("profit").textContent =
    //     "$" + Math.round(sum * currency).toFixed(2);
    //   document.getElementById("bitProfit").value = Math.round(
    //     (text - 1) * amountState
    //   ).toFixed(2);
    //   document.getElementById("chance").value = percent * 100;
    //   document.getElementById("overlay").style.display = "flex";
    // });

    // container.on("mouseout", function (e) {
    //   document.getElementById("overlay").style.display = "none";
    // });

    container.on("mousedown", function (e) {
      let target = GetIndexFromText(text, x);
      add(parseInt(target));
    });

    metter.metter = {
      text: text,
      color: color,
      x: x,
      y: y,
      gap: gap,
    };
  }

  function ScoreBoard(x, y, gap, text) {
    const options = {
      isStatic: true,
    };

    const metter = Bodies.rectangle(x, y, gap, gap, options);
    metter.label = "scoreboard";

    if (text === undefined) {
      return;
    }

    let color = globalFunc.selectFromText(
      rowNumState,
      levelState,
      text,
      "color"
    );

    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(color);
    rectangle.drawRect(
      -gap / 2 / scale,
      -gap / 4 / scale,
      (gap - 4) / scale,
      gap / 2 / scale
    );
    rectangle.endFill();

    const style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 14 / scale,
      fill: "#000000",
      align: "center",
    });

    const label = new PIXI.Text(text + "x", style);
    label.anchor.set(0.5, 0.5);

    const container = new PIXI.Container();
    container.position.x = x;
    container.position.y = y;
    container.interactive = true;
    container.buttonMode = true;
    rectangle.blendMode = PIXI.BLEND_MODES.NORMAL;
    label.blendMode = PIXI.BLEND_MODES.NORMAL;
    container.addChild(rectangle);
    container.addChild(label);

    const object = {
      body: metter,
      sprite: container,
    };

    sceneObjects.push(object);
    app.stage.addChild(container);

    metter.metter = {
      text: text,
      color: color,
      x: x,
      y: y,
      gap: gap,
    };

    if (parseFloat(text) > 1) {
      const graphics = new PIXI.Graphics();

      var reqAnim;
      var breathSpeed = 2;
      var rMax = 15;
      var rMin = 0;
      var r = rMin;
      var opacity = 0.7;
      var rDiff = rMax - rMin;
      var opacityIncr = 1 / rDiff / 1.2;

      animate();

      function animate() {
        graphics.clear();
        graphics.lineStyle(r, color, opacity);
        graphics.beginFill(0, 0);

        const rectWidth = gap / scale;
        const rectHeight = gap / 2 / scale;
        const rectX = x - rectWidth / 2;
        const rectY = y + 25 / scale - rectHeight / 2;
        graphics.drawRoundedRect(rectX, rectY, rectWidth, rectHeight, 5);
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
        if (reqAnim) {
          cancelAnimationFrame(reqAnim);
          reqAnim = undefined;
        }
        graphics.destroy();
      }, 400);
    }

    object.sprite.mask = mask;

    return object;
  }
  /********** End Draw functions  **********/

  /********** Begin Animations  **********/
  function Splash(body) {
    const graphics = new PIXI.Graphics();

    var reqAnim;
    var breathSpeed = 2;
    var rMax = 15;
    var rMin = 0;
    var r = rMin;
    var opacity = 0.7;
    var rDiff = rMax - rMin;
    var opacityIncr = 1 / rDiff / 1.2;

    animate();
    function animate() {
      graphics.clear();
      graphics.lineStyle(r, 0xb2de27, opacity);
      graphics.beginFill(0, 0);
      graphics.drawCircle(
        body.position.x,
        body.position.y,
        body.circleRadius * 2
      );
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
      if (reqAnim) {
        cancelAnimationFrame(reqAnim);
        reqAnim = undefined;
      }
      graphics.destroy();
    }, 400);
  }

  function BasketSplash(body) {
    const graphics = new PIXI.Graphics();

    var reqAnim;
    var breathSpeed = 2;
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
      if (reqAnim) {
        cancelAnimationFrame(reqAnim);
        reqAnim = undefined;
      }
      graphics.destroy();
    }, 400);

    const targetY = originalY + 10;
    if (body.position.y !== targetY) {
      const moveDownTween = new TWEEN.Tween(body.position)
        .to({ y: targetY }, 100)
        .easing(TWEEN.Easing.Quadratic.Out);

      const moveBackTween = new TWEEN.Tween(body.position)
        .to({ y: originalY }, 100)
        .easing(TWEEN.Easing.Quadratic.Out);

      moveDownTween.chain(moveBackTween);
      moveDownTween.start();

      app.ticker.add(() => {
        TWEEN.update();
      });
    }
  }
  /********** End Animations  **********/

  /********** Begin Assist Functions  **********/
  function getIndexFromCoordinate(row, col) {
    return (row * (row - 1)) / 2 + (row - 1) * 2 + col;
  }

  function GetSettings(betAmount, betLevel, betRowNum, betNum, score) {
    if (
      betAmount === undefined ||
      betLevel === undefined ||
      betRowNum === undefined ||
      betNum === undefined ||
      score === undefined
    ) {
      return;
    } else {
      amountState = betAmount;
      levelState = betLevel;
      rowNumState = betRowNum;
      numState = betNum;
      scoreState = score;
    }
  }

  function GetIndexFromText(text, x) {
    let basket = globalFunc.baskets[levelState]["_" + rowNumState];
    let id = 0;

    for (let i = 0; i < basket.length; i++) {
      if (basket[i] === text) {
        if (x <= canvasWidth / 2) {
          id = basket.length - i;
        } else {
          id = i + 1;
        }
      }
    }
    return id;
  }

  function SearchRoute(target) {
    const pointIds = [];
    const particleDir = [];

    let rows = parseInt(rowNumState);
    let selfPos = 0;
    let gapLeft = target - 1;
    let gapRight = rows + 1 - target;
    let currentIndex = getIndexFromCoordinate(rows, target);

    for (let i = rows; i > 0; i--) {
      let flag = gapLeft > 0 ? (Math.random() > 0.5 ? 0 : 1) : 1;
      if (gapRight === 0) {
        flag = 0;
      }
      if (flag === 0) {
        last = Math.random() < 0.5 ? 1 : 3;
        if (last === 6) {
          selfPos = 3;
        }
        gapLeft--;
      }
      if (flag === 1) {
        last = Math.random() < 0.5 ? 0 : 2;
        if (last === 6) {
          selfPos = 2;
        }
        gapRight--;
      }
      currentIndex += flag;
      pointIds.push(currentIndex);
      if (last === 1 || last === 0) {
        particleDir.push(last, last + 4);
      } else if (last === 6) {
        particleDir.push(last, selfPos);
      } else {
        particleDir.push(last);
      }
      currentIndex -= i + 2;
    }
    return [pointIds, particleDir];
  }

  function UpdateScore(body) {
    let lastPos = canvasHeight / 3 / scale - 25 / scale;
    if (objects.length > 1) {
      lastPos = objects[objects.length - 1].body.position.y - 25 / scale;
    }
    const text = body.metter.text;
    scoreState += (text - 1) * 100;
    scoreArray.push(text);

    console.log(scale);
    const object =
      screenResolution === 1
        ? ScoreBoard(
            canvasWidth - 40 + 20 * (rowNumState - 8),
            lastPos,
            50,
            text
          )
        : ScoreBoard(
            canvasWidth + 120 * 0.5 / scale + 10 * (rowNumState - 8),
            lastPos,
            50,
            text
          );

    stopTween();
    objects.push(object);
    tweenUpdate();
  }

  function stopTween() {
    for (let i = 0; i < tweensArray.length; i++) {
      tweensArray[i].stop();
    }
    tweensArray = [];
    removeScoreboard();
  }

  function tweenUpdate() {
    let distance = -25 / scale;
    if (objects.length > 1) {
      distance =
        objects[objects.length - 1].body.position.y - canvasHeight / 3 / scale;
    }
    for (let i = 0; i < objects.length; i++) {
      const targetY = objects[i].body.position.y - distance;
      const object = objects[i];
      const moveDown = new TWEEN.Tween(object.body.position)
        .to({ y: targetY }, 200)
        .easing(TWEEN.Easing.Quadratic.Out)
        .start();
      tweensArray.push(moveDown);
    }
  }

  function removeScoreboard() {
    for (let i = 0; i < objects.length; i++) {
      if (objects[i].body.position.y > canvasHeight / 3 / scale + 100 / scale) {
        const object = objects.splice(i, 1);
        app.stage.removeChild(object[0].sprite);
        delete object[0];
        i--;
      }
    }
  }
  /********** End Assist Functions  **********/

  /********** Begin Engine, Canvas functionalities  **********/
  function collision(event) {
    const pairs = event.pairs;
    for (let i = 0; i < pairs.length; i++) {
      const bodyA = pairs[i].bodyA;
      const bodyB = pairs[i].bodyB;
      if (bodyA.label === "point") {
        Splash(bodyA);
      }
      if (bodyB.label === "point") {
        Splash(bodyB);
      }
      if (bodyA.label === "particle" && bodyB.label === "point") {
        Road(bodyA, bodyB);
      }
      if (bodyB.label === "particle" && bodyA.label === "point") {
        Road(bodyB, bodyA);
      }
      if (bodyA.label === "basket" && bodyB.label === "particle") {
        RemoveParticle(bodyB);
        BasketSplash(bodyA);
        UpdateScore(bodyA);
      }
      if (bodyB.label === "basket" && bodyA.label === "particle") {
        RemoveParticle(bodyA);
        BasketSplash(bodyB);
        UpdateScore(bodyB);
      }
    }
  }

  function Road(body, point) {
    Body.setStatic(body, true);
    if (!body.road.id.includes(point.id)) {
      const road = body.road.list.shift();
      let velocity = { x: 0, y: 0 };
      if (road === 0) {
        velocity = { x: -3.2, y: -1.6 + Math.random() };
      } else if (road === 1) {
        velocity = { x: 3.2, y: -1.6 + Math.random() };
      } else if (road === 2 || road === 3) {
        Body.setPosition(body, {
          x: point.position.x,
          y: point.position.y - point.circleRadius * 2,
        });
        velocity = { x: road === 2 ? -1 : 1, y: -3.2 };
      } else if (road === 4) {
        velocity = { x: 0.7, y: 0 };
      } else if (road === 5) {
        velocity = { x: -0.7, y: 0 };
      } else {
        Body.setPosition(body, {
          x: point.position.x,
          y: point.position.y - point.circleRadius * 2,
        });
        velocity = { x: 0, y: -3.5 };
      }

      setTimeout(() => {
        Body.setVelocity(body, velocity);
      }, 0);

      body.road.id.push(point.id);
    } else {
      setTimeout(() => {
        Body.setVelocity(body, {
          x: Math.random() < 0.5 ? -1 : 1,
          y: -3.5,
        });
      }, 0);
    }
    Body.setStatic(body, false);
  }

  function map() {
    let rows = globalFunc.baskets[levelState]["_" + rowNumState];
    app.stage.position._x = 0;
    let col = 3;
    const increment = 1;
    const gap = GapWidth * 2 * MapGap;
    originalY = rows.length * gap;

    for (let i = 1; i <= rows.length; i++) {
      const space = (canvasWidth - gap * col) / 2;
      for (let j = 1; j <= col; j++) {
        if (i < rows.length) {
          new Point(space + j * gap - GapWidth * MapGap, i * gap);
        } else {
          if (j > 1) {
            new Basket(
              space + j * gap - GapWidth * MapGap,
              i * gap,
              gap,
              rows[j - 2]
            );
          }
        }
      }
      col += increment;
    }
    scale = 9 / rows.length / screenResolution;
    app.stage.scale.set(scale);
    app.stage.position._x += ((1 - scale) * canvasWidth) / 2;
    stageLength = app.stage.children.length;

    mask.clear();
    mask.beginFill(0xffffff);
    screenResolution === 1
      ? mask.drawRect(
          canvasWidth - 100 + 20 * (rowNumState - 8),
          canvasHeight / 3 / scale - 25 / scale,
          100 / scale,
          110 / scale
        )
      : mask.drawRect(
          canvasWidth + 10 * (rowNumState - 8),
          canvasHeight / 3 / scale - 25 / scale,
          100 / scale,
          110 / scale
        );
    mask.endFill();
    app.stage.addChild(mask);

    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0xffffff);
    rectangle.drawRect(
      -gap / 2 / scale,
      -gap / 4 / scale,
      (gap - 4) / scale,
      gap / 2 / scale
    );
    rectangle.endFill();
    rectangle.mask = mask;
  }

  function add(target) {
    let [routes, dirRoute] = SearchRoute(target);
    new Particle(canvasWidth / 2, 0, ParticleRadius, dirRoute);
  }

  function clear() {
    Composite.clear(engine.world);
    app.stage.removeChildren();
    app.stage.children.forEach(function (child) {
      child.destroy(true);
    });
  }

  function RemoveParticle(body) {
    for (let i = 0; i < sceneObjects.length; i++) {
      if (sceneObjects[i].body.id === body.id) {
        Composite.remove(engine.world, sceneObjects[i].body);
        app.stage.removeChild(sceneObjects[i].sprite);
        delete sceneObjects[i];
        sceneObjects.splice(i, 1);
        break;
      }
    }
  }
  /********** End Engine, Canvas functionalities  **********/

  return {
    map,
    add,
    clear,
    GetSettings,
  };
}
