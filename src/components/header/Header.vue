<template>
  <div class="header">
    <div class="content-wapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 加v-if 判断，由于取数据是异步的，加载页面是seller是空的，里面取supports就会报错 -->
        <div class="support" v-if="seller.supports">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wapper"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";

.header
  color: #fff
  background: #000
  .content-wapper
    padding: 24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
    .content
      display: inline-block
      font-size: 14px
      margin-left: 16px
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          width: 30px
          height: 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold
          vertical-align: top




</style>>
