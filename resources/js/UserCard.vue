<template>
    <li class="p-4 mb-3 flex justify-between items-center bg-white shadow rounded-lg cursor-move">
        <div class="flex items-center w-full">
            <img class="w-10 h-10 rounded-full" :src="user.avatar" :alt="user.name">
            <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{ user.name }}</p>
            <div class="flex flex-1 justify-end">
                <button aria-label="Edit user" class="action-button p-1 focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600" @click="$emit('on-edit', user)">
                    <vue-feather type="edit"></vue-feather>
                </button>
                <button aria-label="Delete user" class="action-button p-1 focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600" @click="$emit('on-delete', user)">
                    <vue-feather type="trash-2"></vue-feather>
                </button>
            </div>
        </div>
    </li>
</template>

<script>

export default {
    props: {
        user: {
            type: Object,
            default: () => ({}),
        }
    }
};
</script>