<template>
  <div class="us-wrapper">
    <div class="pl us-left">
      <div class="us-image">
        <img :src="image">
      </div>
    </div>
    <div class="pl us-right">
      <div class="us-content">
        <div class="us-main">
          <div
            class="us-section"
            v-html="text"
          >
          </div>
          <div class="us-button-box">
            <span class="us-button">查看更多 >> </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-us",
  props: {
    image: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
