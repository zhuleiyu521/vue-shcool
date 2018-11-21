<template>
<div class="jishiTem">
    <div class="infoTitles">
        <img src="../../assets/image/back.png" alt="" @click="back">
        <span>浙江农林大学植物园</span>
    </div>
      <img :src="botany.bg" alt="" class="botanyOneBg">    
 <div class="botanyTwo">
        <div class="botanyOneCon" v-for="(data,index) in botany.child" :key="index" >
         <div class="dataTitle">{{data.title}}</div>
         <div class="dataDetail">{{data.detail}}</div>
         <img :src="data.img1" alt="" v-if="data.img1">
         <img :src="data.img2" alt="" v-if="data.img2">
       </div>
     </div>
     </div>
</template>

<script>
export default {
  data() {
    return {
      botany: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.botany = window.botany;
  },
  mounted() {}
};
</script>

<style lang="less">
.jishiTem {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
.infoTitles {
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
  z-index: 9;
  line-height: 44px;
  text-align: center;
  box-sizing: border-box;
  padding: 0 11px;
  background-color: rgba(0, 157, 116, 1);
  span {
    color: #ffffff;
    font-size: 15px;
  }
  img {
    zoom: 0.5;
    float: left;
    margin-top: 23px;
  }
}
.botanyOneBg {
  margin-top: 44px;
  width: 100%;
}
.botanyTwo {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin-top: -20px;
  img {
    width: 100%;
    margin-top: 10px;
    // float: left;
  }
  .botanyOneCon {
    margin: 10px 0;
  }
  .dataTitle {
    color: #009d7b;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .dataDetail {
    font-size: 12px;
    color: #4c4c4c;
  }
}
</style>
