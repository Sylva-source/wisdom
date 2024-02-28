<template>
  <div>
    <el-page-header @back="goBack" content="添加角色">
</el-page-header>
<div style="width: 100%;height: calc(100vh - 100px); background-color: #f4f6f8; overflow: hidden;">
  <el-steps direction="vertical" :active="act" style="position: fixed; height: 300px;">
    <el-step title="角色信息"></el-step>
    <el-step title="权限信息"></el-step>
    <el-step title="检查并完成"></el-step>
  </el-steps>
<div v-if="act==0" style="width: 800px; height: 300px; background-color:#ffffff ;margin:50px auto; padding: 20px 0;">
<p>角色信息</p>
<el-form ref="form" :model="form" label-width="80px" style="width: 60%; margin: auto;">
  <el-form-item label="角色名称">
    <el-input v-model="form.roleName" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="角色描述">
    <el-input type="textarea" v-model="form.remark" placeholder="请输入"></el-input>
  </el-form-item>
  </el-form>
</div>
<div v-if="act==1" style="width: 800px; background-color:#ffffff ;margin:50px auto; padding: 20px 0;">
  <el-row>
  <el-col v-for="item,index in three" :key="index" style="width: 20%; height: 100%;"><div class="grid-content">
    <div style="width: 80%;margin: auto;margin-bottom: 10px; height: 50px;background-color: #f5f7fa; text-align: center; line-height: 50px;">{{ item.title }}</div>
    <el-tree
disabled
    default-expand-all
  :data="item.children"
  show-checkbox
  node-key="id"
  :default-checked-keys="chelist"
  :props="defaultProps">
</el-tree>

  </div></el-col>
</el-row>
</div>
<div v-if="act==2"  style="width: 800px; background-color:#ffffff ;margin:50px auto; padding: 20px 0;">
disanbu
</div>



</div>
<div style="padding: 20px 0; display: flex; justify-content: center;">
  <el-button type="primary" @click="xia" v-if="act!=2">下一步</el-button>
  <el-button type="primary" @click="shang" v-if="act!=0">上一步</el-button>
  <el-button type="primary" @click="qd" v-if="act==2">确认添加</el-button>
</div>
  </div>
</template>

<script>
import {addsysrole,getree} from '@/api/tree'
export default {
  name: 'Add',

  data() {
    return {
act:0,
three:[],
defaultProps: {
  label: 'title',
  children: 'children',
  id:'id'
},
form:{
  perms:[],
}
    };
  },
  methods: {
    goBack(){
      this.$router.back()
    },
    async gettree(){
      const res=await getree()
      this.three=res
    },
    xia(){
      this.act++
      console.log(this.form);
    },
    shang(){
      this.act--
    },
   async qd(){
    await addsysrole(this.form)
   }
  },
  created() {
    this.act=0
    this.gettree()
  },
};
</script>

<style lang="scss" scoped>

</style>
