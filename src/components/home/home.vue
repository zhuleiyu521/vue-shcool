<template>
    <div class="homebill home">
        <xmask :show="dialog.show || path.show || describe.show  ||imagedetail || schoolTime" :can-close="false"
               @click="changemask"></xmask>
        <div class="dialog" v-show="dialog.show" style="background:#fff;width:80%;height:110px">
                 <div class="dialogbngcon" >
                    <p class="dialogtitle" style="color:#fff;">地图显示方式</p>
                    <div class="dialogchoosetype" >
                <div class="choosetypesCon" :class="{choosetypesConClick:vindex==index+1}" v-for="(data,index) in planetList" :key="index">
                    <div class="verturemenucon" @click="planet(index+1,data)" >
                        <div class="verturemenucontain">
                            <img :src="data.image" alt="" style="width:100%;height:100%">
                        </div>
                            <span class="verturfont" >{{data.name}}</span>                                    
                    </div>
                </div>
                </div>
            </div>
        </div>
        <div class="routerShow" v-if="path.show">
          <div class="routerList" v-for="(data,index) in lineList" :key="index" @click="lineClick(data,index)">
            <img src="../../assets/image/router.png" alt="">
            <span :class="{lineColor:lindex==index}">{{data.name}}</span>
          </div>
          <!-- <div class="routerList">
            <img src="../../assets/image/router.png" alt="">
            <span>观光车路线</span>
          </div> -->
        </div>
        <div class="toast" v-show="position.show">
            <p >当前位置不在景区</p>
        </div>
        <div class="dialog" v-show="describe.show" style="background:#fff;width:80%;height:162px">
            <!-- <img src="../../assets/image/bg2.png" alt="" style="width:100%;height:260px" class="diaologbg"> -->
            <div class="dialogbngcon" style="width:100%">
              <div class="detailTitle">
                <span>{{describe.detail.text}}</span>
                <div class="detailTitleImg">
                  <!-- <img src="../../assets/image/yuyin.png" alt="" @click="tovideo">
                  <img src="../../assets/image/shinei.png" alt=""> -->
                  <img src="../../assets/image/vr.png" alt="" @click="govr(describe.detail)" v-if="vrchooseShow(describe.detail)">
                </div>
                  <div class="detailTitleImg" style="right:42px" v-if="gushu.flag || gushu.flag==0" @click="oldTresClick">
                  <!-- <img src="../../assets/image/yuyin.png" alt="" @click="tovideo">
                  <img src="../../assets/image/shinei.png" alt=""> -->
                  <img src="../../assets/image/diaocha.png" alt="">
                </div>
              </div>
                <div class="describeimg"  > 
                    <div class="imgSmall" :style="{ backgroundImage:'url('+describe.detail.pointsImg+')' }">
                    </div>
                    <div class="imgSmallDetail">
                      <div class="imgSmallDetailFont" v-html="describe.detail.description">
                         <!-- {{describe.detail.description}} -->
                        </div>
                        <div class="imgSmallDetailFontbtn" @click="goDetail">
                          详情>
                        </div>
                        <div class="imgSmallDetailbtn">
                          <span @click="gohere(1)">从这里出发</span>
                          <span @click="gohere(2)"> 到这里去</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="contain" ></div>
      
        <div class="btMenu" :class="{hidehomemenu:hidemenu.show}">
           
        <div class="homemenu" :class="{changeThem:therm}">
            <div class="right" @click="goright" >
                <img src="../../assets/image/xiala.png" alt="" v-if="rightshow">
                <img src="../../assets/image/shangla.png" alt="" v-if="!rightshow" class="shangla">
            </div>
            <div class="center" >
                <div class="cneter" style="width:100%;margin:auto">
                    <div class="centerCircle" :class="{changeThem:therm}">
                        <img :src="circleImg" alt="" class="centerCircleImg">
                    </div>
                    <swiper :options="swiperOption" style="width:100%;height:48px">
                        <swiper-slide v-for="(data,index) in dataJson" :key="index" v-if="chooseShow(data)">
                            <div class="homemmenuimg" @click="choose(index,data.icon_after,data)" :class="{opacityImg:indexs==index}">
                                <span class="homeimg1">
                                    <!-- <img :src="data.imgUrl" :alt="data.text"> -->
                                    <span class="homeimg2">{{data.name}}</span>
                                </span>
                            </div>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            </div>
             <div class="rightmenu" :class="{rightenter:rightshow}" >
               <div v-if="rightList.pointsList" class="rightmenuDiv">
                <div  v-for="(data,index) in rightList.pointsList"  :key="index" @click="gorightdetail(index,data)" :class="{opacityChooseImg:rindex==index}" v-if="data.school==schoolData.name || !data.school">
                    <img :src="data.icon_before" alt="" v-if="data.icon_before && data.icon_before!=''">
                    <img :src="rightList.icon_mark" alt="" v-else>
                    <!-- <img :src="rightList.icon_after" alt="" > -->
                    
                    <span class="fontcolor">{{data.name}}</span>
                </div>
                </div>
                 <div v-if="rightList.child" style="width:100%" class="threeMenu">
                <div  v-show="rightList.child" v-for="(data,index) in rightList.child"  :key="data[index]"  >
                <el-collapse v-model="activeName" accordion  @change="threeMenuClick">
                  <el-collapse-item  :name="index">
                    <template slot="title">
                      <img :src="data.icon_before" alt="" style="zoom:0.5" class="threeMenuImg">{{data.name}}
                    </template>
                    <div v-for="(ob,inde) in rightList.child[index].pointsList" @click="gorightdetail(inde,ob)"   v-if="ob.school==schoolData.name || !ob.school" :key="inde"  class="threeMenuContain" style="border-bottom:1px solid #f5f5f5">
                      <!-- <img :src="ob.icon_before" alt="" v-if="ob.icon_before" style="zoom:0.5" class="threeMenuImg">
                      <img :src="data.icon_before" alt="" v-else style="zoom:0.5" class="threeMenuImg"> -->
                      <span :class="{opacityChooseImgColor:rindex==inde && firstMenu==index}">{{ob.name}}</span>
                      </div>
                  </el-collapse-item>
                </el-collapse>
                </div>
                 </div>
            </div>
        </div>
        <div class="rightTopMenu"  ref="rightTopMenu" :class="{hideleftmenu:hidemenu.show,changeThem:therm}" @click.stop="changeSchoolClick">
            <div class="rightTopMenuCon" :class="{changeThem:therm}">
                <img :src="schoolData.img_w" alt="">
                <img src="../../assets/image/xiala.png" alt="" v-if="!changeSchool">
                <img src="../../assets/image/shangla.png" alt="" v-if="changeSchool" class="shanglaImg">
                <span>{{schoolData.name}}</span>                
            </div>
            <div v-if="changeSchool" class="changeSchoolCon">
                <div class="rightTopMenuList" @click="school(index,data)" :class="{school:schoolFlag==index}" v-for="(data,index) in schoolList" :key="index">
                    <img :src="data.img_s" alt="" v-if="schoolFlag==index">
                    <img :src="data.img" alt="" v-else>
                    <span>{{data.name}}</span>
                </div>
            </div>
        </div>
        <div class="leftTopMenu"  :class="{hidemenuleft:hidemenu.show}">
            <div class="leftTopMenuRight">
                <div class="leftTopCon" @click.stop="search" :class="{changeThem:therm}">
                    <img src="../../assets/image/search.png" alt="">
                </div>
                <input type="text" v-model="searchvalue" placeholder="请输入关键字" :class="{searchshows:searchshow}">                
            </div>
             <div class="searchlist" v-if="searchlist.length>0 && searchshow">
                    <div class="searhlistcon" v-for="(data,index) in searchlist" v-if="data.position" :key="index" @click="gocenter(data)">
                       
                       <img :src="data.icon_before" alt="" >
                        <span>{{data.name}}</span>
                    </div>
             </div>
              <div class="searchlist hotSearch" v-if="searchshow && searchlist.length==0 && searchvalue==''">
                  <div class="hotSearchCon">
                      <img src="../../assets/image/hotSearch.png" alt="">
                      <span>热门</span>
                  </div>
                    <span v-for="(data,index) in hotSearch" :key="index" class="hotSearchFont" @click="hotSearchClick(data)">{{data.name}}</span>
             </div>
             <div class="searchlist blankSearch" v-if="searchshow && searchlist.length==0 && searchvalue!=''">
                 <span>抱歉！没有搜到相关内容!</span>
             </div>
        </div>
        <div class="leftmenu" :class="{hideleftmenu:hidemenu.show}">
            <div class="leftmenucon">
                <div class="leftmenucontain" @click="handlermap(1)" style="">
                    <img src="../../assets/image/xia_jia.png" alt="">
                </div>
                <div class="leftmenucontain" @click="handlermap(2)">
                    <img src="../../assets/image/xia_jian.png" alt="">
                </div>

            </div>
            <div class="leftmenucontains" @click="handlermap(3)">
                <img src="../../assets/image/xia_dingwei.png" alt="">
            </div>
        </div>
        <div class="verturemenu" :class="{hideverturemenu:hidemenu.show}">
            <div class="verturemenucon" @click="choosetype(2)">
                <div class="verturemenucontain">
                    <img :src="url" alt="" style="width:100%;height:100%">
                </div>
                    <span class="verturfont" :class="{changeThem:therm}">{{mapname}}</span>                                    
            </div>
            <div class="mapTherm" :class="{changeThem:therm}">
                <div class="webTherm" @click="routerFs">
                    <img src="../../assets/image/router_p.png" alt="" class="webThermImg">
                    <span class="webThermColor" style="margin-top:3px">路线</span>
                </div>
            </div>
             <div class="mapTherm" :class="{changeThem:therm}">
                <div class="webTherm" @click="jishi" style="height:100%;text-align:center">
                    <img src="../../assets/image/jishi.png" alt="" class="webThermImg" style="margin-left:0px;zoom:.8">
                    <span class="webThermColor" style="margin-top:3px">记事</span>
                </div>
            </div>
            <div class="mapTherm" :class="{changeThem:therm}">
                <div class="webTherm" @click="botanyClick" style="height:100%;text-align:center;">
                    <img src="../../assets/image/botany.png" alt="" class="webThermImg" style="margin-left:0px;zoom:.5;margin-top:20px">
                    <span class="webThermColor" style="margin-top:5px">介绍</span>
                </div>
            </div>
        </div>
        <audio controls="controls" v-show="false">
            <source src="" type="audio/mpeg" ref="mp3">
        </audio>
        <div class="clear" :class="{hideclear:hidemenu.show}" v-show="clear.show" @click="clearRouter">
            <span>清除路线</span>
        </div>
        <div class="vrShow" v-show="vrShow">
          <div class="vrShowCon">
          <img src="../../assets/image/delete.png" alt="" @click="vrShow=false">
          <iframe src="" id="Iframe" frameborder="0" scrolling="no" style="border:0px;"></iframe>
          </div>
        </div>
        <div class="schoolTime" v-if="schoolTime">
          <div class="schoolTimeCon">
            <img src="../../assets/image/table.png" alt="" class="tableImg">  
            <img src="../../assets/image/delete.png" alt="" @click="schoolTime=false" class="deleteSchoolImg">          
          </div>
        </div>
          <div class="toastShares" v-show="shareFlag">
            <p>{{positionStatus}}</p>
        </div>
    </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import GeoGson from "../../assets/js/yuanlin.json";
import nonglinbei from "../../assets/js/nonglinbei.json";
import nonglinnna from "../../assets/js/nonglinnna.json";

// import weixin from "../../assets/js/ol/js/weixin";
// import main from "../../assets/js/ol/js/ol.main";
export default {
  components: {
    swiper,
    swiperSlide
  },
  name: "home",
  data() {
    return {
      firstGo: 0,
      gushu: {},
      positionStatus: "",
      shareFlag: false,
      activeName: 1,
      schoolTime: false,
      therm: false,
      lindex: null,
      Polygon: null,
      Polygons: null,
      Polygonss: null,
      flagName: "",
      mark: null,
      markes: [],
      lineList: [],
      marktext: null,
      marktextArr: [],
      marktextList: [
        { position: [119.733274, 30.252402], name: "果木园", theone: "zl64" },
        { position: [119.728392, 30.253199], name: "木兰园", theone: "zl52" },
        {
          position: [119.726761, 30.253533],
          name: "植物园预留引种基地",
          theone: "zl69"
        },
        { position: [119.729722, 30.256331], name: "槭树园", theone: "zl61" },
        {
          position: [119.731568, 30.257592],
          name: "植物园引种基地",
          theone: "zl75"
        },
        { position: [119.727126, 30.258963], name: "杜鹃园", theone: "zl54" },
        { position: [119.723264, 30.257351], name: "金缕梅园", theone: "zl55" },
        { position: [119.722899, 30.260817], name: "农作园", theone: "zl57" },
        { position: [119.721236, 30.260858], name: "山茶园", theone: "zl56" },
        {
          position: [119.724326, 30.262174],
          name: "水景园(官塘湿地)",
          theone: "ts51"
        },
        { position: [119.7313, 30.251053], name: "名花园", theone: "ts49" },
        {
          position: [119.733918, 30.254946],
          name: "植物预留引种基地",
          theone: "zl70"
        },
        { position: [119.731922, 30.259042], name: "翠竹园", theone: "zl60" },
        { position: [119.731557, 30.254464], name: "文学花园", theone: "ts53" },
        {
          position: [119.732137, 30.25539],
          name: "园林植物引种园",
          theone: "zl71"
        },
        { position: [119.727137, 30.256021], name: "蔷薇园", theone: "zl53" },
        { position: [119.725978, 30.252536], name: "松柏园", theone: "zl51" },
        { position: [119.725785, 30.257744], name: "杜鹃园", theone: "zl54" },
        { position: [119.7257, 30.260617], name: "桂花园", theone: "zl59" },
        { position: [119.727073, 30.261229], name: "天目园", theone: "zl68" },
        { position: [119.728639, 30.26071], name: "名茶园", theone: "ts54" },
        { position: [119.723103, 30.25906], name: "文学花园", theone: "ts55" },
        { position: [119.725759, 30.26248], name: "天目园", theone: "zl58" },
        { position: [119.72733, 30.262471], name: "本草园", theone: "zl73" },
        { position: [119.728092, 30.258134], name: "文学花园", theone: "ts56" },
        {
          position: [119.729782, 30.258648],
          name: "经济植物引种园",
          theone: "zl72"
        },
        { position: [119.729691, 30.25761], name: "文化林", theone: "ts52" },
        { position: [119.732593, 30.253732], name: "盆景园", theone: "zl63" },
        { position: [119.730785, 30.255933], name: "棕榈园", theone: "zl61" },
        { position: [119.730147, 30.254088], name: "香花园", theone: "ts50" },
        {
          position: [119.729095, 30.254885],
          name: "水景园(东湖)",
          theone: "ts57"
        }
      ],
      planetList: [],
      circleImg: "",
      schoolList: [
        {
          name: "衣锦校区",
          img: "static/image/jianzhu.png",
          img_w: "static/image/jianzhu_w.png",
          img_s: "static/image/jianzhu_s.png"
        },
        {
          name: "东湖校区",
          img_s: "static/image/school.png",
          img_w: "static/image/school_w.png",
          img: "static/image/school_s.png"
        }
      ],
      schoolData: { name: "东湖校区", img_w: "static/image/school_w.png" },
      changeSchool: false,
      schoolFlag: 1,
      longtiu: [],
      langtiu: [],
      hotSearch: [],
      dataJson: {},
      zoom: null,
      // dataJson: dataJson,
      imagedetail: false,
      clear: {
        show: false
      },
      audios: null,
      searchlist: [],
      hidemenu: { show: false },
      searchvalue: "",
      searchshow: false,
      menuList: {},
      tiandituBase: null,
      tiandituBaseSchool: null,
      threeMenuFlag: 1,
      SearchMark: null,
      indexs: 1,
      test: null,

      borderGeojson: null,
      borderGeojsonBei: null,
      imageurl: "static/image/nav_jingdian",
      url: "static/image/nav_right_ziran.png",
      vindex: 2,
      windex: 1,
      dindex: 0,
      rindex: -1,
      vrShow: false,
      mapname: "自然",
      rightshow: false,
      walking: null,
      rightList: [],
      dialog: {
        show: false
      },
      path: {
        show: false
      },
      audio: null,
      geojson: null,
      PolygonArr: [],
      position: {
        show: false
      },
      roadNetLayer: null,
      satellLayer: null,
      firstMenu: null,
      describe: {
        show: false,
        detail: {
          pointsImg: "",
          text: "暂无",
          description: "暂无"
        }
      },
      audio_off_on: false,
      swiperOption: {
        paginationClickable: true,
        slidesPerView: "auto",
        roundLengths: true,
        spaceBetween: 20,
        visiblilityFullfit: true,
        slideToClickedSlide: true
      }
    };
  },
  watch: {
    shareFlag(val) {
      if (val) {
        // setTimeout(() => {
        //   this.shareFlag = false;
        // }, 2000);
      }
    },
    //本地搜索
    searchvalue(val) {
      var arr = Object.values(this.dataJson);
      if (val) {
        this.searchlist = [];
        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i]);
          if (arr[i].child) {
            for (let a = 0; a < arr[i].child.length; a++) {
              console.log(arr[i].child[a].pointsList);
              if (arr[i].child[a].pointsList) {
                for (let b = 0; b < arr[i].child[a].pointsList.length; b++) {
                  let def = arr[i].child[a].pointsList;
                  if (def[b].name.includes(val)) {
                    if (def[0].icon_before && def[0].icon_before != "") {
                    } else {
                      def.forEach(data => {
                        data.icon_before = arr[i].child[a].icon_before;
                        data.icon_after = arr[i].child[a].icon_after;
                      });
                    }
                    if (
                      def[b].school == this.schoolData.name ||
                      !def[b].school
                    ) {
                      console.log(def[b] == this.schoolData.name);
                      console.log(this.schoolData.name);
                      this.searchlist.push(def[b]);
                    }
                  }
                }
              }
            }
          } else if (arr[i].pointsList) {
            var ss = arr[i].pointsList.filter(p => {
              p.flag = i + 1;
              p.type = arr[i].type;
              p.pointsList = arr[i].pointsList;
              if (p.name.includes(val)) {
                if (
                  arr[i].pointsList[0].icon_before &&
                  arr[i].pointsList[0].icon_before != ""
                ) {
                } else {
                  p.pointsList.forEach(data => {
                    data.icon_before = arr[i].icon_before;
                    data.icon_after = arr[i].icon_after;
                  });
                }
                console.log(p);
                if (p.school == this.schoolData.name || !p.school) {
                  this.searchlist.push(p);
                }
              }
            });
          }
        }
      } else {
        this.searchlist = [];
      }
    },
    "describe.show": function(val) {
      this.dindex = 0;
    },
    "hidemenu.show": function(val) {
      if (val) {
        this.searchshow = false;
        this.rightshow = false;
        this.$refs.rightTopMenu.style.zIndex = "10";
      }
    },
    "position.show": function(val) {
      if (val) {
        setTimeout(() => {
          this.position.show = false;
          this.audio_off_on = false;
        }, 2000);
      }
    }
  },
  activated() {
    document.title = "浙江农林大学数字植物园服务平台";
  },
  created() {
    this.setOrigin();
  },
  mounted() {
    window.maptest = this;
    this.getMap();
    this.getData();
    this.getHotSearch();
    document.title = "浙江农林大学数字植物园服务平台";
  },
  methods: {
    //判断用户设备
    setOrigin() {
      var ua = navigator.userAgent.toLowerCase();
      var type;
      if (/iphone|ipad|ipod/.test(ua)) {
        type = "ios";
      } else if (/android/.test(ua)) {
        type = "android";
      } else {
        type = "pc";
      }
      let self = this;
      let params = {
        url: IPconfig.url + "browse",
        method: "post",
        body: {
          type: type
        }
      };
      let successcallback = function(data) {};
      let errorcallback = function(data) {};
      self.resource.resourceUnit(params, successcallback, errorcallback);
    },
    //vr事件
    govr(data) {
      document.getElementById("Iframe").src = data.panorama;
      this.vrShow = true;
    },
    //判断vr图标是否显示
    vrchooseShow(data) {
      console.log(data);
      if (
        data.panorama &&
        !data.panorama.includes("undefined") &&
        !data.panorama.includes("暂无")
      ) {
        return true;
      } else {
        return false;
      }
    },
    //跳转到古树明木页面
    oldTresClick() {
      this.$router.push({
        name: "oldTrees",
        params: {
          id: this.gushu.number,
          name: this.gushu.name
        }
      });
    },
    //跳转植物园记事页面
    jishi() {
      this.$router.push("/events");
    },
    //跳转到植物园介绍页面
    botanyClick() {
      this.$router.push("/botany");
    },
    //三级菜单change事件
    threeMenuClick(data) {
      this.firstMenu = data;
      this.rindex = null;
      this.threeMenuFlag = data;
      this.PolygonArr.map((obj, indexs) => {
        // console.log(data.name);if
        if (obj.Polygon) {
          obj.Polygon.setOptions({ fillOpacity: 0.4 });
        }
      });
      if (data != null && this.rightList.child && this.rightList.child[data]) {
        if (
          this.rightList.child[data].name == "专类园" ||
          this.rightList.child[data].name == "特色园"
        ) {
          this.rightList.child[data].pointsList.map((datas, index) => {
            this.PolygonArr.map((obj, indexs) => {
              if (datas.name == obj.geojson.properties.name) {
                console.log(datas.name);
                obj.Polygon.setOptions({ fillOpacity: 0.9 });
              }
            });
          });
        }
      }
      if (this.rightList.child && this.rightList.child[data]) {
        this.setMark(this.rightList.child[data]);
      } else {
        if (this.markes.length > 0) {
          this.map.remove(this.markes);
        }
      }
    },
    //选择当前校区的数据
    chooseShow(data) {
      if (data.school) {
        if (data.school == this.schoolData.name) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    //热点搜索点击事件
    hotSearchClick(data) {
      this.searchvalue = data.name;
    },
    //规划路径
    lineClick(data, index) {
      this.lindex = index;
      this.clear.show = true;
      if (data.position.includes("|")) {
        let longtiu = data.position.split("|")[0].split(",");
        let langtiu = data.position.split("|")[1].split(",");
        this.walking.clear();
        this.walking.search(longtiu, langtiu);
        this.path.show = false;
      }
    },
    routerFs() {
      this.path.show = !this.path.show;
      if (this.path.show) {
        this.getRouter();
      }
    },
    //根据层级隐藏点标记名称
    markShowClick(val) {
      let len = document.getElementsByClassName("markFz").length;
      let ImgLen = document.getElementsByClassName("customMarkBg").length;
      console.log(ImgLen);
      // console.log(document.getElementsByClassName("markFz"));
      if (this.zoom <= 17) {
        let len = document.getElementsByClassName("markFz").length;
        let ImgLen = document.getElementsByClassName("customMarkBg").length;
        // console.log(len);
        for (let i = 0; i < len; i++) {
          document.getElementsByClassName("markFz")[i].style.display = "none";
        }
        for (let i = 0; i < ImgLen; i++) {
          document.getElementsByClassName("customMarkBg")[i].style.display =
            "block";
        }
      } else if (this.zoom >= 18) {
        for (let i = 0; i < len; i++) {
          document.getElementsByClassName("markFz")[i].style.display = "block";
        }
        for (let i = 0; i < ImgLen; i++) {
          document.getElementsByClassName("customMarkBg")[i].style.display =
            "block";
        }
      } else if (this.zoom <= 15) {
        for (let i = 0; i < len; i++) {
          document.getElementsByClassName("markFz")[i].style.display = "none";
        }
        for (let i = 0; i < ImgLen; i++) {
          document.getElementsByClassName("customMarkBg")[i].style.display =
            "none";
        }
      }
    },
    //点标记事件
    setMark(data) {
      if (data.pointsList) {
        // console.log(data)
        if (this.markes.length > 0) {
          this.map.remove(this.markes);
        }
        this.markes = [];
        if (this.schoolData.name == "衣锦校区") {
          this.map.setZoomAndCenter(16, [119.728392, 30.237503]);
        } else {
          this.map.setZoomAndCenter(16, [119.727738, 30.25742]);
        }
        data.pointsList.forEach(marker => {
          console.log(marker);
          if (!marker.icon_before) {
            if (data.name == "活动发布" || data.name == "校庆专栏") {
              console.log(data);
              marker.icon_before = data.icon_mark;
            } else {
              marker.icon_before = data.icon_before;
            }
          }
          let name = marker.name;
          if (marker.position) {
            this.zoom = this.map.getZoom();
            var div;
            if (this.zoom <= 17) {
              div =
                "<span class='markFz' id='makrFz'>" + marker.name + "</span>";
            } else {
              div = "<span class='markFz' >" + marker.name + "</span>";
            }
            this.mark = new AMap.Marker({
              map: this.map,
              // icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png",
              position: [marker.position[0], marker.position[1]],
              zIndex: 99999,
              offset: new AMap.Pixel(-12, -20),
              content:
                "<div class='customMark'><div class='customMarkBg'><img src=" +
                marker.icon_before +
                "></img></div>" +
                div +
                "</div>" //自定义点标记覆盖物内容
            });
            this.markes.push(this.mark);
            this.mark.on("click", () => {
              // alert(1);
              console.log(marker);
              this.markerClick(marker);
            });
          }
        });
      } else if (data.position && data.position.length > 0) {
        this.mark = new AMap.Marker({
          map: this.map,
          // icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b3.png",
          position: [data.position[0], data.position[1]],
          zIndex: 99999,
          offset: new AMap.Pixel(-12, -20),
          content:
            "<div class='customMark'><div class='customMarkBg'><img src=" +
            data.icon_before +
            "></img></div><span class='markFz'>" +
            data.name +
            "</span></div>" //自定义点标记覆盖物内容
        });
        this.markes.push(this.mark);
        this.mark.on("click", () => {
          // alert(1);
          this.markerClick(data);
        });
      }
    },
    //点标记点击事件
    markerClick(data) {
      this.describe.detail.pointsImg = data.picture;
      this.describe.detail.text = data.name;
      this.describe.detail.description = data.detail;
      this.describe.detail.position = data.position;
      this.describe.detail.panorama = data.panorama;
      this.describe.show = true;
    },
    //获取所有图层
    getMap() {
      let self = this;
      let params = {
        url: IPconfig.url + "map",
        method: "post",
        body: {
          act: "list"
        }
      };
      let successcallback = function(data) {
        self.planetList = [];
        let plan = data.data;
        if (data.data.length > 0) {
          self.planetList.push({
            name: "2.5D",
            url: plan[0].d_url,
            url1: plan[1].d_url,
            image: plan[0].d_image
          });
          self.planetList.push({
            name: "正射",
            url: plan[0].zs_url,
            url1: plan[1].zs_url,
            image: plan[0].zs_image
          });
          self.planetList.push({
            name: "手绘",
            url: plan[0].sh_url,
            url1: plan[1].sh_url,
            image: plan[0].sh_image
          });
          self.planetList.push({
            name: "矢量",
            url: plan[0].sh_url,
            url1: plan[1].sh_url,
            image: plan[0].sh_image
          });
        }
        self.mapname = self.planetList[self.vindex - 1].name;
        self.url = self.planetList[self.vindex - 1].image;
        self.tiandituBase = new AMap.TileLayer({
          // 图块取图地址
          getTileUrl: self.planetList[self.vindex - 1].url,
          zIndex: 101
        });
        self.tiandituBaseSchool = new AMap.TileLayer({
          // 图块取图地址
          getTileUrl: self.planetList[self.vindex - 1].url1,
          zIndex: 101
        });
        self.roadNetLayer = new AMap.TileLayer({
          // 图块取图地址
          tileUrl:
            "http://wprd01.is.autonavi.com/appmaptile?x=[x]&y=[y]&z=[z]&lang=zh_cn&size=1&scl=1&style=8&ltype=11",
          zIndex: 1
        });
        self.map = new AMap.Map("contain", {
          resizeEnable: true,
          center: [119.728028, 30.23735],
          expandZoomRange: true,
          zoom: 17,
          zooms: [15, 20],
          features: []
          // layers: [self.tiandituBase, self.tiandituBaseSchool]
        });
        self.walking = new AMap.Walking({
          map: self.map
        });
        self.tiandituBase.setMap(self.map);
        self.tiandituBaseSchool.setMap(self.map);
        // self.roadNetLayer = new AMap.TileLayer.RoadNet({ zIndex: 10 });
        self.satellLayer = new AMap.TileLayer.Satellite({ zIndex: 10 }); //实例化卫星图
        if (self.vindex == 2) {
          self.satellLayer.setMap(self.map);
          self.roadNetLayer.setMap(null);
        } else {
          self.roadNetLayer.setMap(self.map);
          self.satellLayer.setMap(null);
        }
        // this.school(1, this.planetList[1]);
        if (self.dataJson[self.indexs]) {
          self.choose(
            self.indexs,
            self.dataJson[self.indexs].icon_after,
            self.dataJson[self.indexs]
          );
          if (self.threeMenuFlag) {
            self.threeMenuClick(self.threeMenuFlag);
          }
        }
        AMap.event.addListener(self.map, "zoomend", function() {
          self.zoom = self.map.getZoom();
          self.markShowClick(self.zoom);
          console.log(self.zoom);
        });
        self.map.on("click", e => {
          self.hidemenu.show = !self.hidemenu.show;
        });
        self.setBorderGeogson();
        if (self.schoolData.name == "衣锦校区") {
          self.map.setZoomAndCenter(16, [119.728392, 30.237503]);
        } else {
          self.map.setZoomAndCenter(16, [119.727738, 30.25742]);
          self.map.setZoomAndCenter(16, [119.727738, 30.25742]);
        }
      };
      let errorcallback = function(data) {};
      self.resource.resourceUnit(params, successcallback, errorcallback);
    },
    //路径规划
    navigation() {
      this.walking.clear();
      this.map.setZoom(18);
      this.walking.search(this.longtiu, this.langtiu);
      this.clear.show = true;
    },
    //点击搜索结果一列时提交给后端
    postSearch(data) {
      let self = this;
      let params = {
        url: IPconfig.url + "search_add",
        method: "get",
        pa: {
          key_word: data
        }
      };
      let successcallback = function(data) {};
      let errorcallback = function(data) {};
      self.resource.resourceUnit(params, successcallback, errorcallback);
    },
    //获取热点搜索列表
    getHotSearch() {
      let self = this;
      let params = {
        url: IPconfig.url + "search_list",
        method: "post",
        body: {
          act: "list"
        }
      };
      let successcallback = function(data) {
        self.hotSearch = data.data;
      };
      let errorcallback = function(data) {};
      self.resource.resourceUnit(params, successcallback, errorcallback);
    },
    //获取推荐路线列表
    getRouter() {
      let self = this;
      let params = {
        url: IPconfig.url + "line",
        method: "post",
        body: {
          act: "list"
        }
      };
      let successcallback = function(data) {
        self.lineList = data.data;
      };
      let errorcallback = function(data) {};
      self.resource.resourceUnit(params, successcallback, errorcallback);
    },
    setMarktext() {
      this.marktextList.forEach(p => {
        this.marktext = new AMap.Text({
          text: p.name,
          textAlign: "center", // 'left' 'right', 'center',
          verticalAlign: "middle", //middle 、bottom
          cursor: "pointer",
          style: {
            color: "#fff",
            border: "none",
            "background-color": "transparent"
          },
          position: p.position
        });
        this.marktext.setMap(this.map);
        this.marktextArr.push(this.marktext);
      });
    },
    //设置两个校区边界
    setBorderGeogson() {
      var self = this;
      let jsd = {};
      if (this.vindex == 2) {
        this.borderGeojson = new AMap.GeoJSON({
          // if()
          geoJSON: nonglinnna, //geojsonObject,
          getPolygon: function(geojson, lnglats) {
            self.Polygons = new AMap.Polygon({
              path: lnglats,
              bubble: true,
              strokeColor: "#fbe000",
              fillColor: "#009d67",
              fillOpacity: 0,
              strokeStyle: "dashed",
              strokeOpacity: 1,
              zIndex: 80
            });
            return self.Polygons;
          }
        });
        this.borderGeojson.setMap(this.map);
        this.borderGeojson.show();
        this.borderGeojsonBei = new AMap.GeoJSON({
          // if()
          geoJSON: nonglinbei, //geojsonObject,
          getPolygon: function(geojson, lnglats) {
            console.log(geojson);
            self.Polygonss = new AMap.Polygon({
              path: lnglats,
              bubble: true,
              strokeColor: "#fbe000",
              fillColor: "#009d67",
              fillOpacity: 0,
              strokeStyle: "dashed",
              strokeOpacity: 1,
              zIndex: 80
            });
            return self.Polygonss;
          }
        });
        this.borderGeojsonBei.setMap(this.map);
        this.borderGeojsonBei.show();
      }
    },
    //添加植物园的geogson
    setGeoGson() {
      var self = this;
      this.geojson = new AMap.GeoJSON({
        geoJSON: GeoGson, //geojsonObject,
        getPolygon: function(geojson, lnglats) {
          console.log(geojson);
          this.Polygon = new AMap.Polygon({
            path: lnglats,
            strokeColor: "#fff",
            fillColor: "#009d67",
            fillOpacity: 0.4,
            strokeWeight: 1,
            zIndex: 90
          });
          this.Polygon.on("click", e => {
            console.log(e);
            console.log(self.rightList);
            self.rightList.child.forEach((obj, index) => {
              obj.pointsList.forEach((data, index) => {
                if (data.theone == geojson.properties.OBJECTID) {
                  console.log(data);
                  self.describe.show = true;
                  self.describe.detail.description = data.detail;
                  self.describe.detail.pointsImg = data.picture;
                  self.describe.detail.text = data.name;
                  self.describe.detail.panorama = data.panorama;
                  // if (data.position) {
                  //   self.describe.detail.position = data.position;
                  // } else {
                  //   self.describe.detail.position = [
                  //     e.lnglat.lng,
                  //     e.lnglat.lat
                  //   ];
                  // }
                  console.log(self.describe);
                }
              });
            });
            console.log(geojson.properties.name);
            // alert(2);
          });
          let test = {};
          test.Polygon = this.Polygon;
          test.geojson = geojson;
          self.PolygonArr.push(test);
          return this.Polygon;
        }
      });
      console.log(GeoGson);
      // console.log(self);
      this.geojson.setMap(this.map);
      this.geojson.show();
      this.setMarktext();
      // this.map.addOverlays([geojson]);
    },
    //获取菜单数据
    getData() {
      let self = this;
      let params = {
        url: IPconfig.url + "test",
        method: "get"
      };
      let successcallback = function(data) {
        self.dataJson = data.data;
        let num = 1;
        self.choose(1, self.dataJson[num].icon_after, self.dataJson[num]);
      };
      let errorcallback = function(data) {};
      self.resource.resourceUnit(params, successcallback, errorcallback);
    },
    //去往详情页面
    goDetail() {
      localStorage.setItem("detail", JSON.stringify(this.describe.detail));
      this.$router.push("/detail");
    },
    //校区切换事件
    school(val, data) {
      this.schoolFlag = val;
      this.schoolData = data;
      if (this.schoolData.name == "衣锦校区") {
        this.map.setZoomAndCenter(17, [119.728392, 30.237503]);
      } else {
        this.map.setZoomAndCenter(17, [119.727738, 30.25742]);
      }
    },
    changeSchoolClick() {
      this.changeSchool = !this.changeSchool;
    },
    //清除路线
    clearRouter() {
      this.walking.clear();
      this.clear.show = false;
      this.longtiu = [];
      this.langtiu = [];
    },
    // setSearchMark(data){
    //   this.SearchMark
    // },
    //查看poi点
    gocenter(data) {
      console.log(data);
      this.setMark(data);
      // this.choose(
      //   data.flag,
      //   this.dataJson[data.flag].icon_after,
      //   this.dataJson[data.flag]
      // );
      if (data.position) {
        this.map.setZoomAndCenter(20, data.position);
      } else {
        // this.marktextArr.forEach((data,index)=>{
        //   if()
        // })
      }
      if (this.indexs != data.flag) {
        this.indexs = data.flag;
      }
      if (!this.searchshow) {
        this.$refs.rightTopMenu.style.zIndex = "0";
      } else {
        this.$refs.rightTopMenu.style.zIndex = "10";
      }
      this.searchshow = !this.searchshow;
      this.describe.detail.pointsImg = data.picture;
      this.describe.detail.text = data.name;
      // if (data.position) {
      // } else {
      //   alert(2);
      // }
      this.describe.detail.position = data.position;

      this.describe.detail.description = data.detail;
      this.describe.detail.panorama = data.panorama;
      this.describe.show = true;
      // this.$router.push("/home/imagedetail");
      this.postSearch(data.name);
    },
    gohere(val) {
      if (val == 1) {
        this.longtiu = this.describe.detail.position;
      } else {
        this.langtiu = this.describe.detail.position;
      }
      this.describe.show = false;
      if (this.longtiu.length > 0 && this.langtiu.length > 0) {
        this.navigation();
      }
    },
    //地图工具类
    handlermap(val) {
      switch (val) {
        case 1: //放大
          this.map.zoomIn();
          break;
        case 2: //缩小
          this.map.zoomOut();
          break;
        case 3: //定位
          this.goLocationCenter(); //定位
          break;
      }
    },
    //定位事件
    goLocationCenter() {
      window.maptest.positionStatus = "正在定位中,请稍候";
      window.maptest.shareFlag = true;
      this.map.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：无穷大
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          buttonPosition: "RB",
          showCircle: false,
          panToLocation: false
        });
        var self = this;
        window.maptest.map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", data => {
          window.maptest.longtiu = [
            data.position.getLng(),
            data.position.getLat()
          ];

          if (
            window.maptest.Polygonss.contains(window.maptest.longtiu) ||
            window.maptest.Polygons.contains(window.maptest.longtiu)
          ) {
            window.maptest.positionStatus = "定位成功";
            window.maptest.shareFlag = true;
            setTimeout(() => {
              window.maptest.shareFlag = false;
            }, 2000);
          } else {
            window.maptest.positionStatus = "当前位置不在校区范围";
            window.maptest.shareFlag = true;
            setTimeout(() => {
              window.maptest.shareFlag = false;
            }, 2000);
          }

          // alert("成功");
        }); //返回定位信息
        AMap.event.addListener(geolocation, "error", () => {
          // alert("2");
          window.maptest.positionStatus = "定位失败";
          window.maptest.shareFlag = true;
          setTimeout(() => {
            window.maptest.shareFlag = false;
          }, 2000);
        }); //返回定位出错信息
      });
    },
    onComplete() {
      alert(data.position.getLng());
    },
    search() {
      if (!this.searchshow) {
        this.$refs.rightTopMenu.style.zIndex = "0";
      } else {
        this.$refs.rightTopMenu.style.zIndex = "10";
      }
      this.searchshow = !this.searchshow;
      this.searchlist = [];
      this.searchvalue = "";
    },
    //poi点菜单点击事件
    gorightdetail(val, data) {
      console.log(data);
      this.rindex = val;
      this.rightshow = false;
      document.getElementById("app").scrollTop = 0;
      if (data.position) {
        this.gushu = data;

        this.map.setZoomAndCenter(20, data.position);
        this.describe.detail.pointsImg = data.picture;
        this.describe.detail.text = data.name;
        this.describe.detail.position = data.position;
        this.describe.detail.description = data.detail;
        this.describe.detail.panorama = data.panorama;
        this.describe.show = true;
      } else {
        // if
        // window.open(data.url);
        if (data.id == -100) {
          this.schoolTime = true;
        } else {
          if (data.url) {
            document.getElementById("Iframe").src = data.url;
            this.vrShow = true;
          } else {
            this.marktextList.filter((p, index) => {
              if (p.theone == data.theone) {
                // data.position = p.position;
                let test = {};
                test = JSON.parse(JSON.stringify(data));
                test.position = p.position;
                if (test.position) {
                  this.map.setZoomAndCenter(17, test.position);
                  this.markerClick(test);
                }
              }
            });
          }
        }
      }
    },
    goright() {
      this.rightshow = !this.rightshow;
      document.getElementById("app").scrollTop = 0;
    },
    tovideo() {},
    changemask() {
      this.schoolTime = false;
      this.imagedetail = false;
      this.dialog.show = false;
      this.path.show = false;
      if (this.describe.show) {
        if (this.audio) {
          this.audio.pause();
          this.audio.currentTime = 0;
        }
      }
      this.describe.show = false;
      this.position.show = false;
      this.audio_off_on = false;
    },
    //图层切换事件
    planet(val, data) {
      let center = [];
      console.log(val);
      this.vindex = val;
      // if (this.schoolData.name == "衣锦校区") {
      //   center = [119.728392, 30.237503];
      // } else {
      //   center = [119.727738, 30.25742];
      // }
      // this.map = new AMap.Map("map", {
      //   resizeEnable: true,
      //   // center: [119.728028, 30.23735],
      //   center: center,
      //   expandZoomRange: true,
      //   zoom: 17,
      //   zooms: [16, 20],
      //   features: ["bg", "road", "building"],
      //   layers: [this.tiandituBase, this.tiandituBaseSchool]
      // });
      this.mapname = this.planetList[this.vindex - 1].name;
      this.url = data.image;
      this.tiandituBase.show();
      this.tiandituBase.setTileUrl(data.url);
      this.tiandituBase.reload();
      this.tiandituBaseSchool.show();
      this.tiandituBaseSchool.setTileUrl(data.url1);
      this.tiandituBaseSchool.reload();
      this.dialog.show = false;
      if (this.borderGeojson) {
        this.borderGeojson.hide();
      }
      if (this.borderGeojsonBei) {
        this.borderGeojsonBei.hide();
      }
      this.map.setFeatures([]);
      switch (val) {
        case 1:
          this.roadNetLayer.setMap(this.map);
          this.satellLayer.setMap(null);
          break;
        case 2:
          this.satellLayer.setMap(this.map);
          this.roadNetLayer.setMap(null);
          this.setBorderGeogson();
          if (this.borderGeojson) {
            this.borderGeojson.show();
          } else {
            this.setBorderGeogson();
          }
          if (this.borderGeojsonBei) {
            this.borderGeojsonBei.show();
          } else {
            this.setBorderGeogson();
          }
          break;
        case 3:
          this.roadNetLayer.setMap(this.map);
          this.satellLayer.setMap(null);
          break;
        case 4:
          this.satellLayer.setMap(null);
          this.roadNetLayer.setMap(this.map);
          this.tiandituBase.hide();
          this.tiandituBaseSchool.hide();
          this.map.setFeatures(["bg", "road", "building"]);
          // if (this.schoolData.name == "衣锦校区") {
          //   center = [119.728392, 30.237503];
          // } else {
          //   center = [119.727738, 30.25742];
          // }
          // this.map = new AMap.Map("map", {
          //   resizeEnable: true,
          //   // center: [119.728028, 30.23735],
          //   center: center,
          //   expandZoomRange: true,
          //   features: ["bg", "road", "building", "point"]
          // });
          // this.map.remove([this.satellLayer, this.tiandituBase]);
          // this.map.setFeatures(["building", "road", "bg"]);
          // this.roadNetLayer.setMap(null);
          // this.tiandituBase.reload();
          break;
      }
    },
    choosetype(val) {
      if (val == 2) {
        this.dialog.show = true;
      } else if (val == 3) {
        this.path.show = true;
      } else if (val == 4) {
        this.$router.push("/home/activity");
      }
    },
    //一级菜单点击事件
    choose(val, img, name) {
      this.firstGo++;
      this.schoolTime = false;
      this.flagName = name;
      this.indexs = val;
      this.rindex = null;
      this.circleImg = img;
      if (name.name == "植物园") {
        if (this.geojson) {
          this.geojson.clearOverlays();
          this.geojson.show();
          this.setMarktext();
          this.setGeoGson();
        } else {
          this.setGeoGson();
          this.setMarktext();
        }
      } else {
        if (this.geojson) {
          this.map.remove(this.marktextArr);
          this.geojson.hide();
          // this.
        }

        if (name.name == "漫游校园") {
          // img = "static/image/manyou.png";
        } else if (name.name == "校庆专栏") {
          // img = "static/image/xiaoqing.png";
          console.log(name.pointsList.length);
          // name.pointsList = [];
          if (
            name.pointsList[name.pointsList.length - 1].name !=
            "60周年校庆进程安排"
          ) {
            name.pointsList.push({ name: "60周年校庆进程安排", id: "-100" });
          }
        } else if (name.name == "活动发布") {
          // img = "static/image/huodong.png";
        }
        if (name.name == "校庆专栏") {
          this.therm = true;
          document.getElementsByClassName(
            "swiper-container"
          )[0].style.background =
            "#ff613f";
        } else {
          this.therm = false;
          document.getElementsByClassName(
            "swiper-container"
          )[0].style.background =
            "rgba(0, 157, 116, 1)";
        }
        this.menuList = this.dataJson[val];
      }
      if (this.dataJson[val].child) {
        this.rightList = this.dataJson[val];
        this.threeMenuClick(this.threeMenuFlag);
      } else {
        this.rightList = this.dataJson[val];
        this.setMark(this.dataJson[val]);
      }
      if (this.firstGo != 1) {
        this.rightshow = true;
      }
    }
  }
};
</script>

<style lang="less">
.opacityChooseImgColor {
  color: #f25a00 !important;
}
.toastShares {
  position: fixed;
  width: auto;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 70px;
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
.threeMenuContain {
  height: 44px;
  line-height: 44px;
  span {
    color: #292929;
    font-size: 12px;
    font-family: MicrosoftYaHei;
    margin-left: 39px;
  }
}
.threeMenuImg {
  position: relative;
  top: 5px;
  right: 40px;
  left: 0;
  margin-right: 40px;
}
.schoolTimeCon {
  width: 100%;
  height: 100%;
  position: relative;
  .deleteSchoolImg {
    position: absolute;
    top: 5px;
    left: 5px;
    z-index: 9999;
  }
}
.schoolTime {
  position: absolute;
  z-index: 99999;
  width: 90%;
  height: 80%;
  top: 10%;
  left: 5%;
  box-sizing: border-box;
  padding: 10px;
  overflow-y: auto;
  // background-image: url("../../assets/image/table.png");
  .tableImg {
    width: 100%;
  }
}
.vrShow {
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
.amap-geolocation-con {
  display: none;
}
.lineColor {
  color: #009d74 !important;
}
.changeThem {
  background-color: rgba(255, 97, 63, 1) !important;
}
.routerShow {
  background-color: rgba(255, 255, 255, 1);
  border-radius: 6px 6px 6px 6px;
  width: 80%;
  position: fixed;
  left: 50%;
  top: 40%;
  z-index: 99999;
  transform: translate(-50%, -40%);
  // height: 200px;
  .routerList {
    margin: 10px 30px 10px;
    width: 100%;
    img {
      width: 20px;
      height: 20px;
      position: relative;
      top: 5px;
    }
    span {
      display: inline-block;
      margin-left: 5px;
      color: #2e2e2e;
      font-size: 12px;
    }
  }
}
.customMark {
  max-width: 120px;
  position: relative;
  height: 30px;
  .customMarkBg {
    display: inline-block;
    float: left;
    background: #fff;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    line-height: 20px;
    text-align: center;
    img {
      height: 12px;
      width: 12px;
      margin-top: 4px;
    }
  }

  span {
    // display: inline-block;
    // color: #222222;
    // position: absolute;
    // left: 22px;
    // font-size: 11px;
    // // -webkit-text-stroke: 1px #fff;
    // font-family: MicrosoftYaHei;
    // text-shadow: 0 1px #fff, 1px 0 #fff, -1px 0 #fff, 0 -1px #fff;
    // top: 3px;
  }
  // color: red;
}
.opacityChooseImg {
  span {
    color: #f25a00 !important;
  }
}
.toast {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 70px;
  z-index: 9;
  border-radius: 5px;
  background-color: rgba(14, 14, 14, 0.5);
  p {
    box-sizing: border-box;
    padding: 7px 10px;
    color: #fffefe;
    font-size: 12px;
  }
}
.detailTitle {
  box-sizing: border-box;
  padding: 0 12px;
  height: 30px;
  line-height: 30px;
  position: relative;
  .detailTitleImg {
    display: inline-block;
    float: right;
    position: absolute;
    right: 12px;
    top: 3px;
    img {
      zoom: 0.6;
    }
    img:nth-child(2) {
      margin: 0 25px;
    }
  }
  span {
    display: inline-block;
    color: #262626;
    font-size: 13px;
    width: 87%;
    height: 100%;
    overflow: hidden;
  }
}
.school {
  span {
    color: rgba(0, 157, 128, 1) !important;
  }
}
.shanglaImg {
  zoom: 0.5 !important;
  margin-top: 5px;
}
.choosetypesConClick {
  border: solid 2px rgba(22, 111, 63, 0.85);
}
.choosetypesCon {
  // margin-top: 15px;
  width: 48px;
  height: 50px;
  display: inline-block;
  border-radius: 6px 6px 6px 6px;
  //   border: solid 2px rgba(22, 111, 63, 0.85);
  text-align: center;
  line-height: 50px;
  .verturemenucon {
    width: 44px !important;
    height: 44px !important;
    margin-top: 3px;
    margin-left: 2px;
    .verturemenucontain {
      width: 100% !important;
      height: 33px !important;
    }
  }
}
.choosetypesCon:nth-child(1) {
  margin-left: 12px;
}
.choosetypesCon:nth-child(2) {
  margin: 0 12px;
}
.choosetypesCon:nth-child(4) {
  margin-left: 12px;
  //   float: right;
  //   margin-top: 7px;
}
.blankSearch {
  height: 131px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 3px;
  color: #c1c1c1;
  font-size: 13px;
  letter-spacing: 2px;
  line-height: 131px;
  text-align: center;
}
.hotSearch {
  box-sizing: border-box;
  padding: 12px;
  height: auto;
  // min-height: 131px;
  .hotSearchFont {
    display: inline-block;
    color: #ff833a;
    font-size: 12px;
    margin: 5px 8px;
  }
  .hotSearchCon {
    color: #ff833a;
    font-size: 12px;
    span {
      display: inline-block;
      margin-left: 5px;
      position: relative;
      top: -1px;
    }
    img {
      zoom: 0.5;
    }
  }
}
.searchlist {
  position: absolute;
  z-index: 99;
  top: 37px;
  max-height: 300px;
  overflow-y: auto;
  left: 0;
  margin-left: 19px;
  width: calc(~"100% - 19px") !important;
  background: #fff;
  .searhlistcon:nth-child(1) {
    border-top: 1px solid #f5f5f5;
  }
  .searhlistcon {
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    padding: 12px;
    img {
      width: 15px;
      position: absolute;
      height: 17px;
      top: 12px;
    }
    span {
      display: inline-block;
      margin-left: 28px;
      font-size: 12px;
      color: #0cbb6e;
    }
  }
}
.rightTopMenu {
  position: absolute;
  pointer-events: all !important;
  left: 12px;
  z-index: 10;
  top: 12px;
  transition: all ease 0.4s;
  margin-bottom: 2px;
  .rightTopMenuList {
    z-index: 99;
    width: 100%;
    line-height: 34px;
    height: 34px;
    background-color: #fff;
    position: relative;
    text-align: center;

    span {
      color: #969696;
      font-size: 12px;
      // line-height: 25px;
    }
    img {
      zoom: 0.6;
      position: absolute;
    }
    img:nth-child(1) {
      left: 5px;
      top: 14px;
    }
  }
  .rightTopMenuCon {
    width: 87px;
    height: 34px;
    background-color: rgba(0, 157, 116, 1);
    border-radius: 3px;
    text-align: center;
    line-height: 34px;
    position: relative;
    span {
      color: #ffffff;
      font-size: 12px;
    }
    img {
      zoom: 0.6;
      position: absolute;
    }
    img:nth-child(1) {
      left: 5px;
      top: 14px;
    }
    img:nth-child(2) {
      right: 9px;
      top: 17px;
      zoom: 0.8;
    }
  }
}
.searchshows {
  width: calc(~"100% - 53px") !important;
  margin-right: 0px !important;
}
.leftTopCon {
  width: 34px;
  height: 34px;
  background-color: rgba(0, 157, 116, 1);
  border-radius: 3px;
  line-height: 44px;
  float: right;
  position: relative;
  z-index: 9;
  text-align: center;
  img {
    // display: none;
    zoom: 0.7;
  }
}
.leftTopMenu {
  transition: all ease 0.4s;
  //   pointer-events: none;
}
.leftTopMenuRight {
  float: right;
  width: 100%;
  box-sizing: border-box;
  input {
    outline: none;
    float: right;
    border: none;
    width: 0;
    margin-right: -23px;
    height: 34px;
    transition: width 0.4s;
    box-sizing: border-box;
    padding-left: 10px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
}
.imgSmall {
  height: 124px;
  width: 47%;
  background-size: cover;
  background-position: center;
  display: inline-block;
}

.clear {
  width: 73px;
  height: 28px;
  font-size: 12px;
  position: fixed;
  z-index: 9;
  cursor: pointer;
  bottom: 70px;
  transition: all 0.4s ease;
  left: 50%;
  transform: translate(-50%);
  background: #fff;
  text-align: center;
  border-radius: 14px;
  color: #0cbb6e;
  line-height: 28px;
}

.hideclear {
  bottom: -100px !important;
}

/*.opacityImg .homeimg2  {*/
/*color:#0cbb6e !important;*/
/*}*/
.homeimg1 {
  color: #fff;
  font-family: MicrosoftYaHei;
}
.opacityImg .homeimg1 {
  /*color:#0cbb6e !important;*/
  font-weight: 900;
  text-shadow: 0 0 0px #fff;
  font-family: MicrosoftYaHei-Bold !important;
}
.allwidth {
  width: 100% !important;
}

.exit {
  font-size: 12px;
  color: #fff;
  position: absolute;
  top: 16px;
  z-index: 99;
  right: -35%;
  cursor: pointer;
}

.explainsize {
  color: #0cbb6e !important;
  left: 8px !important;
}

.explain {
  position: absolute;
  top: 15px;
  left: 35px;
  color: #c8c8c8;
  font-size: 10px !important;
}

.home {
  height: 100%;
  width: 100%;
  position: relative;
  .switch_core {
    height: 15px !important;
    width: 28px !important;
  }
  .switch_core .switch_button {
    width: 10px !important;
    height: 10px !important;
  }
  .swiper-slide {
    width: auto !important;
  }
  .rightenter {
    height: 300px !important;
    max-height: 300px;
    overflow-y: auto;
  }
  .rightmenu {
    width: 100%;
    // transition: all 0.4s ease;
    transition: height 0.4s;
    background-color: rgba(255, 255, 255, 0.97);
    height: 0;
    .threeMenu {
      box-sizing: border-box;
      // margin: 0 20px;
      .el-collapse {
        border-top: none !important;
        padding: 0 20px;
      }
      .el-collapse-item__content {
        padding: 0 !important;
      }
      .el-carousel__mask,
      .el-cascader-menu,
      .el-cascader-menu__item.is-disabled:hover,
      .el-collapse-item__header,
      .el-collapse-item__wrap {
        background-color: transparent !important;
      }
    }
    // padding: 0 20px;
    .rightmenuDiv:nth-child(1) {
      border-top: 1px solid #e6e6e6;
    }
    .rightmenuDiv div {
      height: 48px; // border-top: 1px solid #e6e6e6;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      box-sizing: border-box;
      padding: 0 20px;
      img {
        position: absolute;
        top: 30px;
        left: 20px;
        // height: 25px;
        // width: 25px;
        zoom: 0.5;
      }
      span {
        display: inline-block;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        line-height: 48px;
        color: #303133;
        margin-left: 20px;
      }
    }
  }

  .diaologbg {
    width: 100%;
    position: relative;
    // height: 200px;
  }
  .dialogbngcon {
    position: absolute;
    top: 0;
    width: 100%;
  }
  .dialog {
    width: 80%;
    z-index: 99999;
    position: fixed;
    left: 50%;
    top: 40%;
    border-radius: 3px;
    background-color: #fff;
    transform: translate(-50%, -40%);
    .describego {
      -webkit-margin-before: 0;
      -webkit-margin-after: 0; // line-height: 20px;
      font-size: 12px;
      line-height: 20px;
      margin-bottom: 10px;
      text-align: center;
      color: rgb(12, 187, 110);
    }
    .describetab {
      margin: 10px 0 10px 0;
      height: 35px;
      width: 100%;
      border: 1px solid #f0f0f0;
      border-right: none;
      border-left: none;
      cursor: pointer;
      // overflow: hidden;
      div {
        display: inline-block;
        border-right: 1px solid #f0f0f0;
        line-height: 35px;
        text-align: center;
        width: 100%;
        position: relative;
        img {
          position: absolute;
          top: 5px;
          height: 24px;
          width: 24px;
        }
        span {
          display: inline-block;
          margin-left: 27px;
          color: rgb(12, 187, 110);
          font-size: 12px;
        }
      }
      div:nth-child(3) {
        border-right: none;
      }
    }
    .describeimg {
      box-sizing: border-box;
      padding: 0 12px;
      img {
        width: 30%;
        height: 92px;
        display: inline-block;
      }
      .imgSmallDetail {
        display: -webkit-box;
        width: 51%;
        display: inline-block;
        font-size: 12px;
        position: relative;
        float: right;
        font-size: 12px;
        .imgSmallDetailbtn {
          margin-top: 7px;
          span {
            display: inline-block;
            background-color: rgba(0, 157, 128, 1);
            color: #ffffff;
            font-size: 12px;
            box-sizing: border-box;
            padding: 0 2%;
            // width: 45%;
            text-align: center;
            line-height: 23px;
          }
          span:nth-child(2) {
            float: right;
          }
        }
        .imgSmallDetailFontbtn {
          clear: both;
          color: #ff833a;
          text-align: right;
          font-size: 12px;
          height: 22px;
          line-height: 22px;
        }
        .imgSmallDetailFont {
          display: -webkit-box;
          clear: both;
          width: 100%;
          height: 68px;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          text-indent: 1em;
          // height: 70px;
          -webkit-line-clamp: 4;
          word-wrap: break-word;
          overflow: hidden;
        }
      }
    }
    .margintype {
      margin: 0 5%;
    }
    .positioncon {
      -webkit-margin-before: 0;
      -webkit-margin-after: 0; // line-height: 20px;
      font-size: 12px;
      color: rgb(51, 51, 51);
      text-align: center;
      line-height: 50px;
      margin-bottom: 20px;
    }
    .dialogtitle {
      background-color: rgba(0, 157, 116, 1);
      height: 28px;
      line-height: 28px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      -webkit-margin-before: 0;
      -webkit-margin-after: 0; // line-height: 20px;
      //   margin-top: 20px;
      text-align: left;
      padding-left: 12px;
      font-size: 15px;
      // position: absolute;
      // z-index: 99;

      // top: 0;
      color: #fff;
    }
    .dialogchoosetype {
      height: 83px;
      width: 100%;
      display: flex;
      align-items: center;
      //   text-align: center;
      line-height: 83px;
      .choosetypes {
        display: inline-block;
        position: relative;
        margin-top: 20px;
        img {
          height: 37px;
          width: 37px;
        }
        span {
          position: absolute;
          top: 35px;
          font-size: 12px;
          color: #0cbb6e;
          left: -1px;
          width: 40px;
        }
      }
    }
  }
  .hideleftmenu {
    left: -100px !important;
  }
  .leftmenu {
    position: absolute;
    left: 10px;
    bottom: 60px;
    transition: all 0.4s ease;
    z-index: 9;
    .leftmenucontains {
      margin-top: 10px;
      width: 30px;
      height: 35px;
      border-radius: 4px;
      background-color: #fff;
      img {
        height: 28px;
        width: 28px;
        margin-top: 3px;
        margin-left: 1px;
      }
    }
    .leftmenucon {
      width: 30px;
      height: 70px;
      border-radius: 4px;
      background-color: #fff;
      .leftmenucontain {
        img {
          height: 28px;
          width: 28px;
          margin-top: 3px;
          margin-left: 1px;
        }
      }
    }
  }
  .switch {
    // margin-top: 8px;
    // width: 62px;
    // height: 30px;
    width: 100%;
    text-align: center;
  }
  .hideverturemenu {
    left: -100px !important;
  }
  .verturemenu {
    position: absolute;
    left: 12px;
    top: 58px;
    transition: all 0.4s ease;
  }
  #contain {
    width: 100%;
    height: 100%;
  }
  .hidehomemenu {
    bottom: -100px !important;
  }
  .btMenu {
    position: absolute;
    bottom: 0;
    z-index: 999;
    height: auto;
    transition: all ease 0.4s;
    width: 100%;
  }
  .homemenu {
    height: 48px;
    /*line-height: 48px;*/
    position: relative;
    transition: all 0.4s ease;
    z-index: 999;
    background: rgba(0, 157, 116, 1);
    width: 100%;
    // overflow-x: hidden;

    input {
      text-decoration: none;
      border: none;
      border: 1px solid #f5f5f5;
      outline: 0;
      color: #0cbb6e;
      border-radius: 80px;
      -webkit-appearance: none;
      background-color: #f0f0f0;
      height: 32px; // width: 100%;
      //   border-radius: 4px;
      width: 140%;
      margin-top: 8px;
      box-sizing: border-box;
      padding-left: 30px; // margin-left: -1000px;
    }
    .sousuo {
      transition: all 0.8s ease;
      position: relative;
      background: #0cbb6e;
    }
    input:active {
      border: none;
      border: 1px solid #f5f5f5;
    }

    .swiper-container {
      height: 44px !important;
      background: rgba(0, 157, 116, 1);
    }
    .homemmenuimg {
      height: 48px;
      width: 100%;
      span:nth-child(1) {
        display: inline-block;
        position: relative;
        // margin-top: 5px;
        line-height: 48px;
        // padding: 2px 10px;
        img {
          width: 24px;
          /*height: 22px;*/
          top: 4px;
          position: absolute;
        }
      }
      span:nth-child(2) {
        display: inline-block;
        margin-left: 25px;
        color: #fff;
        font-size: 15px;
      }
    }

    .right {
      width: 32px;
      height: 48px;
      position: absolute;
      line-height: 40px;
      text-align: center;
      top: 0px;
      .shangla {
        zoom: 0.5;
        margin-top: 39px !important;
      }
      img {
        margin-top: 19px;
      }
    }

    .right {
      right: 1px;

      transition: all 0.4s ease;
    }
    .search1 {
      margin-left: 58px !important;
    }
    .search2 {
      margin-left: 800px !important;
    }
    .rightsearch {
      left: 80000px !important;
    }
    .centers {
      // margin: 1px 58px;
      // margin-left: 58px;
      margin-left: -800px;

      background-color: #fff;
      width: auto;
      width: 60%;
      transition: all 0.6s ease;
      float: left;
      height: 40px;
      display: inline-block;
    }
    .center {
      margin: 2px 40px 2px 12px;
      background-color: #fff;
      width: auto;
      transition: all 0.6s ease;
      height: 40px;
      width: auto; // display: inline-block;
    }
  }
}

.imagedetail {
  width: 80%;
  // height: 80%;
  max-height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  z-index: 99999;
  overflow-y: auto;
  background-color: #f5f5f5;
  .activitydetailzts {
    line-height: 25px;
    font-size: 12px;
    color: rgb(51, 51, 51);
    text-indent: 2em;
    padding: 0 20px;
    background-color: #fff;
  }
  .imagedetailjs {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0; // line-height: 20px;
    line-height: 38px;
    background-color: #fff;
    font-size: 16px;
    border-bottom: 1px solid #e6e6e6;
    padding-left: 20px;
    position: relative;
    margin-top: 10px;
    span:nth-child(1) {
      display: inline-block;
      height: 28px;
      position: absolute;
      top: 5px;
      width: 4px;
      background-color: rgb(12, 187, 110);
    }
    span:nth-child(2) {
      display: inline-block;
      margin-left: 10px;
      color: rgb(12, 187, 110);
    }
  }
  .imagedetailname {
    -webkit-margin-before: 0;
    -webkit-margin-after: 0; // line-height: 20px;
    line-height: 38px;
    background-color: #fff;
    font-size: 16px;
    color: rgb(51, 51, 51);
    padding-left: 20px;
    margin-top: -5px;
    position: relative;
    img {
      position: absolute;
      right: 40px;
      width: 48px;
      height: 48px;
      top: -24px;
    }
  }
  .imagedetailimg {
    width: 100%; // background: #fff;
    max-height: 200px;
  }
}
#makrFz {
  display: none;
}
.markFz {
  display: inline-block;
  color: #222222;
  position: absolute;
  left: -14px;
  font-size: 12px;
  overflow: hidden;
  height: 20px;
  left: 50%;
  /* width: 100px; */
  transform: translate(-50%, 0);
  white-space: nowrap;
  text-overflow: ellipsis;
  // -webkit-text-stroke: 1px #fff;
  font-family: MicrosoftYaHei;
  text-shadow: 0 1px #fff, 1px 0 #fff, -1px 0 #fff, 0 -1px #fff;
  top: -20px;
}
</style>
