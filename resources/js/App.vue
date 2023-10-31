<template>
  <div class="flex h-screen min-h-screen w-screen flex-col bg-gray-200">
    <NavMenu></NavMenu>
    <main class="flex flex-1 overflow-x-auto overflow-y-auto bg-blue-300 p-5">
      <TaskList></TaskList>
    </main>
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
