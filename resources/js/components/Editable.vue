<template>
  <component
    :is="tag"
    @dblclick="editTitle($event)"
    @focusout="closeEdit($event)"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: ["tag"],
  emits: ["value-changed"],
  data() {
    return {
      defaultValue: undefined,
    };
  },
  methods: {
    editTitle(event) {
      event.target.setAttribute("contenteditable", true);
      this.defaultValue = this.$el.textContent;
    },
    closeEdit(event) {
      event.target.setAttribute("contenteditable", false);
      if (event.target.textContent == "") {
        event.target.textContent = this.defaultValue;
      } else {
        this.$emit("value-changed", event.target.textContent);
      }
    },
  },
};
</script>
