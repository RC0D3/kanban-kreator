<template>
  <div class="min-h-screen w-screen bg-gray-200  flex flex-col h-screen">
    <NavMenu></NavMenu>
    <main class="flex-1 flex bg-blue-300 overflow-y-auto overflow-x-auto p-5">
      <TaskList></TaskList>
    </main>
  </div>
</template>
<script>
import NavMenu from '@/components/NavMenu.vue'
import TaskList from '@/components/TaskList.vue'


export default {
  components: {
    NavMenu,
    TaskList
  },
}
</script>