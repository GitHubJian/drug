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
                  :currentIndex="itemCat"
                  :onClickHandler="onMenuClickHandler"
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
    let id = this.$qs.get("cat") || 3;

    return {
      id: id,
      menuList: [
        {
          key: "1",
          value: "会员政策"
        },
        {
          key: "2",
          value: "顾客必读"
        }
      ],
      drugList: [],
      pathList: [
        {
          text: "首页"
        },
        {
          text: "政策"
        }
      ],
      navList: [],
      text: "",
      itemCat: ""
    };
  },
  created() {
    this.getKnowledgeDetail(this.id);
  },
  methods: {
    getKnowledgeDetail(id = this.id) {
      this.$apis.getKnowledgeDetail({ id: id }).then(res => {
        this.text = res.content;
        this.itemCat = res.type;
      });
    },
    onMenuClickHandler(id) {
      this.$qs.go(`/pages/vip?cat=${id}`);
    }
  }
};
</script>