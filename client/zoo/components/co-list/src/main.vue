<template>
  <div class="partner-wrapper">
    <ul class="partner-list row">
      <li
        v-for="(item, i) in list"
        :key="i"
        class="partner-item col-6"
      >
        <div>
          <div class="partner-title">
            <div class="partner-num-box">
              <div class="partner-box-right"></div>
              <div class="partner-box-wrapper">
                <h3 class="partner-num">0{{ i + 1 }}</h3>
                <p class="partner-ename">{{ item.ename }}</p>
              </div>
            </div>
            <div class="partner-img">
              <img :src="item.img" />
            </div>
          </div>
          <div class="partner-desc">
            <h1>{{ item.name }}</h1>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "d-co-list",
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
