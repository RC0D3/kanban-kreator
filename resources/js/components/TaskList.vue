<template>
    <div v-for="column in columns" :key="columns.id" class="bg-gray-100 rounded-lg px-3 py-3 column-width mr-4 overflow-hidden">
        <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{ column.title }}</p>
        <Draggable :list="column.tasks" :animation="200" group="all-tasks" item-key="id" tag="ul" class="max-w-md h-full no-scrollbar overflow-y-auto" ghost-class="moving-card" filter=".action-button">
            <template #item="{ element }">
                <TaskCard :task="element" :key="element.id" @on-edit="onEdit" @on-delete="onDelete" @show-context-menu="showContextMenu"></TaskCard>
            </template>

            <template #footer>
                <li class="p-1 mb-3 flex justify-between items-center bg-white shadow rounded-lg">
                    <div class="flex items-center w-full justify-center">
                        <button aria-label="Delete user" class="flex action-button p-1 focus:outline-none focus:shadow-outline text-gray-400 hover:text-gray-700" @click="onAdd">
                            <p class="font-semibold font-sans tracking-wide">New Card</p>
                            <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
                        </button>
                    </div>
                </li>
            </template>
        </Draggable>
    </div>
    <TaskListContextMenu :show-context-menu="contextMenu" v-click-away="closeContextMenu"></TaskListContextMenu>

    <!--
            <div class="flex flex-1 justify-end" v-if="showButtons">
                <button aria-label="Edit user" class="action-button focus:outline-none focus:shadow-outline text-teal-500 hover:text-teal-600" @click="$emit('on-edit', task)">
                    <vue-feather type="edit"></vue-feather>
                </button>
                <button aria-label="Delete user" class="action-button focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600" @click="$emit('on-delete', task)">
                    <vue-feather type="trash-2"></vue-feather>
                </button>
            </div>

        -->
</template>

<script>

import Draggable from 'vuedraggable'
import TaskCard from '@/components/TaskCard.vue'
import TaskListContextMenu from './TaskListContextMenu.vue'
import { nextTick } from 'vue'

let id = 1;

export default {
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
            contextMenu: false,
        }
    },
    components: {
        Draggable,
        TaskCard,
        TaskListContextMenu,
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
            alert('adiciona ai po')
        },
        async showContextMenu(event, task) {
            this.contextMenu = false
            await nextTick()
            this.contextMenu = true
        },
        closeContextMenu() {
            this.contextMenu = false
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