<template>
  <div class="wrapper mt-2xl">
    <d-footer
      :list="navList"
      :rgList="rgList"
      :copyright="copyright"
    ></d-footer>
  </div>
</template>

<script>
import { navList, rgList, copyright } from "@contants";

export default {
  data() {
    return {
      navList,
      rgList,
      copyright
    };
  }
};
</script>
