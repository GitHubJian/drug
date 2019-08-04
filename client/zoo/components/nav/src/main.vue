<template>
  <div class="nav-wrapper">
    <ul class="nav row">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="nav-item col-8ths"
      >
        <a :href="item.href">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "d-nav",
  props: {
    list: {
      type: Array,
      default: []
    }
  }
};
</script>
