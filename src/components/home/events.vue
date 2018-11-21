<template>
<div class="jishiTem">
 <div class="infoTitle">
                 <img src="../../assets/image/back.png" alt="" @click="back">
                 <span>浙江农林大学植物园主要记事</span>
            </div>
   <div class="jishi">
           
            <div class="jishicontain">
              <div v-for="(data,index) in mainRemember" :key="index">
                <div class="mainRememberTi">{{data.name}}</div>
                <div v-for="(obj,inde) in data.child" :key="inde" class="mainRememberTiCon">{{obj}}</div>
              </div>
            </div>
          </div>
          </div>
</template>

<script>
export default {
  data() {
    return {
      mainRemember: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    this.mainRemember = window.mainRemember;
  },
  mounted() {}
};
</script>

<style lang="less">
.jishiTem {
  width: 100%;
  height: 100%;
}
.infoTitle {
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
.jishi {
  width: 100%;
  height: 100%;
  margin-top: 24px;
  // overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
  padding-right: 0;
  display: flex;
  flex-direction: column;
  font-family: MicrosoftYaHei;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 19.3px 1.7px rgba(0, 98, 79, 0.3);

  .jishicontain {
    overflow-y: auto;
    // height: 90%;
    flex: 1;
    margin-top: 5px;
  }
  .mainRememberTi {
    color: #009d7e;
    font-size: 12px;
    margin: 5px 0;
  }
  .mainRememberTiCon {
    margin-bottom: 20px;
    line-height: 21.99999px;
    // width: 312px;
    padding-right: 24px;
    margin-left: 24px;
    color: #505050;
    font-size: 12px;
  }
}
</style>
