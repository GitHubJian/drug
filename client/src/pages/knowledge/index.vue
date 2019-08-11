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
                <d-path-bar></d-path-bar>
                <d-knowledge-list :list="knowledgeList" :onClickHandler="onKnowledgeClickHandler"></d-knowledge-list>
              </div>
            </div>
            <d-pages pager="5" total="10" :onClickHandler="onPageClickHandler"></d-pages>
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
    let cat = this.$qs.get("cat") || 5;

    return {
      menuList: [],
      drugList: [],
      pathList: [
        {
          text: "首页"
        },
        {
          text: "资讯分类"
        }
      ],
      navList: [],
      knowledgeList: [],
      cat: cat
    };
  },
  created() {
    this.getKnowledgeCatList();

    this.getKnowledgeList(this.cat);
  },
  methods: {
    getKnowledgeCatList() {
      this.$apis.getKnowledgeCatList().then(res => {
        this.menuList = res.filter(v => {
          return [5, 6, 7].includes(+v.key);
        });
      });
    },
    getKnowledgeList(cat = this.cat, pageNum = 1) {
      this.$apis
        .getKnowledgeList({
          cat: cat,
          pageNum: pageNum,
          pageSize: 5
        })
        .then(res => {
          this.knowledgeList = res.list.map(v => {
            if (v.type == 1) {
              v.typeName = "行业新闻";
            }
            if (v.type == 2) {
              v.typeName = "用药指导";
            }

            if (v.type == 3) {
              v.typeName = "健康咨询";
            }

            return v;
          });
        });
    },
    onMenuClickHandler(cat) {
      this.$qs.go(`/pages/knowledge?cat=${cat}`);
    },
    onKnowledgeClickHandler(id) {
      this.$qs.go(`/pages/draft?id=${id}`);
    },
    onPageClickHandler(pageNum) {
      this.getKnowledgeList(this.cat, pageNum);
    }
  }
};
</script>