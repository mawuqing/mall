<template>
    <div class="toast-root" v-show="isShow">
      <div >
        {{message}}
      </div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
  /*  props:{
      message:{
        type:String,
        default:''
      },

      isShow:{
        type:Boolean,
        default: false
      }
    }*/

   data(){
     return {
       isShow:false,
       message:''
     }
   },

    methods:{
     show(res='默认信息',duration = 2000){
       if(res != null){
         this.isShow = true
         this.message = res

         setTimeout(() =>{
           this.isShow = false
           this.message = ''
         },duration)
       }
     }
    }
  }
</script>

<style scoped>
  .toast-root{
    /*background-color:rgba(0,0,0,.75);*/
    background-color: var(--color-tint);
    color: #ffffff;
    text-align:center;
    position:fixed;
    top: 50%;
    left:50%;
    transform:translate(-50%, -50%);
    padding:8px 10px;
    z-index:999;
  }
</style>
