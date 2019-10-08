<template>
 <div v-show="showFlag" class="food" ref="food" >
     <div class="food-content">
         <div class="image-header">
             <img :src="food.image" alt="图片">
             <div class="back" @click="hide">
                 <i class="icon-arrow_lift"></i>
             </div>
        </div>
        <div class="content">
            <div class="title">{{food.name}}</div>
            <div class="detail">
                <span class="sell-count">月售{{food.sellCount}}份</span>
                <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food"></Cartcontrol>
            </div>
            <div @click.stop.prevent="addFirst($event)" class="buy" 
            v-show="!food.count || food.count===0">加入购物车</div>
        </div>
        <Split  v-show="food.info"></Split>
        <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="rating">
            <h1 class="title">商品评价</h1>
            <div class="ratingselect-wrapper">
                <Ratingselect :ratings="food.ratings" :desc="desc" :selectType="selectType"  :onlyContent="onlyContent"></Ratingselect>
            </div>
        </div>
     </div>
 </div>
</template>

<script>
import Vue from "vue";
import BScroll from "better-scroll";
import Cartcontrol from "./../cartcontrol/Cartcontrol";
import Ratingselect from "./../ratingselect/Ratingselect";
import Split from "./../split/Split";
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

 export default {
   data () {
     return {
         showFlag:false,
         selectType:ALL,
         onlyContent: true,
         desc:{
             all:"全部",
             positive:"推荐",
             negative:"吐槽"
         }
     }
   },
   components: {
       Cartcontrol,
       Split,
       Ratingselect
   },
   props:{
       food:{
           type:Object
       }
   },
   methods:{
       show(){
           this.showFlag=true;
           this.selectType=ALL;
           this.onlyContent=true;
           //什么时候初始化BScroll
           this.$nextTick(()=>{
               if(!this.bscroll){
                   this.bscroll=new BScroll(this.$refs.food,{click:true});
               }else{
                   this.bscroll.refresh();
               }
           });
       },
       hide(){
           this.showFlag=false;
       },
       addFirst(event){
           if(!event._constructed){
               return;
           } 
           Vue.set(this.food,"count" , 1);
       }
   }
 }
</script>

<style lang="stylus" scoped>
.food
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background #ffffff
    .image-header
        position relative
        width 100%
        height 0
        padding-top 100%
        img 
            position absolute
            top 0
            left 0
            width 100%
            height 100%
        .back
            position absolute
            top 10px
            left 0
            .icon-arrow_lift
                display block
                padding 10px
                font-size 20px
                color #ffffff
    .content
        position relative
        padding 18px
        .title
            line-height 14px
            margin-bottom 8px
            font-size 14px
            font-weight bold
            color rgb(7,17,27)
        .detail
            margin-bottom 18px
            line-height 10px
            font-size 0
            height 10px
            .sell-count,.rating
                font-size 10px
                color rgb(147,153,159)
            .sell-count
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
            right 12px
            bottom 12px
        .buy
            position absolute
            right 18px
            bottom 18px
            z-index 10
            height 24px
            line-height 24px
            padding 0 12px
            box-sizing border-box
            border-radius 12px
            font-size 10px
            color #ffffff
            background rgb(0,160,260)
    .info
        padding 18px
        .title
            line-height 14px
            margin-bottom 6px
            font-size 14px
            color rgb(7,17,27)
        .text
            line-height 24px
            padding 0 8px
            font-size 14px
            color rgb(77,85,93)
    .rating
        padding-top 18px
        .title
            line-height 14px
            margin-left 18px
            font-size 14px
            color rgb(7,17,27)


         


                




 
</style>
