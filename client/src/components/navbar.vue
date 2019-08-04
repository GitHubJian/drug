<template>
  <div class="wrapper bg-1">
    <div class="container">
      <d-nav :list="navList"></d-nav>
    </div>
  </div>
</template>

<script>
import { navList } from "@contants";

export default {
  data() {
    return {
      navList
    };
  }
};
</script>

