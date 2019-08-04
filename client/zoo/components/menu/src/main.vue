<template>
  <div class="menu">
    <div class="menu-header">
      {{ title }}
    </div>
    <div
      class="menu-body"
      :class="bodyGap ? 'menu-body-gap' : ''"
    >
      <ul class="menu-list">
        <li
          v-for="(item, i) in list"
          :key="i"
          class="menu-item"
          @click="onClick(item.key, i)"
        >
          <a :class="currentIndex == item.key ? 'active' : ''">{{ item.value }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-menu",
  props: {
    bodyGap: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: "全部药品"
    },
    list: {
      type: Array,
      default: []
    },
    onClickHandler: {
      type: Function,
      default: function() {}
    },
    currentIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {};
  },
  methods: {
    onClick(key, i) {
      this.currentIndex = key;

      this.onClickHandler(key);
    }
  }
};
</script>
