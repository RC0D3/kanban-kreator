<template>
  <Draggable
    :list="list.tasks"
    :animation="200"
    group="all-tasks"
    item-key="id"
    tag="ul"
    class="no-scrollbar h-full max-w-md overflow-y-auto"
    ghost-class="moving-card"
    filter=".action-button"
  >
    <template #item="{ element, index }">
      <TaskCard
        :task="element"
        :key="element.id"
        @show-context-menu="(task) => this.$emit('show-context-menu', task)"
        @on-edit="(task) => this.$emit('onEdit', task)"
        :class="{ active: index == list.tasks.length - 1 }"
      ></TaskCard>
    </template>
  </Draggable>
</template>

<script>
import TaskCard from "./TaskCard.vue";
import Draggable from "vuedraggable";

export default {
  emits: ["show-context-menu", "onEdit"],
  props: ["list"],
  components: {
    TaskCard,
    Draggable,
  },
};
</script>
