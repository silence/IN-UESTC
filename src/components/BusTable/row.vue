<template>
  <div class="row">
    <div class="time">{{ time }}</div>
    <div class="type">{{ busType }}</div>
    <div class="board">{{ board }}</div>
    <div class="stations" @tap="getStations">
      <i class="icon iconfont icon-pos"></i>
    </div>
  </div>
</template>

<script>
const busTypes = ["学生班车", "396", "教职工班车"]

export default {
  name: "TableRow",
  props: {
    time: String,
    type: Number,
    board: String
  },
  computed: {
    busType() {
      if (this.type <= 0) {
        return "";
      } else if (this.type > 4) {
        return busTypes[2];
      } else {
        return busTypes[Math.floor((this.type+1)/2)];
      }
    }
  },
  methods: {
    getStations() {
      console.log("find stations");
    }
  },
  mounted() {
    console.log(this.time)
  }
}
</script>

<style lang="less" scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;

  .time {
    flex: 0 0 6em;
    text-align: center;
  }

  .type {
    flex: 0 0 6em;
    text-align: center;
  }

  .board {
    flex: 1 0 6em;
    text-align: center;
  }

  .stations {
    flex: 0 0 2em;
    text-align: center;

    i.icon-pos::before {
      display: inline-block;
      font-size: 16px;
      transform: translateY(-2px)
    }
  }
}
</style>
