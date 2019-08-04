<template>
  <div class="page page-right">
    <div class="page-content">
      <ul class="page-list">
        <li
          class="page-item prev"
          @click="onPrevHandler"
        >
          <a>上一页</a>
        </li>
        <li
          v-for="(i, k) in Number(pager)"
          :key="k"
          class="page-item pager"
          :class="i == pageNum ? 'active' : ''"
          @click="onClick(i)"
        >
          <a>{{ i }}</a>
        </li>
        <li
          class="page-item next"
          @click="onNextHandler"
        >
          <a>下一页</a>
        </li>
      </ul>
      <div class="page-all">
        共 {{ total }} 页
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-pages",
  props: {
    total: {
      type: Number,
      default: 0
    },
    pager: {
      type: Number,
      default: 0
    },
    onClickHandler: {
      type: Function,
      default: function() {}
    }
  },
  data() {
    return {
      pageNum: 1
    };
  },
  methods: {
    onClick(pageNum) {
      this.pageNum = pageNum;
      this.onClickHandler(+pageNum);
    },
    onPrevHandler() {
      if (this.pageNum == 1) return;

      this.onClick(this.pageNum - 1);
    },
    onNextHandler() {
      if (this.pageNum == total) return;

      this.onClick(this.pageNum + 1);
    }
  }
};
</script>

