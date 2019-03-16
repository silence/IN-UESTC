<template>
  <div class="schoolbus page">
    <i-toast id="toast"></i-toast>
    <div class="scroll-container">
      <div class="search">
        <div 
          :class="['origin', 'select', origin === '输入起点'&&'default']"
          @tap="() => selectPosHandle('origin')"
        >
          <span>{{ origin }}</span>
        </div>
        <div class="transfer-button" @click="exchangeHandle">
          <i class="icon iconfont icon-cycle"></i>
        </div>
        <div 
          :class="['origin', 'select', terminus === '输入终点'&&'default']"
          @tap="() => selectPosHandle('terminus')"
        >
          <span>{{ terminus }}</span>
        </div>
        <i-action-sheet
          :visible="originVisible"
          :actions="posList"
          @cancel="cancelHandle"
          @selected="selectOriginHandle"
        >
        </i-action-sheet>
        <i-action-sheet
          :visible="terminusVisible"
          :actions="posList"
          @cancel="cancelHandle"
          @selected="selectTerminusHandle"
        >
        </i-action-sheet>
      </div>
      <div class="weekbar">
        <span 
          v-for="(item, idx) in compuedWeekDays" 
          :key="idx"
          :class="['day', item.id == week && 'curr']"
          @tap="() => changeWeekday(item.id)"
        >
          {{ item.key }}
        </span>
      </div>
      <bus-table :busList="mockBusList"></bus-table>
    </div>
  </div>
</template>

<script>
import * as map from "@/utils/map";
import { isNum } from "@/utils/type";
import { getWeek } from "@/utils/time";
import BusTable from "@/components/BusTable";

const mockBusList = [
  {
    time: "11:00",
    type: 1,
    board: "清水河西门桥头"
  }
]

const pos = ["清水河校区", "沙河校区", "学府杏林", "D组团", "B组团", "地铁2号线天河路站C口"];
const weekDays = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];

export default {
  name: "schoolbus",
  components: { BusTable },
  data() {
    return {
      origin: "输入起点",
      terminus: "输入终点",
      originVisible: false,
      terminusVisible: false,
      week: "",
      mockBusList: mockBusList
    }
  },
  computed: {
    posList: function() {
      return pos.map((item, idx) => {
        return {
          name: item,
          index: idx
        }
      });
    },
    compuedWeekDays() {
      return weekDays.map((item ,idx) => {
        return {
          key: item,
          id: idx+1
        }
      })
    }
  },
  methods: {
    selectPosHandle(type) {
      this[type + "Visible"] = true;
    },
    cancelHandle(e) {
      this.originVisible = false;
      this.terminusVisible = false;
    },
    selectOriginHandle(e) {
      let id = e.target.index;
      if (!isNum(id) || id < 0) return;

      this.origin = pos[id];
      this.originVisible = false;

      this.searchHandle();
    },
    selectTerminusHandle(e) {
      let id = e.target.index;
      if (!isNum(id) || id < 0) return;

      this.terminus = pos[id];
      this.terminusVisible = false;

      this.searchHandle();
    },
    exchangeHandle() {
      if (this.origin === "输入起点" || this.terminus === "输入终点") return;
      let temp = "";
      temp = this.origin;
      this.origin = this.terminus;
      this.terminus = temp;
    },
    changeWeekday(id) {
      this.week = id;
    },
    searchHandle() {
      if (this.origin !== "输入起点" && this.terminus !== "输入终点") {
        if (this.origin === this.terminus) {
          this.$toast({
            type: "error",
            content: "起点和终点不能相同"
          });
        } else {
          console.log('search', {
            origin: this.origin,
            terminus: this.terminus,
            week: this.week
          })
        }
      }
    }
  },
  mounted() {
    const self = this;
    this.week = getWeek();

    while(map.initSDK()) {
      map.getCurrPosText().then(function(address) {
        if (!address) address = "输入起点" 
        self.origin = address;
      });
    }
    // map.getCurrPosValue("四川省成都市郫都区电子科技大学清水河校区");
  }
}
</script>

<style lang="less" scoped>
.scroll-container {
  overflow: scroll;
  box-sizing: border-box;
  padding: 0 20px;
  padding-top: 25px;
  height: 100vh;
}

.search {
  display: flex;
  padding: 10px 0;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  background: #fff;
  border-radius: 5px;
  font-size: 14px;

  .select {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex: 0 0 6em;
    height: 3em;
  }

  .transfer-button {
    display: inline-flex;
    flex: 0 0 1;
    margin: 0 30px;
  }

  .default {
    color: rgb(141, 138, 138);
  }
}

.weekbar {
  display: flex;
  margin-top: 20px;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
  color: rgb(41, 41, 41);

  .day {
    flex: 0 0 3em;
  }

  .curr {
    color: rgb(19, 19, 19);
    font-weight: 500;
  }
}
</style>