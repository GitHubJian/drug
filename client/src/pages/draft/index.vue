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
    let id = this.$qs.get("id");

    return {
      id: id,
      menuList: [],
      drugList: [],
      pathList: [
        {
          text: "首页"
        },
        {
          text: "资讯详情"
        }
      ],
      navList: [],
      text: "",
      itemCat: ""
    };
  },
  created() {
    this.getKnowledgeCatList();

    this.getKnowledgeDetail(this.id);
  },
  methods: {
    getKnowledgeCatList() {
      this.$apis.getKnowledgeCatList().then(res => {
        this.menuList = res.filter(v => {
          return [5, 6, 7].includes(+v.key);
        });
      });
    },
    getKnowledgeDetail(id = this.id) {
      this.$apis.getKnowledgeDetail({ id: id }).then(res => {
        this.text = res.content;

        this.itemCat = res.type;
      });
    },
    onMenuClickHandler(id) {
      this.$qs.go(`/pages/us?id=${id}`);
    }
  }
};
</script>