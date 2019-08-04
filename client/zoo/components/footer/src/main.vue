<template>
  <div class="footer-wrapper">
    <div class="map-wrapper">
      <ul class="map-list">
        <template v-for="(item, i) in list">
          <li
            :key="i"
            class="map-item"
            @click="onClickHandler(item.href)"
          >{{ item.name }}</li>
          <li
            :key="i"
            v-if="i != list.length - 1"
            class="map-item-split"
          ></li>
        </template>
      </ul>
    </div>

    <div class="rg-wrapper">
      <ul class="rg-list">
        <li
          v-for="(item, i) in rgList"
          :key="i"
          class="rg-item"
        >
          <a :href="item.href">
            <img :src="item.image">
          </a>
        </li>
      </ul>
    </div>

    <div class="copyright">
      {{ copyright }}
    </div>
  </div>
</template>

<script>
export default {
  name: "d-footer",
  props: {
    list: {
      type: Array,
      default: []
    },
    rgList: {
      type: Array,
      default: []
    },
    copyright: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClickHandler(href) {
      this.$qs.go(href);
    }
  }
};
</script>
