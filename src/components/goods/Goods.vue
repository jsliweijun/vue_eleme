<template>
 <div class="goods">
     <div class="menu-wrapper"  ref="menuwrapper">
       <ul>
         <!-- 内容数据会多行垂直居住，使用table布局是最好的 -->
         <li v-for="(item,index) in goods" :key="index" class="menu-item" 
         :class="{'current':currentIndex === index}" @click="selectMenu(index,$event)">
           <span class="text">
             <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
           </span> 
         </li>
       </ul>
     </div>
     <!-- 右侧 商品列表 -->
     <div class="foods-wrapper" ref="foodswrapper">
       <ul>
         <li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
           <!-- 每个种类商品 标题 -->
            <h1 class="title">{{item.name}}</h1>
            <ul >
              <!-- 每个商品 -->
              <li v-for="(food,index) in item.foods" class="food-item border-1px" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon" >
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span> 
                   </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <Cartcontrol :food="food"></Cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
         </li>
       </ul>
     </div>
     <Shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></Shopcart>
 </div>
</template>

<script>
import BScroll from "better-scroll";
import Shopcart from "./../shopcart/Shopcart";
import Cartcontrol from "./../cartcontrol/Cartcontrol";
import MyData from "./../../mock/data.js";
 export default {
   data () {
     return {
       goods:[],
       classMap:[],
       listHeight:[],
       scrollY:0
     };
   },
   props:{
     seller:{
       type:Object
     }
   },
   components: {
     Shopcart,
     Cartcontrol
   },
   created(){
     this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
     console.log("goods",MyData);
     this.goods=MyData.goods;
     // 
     this.$nextTick(() => {
        this._initScroll();
        this.calculateHeight();
     });
   },
   computed:{
     currentIndex(){
       for(let i=0;i<this.listHeight.length;i++){
         let height1=this.listHeight[i];
         let height2=this.listHeight[i+1];
         if(!height2 || (this.scrollY>=height1 && this.scrollY < height2)){
           return i;
         }
       }
       return 0;
     }
   },
   methods:{
     _initScroll(){
       //获取dom，使用$refs
       this.menuScroll = new BScroll(this.$refs.menuwrapper,{
         click:true
       });
       //probeType=3 作用能实时提供滚动的位置
       this.foodsScroll = new BScroll(this.$refs.foodswrapper,{probeType:3,click:true});
       this.foodsScroll.on('scroll',(pos) => {
         this.scrollY=Math.abs(Math.round(pos.y));
       });
     },
     calculateHeight(){
       let foodList=this.$refs.foodswrapper.getElementsByClassName("food-list-hook");
       let height = 0;
       this.listHeight.push(height);
       for(let i=0;i<foodList.length;i++){
         let item=foodList[i];
         height += item.clientHeight;
         this.listHeight.push(height);
       }
     },
     selectMenu(index,event){
       if(!event._constructed){
         return;
       }
       //console.log("index",index);
      let foodList=this.$refs.foodswrapper.getElementsByClassName("food-list-hook");
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el,300);

     }
   }

 };
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin";
.goods
  position absolute
  display flex
  top 174px
  bottom 64px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .menu-item
      display table
      height 54px
      width 56px
      line-height 14px
      padding 0 12px
      &.current
        position relative
        z-index 10
        margin-top -1px
        background #ffffff
        font-weight 700
        .text
          border-none()
      .icon
        display inline-block
        vertical-align top
        width 12px
        height 12px
        margin-right 2px
        background-size 12px 12px
        background-repeat no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display table-cell
        width 56px
        vertical-align middle
        //border-1px(rgba(1,17,27,0.1))
        border-bottom 1px solid rgba(7,17,27,0.1)
        font-size 12px
  .foods-wrapper 
    //background white
    flex 1
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147,153,159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7,17,27,0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
         flex 0 0 57px
         margin-right 10px
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        .desc, .extra
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
        .desc
          line-height 14px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight bold
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240,20,20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147,153,159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px








</style>
