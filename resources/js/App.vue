<template>
  <div class="min-h-screen w-screen bg-gray-200  flex flex-col h-screen">
    <NavMenu></NavMenu>
    <main class="flex-1 flex bg-blue-300 overflow-y-auto overflow-x-auto p-5">
      <div v-for="column in columns" :key="columns.id" class="bg-gray-100 rounded-lg px-3 py-3 column-width mr-4 overflow-hidden">
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ column.title }}</p>
        <draggable :list="column.tasks" :animation="200" group="all-tasks" item-key="id" tag="ul" class="max-w-md h-full no-scrollbar overflow-y-auto" ghost-class="moving-card" filter=".action-button">
          <template #item="{ element }">
            <TaskCard :task="element" :key="element.id" @on-edit="onEdit" @on-delete="onDelete" @show-context-menu="contextMenu"></TaskCard>
          </template>

          <template #footer>
            <li class="p-1 mb-3 flex justify-between items-center bg-white shadow rounded-lg">
              <div class="flex items-center w-full justify-center">
                <button aria-label="Delete user" class="flex action-button p-1 focus:outline-none focus:shadow-outline text-gray-400 hover:text-gray-700" @click="onAdd">
                  <p class="font-semibold font-sans tracking-wide">Novo cartão</p>
                  <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
                </button>
              </div>
            </li>
          </template>
        </draggable>
      </div>
    </main>
    <div class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700" ref="ctxMenu" v-show="showConextMenu" v-click-away="closeContexMenu">
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Editar</a>
        </li>
        <li>
          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Deletar</a>
        </li>
      </ul>
    </div>
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
      showConextMenu: false,
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
    },
    contextMenu(event, task) {
      this.$refs.ctxMenu.style.left = event.pageX + 'px'
      this.$refs.ctxMenu.style.top = event.pageY + 'px'
      this.showConextMenu = !this.showConextMenu
    },
    closeContexMenu() {
      this.showConextMenu = false
    },
    onAdd() {
      alert('adiciona ai po')
    }
  }
}
</script>

<style scoped>
.column-width {
  min-width: 320px;
  width: 320px;
}

.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>