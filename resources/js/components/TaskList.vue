<template>
    <div v-for="(column, index) in columns" :key="columns.id" class="column-width relative mr-4 flex flex-col overflow-hidden rounded-lg bg-gray-100 px-3 pb-1 pt-2">
        <div class="showEdit flex w-full justify-center pb-2">
            <p class="text-md font-sans font-semibold tracking-wide text-gray-700" @dblclick="editTitle($event)" @focusout="closeEdit($event, index)">
                {{ column.title }}
            </p>
        </div>
        <div class="edit absolute right-0 px-3">
            <button aria-label="Delete list" class="action-button focus:shadow-outline text-red-500 hover:text-red-600 focus:outline-none" @click="deleteList(index)">
                <vue-feather type="trash-2"></vue-feather>
            </button>
        </div>

        <hr class="h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <Draggable :list="column.tasks" :animation="200" group="all-tasks" item-key="id" tag="ul" class="no-scrollbar h-full max-w-md overflow-y-auto" ghost-class="moving-card" filter=".action-button">
            <template #item="{ element, index }">
                <TaskCard :task="element" :key="element.id" @on-edit="onEdit" @on-delete="onDelete" @show-context-menu="showContextMenu" :class="{ active: index == column.tasks.length - 1 }"></TaskCard>
            </template>
        </Draggable>
        <div class="my-2 flex items-center justify-between rounded-lg bg-white p-1 shadow">
            <div class="flex w-full items-center justify-center">
                <button aria-label="Add Card" class="action-button focus:shadow-outline flex p-1 text-gray-400 hover:text-gray-700 focus:outline-none" @click="onAdd(index)">
                    <p class="font-sans font-semibold tracking-wide">New Card</p>
                    <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
                </button>
            </div>
        </div>
    </div>
    <div class="column-width mr-4 h-fit overflow-hidden rounded-lg bg-gray-100 px-3 pb-1 pt-2">
        <div class="flex items-center justify-between p-1">
            <div class="flex w-full items-center justify-center">
                <button aria-label="Add Card" class="action-button focus:shadow-outline flex text-gray-400 hover:text-gray-700 focus:outline-none" @click="onAddList">
                    <p class="font-sans font-semibold tracking-wide">New List</p>
                    <vue-feather type="plus" class="relative top-1 ml-1"></vue-feather>
                </button>
            </div>
        </div>
    </div>
    <TaskListContextMenu :show-context-menu="contextMenu" :task="contextTask" v-click-away="closeContextMenu" @on-delete="onDelete" @on-edit="onEdit"></TaskListContextMenu>
</template>

<script>
import Draggable from "vuedraggable";
import TaskCard from "@/components/TaskCard.vue";
import TaskListContextMenu from "./TaskListContextMenu.vue";
import { nextTick, computed } from "vue";

let id = 1;

export default {
    data() {
        return {
            columns: [
                {
                    title: "Elaboração",
                    tasks: [
                        {
                            id: id++,
                            title: "Pedro da silva",
                            date: "1 sep",
                            tags: ["Urgente", "Youtube"],
                        },
                        {
                            id: id++,
                            title: "Carlos Jacinto",
                            date: "today",
                            tags: ["Youtube"],
                        },
                        {
                            id: id++,
                            title: "Kappa",
                            date: "yestarday",
                            tags: ["Tiktok"],
                        },
                    ],
                },
                {
                    title: "Em execução",
                    tasks: [
                        {
                            id: id++,
                            title: "Gilberto Alberto",
                            date: "1 aug",
                            tags: ["Facabook"],
                        },
                        {
                            id: id++,
                            title: "João pedro",
                            date: "today",
                            tags: ["Youtube"],
                        },
                        {
                            id: id++,
                            title: "Karlos com K",
                            date: "yestarday",
                            tags: ["Youtube"],
                        },
                        {
                            id: id++,
                            title: "Karlos com K",
                            date: "yestarday",
                            tags: ["Youtube"],
                        },
                        {
                            id: id++,
                            title: "Karlos com K",
                            date: "yestarday",
                            tags: ["Youtube"],
                        },
                    ],
                },
                {
                    title: "Finalizados",
                    tasks: [],
                },
            ],
            contextMenu: false,
            contextTask: {},
            scrollList: false,
        };
    },
    provide() {
        return {
            scrollList: computed(() => this.scrollList),
        };
    },
    components: {
        Draggable,
        TaskCard,
        TaskListContextMenu,
    },
    methods: {
        onEdit(task) {
            this.closeContextMenu();
            alert(`Editing ${task.title}`);
        },
        onDelete(task) {
            this.closeContextMenu();
            if (!confirm(`Tem certeza que deseja deletar o card "${task.title}"`))
                return;

            this.columns.forEach((column) => {
                if (column.tasks.some((t) => t.id == task.id)) {
                    column.tasks = column.tasks.filter((t) => t.id != task.id);
                }
            });
        },
        async onAdd(index) {
            this.columns[index].tasks.push({
                id: id++,
                title: "EDET IDK HOW",
                date: "today",
                tags: ["TODO"],
            });
            this.scrollList = true;
            await nextTick();
            this.scrollList = false;
        },
        async showContextMenu(event, task) {
            this.contextMenu = false;
            await nextTick();
            this.contextMenu = true;

            this.contextTask = task;
        },
        closeContextMenu() {
            this.contextMenu = false;
        },
        editTitle(event) {
            event.target.setAttribute("contenteditable", true);
        },
        closeEdit(event, colIndex) {
            event.target.setAttribute("contenteditable", false);
            if (event.target.textContent != "")
                this.columns[colIndex].title = event.target.textContent;
            else event.target.textContent = this.columns[colIndex].title;
        },
        deleteList(index) {
            if (confirm(`Are you sure to delete "${this.columns[index].title}"?`)) {
                this.columns.splice(index, 1);
            }
        },
        onAddList() {
            this.columns.push({ title: "Double click to edit", tasks: [] });
        },
    },
};
</script>

<style scoped>
.column-width {
    min-width: 320px;
    width: 320px;
}

.moving-card {
    @apply border border-blue-500 bg-gray-100 opacity-50;
}

.showEdit:hover+.edit,
.edit:hover {
    visibility: visible;
}

.edit {
    visibility: hidden;
}
</style>
