<template>
 <div class="ratingselect">
     <div class="rating-type border-1px">
         <span @click="select(2,$event)"  class="block positive" :class="{'active':tempSelectType===2}">{{desc.all}} <span class="count">{{ratings.length}}</span> </span>
         <span @click="select(0,$event)" class="block positive" :class="{'active':tempSelectType===0}">{{desc.positive}} <span class="count">{{positives.length}}</span></span>
         <span @click="select(1,$event)" class="block negative" :class="{'active':tempSelectType===1}">{{desc.negative}} <span class="count">{{negatives.length}}</span></span>
     </div>
     <div @click="toggleContent" class="switch" :class="{'on':tempOnlyContent}">
         <span class="icon-check_circle"></span>
         <span class="text">只看有内容的评价  </span>
     </div>
 </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;

 export default {
   data () {
     return {
         tempSelectType:this.selectType,
         tempOnlyContent:this.onlyContent
     }
   },
   methods:{
       select(type,event){
           if(!event._constructed){
               return;
           }
           console.log(type);
           this.tempSelectType=type;
          //事件，父组件监听这个事件 this.$store.dispatch('ratingtype.select',type);
          this.$emit('ratingtypeSelect',type);
       },
       toggleContent(event){
            if(!event._constructed){
                        return;
            }
            this.tempOnlyContent = ! this.tempOnlyContent;
            //this.$store.dispatch('content.toggle',this.onlyContent);
            console.log(this.tempOnlyContent);
            this.$emit('contentToggle',this.tempOnlyContent);
       }
   },
   computed:{
       positives(){
           return this.ratings.filter((rating) => {
               return rating.rateType === POSITIVE;
           })
       },
       negatives(){
           return this.ratings.filter((rating) => {
               return rating.rateType === NEGATIVE;
           })
       },
    //    selectType(){
    //        console.log(this.tempSelectType);
    //        return this.tempSelectType;
    //    },
    //    onlyContent(){
    //        console.log(this.tempOnlyContent);
    //        return this.tempOnlyContent;
    //    }
   },
   components: {

   },
   props:{
       ratings:{
           type:Array,
           default(){
               return [];
           }
       },
       selectType:{
           type:Number,
           default:ALL
       },
       onlyContent:{
           tyoe:Boolean,
           default:false
       },
       desc:{
           type:Object,
           default(){
               return {
                   all:'全部',
               positive:'满意',
               negative:'不满意'}
           }
       }
   }
 }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
.ratingselect  
    .rating-type
        padding 18px 0
        margin 0 18px
        border-1px(rgba(7,17,27,0.1))
        .block
           display inline-block
           padding 8px 12px
           margin-right 8px
           border-radius 1px
           color rgb(77,85,93)
           .count
            font-size 8px
            margin-left 2px
           &.positive
                background rgba(0,160,220,0.2)
                &.active
                    background rgb(0,160,220)
           &.negative
                background rgba(77,85,93,0.2)
                &.active
                    background rgb(77,85,93)
                    color #ffffff
    .switch
        padding 12px 18px
        line-height 24px
        border-bottom 1px solid rgba(7,17,27,0.1)
        color rgb(147,153,159)
        font-size 0
        &.on
            .icon-check_circle
                color #00c850
        .icon-check_circle
            display inline-block
            vertical-align top
            margin-right 7px
            font-size 24px
        .text
            display inline-block
            vertical-align top
            font-size 12px



 
</style>
