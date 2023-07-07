<template>
  <div class="wrapper">
    <div :class="createCssName('canvas')" ref="pixiBoxRef">
      <div id="pixi" ref="pixiRef"></div>
    </div>

    <div>
      <h3>表情包制作器</h3>
      <div>
        todo
        <p>- 图片的编辑和放大缩小</p>
      </div>
      <span>上传图片</span>
      <input type="file" accept="image/*" @change="(e) => handleUpload(e)" />
      <!-- <input type="text" v-model="inputValue" /> -->
    </div>

    <div>
      <span>输入图片地址：</span>
      <input type="text" @input="(e) => handleInputChange_gif(e)" />
      <!-- <input type="text" v-model="inputValue" /> -->
    </div>

    <div>
      <span>输入文字：</span>
      <input type="text" @input="(e) => handleInputChange(e)" />
      <!-- <input type="text" v-model="inputValue" /> -->
    </div>

    <div>
      <button @click="isGifAndDownLoad">表情包下载</button>
    </div>

    <div v-if="false">
      <p>外部操作</p>
      <div>
        <button id="create-rectangle">Create Rectangle</button>
        <p></p>
        <button id="undo">Undo</button>
        <p></p>
        <button id="redo">Redo</button>
        <p></p>
        <button id="export-json">Export JSON</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { createCssName } from "../utils/createCssName";
import { createApp, onMounted, ref } from "vue";

import { AnimatedGIF } from "@pixi/gif";
import * as PIXI from "pixi.js";
// import "../../node_modules/gif.js/dist/gif";
import * as GIF from "../assets/js/gif";
// import "../assets/js/gif.worker";
import libgif from "@zaqmjuop/libgif";
import GifParse from "gif-parser-web";
function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t));
}
import { App } from "../../src/assets/resource/app.js";
// todo
// 图片加载到sprite中，会出现加载失败的原因
// 导入的图片太小的话，生成gif的过程中，会生成的图片太小，然后打开失败，其实是生成失败的
// 教训： 要是生成的图片不对，重启一下浏览器。估计是pixijs有问题
export default {
  name: "ybr-pixi-demo",
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
    let inputValue = "";
    let textValue = new PIXI.Text("");
    let gifUrl: any = "";
    let gifInfo = {
      duration: 100,
      images: [],
      width: 0,
      height: 0,
    };
    let imgInfo = {
      width: 0,
      height: 0,
    };
    let dragPoint: any = null;
    let newCt: any = new PIXI.Container();
    let newCtStyle: any = {
      x: 0,
      y: 0,
    };
    const handleUpload = async (e) => {
      gifUrl = e.target.files[0];
      console.log("gifurl is", gifUrl);
      app.stage.removeChildren();
      if (gifUrl.type.includes("gif")) {
        const gifParse = new GifParse();
        gifInfo = await gifParse.getInfo(gifUrl);
        console.log("gif info is", gifInfo);
        const reader = new FileReader();
        // 区分静态gif和动态gif ，当图片长度小于等于1的时候，认为是静态图片
        // if (gifInfo.images.length == 0 || gifInfo.duration == 0) {
        if (gifInfo.images.length <= 1) {
          reader.readAsDataURL(gifUrl);
          reader.onload = async (e) => {
            const newImg = new Image();
            newImg.src = e.target.result;
            newImg.onload = () => {
              imgInfo = PIXI.Sprite.from(e.target.result, {
                width: newImg.width,
                height: newImg.height,
              });
              imgInfo.width = imgInfo.width < 350 ? imgInfo.width : 350;
              imgInfo.height = imgInfo.height < 300 ? imgInfo.height : 300;
              app.renderer.resize(imgInfo.width, imgInfo.height);
              app.stage.addChild(imgInfo);
              app.renderer.render(app.stage);
              app.stage.addChild(newCt);
            };
          };
        } else {
          reader.readAsArrayBuffer(gifUrl);
          reader.onload = (e) => {
            imgInfo = AnimatedGIF.fromBuffer(e.target.result);
            app.renderer.resize(imgInfo.width, imgInfo.height);
            app.stage.addChild(imgInfo);
            app.renderer.render(app.stage);
            app.stage.addChild(newCt);
          };
        }
      } else {
        // 考虑到图片加载失败的情况，加上图片的宽高试试看
        let reader = new FileReader();
        reader.readAsDataURL(gifUrl);
        reader.onload = function (e) {
          const newImg = new Image();
          newImg.src = e.target.result;
          newImg.onload = () => {
            imgInfo = PIXI.Sprite.from(e.target.result, {
              width: newImg.width,
              height: newImg.height,
            });
            imgInfo.width = imgInfo.width < 350 ? imgInfo.width : 350;
            imgInfo.height = imgInfo.height < 300 ? imgInfo.height : 300;
            console.log("img info is", imgInfo.width, imgInfo.height);
            app.renderer.resize(imgInfo.width, imgInfo.height);
            console.log("aaaaaaa", app.renderer);
            app.stage.addChild(imgInfo);
            app.renderer.render(app.stage);
            app.stage.addChild(newCt);
          };
        };
      }
    };

    const handleInputChange_gif = async (e) => {
      const inputValue = e.target.value;
      gifUrl = inputValue;
      if (gifUrl.includes(".gif")) {
        gifInfo = await getGIFInfo(gifUrl);
        console.log("https://i.postimg.cc/rs5kGHZc/test.gif", gifInfo);

        if (gifInfo.images.length <= 1) {
          const newImg = new Image();
          newImg.src = gifUrl;
          newImg.onload = () => {
            imgInfo = PIXI.Sprite.from(gifUrl, {
              width: newImg.width,
              height: newImg.height,
            });
            imgInfo.width = imgInfo.width < 350 ? imgInfo.width : 350;
            imgInfo.height = imgInfo.height < 300 ? imgInfo.height : 300;
            app.renderer.resize(imgInfo.width, imgInfo.height);
            app.stage.addChild(imgInfo);
            app.renderer.render(app.stage);
            app.stage.addChild(newCt);
          };
        } else {
          fetch(gifUrl, { mode: "cors" })
            .then((res) => {
              console.log("f33", res);
              return res.arrayBuffer();
            })
            .then((res) => {
              imgInfo = AnimatedGIF.fromBuffer(res);
              console.log("ingInfo", imgInfo);
              return imgInfo;
            })
            .then(async (imgInfo) => {
              await app.renderer.resize(imgInfo.width, imgInfo.height);
              await app.stage.addChild(imgInfo);
              await app.stage.removeChild(newCt);
              await app.renderer.render(app.stage);
              await app.stage.addChild(newCt);
              // await generateGif(gifInfo);
            });
        }
      }
      if (gifUrl.includes(".jpg")) {
        let imgInfo = PIXI.Sprite.from(gifUrl);
        imgInfo.width = imgInfo.width < 350 ? imgInfo.width : 350;
        imgInfo.height = imgInfo.height < 300 ? imgInfo.height : 300;
        delay(500); // 防止加载图片失败
        app.stage.addChild(imgInfo);
        app.renderer.render(app.stage);
      }
    };

    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      textValue = new PIXI.Text(inputValue, { fill: "red" });

      createTxt();
    };

    const getGIFInfo = async (imgUrl) => {
      const gifParse = new GifParse(imgUrl);
      const gifInfo = await gifParse.getInfo();
      console.log("gifInfo is", gifInfo);
      return gifInfo;
    };

    // 静态图片表情包转gif生成
    // 因为是静态图片，所以采用3张合成一个gif

    const download_static_img = async () => {
      await app.stage.removeChild(newCt);
      await app.stage.addChild(newCt);
      //1.创建GIF实例
      let gif = await new GIF.default({
        workers: 4, //启用两个worker
        quality: 100, //图像质量
        debug: true,
        // workerScript: "../assets/js/gif.worker.js", //worker
        // transparent: "#fff", //这个在背景图片是透明时会用到
      });
      gif.setOptions({
        width: imgInfo.width,
        height: imgInfo.height,
      });
      for (const iterator of Array.from(Array(3).keys())) {
        const img = await app.renderer.extract.image(app.stage, "image/png");
        console.log("生成");
        // document.body.appendChild(img);
        await gif.addFrame(img, {
          copy: true, //复制像素数据
          delay: 80, //帧停留时间80ms
          //还有其他选项如width、height，用来设置图片的宽高
        });
      }
      // 3.转换完成后的回调
      gif.on("finished", function (blob) {
        const link = document.createElement("a");
        link.download = `${new Date().getTime()}.gif`;
        link.href = URL.createObjectURL(blob);
        link.click();
      });
      // 4.启动实例（开始生成gif）
      gif.render();
    };

    const generateGif = async (gifInfo) => {
      //1.创建GIF实例
      let gif = new GIF.default({
        workers: 4, //启用两个worker
        quality: 100, //图像质量
        debug: true,
        // workerScript: "../assets/js/gif.worker.js", //worker
        // transparent: "#fff", //这个在背景图片是透明时会用到
      });
      // 有一些gif就只能单张图片的gif，没有时长
      for (const iterator of gifInfo.images) {
        gifInfo.duration < 10
          ? await delay(100)
          : await delay(
              Number((gifInfo.duration / gifInfo.images.length).toFixed(0))
            );
        const img = await app.renderer.extract.image(app.stage, "image/png");
        await gif.addFrame(img, {
          copy: true, //复制像素数据
          delay:
            gifInfo.duration < 10
              ? 100
              : Number((gifInfo.duration / gifInfo.images.length).toFixed(0)), //帧停留时间80ms
          width: gifInfo.width,
          height: gifInfo.height,
          //还有其他选项如width、height，用来设置图片的宽高
        });
      }
      // 3.转换完成后的回调
      gif.on("finished", function (blob) {
        const link = document.createElement("a");
        link.download = `${new Date().getTime()}.gif`;
        link.href = URL.createObjectURL(blob);
        link.click();
      });
      gif.setOptions({
        width: gifInfo.width,
        height: gifInfo.height,
      });
      // 4.启动实例（开始生成gif）
      gif.render();
    };
    // 适合gif表情生成
    // 分解gif ,根据duration来进行划分，然后

    // todo 解决gif在线的地址，不然还需要上传到服务器

    const download = async () => {
      // 本地gif上传
      if (typeof gifUrl == "object") {
        generateGif(gifInfo);
      } else {
        await generateGif(gifInfo);
      }
    };

    // 根据文件的后缀名来判断是否是gif
    const isGifAndDownLoad = async () => {
      if (gifInfo.images.length == 0 || gifInfo.duration == 0) {
        download_static_img();
      } else {
        download();
      }
    };

    // 添加文字编辑框
    const createTxt = () => {
      app.stage.removeChild(newCt);
      app.renderer.render(app.stage);
      newCt = new PIXI.Container();
      newCt.interactive = true;
      newCt.cursor = "pointer";
      newCt.addChild(textValue);
      newCt.x = newCtStyle.x == 0 ? 100 : newCtStyle.x;
      newCt.y = newCtStyle.y == 0 ? 40 : newCtStyle.y;
      app.stage.addChild(newCt);
      dragPoint = newCt;
      newCt.on("pointerdown", onDragStart);
      app.stage.on("pointerup", onDragEnd);
      app.stage.on("pointerupoutside", onDragEnd);
    };

    const onDragStart = (event) => {
      event.stopPropagation();
      app.stage.on("pointermove", onDragMove);
    };

    const onDragMove = (event) => {
      if (dragPoint) {
        dragPoint.parent.toGlobal(event.global, newCt);
      }
    };

    const onDragEnd = (event) => {
      if (dragPoint) {
        app.stage.off("pointermove", onDragMove);
        newCtStyle = newCt.getBounds();
      }
    };
    onMounted(async () => {
      // new App();
      const boxW = pixiBoxRef.value.clientWidth,
        boxH = pixiBoxRef.value.clientHeight;
      app = new PIXI.Application({
        width: 350,
        height: 272,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio,
        background: "white",
      });
      pixiRef.value.append(app.view);
      app.stage.interactive = true;
      // const gifUrl = `https://i.postimg.cc/rsnRB04f/5.gif`;
      const gifUrl = `https://i.postimg.cc/rs5kGHZc/test.gif`;
    });
    return {
      createCssName,
      pixiRef,
      pixiBoxRef,
      handleInputChange,
      download,
      inputValue,
      download_static_img,
      handleInputChange_gif,
      isGifAndDownLoad,
      handleUpload,
    };
  },
};
</script>

<style lang="scss" scoped>
// .wrapper {
//   width: 300px;
//   height: 400px;
// }
.ybr-canvas {
  background: gray;
  width: 350px;
  height: 678px;
}
#pixi {
  margin: 0 auto;
}
</style>
