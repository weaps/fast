<template>
  <div>
    <div>{{dataObj}}</div>
    <table class="table table-hover table-bordered">
      <thead>
      <tr>
        <th><el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></th>
        <th>bb</th>
        <th>cc</th>
        <th>dd</th>
        <th>ee</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) of list" :key="i">
          <td>
            <span class="el-checkbox__input" :class="[dataObj[item] == item ? 'is-checked' : '']" @click="handelChecked(item)">
              <span class="el-checkbox__inner"></span>
              <input type="checkbox" class="el-checkbox__original" value="">
            </span>
          </td>
          <td>bb{{item}}</td>
          <td>cc{{item}}</td>
          <td>dd{{item}}</td>
          <td>ee{{item}}</td>
        </tr>
      </tbody>
    </table>
    <input type="text" id="debounce">
    <button @click="test2">test</button>
  </div>
</template>
<script>
// import { clearTimeout, setTimeout } from 'timers';
import { debounce } from '../utils/effec';
export default {
  name: 'test',
  data() {
    return {
      list: [1,2,3,4,5,6,7,8,9,10,11,12,13,15],
      debounceAjax: null,
      dataObj: {},
      checkAll: false
    }
  },
  mounted() {
    // debugger;
    this.debounceAjax = debounce(this.ajax, 500);
    document.querySelector('#debounce').addEventListener('keyup', e => {
      // debugger;
      this.debounceAjax(e.target.value);
      this.testjs1();
    })
  },
  methods: {
    // 全选
    handleCheckAllChange () {},
    // 单选
    handelChecked(item) {
      debugger
      if (!this.dataObj[item]) {
        this.$set(this.dataObj, item, item)
        // this.dataObj[item] = item;
      } else {
        this.$delete(this.dataObj, item)
        // debugger
        // delete this.dataObj[item]
      }
    },
    ajax(data) {
      window.console.log(new Date().toLocaleTimeString() + '-' + data)
    },
    testjs1() {
      debounce()
    },
    test2() {
      window.console.log(this.debounceAjax.id)
      let date = this.getDateStr(7)
      debugger;
      window.console.log(date)
      this.debounceAjax('a')
    },
    getDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1; //获取当前月份的日期
      m = m < 10 ? '0' + m : m;
      debugger;
      var d = dd.getDate() + 5;
      d = d < 10 ? ('0' + d) : d;
      let date = []
      for (let i = 0; i < 7; i++) {
        d ++;
        date.push(y + "-" + m + "-" + d)
      }
      return date;
    }
  }
}
</script>

