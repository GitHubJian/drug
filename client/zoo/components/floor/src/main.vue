<template>
  <div class="floor-wrapper">
    <div
      v-if="title"
      class="floor-title"
    >
      {{ title }}
    </div>

    <div class="floor-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "d-floor",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
