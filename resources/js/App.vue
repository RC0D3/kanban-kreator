<template>
  <div class="flex h-screen min-h-screen w-screen flex-col bg-gray-200">
    <NavMenu></NavMenu>
    <TaskList></TaskList>
  </div>
</template>
<script>
import NavMenu from "@/components/NavMenu.vue";
import TaskList from "@/components/TaskList.vue";

export default {
  components: {
    NavMenu,
    TaskList,
  },
};
</script>
