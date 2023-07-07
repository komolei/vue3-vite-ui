import vueJsx from "@vitejs/plugin-vue-jsx";

export default {
  optimizeDeps: {
    // include: ['esm-dep > cjs-dep', 'pixi.js'],
    include: ["pixi.js"],
  },
  plugins: [
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
      plugins: ["@vue/babel-plugin-jsx"],
    }),
  ],
  compilerOptions: {
    module: "es2022",
    moduleResolution: "Node",
  },
};
