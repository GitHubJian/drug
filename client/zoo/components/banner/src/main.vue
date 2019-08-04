<template>
  <div class="banner-layout">
    <ul class="banner-list">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="banner-item"
      >
        <img :src="item">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "d-banner",
  props: {
    // list: {
    //   type: Array,
    //   default: []
    // }
  },
  data() {
    return {
      list: ["/static/images/banner01.jpg"]
    };
  }
};
</script>

