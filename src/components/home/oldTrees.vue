<template>
   <div class="homebill home Info">
      <div class="infoTitlessss">
          <img src="../../assets/image/back.png" alt="" @click="back">
          <span>{{$route.params.name}}</span>
      </div>
      <div class="oldTressTitle"></div>
      <div class="oldTreesCon">
          <div class="oldTreesCons" v-for="(value,key,index) in oldTrees" :key="index" v-if="dataList[key]">
              <span>{{dataList[key]}}:</span>
              <span>{{choose(value)}}</span>
          </div>
      </div>
   </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      oldTrees: {},
      dataList: {
        Id: "Id",
        ResearchId: "调查号",
        CodeId: "行政代码",
        CodeName: "县名称",
        ChinaName: "中文名",
        TownName: "街道",
        VillageName: "村名",
        Zu: "组",
        SmallTerraName: "小地名",
        AreaType: "区域类型",
        Distributing: "分布",
        ByName: "别名",
        Faculty: "科",
        Belong: "属",
        Position: "位置",
        LONG: "经度",
        LAT: "纬度",
        Altitude: "海拔",
        Agrotype: "土壤类型",
        EarthPly: "土层厚度",
        CloseC: "新增古树名木原因",
        TreeAge: "树龄",
        AgeType: "年龄类型",
        ProtecLevel: "保护级别",
        TreeHigh: "树高",
        Circumference: "胸围",
        AverageGF: "平均冠幅",
        Sort: "类别",
        SZS: "生长势",
        TreeD: "树木特殊状况描述",
        Authority: "权属",
        ProtectUnit: "管护单位",
        FormerTrademark: "原挂牌号",
        ProtectActuality: "保护现状",
        ProtectVote: "保护建议",
        CheckupR: "鉴定记载",
        Photograph: "摄影者",
        LegendStory: "传说来历",
        Inquirer: "审查者",
        CheckupD: "审查日期",
        TableTime: "填表时间",
        // InsertTime: "新增时间",
        TreeNo: "树木编号",
        // TZCode: "特征代码",
        NagiType: "名木类型",
        PlantingPerson: "栽植人",
        PlantingDate: "栽植日期",
        Habitat: "影响生长环境因素",
        ExtantState: "现存状态",
        Superficiebus: "地上保护现状",
        Conservation: "养护复壮现状",
        Ecological: "生长环境",
        Remark: "备注说明",
        // Number: "古树编号",
        GHR: "管护人"
      }
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getGuShu(this.id);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    choose(name) {
      if (name) {
        return name;
      } else {
        return "无";
      }
    },
    getGuShu(id) {
      let self = this;
      let params = {
        url: IPconfig.url + "gsmm.php?method=gsmm",
        method: "post",
        body: {
          number: id
        }
      };
      let successcallback = function(data) {
        console.log(JSON.parse(data.data));
        self.oldTrees = JSON.parse(data.data).result;
      };
      let errorcallback = function(data) {};
      self.resource.resourceUnit(params, successcallback, errorcallback);
    }
  }
};
</script>

<style lang="less">
.infoTitlessss {
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
.oldTreesCon {
  margin-top: 50px;
  font-size: 12px;
  color: #252525;
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  overflow-y: auto;
  height: 100%;
  text-align: center;
  background-image: url("../../assets/image/oldTresss.png");
  background-size: 100% 100%;
  //   display: flex;
  justify-content: center;
  align-items: center;
}
.oldTreesCons {
  //   float: left;
  display: inline-block;
  text-align: center;
  margin: 5px 10px;
  width: 36%;
  text-align: center;
  overflow: hidden;
  //   overflow: hidden;
}
.oldTreesCons span:nth-child(2) {
  color: #009d74 !important;
}
.oldTreesCons span {
  display: inline-block;
  float: left;

  //   width: 50%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  //   overflow: hidden;
  //   white-space: nowrap;
}
.Info {
  width: 100%;
  height: 100%;
}
</style>
