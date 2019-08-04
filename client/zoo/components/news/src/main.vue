<template>
  <div class="news-wrapper row">
    <div
      v-for="(item, i) in list"
      :key="i"
      class="news-content col-4"
    >
      <div class="news-header">
        {{ item.title }}
        <span class="news-header-more">更多 >> </span>
      </div>
      <ul class="news-body">
        <li
          v-for="(news, k) in item.newsList"
          :key="k"
          class="news-item"
          @click="onClickHandler(news.id)"
        >
          <span class="news-item-icon"></span>
          <span class="news-item-title">{{ news.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-news-list",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  methods: {
    onClickHandler(id) {
      this.$qs.go(`/pages/draft?id=${id}`);
    }
  }
};
</script>
