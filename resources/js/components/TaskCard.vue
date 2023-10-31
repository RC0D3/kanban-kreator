<template>
    <li class="p-4 mb-3 flex flex-col justify-between bg-white shadow rounded-lg cursor-move" @contextmenu.prevent="$emit('show-context-menu', $event, task)">
        <div class="flex items-center w-full">
            <p class="ml-2 text-gray-700 font-semibold font-sans tracking-wide">{{ task.title }}</p>
        </div>
        <span class="ml-2 text-gray-400">{{ task.tags.join(', ') }}</span>
    </li>
</template>

<script>
import { nextTick } from 'vue';

export default {
    emits: ['show-context-menu'],
    inject: ['scrollList'],
    props: {
        task: {
            type: Object,
            default: () => ({}),
        }
    },
    mounted() {
        if (this.scrollList && this.$el.classList.contains('active')) {
            this.$el.scrollIntoView()
        }
    },
};
</script>