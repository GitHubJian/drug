<template>
  <div class="layout">
    <navbar></navbar>

    <d-banner></d-banner>

    <div class="wrapper mt-2xl">
      <div class="container">
        <d-floor>
          <div class="clearfix">
            <div class="clearfix">
              <div class="pl menu-wrapper">
                <d-menu
                  :list="menuList"
                  :bodyGap="false"
                ></d-menu>
              </div>
              <div class="pl drug-wrapper">
                <d-path-bar></d-path-bar>
                <d-text :text="text"></d-text>
              </div>
            </div>
            <d-pages
              pager="5"
              total="10"
            ></d-pages>
          </div>
        </d-floor>
      </div>
    </div>

    <footerbar></footerbar>
  </div>
</template>

<script>
import navbar from "@components/navbar.vue";
import footerbar from "@components/footerbar.vue";

export default {
  components: {
    navbar: navbar,
    footerbar: footerbar
  },
  data() {
    return {
      menuList: [
        {
          text: "关于我们"
        },
        {
          text: "联系我们"
        }
      ],
      drugList: [],
      pathList: [
        {
          text: "首页"
        },
        {
          text: "关于"
        }
      ],
      navList: [],
      text: ""
    };
  },
  created() {
    this.getAboutUs();
  },
  methods: {
    getAboutUs() {
      this.$apis.getAboutUs({ id: 1 }).then(res => {
        this.text = res.content;
      });
    }
  }
};
</script>