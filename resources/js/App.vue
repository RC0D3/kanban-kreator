<template>
  <div class="min-h-screen w-screen bg-gray-200  flex flex-col h-screen">
    <NavMenu></NavMenu>
    <main class="flex-1 bg-blue-300 w-full h-screen overflow-y-auto overflow-x-scroll">
      <div v-for="column in columns" :key="columns.id" class="bg-gray-100 rounded-lg px-3 py-3 column-width mr-4">
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ column.title }}</p>

        <draggable :list="column.tasks" :animation="200" group="all-tasks" item-key="id" tag="ul" class="w-full max-w-md" ghost-class="moving-card" filter=".action-button">
          <template #item="{ element }">

            <TaskCard :task="element" :key="element.id" @on-edit="onEdit" @on-delete="onDelete"></TaskCard>

          </template>
        </draggable>
      </div>
    </main>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import TaskCard from './components/TaskCard.vue';
import NavMenu from "./components/NavMenu.vue";

let id = 1;

export default {
  components: {
    draggable,
    NavMenu,
    TaskCard,
  },
  data() {
    return {
      columns: [
        {
          title: 'Elaboração',
          tasks: [
            {
              id: id++,
              title: 'Pedro da silva',
              date: '1 sep',
              tags: [
                'Urgente',
                'Youtube'
              ]
            },
            {
              id: id++,
              title: 'Carlos Jacinto',
              date: 'today',
              tags: [
                'Youtube'
              ]
            },
            {
              id: id++,
              title: 'Kappa',
              date: 'yestarday',
              tags: [
                'Tiktok'
              ]
            },
          ]
        },
        {
          title: 'Em execução',
          tasks: [
            {
              id: id++,
              title: 'Gilberto Alberto',
              date: '1 aug',
              tags: [
                'Facabook'
              ]
            },
            {
              id: id++,
              title: 'João pedro',
              date: 'today',
              tags: [
                'Youtube'
              ]
            },
            {
              id: id++,
              title: 'Karlos com K',
              date: 'yestarday',
              tags: [
                'Youtube'
              ]
            },
          ]
        },
        {
          title: 'Finalizados',
          tasks: [
          ]
        }
      ],
      users: [
        {
          id: id++,
          name: "Adrian Schubert",
          avatar: "https://robohash.org/Adrian%20Schubert"
        },
        {
          id: id++,
          name: "Violet Gates",
          avatar: "https://robohash.org/Violet"
        },
        {
          id: id++,
          name: "Steve Jobs",
          avatar: "https://robohash.org/Steve%20Jobs"
        },
        {
          id: id++,
          name: "Yassine Smith",
          avatar: "https://robohash.org/Yassine"
        },
        {
          id: id++,
          name: "Senior Saez",
          avatar: "https://robohash.org/Senior"
        }
      ],
      newUsers: [
      ]
    }
  },
  methods: {
    onEdit(task) {
      alert(`Editing ${task.title}`);
    },
    onDelete(task) {
      // this.users = this.users.filter((u) => u.id !== user.id);
      alert(`Deleting ${task.title}`);
    },
    onAdd() {
      // this.users.push({ id: id++, name: "NOVO USER", avatar: "https://robohash.org/Novo" })
    }
  }
}
</script>

<style scoped>
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>