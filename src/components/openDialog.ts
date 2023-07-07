import Dialog from "../components/dialog.vue";

import { createApp, h } from "vue";
const openDialog = (options) => {
  const { title, content } = options;
  const div = document.createElement("div");
  document.body.appendChild(div);
  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          visible: true,
          title,
          "onUpdate:visible": (value) => {
            if (value === false) {
              app.unmount(  );
              div.remove();
            }
          },
        },
        {
          content,
        }
      );
    },
  });
  app.mount(div);
};

export { openDialog };
