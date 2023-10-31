<template>
  <li
    class="mb-3 flex cursor-move flex-col justify-between rounded-lg bg-white p-4 shadow"
    @contextmenu.prevent="$emit('show-context-menu', $event, task)"
    @dblclick="$emit('onEdit', task)"
  >
    <div class="flex w-full items-center">
      <p class="ml-2 font-sans font-semibold tracking-wide text-gray-700">
        {{ task.title }}
      </p>
    </div>
    <span class="ml-2 text-gray-400">{{ task.tags.join(", ") }}</span>
  </li>
</template>

<script>
export default {
  emits: ["show-context-menu", "onEdit"],
  inject: ["scrollList"],
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    if (this.scrollList && this.$el.classList.contains("active")) {
      this.$el.scrollIntoView();
    }
  },
};
</script>
