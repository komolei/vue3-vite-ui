
import * as PIXI from "pixi.js";

//   // 创建一个图像精灵
//   const bg_img = PIXI.Sprite.from(
//     "https://ossstatic.ybren.com/Wx/activity/20221212customReport/draw/old_user_bg_init.jpg"
//     // "https://i.ibb.co/R9thtR5/a8cbd86ea7c982e819b41ca7159bb0e.png"
//   );
//   // 把精灵的原点设置为图片的中心点
//   // bg_img.anchor.set(0.5);
//   // 把精灵缩小0.5倍
//   // bg_img.scale.set(2);
//   // 把精灵定位在画布的中心
//   //   bg_img.x = app.screen.width / 2;
//   //   bg_img.y = app.screen.height / 2;
//   bg_img.position.set(0, 0);
//   // 把图像精灵添加到舞台（app）上
//   app.stage.addChild(bg_img);
//   // 为舞台添加一个更新循环的方法
//   app.ticker.add(() => {
//     // 让图像精灵每次更新旋转0.01度
//     // bg_img.rotation += 0.01;
//   });

export const drawText = (app, options, cb = (app, el) => { }) => {
    // 创建一个文本类型
    let text_el = new PIXI.Text(options.text, options.style);
    // 将文本倾斜
    // skewText.skew.set(0.1, -0.1);
    text_el = Object.assign(text_el, options)
    cb(app, text_el)
    app.stage.addChild(text_el);
}

export const drawImg = (app, options, cb = (app, el) => { }) => {
    let img_el = PIXI.Sprite.from(
        options.img
    );
    img_el = Object.assign(img_el, options)
    cb(app, img_el)
    app.stage.addChild(img_el);
}

export const saveImgIntoLocal = (app) => {

}

export const uploadImg = (app) => {

}