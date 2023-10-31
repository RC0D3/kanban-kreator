<template>
    <div v-for="(column, index) in columns" :key="columns.id" class="bg-gray-100 rounded-lg px-3 pt-2 pb-1 column-width mr-4 overflow-hidden flex flex-col relative">
        <div class="pb-2 flex w-full justify-center showEdit">
            <p class="text-gray-700 font-semibold font-sans tracking-wide text-md" @dblclick="editTitle($event)" @focusout="closeEdit($event, index)">{{ column.title }}</p>
        </div>
        <div class="absolute right-0 px-3 edit">
            <button aria-label="Delete list" class="action-button focus:outline-none focus:shadow-outline text-red-500 hover:text-red-600" @click="deleteList(index)">
                <vue-feather type="trash-2"></vue-feather>
            </button>
        </div>


        <hr class="h-px bg-gray-200 border-0 dark:bg-gray-700">
        <Draggable :list="column.tasks" :animation="200" group="all-tasks" item-key="id" tag="ul" class="max-w-md h-full no-scrollbar overflow-y-auto" ghost-class="moving-card" filter=".action-button">
            <template #item="{ element, index }">
                <TaskCard :task="element" :key="element.id" @on-edit="onEdit" @on-delete="onDelete" @show-context-menu="showContextMenu" :class="{ active: index == column.tasks.length - 1 }"></TaskCard>
            </template>
        </Draggable>
        <div class="p-1 my-2 flex justify-between items-center bg-white shadow rounded-lg">
            <div class="flex items-center w-full justify-center">
                <button aria-label="Add Card" class="flex action-button p-1 focus:outline-none focus:shadow-outline text-gray-400 hover:text-gray-700" @click="onAdd(index)">
                    <p class="font-semibold font-sans tracking-wide">New Card</p>
                    <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
                </button>
            </div>
        </div>
    </div>
    <div class="bg-gray-100 rounded-lg px-3 pt-2 pb-1 column-width mr-4 overflow-hidden h-fit">
        <div class="p-1 flex justify-between items-center">
            <div class="flex items-center w-full justify-center">
                <button aria-label="Add Card" class="flex action-button focus:outline-none focus:shadow-outline text-gray-400 hover:text-gray-700" @click="onAddList">
                    <p class="font-semibold font-sans tracking-wide">New List</p>
                    <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
                </button>
            </div>
        </div>
    </div>
    <TaskListContextMenu :show-context-menu="contextMenu" :task="contextTask" v-click-away="closeContextMenu" @on-delete="onDelete"></TaskListContextMenu>
</template>

<script>

import Draggable from 'vuedraggable'
import TaskCard from '@/components/TaskCard.vue'
import TaskListContextMenu from './TaskListContextMenu.vue'
import { nextTick, computed } from 'vue'

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
                        {
                            id: id++,
                            title: 'Karlos com K',
                            date: 'yestarday',
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
            contextTask: {},
            scrollList: false
        }
    },
    provide() {
        return {
            scrollList: computed(() => this.scrollList)
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
            this.closeContextMenu()
            if (!confirm(`Tem certeza que deseja deletar o card "${task.title}"`))
                return;

            this.columns.forEach((column) => {
                if (column.tasks.some(t => t.id == task.id)) {
                    column.tasks = column.tasks.filter((t) => t.id != task.id)
                }
            })
        },
        async onAdd(index) {
            this.columns[index].tasks.push({
                id: id++,
                title: 'EDET IDK HOW',
                date: 'today',
                tags: [
                    'TODO'
                ]
            })
            this.scrollList = true
            await nextTick()
            this.scrollList = false


        },
        async showContextMenu(event, task) {
            this.contextMenu = false
            await nextTick()
            this.contextMenu = true

            this.contextTask = task;
        },
        closeContextMenu() {
            this.contextMenu = false
        },
        editTitle(event) {
            event.target.setAttribute('contenteditable', true)
        },
        closeEdit(event, colIndex) {
            event.target.setAttribute('contenteditable', false)
            if (event.target.textContent != "")
                this.columns[colIndex].title = event.target.textContent
            else
                event.target.textContent = this.columns[colIndex].title
        },
        deleteList(index) {
            if (confirm(`Are you sure to delete "${this.columns[index].title}"?`)) {
                this.columns.splice(index, 1);
            }
        },
        onAddList() {
            this.columns.push({ title: 'Double click to edit', tasks: [] })
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

.showEdit:hover+.edit,
.edit:hover {
    visibility: visible;
}

.edit {
    visibility: hidden;
}
</style>