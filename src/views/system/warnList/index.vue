<template>
  <div>
    <el-container>
  <el-aside width="200px">
<div :class="act==index?'active':'left'" v-for="item,index in leftlist" @click="dian(index,item.roleId)" :key="index"><i class="el-icon-user"></i>{{ item.roleName }}</div>
<el-button plain style="width: 90%; margin: auto;" @click="add">添加角色</el-button>
  </el-aside>
  <el-container>
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
  <el-menu-item index="1" @click="gong(0)">功能权限</el-menu-item>
  <el-menu-item index="2" @click="gong(1)">成员({{ totala }})</el-menu-item>
  </el-menu>

    </el-header>
    <el-main>
      <el-row v-if="xian==0">
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

<el-table
v-if="xian==1"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="100"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="登录账号">
      </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.totala">
    </el-pagination>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<script>
import { getrole } from '@/api/sys';
import {getree,getrolell,getsysuser} from '@/api/tree'
export default {
  name: 'WarnList',
  data(){
    return{
leftlist:[],
act:0,
tableData:[],
activeIndex:"1",
xian:0,
id:2,
pagea:{
page:1,
totala:0,
pageSize:10
},
three:[],
chelist:[],
defaultProps: {
  label: 'title',
  children: 'children',
  id:'id'
},
        defaultProps: {
          children: 'children',
          label: 'title'
        }
    }
  },
  methods:{
    handleSizeChange(val) {
      this.pagea.pageSize=val
      this.getuser()
      },
      handleCurrentChange(val) {
        this.pagea.page=val
        this.getuser()
      },
      gong(a){
this.xian=a
      },
   async getleftlist(){
const res=await getrole();
this.leftlist=res
    },
    async getuser(){
    const res=await getsysuser(this.id,this.pagea)
    console.log("resa",res);
    this.tableData=res.rows
    this.totala=res.total
    },
   async gether(){
    this.chelist=[]
      const res=await getrolell(this.id);
res.perms.forEach(ele => {
ele.forEach(e=>{
  if(this.chelist.indexOf(e)==-1){
    this.chelist.push(e)
  }
})
});
console.log(this.chelist);
this.gettree()
    },
    add(){
this.$router.push('/system/warnList/add')
    },
    dian(ind,id){
      this.act=ind
      this.id=id
      this.gether()
      this.getuser()
    },
    async gettree(){
      const res=await getree()
      this.three=res
    }
  },
  created(){
    this.getleftlist()
    this.gettree()
    this.gether()
    this.getuser()
  }
};
</script>

<style lang="scss" scoped>
.left{
width: 100%;
height: 60px;
line-height: 60px;
}
.active{
  width: 100%;
height: 60px;
line-height: 60px;
color: #4770ff;
background-color: #edf5ff;
}
.el-aside{
  padding: 5px;
  box-sizing: border-box;
  height: 100vh;
  border-right: 1px solid #e4e7ec;
}
.el-header{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #e4e7ec;
}
.grid-content{
  width: 100%;
  height: 100vh;
  border-right: 1px solid #e4e7ec;
}
</style>
