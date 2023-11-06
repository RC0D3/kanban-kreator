<template>
  <Draggable
    :list="columns"
    :animation="200"
    group="all-lits"
    item-key="id"
    tag="main"
    class="flex flex-1 overflow-x-auto overflow-y-auto bg-blue-300 p-5"
    ghost-class="moving-card"
    filter=".action-button"
  >
    <template #item="{ element, index }">
      <div
        class="column-width relative mr-4 flex flex-col overflow-hidden rounded-lg bg-gray-100 px-3 pb-1 pt-2"
      >
        <div class="showEdit flex w-full justify-center pb-2">
          <Editable
            tag="p"
            class="text-md font-sans font-semibold tracking-wide text-gray-700"
            @value-changed="(value) => (this.columns[index].title = value)"
          >
            {{ element.title }}
          </Editable>
        </div>
        <div class="edit absolute right-0 px-3">
          <button
            aria-label="Delete list"
            class="action-button focus:shadow-outline text-red-500 hover:text-red-600 focus:outline-none"
            @click="deleteList(index)"
          >
            <vue-feather type="trash-2"></vue-feather>
          </button>
        </div>

        <hr class="h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <TaskListCard
          :list="element"
          @show-context-menu="showContextMenu"
          @on-edit="onEdit"
        ></TaskListCard>
        <div
          class="my-2 flex items-center justify-between rounded-lg bg-white p-1 shadow"
        >
          <div class="flex w-full items-center justify-center">
            <button
              aria-label="Add Card"
              class="action-button focus:shadow-outline flex p-1 text-gray-400 hover:text-gray-700 focus:outline-none"
              @click="onAdd(index)"
            >
              <p class="font-sans font-semibold tracking-wide">New Card</p>
              <vue-feather
                type="plus"
                class="relative top-1 ml-1"
              ></vue-feather>
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div
        class="column-width mr-4 h-fit overflow-hidden rounded-lg bg-gray-100 px-3 pb-1 pt-2"
      >
        <div class="flex items-center justify-between p-1">
          <div class="flex w-full items-center justify-center">
            <button
              aria-label="Add Card"
              class="action-button focus:shadow-outline flex text-gray-400 hover:text-gray-700 focus:outline-none"
              @click="onAddList"
            >
              <p class="font-sans font-semibold tracking-wide">New List</p>
              <vue-feather
                type="plus"
                class="relative top-1 ml-1"
              ></vue-feather>
            </button>
          </div>
        </div>
      </div>
    </template>
  </Draggable>

  <TaskListContextMenu
    :show-context-menu="contextMenu"
    v-click-away="closeContextMenu"
    @on-delete="onDelete"
  ></TaskListContextMenu>

  <!-- Main modal -->
  <div
    v-show="showEditModal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden bg-gray-700/50 p-4 md:inset-0"
  >
    <div
      class="relative mx-auto max-h-full w-full max-w-md"
      v-click-away="closeModal"
    >
      <!-- Modal content -->
      <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
        <button
          type="button"
          @click="closeModal"
          class="absolute right-2.5 top-3 ml-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="authentication-modal"
        >
          <svg
            class="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="px-6 py-6 lg:px-8">
          <Editable
            tag="h3"
            class="mb-4 text-xl font-medium text-gray-900 dark:text-white"
            ref="titletask"
          >
          </Editable>
          <form class="space-y-6" action="#">
            <div>
              <textarea
                rows="4"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Write your comments here..."
                ref="bodytask"
              ></textarea>
            </div>
            <div>
              <label
                for="first_name"
                class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >Tags</label
              >
              <input
                type="text"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="WIP, Urgent"
                :value="contextTask.tags"
                ref="tagtask"
              />
            </div>
            <button
              type="button"
              @click="closeModalAndSave"
              class="mr-2 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
            <button
              type="button"
              @click="closeModal"
              class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Draggable from "vuedraggable";
import TaskListCard from "./TaskListCard.vue";
import TaskListContextMenu from "./TaskListContextMenu.vue";
import Editable from "./Editable.vue";
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
              body: "",
              tags: ["Urgente", "Youtube"],
              date: "",
            },
            {
              id: id++,
              title: "Carlos Jacinto",
              body: "",
              tags: ["Youtube"],
              date: "",
            },
            {
              id: id++,
              title: "Kappa",
              body: "",
              tags: ["Tiktok"],
              date: "",
            },
          ],
        },
        {
          title: "Em execução",
          tasks: [
            {
              id: id++,
              title: "Gilberto Alberto",
              body: "",
              tags: ["Facabook"],
              date: "",
            },
            {
              id: id++,
              title: "João pedro",
              body: "",
              tags: ["Youtube"],
              date: "today",
            },
            {
              id: id++,
              title: "Karlos com K",
              body: "",
              tags: ["Youtube"],
              date: "",
            },
            {
              id: id++,
              title: "Karlos com K",
              body: "",
              tags: ["Youtube"],
              date: "",
            },
            {
              id: id++,
              title: "Karlos com K",
              body: "",
              tags: ["Youtube"],
              date: "",
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
      showEditModal: false,
    };
  },
  provide() {
    return {
      scrollList: computed(() => this.scrollList),
    };
  },
  components: {
    Draggable,
    TaskListCard,
    TaskListContextMenu,
    Editable,
  },
  methods: {
    onEdit(task) {
      this.showEditModal = true;
      this.closeContextMenu();
      this.contextTask = task;
      this.$refs.bodytask.value = this.contextTask.body;
      this.$refs.tagtask.value = this.contextTask.tags;
      this.$refs.titletask.$el.textContent = this.contextTask.title;
    },
    closeModal() {
      this.showEditModal = false;
    },
    closeModalAndSave() {
      this.contextTask.body = this.$refs.bodytask.value;
      this.contextTask.tags = this.$refs.tagtask.value
        .split(",")
        .map((i) => i.trim());
      this.contextTask.title = this.$refs.titletask.$el.textContent;
      this.closeModal();
    },
    onDelete() {
      this.closeContextMenu();
      if (
        !confirm(
          `Tem certeza que deseja deletar o card "${this.contextTask.title}"`,
        )
      )
        return;

      this.columns.forEach((column) => {
        if (column.tasks.some((t) => t.id == this.contextTask.id)) {
          column.tasks = column.tasks.filter(
            (t) => t.id != this.contextTask.id,
          );
        }
      });
    },
    async onAdd(index) {
      this.columns[index].tasks.push({
        id: id++,
        title: "Edit",
        body: "",
        date: "today",
        tags: [],
      });
      this.scrollList = true;
      await nextTick();
      this.scrollList = false;

      setTimeout(() => {
        this.showEditModal = true;
      }, 0); // PERIPÉCIAS DO JAVASCRIPTO
      this.onEdit(this.columns[index].tasks.at(-1));
    },
    async showContextMenu(task) {
      this.contextMenu = false;
      await nextTick();
      this.contextMenu = true;
      this.contextTask = task;
    },
    closeContextMenu() {
      this.contextMenu = false;
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

.showEdit:hover + .edit,
.edit:hover {
  visibility: visible;
}

.edit {
  visibility: hidden;
}
</style>
