<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <button @click="a">a</button>
    <button @click="a1">a1</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  methods:{
a(){
  var tt = { name: "hahha", test: { id: 1, msg: "hello" } };
      var nn = {};
      Object.assign(nn, tt);
      nn.name = 111;
      nn.test.msg = "aa";
      console.log("nn=>", nn);
      console.log("tt", tt);
},
a1(){
  var obj = { name: "jack", test: { id: 1, msg: "hello" } };

      function p(obj) {
        var o = {};

        for (var i in obj) {
          console.log("i",i);
          o[i] = obj[i];
        }
        console.log("o",o);

        return o;
      }
console.log("obj",obj);
      // var a = p(obj);
      // console.log("a",a);
      p(obj)
}
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
