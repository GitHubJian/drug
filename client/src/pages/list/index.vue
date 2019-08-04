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
                  :currentIndex="cat"
                  :onClickHandler="onMenuClickHandler"
                ></d-menu>
              </div>
              <div class="pl drug-wrapper">
                <d-path-bar :list="pathList"></d-path-bar>
                <div class="gap1">
                  <d-drug-list :list="drugList"></d-drug-list>
                </div>
              </div>
            </div>
            <d-pages
              pager="5"
              total="10"
              :onClickHandler="onPageClickHandler"
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
    let cat = this.$qs.get("cat") || 0;

    return {
      menuList: [],
      drugList: [],
      pathList: [
        {
          text: "首页"
        },
        {
          text: "药品分类"
        }
      ],
      cat
    };
  },
  created() {
    this.getItemsList(this.cat);

    this.getItemCatList();
  },
  methods: {
    getItemsList(cat = 0, pageNum = 1) {
      this.$apis
        .getItemsList({
          cat: cat,
          pageNum: pageNum,
          pageSize: 5
        })
        .then(res => {
          this.drugList = res.list;
        });
    },
    getItemCatList() {
      this.$apis.getItemCatList().then(res => {
        this.menuList = res;
      });
    },
    onMenuClickHandler(id) {
      this.$qs.go(`/pages/list?cat=${id}`);
    },
    onPageClickHandler(pageNum) {
      this.getItemsList(this.cat, pageNum);
    }
  }
};
</script>