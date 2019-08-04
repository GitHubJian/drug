<template>
  <div class="search-bar search-bar-path">
    <div class="pl path-keywords">
      <template v-for="(item, i) in list">
        <span :key="i">
          <span><a>{{ item.text }}</a></span>
          <span v-if="i != list.length - 1"> >> </span>
        </span>
      </template>
    </div>

    <div class="pr search-bar-box">
      <div class="search-input-box">
        <input class="search-input" />
      </div>
      <div class="search-button">
        <span>确定</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-path-bar",
  props: {
    list: {
      type: Array,
      default: []
    }
  }
};
</script>
