<template>
    <li class="p-4 mb-3 flex flex-col justify-between bg-white shadow rounded-lg cursor-move" @dblclick="toggleButtons" @contextmenu.prevent="$emit('show-context-menu', $event, task)">
        <div class="flex items-center w-full">
            <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{ task.title }}</p>
            <div class="flex flex-1 justify-end" v-if="showButtons">
                <button aria-label="Edit user" class="action-button focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600" @click="$emit('on-edit', task)">
                    <vue-feather type="edit"></vue-feather>
                </button>
                <button aria-label="Delete user" class="action-button focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600" @click="$emit('on-delete', task)">
                    <vue-feather type="trash-2"></vue-feather>
                </button>
            </div>
        </div>
        <span class="ml-2 text-gray-400">{{ task.tags.join(', ') }}</span>
    </li>
</template>

<script>

export default {
    props: {
        task: {
            type: Object,
            default: () => ({}),
        }
    },
    data() {
        return {
            showButtons: false,
        }
    },
    methods: {
        toggleButtons() {
            this.showButtons = !this.showButtons
        },
    },
};
</script>