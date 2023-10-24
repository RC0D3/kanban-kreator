<template>
  <h1 class="text-2xl text-red-500"> Hello, Vuejs with Laravel and Tailwind css</h1>
  <div class="min-h-screen w-screen bg-gray-200 flex items-center justify-center">
    <div class="w-full max-w-md text-center">
      <p class="mb-2 text-gray-700 font-semibold font-sans tracking-wide">List 1</p>
      <draggable group="all-users" :list="users" item-key="id" tag="ul" class="w-full max-w-md" :animation="200" ghost-class="moving-card" filter=".action-button">
        <template #item="{ element }">
          <UserCard :user="element" :key="element.id" @on-edit="onEdit" @on-delete="onDelete">
          </UserCard>
        </template>

        <template #footer>
          <li class="p-1 mb-3 flex justify-between items-center bg-white shadow rounded-lg">
            <div class="flex items-center w-full justify-center">
              <button aria-label="Delete user" class="flex action-button p-1 focus:outline-none focus:shadow-outline text-gray-400 hover:text-gray-700" @click="onAdd">
                <p class="font-semibold font-sans tracking-wide">Adicionar novo usuário</p>
                <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
              </button>
            </div>
          </li>
        </template>
      </draggable>
    </div>
    <div class="w-full max-w-md ml-12 text-center">
      <p class="mb-2 text-gray-700 font-semibold font-sans tracking-wide">List 2</p>
      <draggable group="all-users" :list="newUsers" item-key="id" tag="ul" class="w-full max-w-md" :animation="200" ghost-class="moving-card" filter=".action-button">
        <template #item="{ element }">
          <UserCard :user="element" :key="element.id" @on-edit="onEdit" @on-delete="onDelete">
          </UserCard>
        </template>

        <template #footer>
          <li class="p-1 mb-3 flex justify-between items-center bg-white shadow rounded-lg">
            <div class="flex items-center w-full justify-center">
              <button aria-label="Delete user" class="flex action-button p-1 focus:outline-none focus:shadow-outline text-gray-400 hover:text-gray-700" @click="onAdd">
                <p class="font-semibold font-sans tracking-wide">Adicionar novo usuário</p>
                <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
              </button>
            </div>
          </li>
        </template>
      </draggable>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import UserCard from './components/UserCard.vue';
let id = 1;

export default {
  components: {
    draggable,
    UserCard,
  },
  data() {
    return {
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
    onEdit(user) {
      alert(`Editing ${user.name}`);
    },
    onDelete(user) {
      this.users = this.users.filter((u) => u.id !== user.id);
    },
    onAdd() {
      this.users.push({ id: id++, name: "NOVO USER", avatar: "https://robohash.org/Novo" })
    }
  }
}
</script>

<style scoped>
.moving-card {
  @apply opacity-50 bg-gray-100 border border-blue-500;
}
</style>