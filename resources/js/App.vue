<template>
  <h1 class="text-2xl text-red-500"> Hello, Vuejs with Laravel and Tailwind css</h1>
  <div class="min-h-screen w-screen bg-gray-200 flex items-center justify-center">
    <ul class="w-full max-w-md">
      <li v-for="user in users" :key="user.id" class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move">
        <div class="flex items-center w-full">
          <img class="w-10 h-10 rounded-full" :src="user.avatar" :alt="user.name">
          <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{ user.name }}</p>
          <div class="flex flex-1 justify-end">
            <button aria-label="Edit user" class="p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600" @click="onEdit(user)">
              <vue-feather type="edit"></vue-feather>
            </button>
            <button aria-label="Delete user" class="p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600" @click="onDelete(user)">
              <vue-feather type="star" stroke="red"></vue-feather>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Adrian Schubert",
          avatar: "https://robohash.org/Adrian%20Schubert"
        },
        {
          id: 2,
          name: "Violet Gates",
          avatar: "https://robohash.org/Violet"
        },
        {
          id: 3,
          name: "Steve Jobs",
          avatar: "https://robohash.org/Steve%20Jobs"
        },
        {
          id: 4,
          name: "Yassine Smith",
          avatar: "https://robohash.org/Yassine"
        },
        {
          id: 5,
          name: "Senior Saez",
          avatar: "https://robohash.org/Senior"
        }
      ]
    }
  },
  methods: {
    onEdit(user) {
      alert(`Editing ${user.name}`);
    },
    onDelete(user) {
      alert(`Deleting ${user.name}`);
    }
  }
}
</script>