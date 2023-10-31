<template>
  <div
    class="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
    ref="ctxMenu"
    v-show="showContextMenu"
  >
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
      <li>
        <a
          href="javascript:void(0);"
          @click.prevent="this.$emit('on-delete')"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >Delete</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { useMouse } from "@/mouse.js";

export default {
  props: ["showContextMenu"],
  emit: ["on-delete", "on-edit"],
  setup() {
    const { x, y } = useMouse();

    return { x, y };
  },
  watch: {
    showContextMenu() {
      this.updatePosition();
    },
  },
  methods: {
    updatePosition() {
      this.$refs.ctxMenu.style.left = this.x + "px";
      this.$refs.ctxMenu.style.top = this.y + "px";
    },
  },
};
</script>
