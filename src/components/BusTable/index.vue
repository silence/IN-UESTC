<template>
  <div class="bustable">
    <div class="thead">
      <div class="time h">出发时间</div>
      <div class="type h">校车</div>
      <div class="board h">起点</div>
      <div class="station h">经停</div>
    </div>
    <table-row 
      v-for="(item, idx) in busList" 
      :key="idx"
      :time="item.time"
      :type="item.type"
      :board="item.board"
    ></table-row>
  </div>
</template>

<script>
import TableRow from "./row";

export default {
  name: "BusTable",
  components: { TableRow },
  props: {
    busList: {
      type: Array,
      default: () => [
        {
          time: "",
          type: -1,
          board: ""
        }
      ]
    }
  },
  mounted() {
    console.log(this.busList)
  }
}
</script>

<style lang="less" scoped>
.bustable {
  margin-top: 10px;
  .thead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }

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

  .pos {
    flex: 0 0 2em;
    text-align: center;
  }
}
</style>

