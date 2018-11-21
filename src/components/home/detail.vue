<template>
  <div class="homebill home Info">
      <div class="infoTitle">
          <img src="../../assets/image/back.png" alt="" @click="back">
          <span>{{detail.text}}</span>
          <div class="rightTitle" @click="share" v-if="wxInternet">
          <!-- <div class="rightTitle" @click="share" > -->
              <img src="../../assets/image/share.png" alt="">
          </div>
      </div>
      <div class="infoCon">
          <div class="infoConLeft">
              <div :style="{ backgroundImage:'url('+detail.pointsImg+')' }"></div>
          </div>
            <div class="infoConRight">
                <p>{{detail.name}}</p>
                <p v-if="vrchooseShow(detail)" @click="govr(detail)"><span>进入全景</span><img src="../../assets/image/vr.png" alt=""></p>
                <div class="infoConRightTitle">{{detail.text}}</div>
            </div>
      </div>
      <!-- <div class="infoConMp3">
          <span v-if="!playFlag"><img src="../../assets/image/play.png" alt="" @click="playMp3" ></span>
          <span v-else><img src="../../assets/image/zanting.png" alt="" @click="playMp3" ></span>
          <span class="playTime">{{endTime}}</span>
          <span class="playProgree">
              <span class="playProgreeCircle" ref="play">
                  <span class="playProgreeCircle2"></span>
              </span>
          </span>
          <span class="playTime">{{startTime}}</span>
      </div> -->
      <div class="infoConHtml" v-html="detail.description"></div>
         <div class="toastShare" v-show="shareFlag">
            <p >当前浏览器不支持分享，请尝试更换浏览器</p>
        </div>
       <div class="vrShows" v-show="vrShow">
          <div class="vrShowCon">
          <img src="../../assets/image/delete.png" alt="" @click="vrShow=false">
          <iframe src="" id="Iframe" frameborder="0" scrolling="no" style="border:0px;"></iframe>
          </div>
        </div>
  </div>
</template>

<script>
import NativeShare from "nativeshare";
export default {
  data() {
    return {
      nativeShare: null,
      shareFlag: false,
      vrShow: false,
      startTime: "0:00",
      endTime: "0:00",
      wxInternet: true,
      playFlag: false,
      audio: null,
      Time: null,
      detail: {
        text: "图书馆",
        pointsImg: "static/image/flow.jpg",
        text:
          "浙江农林大学图书馆创建于1958年，原名天目林学院图书馆。浙江农林大学图书馆创建于1958年，原名天目林学院图书馆",
        description:
          '<p>简介</p><p>"浙江农林大学图书馆创建于1958年，原名天目林学院图书馆。由于学校在上个世纪六、七十年代曾几度并入浙江农业大学，因而也几度改名为浙江农业大学图书馆、浙江农业大学天目分校图书馆等。1978年12月份学校重新独立办学，复名浙江林学院图书馆。2010年3月18日更名为浙江农林大学图书馆。"</p><p><img src="https://timgsa.baidu.com/timg?image&amp;quality=80&amp;size=b9999_10000&amp;sec=1516353310904&amp;di=c5e9fee61e38875440dfa37e428aaf7c&amp;imgtype=0&amp;src=http%3A%2F%2Fimg5.xiazaizhijia.com%2Fwalls%2F20160708%2F1440x900_2f172c09d079701.jpg" alt="" width="100%" height="100%" /></p><p>因而也几度改名为浙江农业大学图书馆、浙江农业大学天目分校图书馆等。1978年12月份学校重新独立办学，复名浙江林学院图书馆。2010年3月18日更名为浙江农林大学图书馆。</p>'
      }
    };
  },
  mounted() {
    this.detail = JSON.parse(localStorage.getItem("detail"));
    this.wxInternet =
      navigator.userAgent.match(/MicroMessenger/i) != "MicroMessenger";
    this.nativeShare = new NativeShare();
    var shareData = {
      title: "农林大学GIS导览平台",
      desc: "这是一个农林大学GIS导览平台",
      // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
      link: "http://192.168.31.88:9080/#/detail",
      icon: "https://pic3.zhimg.com/v2-080267af84aa0e97c66d5f12e311c3d6_xl.jpg",
      // 不要过于依赖以下两个回调，很多浏览器是不支持的
      success: function() {
        alert("success");
      },
      fail: function() {
        alert("fail");
      }
    };
    this.nativeShare.setShareData(shareData);
    this.audio = new Audio("static/audio/富林印迹.mp3");
    this.audio.currentTime = 0;
    setTimeout(() => {
      this.startTime = this.audio.duration.toFixed(2);
    }, 1000);
  },
  watch: {
    playFlag(val) {
      console.log(val);
      if (!val) {
        this.audio.pause();
        if (this.Time) {
          clearInterval(this.Time);
        }
      } else {
        this.palyPublic();
      }
    }
  },
  destroyed() {
    if (this.Time) {
      clearInterval(this.Time);
    }
  },
  methods: {
    govr(data) {
      document.getElementById("Iframe").src = data.panorama;
      this.vrShow = true;
    },
    vrchooseShow(data) {
      if (
        data.panorama &&
        !data.panorama.includes("undefined") &&
        data.panorama != "暂无"
      ) {
        return true;
      } else {
        return false;
      }
    },
    share() {
      try {
        this.nativeShare.call();
      } catch (err) {
        this.shareFlag = true;
        setTimeout(() => {
          this.shareFlag = false;
        }, 1000);
      }
    },
    palyPublic() {
      this.audio.play();
      if (this.Time) {
        clearInterval(this.Time);
      }
      this.Time = setInterval(() => {
        this.startTime = this.audio.duration.toFixed(2);
        this.endTime = this.audio.currentTime.toFixed(2);
        let ratio = (this.endTime / this.startTime).toFixed(2) * 100;
        if (ratio == 100) {
          clearInterval(this.Time);
          this.$refs.play.style.left = 0;
          this.audio.pause();
          this.audio.currentTime = 0;
          this.endTime = "0:00";
        } else {
          this.$refs.play.style.left = ratio + "%";
        }
      });
    },
    playMp3() {
      this.playFlag = !this.playFlag;
      this.palyPublic();
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">
.vrShows {
  position: absolute;
  z-index: 99999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #fff;
  .vrShowCon {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    img {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  }
  #Iframe {
    width: 100%;
    height: 100%;
  }
}
.toastShare {
  position: fixed;
  width: 250px;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 50px;
  z-index: 9;
  border-radius: 5px;
  background-color: rgba(14, 14, 14, 0.8);
  p {
    box-sizing: border-box;
    padding: 7px 10px;
    color: #fffefe;
    font-size: 12px;
  }
}
.rightTitle {
  float: right;
}
.Info {
  overflow-y: auto;
}
.infoConHtml {
  padding: 12px;
  height: auto;
  //   margin-top: 12px;
}
.infoConMp3 {
  width: 100%;
  text-align: center;
  margin-top: 12px;
  img {
    zoom: 0.7;
    position: relative;
    top: 10px;
  }
  .playTime {
    color: #333333;
    font-size: 10px;
    display: inline-block;
    width: 25px;
    margin-left: 8px;
  }
  .playProgree {
    position: relative;
    display: inline-block;
    width: 50%;
    top: -2px;
    height: 2px;
    background-color: rgba(192, 192, 192, 1);
    border-radius: 1px 1px 1px 1px;
    .playProgreeCircle {
      position: absolute;
      left: 0;
      transition: all ease 0.4s;
      top: -4px;
      width: 9px;
      border-radius: 9px;
      height: 9px;
      background-color: rgba(0, 157, 128, 0.3);
      .playProgreeCircle2 {
        display: inline-block;
        position: absolute;
        width: 5px;
        height: 5px;
        border-radius: 5px;
        left: 2px;
        top: 2px;
        background-color: rgba(0, 157, 128, 1);
      }
    }
  }
}
.infoConRightTitle {
  display: -webkit-box; /** 将对象作为伸缩盒子模型显示 **/
  width: 100%;
  margin-top: 10px;
  color: #333333;
  line-height: 18px;
  font-size: 12px;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  height: 36px;
  -webkit-line-clamp: 2;
  word-break: break-all;
  overflow: hidden;
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
.infoCon {
  box-sizing: border-box;
  margin-top: 44px;
  height: 94px;
  padding: 11px 11px 0 11px;
  display: flex;
  .infoConLeft {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0.5px 0.9px 10px 0px rgba(48, 48, 48, 0.2);
    width: 83px;
    text-align: center;
    div {
      width: 75px;
      height: 75px;
      margin-top: 5px;
      margin-left: 4px;
      background-size: cover;
      background-position: center;
    }
  }
  .infoConRight {
    flex: 1;
    padding-left: 12px;
    margin-top: 2px;
    // background-color: red;
    p:nth-child(1) {
      color: #1b1b1b;
      font-size: 13px;
    }
    p:nth-child(2) {
      span {
        color: #353535;
        font-size: 11px;
      }
      img {
        position: relative;
        top: 3px;
        left: 10px;
        zoom: 0.5;
      }
    }
  }
}
</style>
