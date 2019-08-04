<template>
  <div>
    <ul class="drug-list row">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="col-3"
        @click="onClickHandler(item.id)"
      >
        <div class="drug-item">
          <div class="drug-image-wrapper">
            <div class="drug-image">
              <img :src="item.img_url" />
            </div>
            <!-- <div class="drug-image-list">
            <ul>
              <li
                v-for="(imgSrc, k) in item.imgList"
                :key="k"
              ><img :src="imgSrc" /></li>
            </ul>
          </div> -->
          </div>
          <div class="drug-name-wrapper">
            <div class="drug-name">{{ item.cn_name }}</div>
            <div class="drug-price">￥{{ item.price }}</div>
          </div>
        </div>
      </li>
    </ul>

    <div
      v-if="list.length == 0"
      class="empty-list"
    >
      已无相关数据
    </div>
  </div>
</template>

<script>
export default {
  name: "d-drug-list",
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  methods: {
    onClickHandler(id) {
      let { origin } = window.location;

      window.location.href = `${origin}/pages/detail?id=${id}`;
    }
  }
};
</script>
