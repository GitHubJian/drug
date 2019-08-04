<template>
  <div class="know-wrapper mt-l">
    <ul class="know-list">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="know-item"
        @click="onClick(item.id)"
      >
        <div class="know-image">
          <img :src="item.img_url" />
        </div>
        <div class="know-main">
          <h3 class="know-title">
            <span class="highlight">
              [{{ item.typeName }}]
            </span>
            {{ item.title }}
          </h3>
          <!-- <p class="know-time">{{ item.publishTime }}</p> -->
          <p class="know-section">{{ item.desc }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "d-knowledge-list",
  props: {
    list: {
      type: Array,
      default: []
    },
    onClickHandler: {
      type: Function,
      default: function() {}
    }
  },
  methods: {
    onClick(id) {
      this.onClickHandler(id);
    }
  }
};
</script>

