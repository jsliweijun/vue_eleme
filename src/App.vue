<template>
  <div id="app">
    <!-- 将数据传递给 header组件 -->
    <Header :seller="seller"></Header>
    <div class="tab">
      <div class="tab-item">
        <router-link  to='/goods'>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/ratings'>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to='/seller'>商家</router-link>
      </div>
    </div>
    <!-- 展示 商品，评价，商家 三大组件信息 -->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
//现在做静态页面，数据都静态化，不调服务取。
import MyData from "./mock/data.js";

import Header from "./components/header/Header";

export default {
  name: "app",
  components: {
    Header
  },
  data(){
    return {
      seller:{}
    }; 
  },
  created(){

    this.seller= MyData.seller;
    // 使用 vue-resource 插件调服务
    //   this.$http.get('/api/seller').then(response => {
    //   this.seller = response.body.data;
    //   // custom console
    //   console.log(this.seller);

    // })
  }
};
</script>

<style lang="stylus">
.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display:block;
      text-decoration: none;
      color :rgb(77,85,93);
    }
    .router-link-active {
      color : rgb(240,20,20);
    }
   
  }
}
</style>