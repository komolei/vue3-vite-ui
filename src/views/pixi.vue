<template>
  <div :class="createCssName('canvas')" ref="pixiBoxRef">
    <div id="pixi" ref="pixiRef">cc</div>
  </div>
</template>
<script lang="ts">
import { createCssName } from "../utils/createCssName";
import { onMounted, ref } from "vue";
import * as PIXI from "pixi.js";
import { drawImg, drawText } from "../utils/pixiShortMethod";
export default {
  name: "ybr-button-demo",
  props: {
    theme: {
      type: [String],
      default: "",
    },
  },
  setup(props, context) {
    let app: any = {};
    let pixiBoxRef: any = ref(null);
    let pixiRef: any = ref(null);
    let imgsArr = [];
    onMounted(() => {
      app = new PIXI.Application({
        width: pixiBoxRef.value.clientWidth,
        height: pixiBoxRef.value.clientHeight,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio,
      });
      pixiRef.value.append(app.view);

      drawImg(
        app,
        {
          img: "https://ossstatic.ybren.com/Wx/activity/20221212customReport/draw/old_user_bg_init.jpg",
          x: 0,
          y: 0,
        },
        (app, img) => {
          app.ticker.add(() => {
            // 让图像精灵每次更新旋转0.01度
            // img.rotation += 0.01;
          });
        }
      );

      drawImg(
        app,
        {
          img: "https://ossstatic.ybren.com/App/Public/image/app4_12/portrait_login.png",
          x: 293,
          y: 56,
          // interactive: true,
          // buttonMode: true,
        },
        (app, el) => {
          app.ticker.add((delta) => {
            el.rotation += 0.1 * delta;
          });
          el.on("pointerdown", (event) => {
            console.log("event", event);
          });
          el.on("pointermove", (event) => {
            console.log("event", event);
            el.x = Math.min(Math.max(event.x, 120), 200);
            el.y = Math.min(Math.max(event.x, 120), 400);
          });
        }
      );

      drawText(
        app,
        {
          text: "Hello, 老铁刘",
          style: {
            fontFamily: "Arial",
            dropShadow: true,
            dropShadowAlpha: 0.8,
            dropShadowAngle: 2.1,
            dropShadowBlur: 4,
            dropShadowColor: "0x111111",
            dropShadowDistance: 10,
            fill: ["#ffffff"],
            stroke: "#004620",
            fontSize: 60,
            fontWeight: "lighter",
            lineJoin: "round",
            strokeThickness: 12,
          },
        },
        (app, el) => {
          el.skew.set(0.1, -0.1);
        }
      );
      drawImg(app, {
        img: "https://ossstatic.ybren.com/Wx/activity/20221212customReport/draw/word_bg.png",
        x: 137,
        y: 210,
        width: 455,
        height: 39.5 * 1.4,
      });
      // let circle_el = new PIXI.Circle(40, 40, 50);
      // app.stage.addChild(circle_el);
      const gr = new PIXI.Graphics();
      gr.beginFill(0xffffff);
      gr.drawCircle(130, 130, 40);
      gr.endFill();
      app.stage.addChild(gr);
      drawText(
        app,
        {
          text: "老铁刘",
          x: 257,
          y: 230,
          style: {
            fill: ["#ffffff"],
            stroke: "#004620",
            fontSize: 12,
            strokeThickness: 12,
          },
          //   position: {
          //     x: 237,
          //     y: 210,
          //   },
        },
        (app, el) => {
          el.skew.set(0.1, -0.1);
          //   el.position.set(137, 210);
        }
      );

      //   const base64Data = canvas.toDataURL("image/jpeg", 1);
      let url = app.renderer.extract.canvas(app.stage).toDataURL("png", 100);
      let b64 = url.replace(/^data:image\/[a-z]+;base64,/, "");
      const newImg = document.createElement("img");
      newImg.src = url;
      document.body.append(newImg);


      
    });
    return {
      createCssName,
      pixiRef,
      pixiBoxRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.ybr-canvas {
  background: gray;
  width: 750px;
  height: 1334px;
}
</style>
