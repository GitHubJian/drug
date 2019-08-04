<template>
  <div class="layout">
    <navbar></navbar>

    <d-banner></d-banner>

    <div class="wrapper">
      <div class="container">
        <d-floor title="全部产品">
          <div class="clearfix">
            <div class="clearfix">
              <div class="pl menu-wrapper">
                <d-menu
                  :list="menuList"
                  :currentIndex="-1"
                  :onClickHandler="onMenuClickHandler"
                ></d-menu>
              </div>
              <div class="pl drug-wrapper">
                <d-search-bar :keywordList="keywordList"></d-search-bar>
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

    <div class="wrapper">
      <div class="container">
        <d-floor title="合作药企">
          <div class="clearfix">
            <d-co-list :list="coList"></d-co-list>
          </div>
        </d-floor>
      </div>
    </div>

    <div class="wrapper">
      <div class="container">
        <d-floor title="我们的优势">
          <div class="clearfix">
            <d-superiority-list :list="superiorityList"></d-superiority-list>
          </div>
        </d-floor>
      </div>
    </div>

    <div class="wrapper">
      <div class="container">
        <d-floor title="走进我们">
          <div class="clearfix">
            <d-us
              :image="usObject.image"
              :text="usObject.text"
            ></d-us>
          </div>
        </d-floor>
      </div>
    </div>

    <div class="wrapper">
      <div class="container mt-2xl">
        <d-floor>
          <div class="clearfix">
            <d-news-list :list="newsList"></d-news-list>
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

import { navList, coList, superiorityList, usObject } from "@contants";

export default {
  data() {
    return {
      navList,
      coList,
      superiorityList,
      usObject,

      cat: 0,

      menuList: [],
      drugList: [],
      keywordList: [],
      newsList: []
    };
  },
  components: {
    navbar: navbar,
    footerbar: footerbar
  },
  mounted() {
    this.getItemsList(this.cat);

    this.getItemCatList();

    this.getKnowledgeList();
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
    getItemCatList(id) {
      this.$apis
        .getItemCatList({
          id: id
        })
        .then(res => {
          this.menuList = res;
        });
    },
    getKnowledgeList() {
      this.$apis
        .getKnowledgeCatList()
        .then(res => {
          let proms = res
            .filter(v => {
              return [5, 6, 7].includes(+v.key);
            })
            .map(v => {
              return this.$apis.getKnowledgeList({
                cat: v.key,
                pageNum: 1,
                pageSize: 5
              });
            });

          return Promise.all(proms);
        })
        .then(data => {
          this.newsList = [
            {
              title: "行业新闻",
              newsList: data[0].list
            },
            {
              title: "用药指导",
              newsList: data[1].list
            },
            {
              title: "健康咨询",
              newsList: data[2].list
            }
          ];
        });
    },
    onMenuClickHandler(cat) {
      this.$qs.go(`/pages/list?cat=${cat}`);
    },
    onPageClickHandler(pageNum) {
      this.getItemsList(this.cat, pageNum);
    }
  }
};
</script>