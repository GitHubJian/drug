<template>
  <div class="layout">
    <navbar></navbar>

    <d-banner></d-banner>

    <div class="wrapper mt-2xl">
      <div class="container">
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
            <d-path-bar :list="pathList"></d-path-bar>
            <div class="detail-wrapper mt-m">
              <div class="clearfix detail-head">
                <div class="detail-image">
                  <img
                    class="detail-image-img"
                    :src="item.img_url"
                  >
                </div>
                <div class="detail-desc">
                  <div class="detail-title">{{ item.cn_name }}</div>
                  <div class="detail-price-wrapper">
                    <div class="pl detail-price">
                      <div class="detail-price-now">价格：<span>${{ item.price }}</span></div>
                      <div class="detail-price-old">市场价：<span>${{ item.price }}</span></div>
                    </div>
                    <div class="pl detail-deal">
                      <div class="detail-deal-item">满意度：<i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i><i class="star"></i></div>
                      <div class="detail-deal-item">成交：15 次</div>
                      <div class="detail-deal-item">评论：0 次</div>
                      <div class="detail-deal-item mt-s">购买流程：<a>支付宝扫码</a> <a>银行转账</a></div>
                    </div>
                  </div>
                  <div class="detail-cart">
                    <div class="detail-cart-num">
                      <span class="cart-title">数量</span>
                      <span class="cart-num-item cart-num-minus"> - </span>
                      <span class="cart-num-item cart-num"> 10 </span>
                      <span class="cart-num-item cart-num-plus"> + </span>
                    </div>
                    <div class="clearfix detail-cart-button">
                      <span class="pl cart-button cart-car-button">
                        <i></i>加入购物车</span>
                      <span class="pl cart-button cart-buy-button">
                        <i></i>立即购买</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="detail-body">
                <div class="tab-wrapper">
                  <ul class="clearfix tab-list">
                    <li class="tab-item">
                      商品信息
                    </li>
                    <!-- <li class="tab-item">
                      购买记录 <span class="c-2">(1)</span>
                    </li>
                    <li class="tab-item">
                      顾客评价 <span class="c-2">(1)</span>
                    </li> -->
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane">
                      <div
                        class="content-wrapper"
                        v-html="item.detail"
                      >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    let id = this.$qs.get("id") || 1;

    return {
      menuList: [],
      drugList: [],
      pathList: [
        {
          text: "首页"
        },
        {
          text: "药品详情"
        }
      ],
      navList: [],
      id: id,
      item: {
        cn_name: "",
        detail: "",
        en_name: "",
        id: "",
        img_url: ""
      },
      itemCat: ""
    };
  },
  created() {
    this.getItemDetail(this.id);

    this.getItemCatList();
  },
  methods: {
    getItemDetail(id = this.id) {
      this.$apis.getItemDetail({ id: id }).then(res => {
        this.item = res;

        this.itemCat = res.item_cat;
      });
    },
    getItemCatList(id) {
      this.$apis.getItemCatList().then(res => {
        this.menuList = res;
      });
    },
    onMenuClickHandler(cat) {
      this.$qs.go(`/pages/list?cat=${cat}`);
    }
  }
};
</script>