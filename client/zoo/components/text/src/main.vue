<template>
  <div class="text-wrapper mt-l">
    <div v-html="text"></div>
  </div>
</template>

<script>
export default {
  name: "d-text",
  props: {
    text: {
      type: String
    }
  }
};
</script>
