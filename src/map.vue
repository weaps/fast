<template>
  <!-- 地图模块 -->
  <div class="map-content">
    <!-- 地图 -->
    <div class="map-main">
      <div v-show="mapNoData">
        <div class="nodataMap">
          <div class="text">暂无学校数据，无法显示学校在地图中位置！</div>
        </div>
      </div>
      <div v-show="!mapNoData" class="" id="bMap" @mouseover='mouseOver' @mouseout="mouseOut" style="width: 100%;height: 100%"></div>
    </div>
    <!-- 学校数据浮框 -->
    <div v-show="!mapNoData"  class="school-data-table">
      <table cellspacing="0" cellpadding="0" :class="{'h31': !hasDetail}">
        <thead>
        <tr>
          <th v-bind:colspan="dataLength+1"  id="schoolName"></th>
        </tr>
        </thead>
        <tbody class="detail_data"  v-if="mark==0" v-show="false" >
        <tr>
          <td></td>
        </tr>
        </tbody>
        <tbody class="detail_data"  v-if="mark==1 && hasDetail" >
        <tr>
          <td>该校未接入系统，无法查看数据！</td>
        </tr>
        </tbody>
        <tbody class="detail_data" v-else-if="mark ==2 && hasDetail">
        <tr>
          <td>该校未使用排课系统，无法查看数据！</td>
        </tr>
        </tbody>
        <tbody class="detail_data" v-else-if="hasDetail && mark != 0">
        <tr>
          <td></td>
          <td v-for="subject in detailData" >{{subject.subjectName}}</td>
        </tr>
        <tr>
          <td>师生比</td>
          <td v-for="subject in detailData" :class="{exceed_item:(Number(subject.stuAndTea) > Number(subject.standardRate))}"><span>{{subject.stuAndTeaRate}}</span></td>
        </tr>
        <tr>
          <td>标准值</td>
          <td v-for="rate in detailData">1:{{rate.standardRate}}</td>
        </tr>
        <tr>
          <td>周课时</td>
          <td v-for="week in detailData" :class="{under_item:(Number(week.weekLessonNum) < Number(week.lessonStandardNum))}"><span :class="{exceed_item:(Number(week.weekLessonNum) > Number(week.lessonStandardNum))}">{{week.weekLessonNum}}</span></td>
        </tr>
        <tr>
          <td>标准值</td>
          <td v-for="lesson in detailData" >{{lesson.lessonStandardNum}}</td>
        </tr>
        <tr>
          <td></td>
          <td v-bind:colspan="dataLength" class="state-show">
            <span><i>红色</i>超标</span>
            <span><i>绿色</i>未达标</span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  let echarts = null
  let BMap = window.BMap;
  var x;
  var y;
  $(document).mousemove(function(e){
    x = e.pageX;
    y = e.pageY;
  });
  var centerPosition = [];
  var app = {};
  var currentIndex = -1;
  var index = -1;
  var timer;
  var selectTime;
  let chart;
  export default {
    props: {
      mapNoData: {
        type: Boolean,
        default() {
          return false
        }
      },
      switchMark:{
        type: String,
        default() {
          return ''
        }
      }
    },
    data: function () {
      return {
        cachedData: [],
        detailData:[],
        mark:0,
        dataLength:6,
        hasDetail:true,
        mapData: []
      }
    },
    created() {
      echarts = this.$echarts;
    },
    watch: {
      mapData(newVal, oldVal) {
        this.cachedData = newVal;
        this.$nextTick(() => {
          this.setbaiduMap("0")
        })
      },
      switchMark(newVal, oldVal){
        if (newVal == '0'){
          clearTimeout(timer);
        }else {
          this.$nextTick(() => {
            this.setbaiduMap("1");
          })
        }
      },
      hasDetail(newVal, oldVal){
        var div = $('#bMap');
        var y1 = div.offset().top;
        var y2 = y1 + div.height();
        var x1 = div.offset().left;
        var x2 = x1 + div.width();
        if( x < x1 || x > x2 || y < y1 || y > y2){
          this.hasDetail = true;
        }else{
          this.hasDetail = false;
        };
      }
    },
    methods: {
      mouseOver: function () {
        this.hasDetail = false;
      },
      mouseOut: function () {
        this.hasDetail = true;
      },
      setbaiduMap:function (mark) {
        if (mark =='0'){
          currentIndex = -1;
          index = -1;
        }
        var _this = this;
        var data = this.cachedData;
        if (chart != null && chart != "" && chart != undefined){
          chart.dispose();
        }
        if(data.length>0){
          chart = echarts.init(document.getElementById('bMap'));
          var option = {
            animation: false,
            bmap: {
              center: centerPosition,
              zoom: 9,
              roam: false,
              enableMapClick: false,
              mapStyle: {
                styleJson: [{
                  'featureType': 'land', //调整土地颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#0B183C'
                  }
                }, {
                  'featureType': 'building', //调整建筑物颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#04406F'
                  }
                }, {
                  'featureType': 'building', //调整建筑物标签是否可视
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'highway', //调整高速道路颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#003051'
                  }
                }, {
                  'featureType': 'highway', //调整高速名字是否可视
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'arterial', //调整一些干道颜色
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#003051'
                  }
                }, {
                  'featureType': 'arterial',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'green',
                  'elementType': 'geometry',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'water',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#044161'
                  }
                }, {
                  'featureType': 'subway', //调整地铁颜色
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#003051'
                  }
                }, {
                  'featureType': 'subway',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'railway',
                  'elementType': 'geometry',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'railway',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'all', //调整所有的标签的边缘颜色
                  'elementType': 'labels.text.stroke',
                  'stylers': {
                    'color': '#313131'
                  }
                }, {
                  'featureType': 'all', //调整所有标签的填充颜色
                  'elementType': 'labels.text.fill',
                  'stylers': {
                    'color': '#069aff'
                  }
                }, {
                  'featureType': 'manmade',
                  'elementType': 'geometry',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'manmade',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'local',
                  'elementType': 'geometry',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'local',
                  'elementType': 'labels',
                  'stylers': {
                    'visibility': 'off'
                  }
                }, {
                  'featureType': 'subway',
                  'elementType': 'geometry',
                  'stylers': {
                    'lightness': -65
                  }
                }, {
                  'featureType': 'railway',
                  'elementType': 'all',
                  'stylers': {
                    'lightness': -40
                  }
                }, {
                  'featureType': 'boundary',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#8b8787',
                    'weight': '1',
                    'lightness': -29
                  }
                }]
              }
            },
            visualMap: {
              type: 'piecewise',
              pieces: [
                {gt: 0,lte:1},
                {gt: 1,lte:2},
                {gt: 2,lte:3},
                {gt: 3,lte:4},
                {gt: 4,lte:5},
                {gt: 5,lte:6}
              ],
              dimension:3,
              inRange: {
                //symbol: ['image://static/wfg_school_big.png','image://static/wpk_school_big.png','image://static/xzbpk_school_big.png','image://static/zbpk_school_big.png','image://static/xzbpk_warn.png','image://static/zbpk_warn.png']
              },
              outOfRange: {
                //symbol: 'image://static/wfg_school_big.png'
              },
              show: false
            },
            series: [{
              name: 'map',
              type: 'scatter',
              coordinateSystem: 'bmap',
              silent: false,//相应鼠标事件
              hoverAnimation: false,
              legendHoverLink: false,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'bottom',
                  show: false,
                  textStyle: {
                    color: '#ffffff'
                  }
                },
                emphasis: {
                  show: false
                }
              },
              zlevel: 0
            }]
          };
          chart.setOption(option);
          var bMap;
          bMap = chart.getModel().getComponent('bmap');
          if (!app.inNode) {
            // 添加百度地图插件
            bMap = chart.getModel().getComponent('bmap');
          }
          if (option && typeof option === "object") {
            chart.setOption(option, true);
          }

          var pois = [];
          $.each(data, function(i, n) {
            pois.push(new BMap.Point(n.location['lng'], n.location['lat']));
          });

          //确定中心点与缩放级别
          var map = bMap.getBMap();
          var v = map.getViewport(pois);
          chart.setOption({
            bmap: {
              center: [v.center.lng, v.center.lat],
              zoom: v.zoom
            }
          });
          clearTimeout(timer);
          clearTimeout(selectTime);
          time();
          select();
          // 轮播
          function time() {
            changeChartSelect();
            timer = setTimeout(time, 3 * 1000);
          }
          function select() {
            var dataLen = data.length;
            index = (index + 1) % dataLen;
            selectTime = setTimeout(select, 3 * 1000);
            if (index == dataLen-1){
              var t2 = setTimeout(function(){ _this.$emit('select', dataLen) },3000);
            }
          }
          // 地图轮播，切换高亮
          function changeChartSelect() {
            var dataLen = data.length;
            currentIndex = (currentIndex + 1) % dataLen;
            var tempData = [];
            if (data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                if(i==currentIndex){
                  tempData.push({
                    name: data[i].schoolName,
                    value: [data[i].location['lng'], data[i].location['lat'],
                      data[i].schoolName,data[i].schoolType
                    ],
                    symbolSize:75
                  });
                }else {
                  tempData.push({
                    name: data[i].schoolName,
                    value: [data[i].location['lng'], data[i].location['lat'],
                      data[i].schoolName,data[i].schoolType
                    ],
                    symbolSize:45
                  });
                }
              }
            }
            chart.setOption({
              series: [{
                name: 'map',
                data: tempData
              }]
            });
            // 显示当前
            $("#schoolName").html(data.length>0?data[currentIndex]["schoolName"]:"");
            _this.mark = data[currentIndex]["schoolType"];
            if (data[currentIndex]["detailData"] !=undefined){
              _this.dataLength = data[currentIndex]["detailData"].length;
              _this.detailData = data[currentIndex]["detailData"];
            }
          }
          chart.on('click', function (params) {
            var index = params.dataIndex;
            var tempData = [];
            if (data.length > 0) {
              for (var i = 0; i < data.length; i++) {
                if(i==index){
                  tempData.push({
                    name: data[i].schoolName,
                    value: [data[i].location['lng'], data[i].location['lat'],
                      data[i].schoolName,data[i].schoolType
                    ],
                    symbolSize:75
                  });
                }else {
                  tempData.push({
                    name: data[i].schoolName,
                    value: [data[i].location['lng'], data[i].location['lat'],
                      data[i].schoolName,data[i].schoolType
                    ],
                    symbolSize:45
                  });
                }
              }
            }
            chart.setOption({
              series: [{
                name: 'map',
                data: tempData
              }]
            });
            // 显示当前
            $("#schoolName").html(data.length>0?data[index]["schoolName"]:"");
            _this.mark = data[index]["schoolType"];
            if (data[index]["detailData"] !=undefined){
              _this.dataLength = data[index]["detailData"].length;
              _this.detailData = data[index]["detailData"];
            }
            currentIndex = index-1;
            _this.$emit('changMark', '0');
          });
        }
      }
    }
  }
</script>
<style lang="stylus">
  .map-content {
    width 800px
    height: 500px
    .map-main {
      width 100%
      height 100%
    }
  }
</style>
