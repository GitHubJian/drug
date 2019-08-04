<template>
  <div class="search-bar">
    <div class="pl search-keywords">
      搜索关键词：
      <i v-for="(item, i) in keywordList" :key="i">{{ item }}</i>
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
  name: "d-search-bar",
  props: {
    keywordList: {
      type: Array,
      default: []
    }
  }
};
</script>
