<template>
  <div class="superiority-wrapper">
    <ul class="superiority-list row">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="superiority-item col-5ths"
      >
        <div class="superiority-item-wrapper">
          <div class="superiority-title">
            <div class="superiority-title-image">
              <img :src="item.image">
            </div>
            <div class="superiority-title-num">
              {{ String.fromCharCode(Number(i) + 65) }}
            </div>
            <div class="superiority-title-name">{{ item.title }}</div>
          </div>
          <div class="superiority-desc">{{ item.desc }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "d-superiority-list",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>

