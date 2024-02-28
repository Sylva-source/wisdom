<template>
  <div class="add">
<div class="top">
  <span @click="hu">← 返回 | 查看企业</span>  <span>程序员</span>
</div>

<div class="center">
<div class="centertop">
<div class="qiye"><div style="background-color:#4770ff; width: 3px; height: 18px;margin-right: 5px;"></div>企业信息</div>
<div class="demo-ruleForm">
  <div class="demo"><span style="color: #909399;">企业名称：</span>{{ list.name }}</div>
  <div class="demo"><span style="color: #909399;">法人：</span>{{ list.legalPerson }}</div>
  <div class="demo"><span style="color: #909399;">注册地址：</span>{{ list.registeredAddress }}</div>
  <div class="demo"><span style="color: #909399;">所在行业：</span>{{ list.industryName }}</div>
  <div class="demo"><span style="color: #909399;">营业执照：</span><img style="width: 100px;height: ;" :src="list.businessLicenseUrl
" alt=""></div>
</div>

</div>
<div class="centerbtm">
  <div class="qiye"><div style="background-color:#4770ff; width: 3px; height: 18px;margin-right: 5px;"></div>联系人信息</div>
<div calss="xinxi" style="display: flex;padding: 0 0 0 200px;">
  <div class="demo"><span style="color: #909399;">企业联系人：</span>{{ list.contact }}</div>
  <div class="demo"><span style="color: #909399;">联系电话：</span>{{ list.contactNumber }}</div>
</div>

</div>

</div>
<div class="bom">
<div class="bom1">
  <div class="qiye"><div style="background-color:#4770ff; width: 3px; height: 18px;margin-right: 5px;"></div>租赁记录</div>
<div style="padding:0 50px; padding-top: 30px; box-sizing: border-box;">
  <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="序号"
        width="50"
        type="index">
      </el-table-column>
      <el-table-column
        prop="name"
        label="租赁楼宇">
      </el-table-column>
      <el-table-column
        prop="date"
        label="合同状态">
        <template v-slot="{row}">
          <el-button type="info" plain size="mini" v-if="row.status==3">已退租</el-button>
<el-button type="success" plain size="mini" v-else>生效中</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="租赁起止时间">
        <template v-slot="{row}">
{{ row.startTime }}至{{ row.endTime }}
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="租赁合同">
        <template v-slot="{row}">
<a :href="row.contractUrl">{{ row.contractName }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="录入时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作">
        <template>
<el-button type="text">合同下载</el-button>
      </template>
      </el-table-column>

      </el-table>
    </div>
</div>

</div>

  </div>
</template>

<script>
import {chakan} from '@/api/user'
export default {
  name: 'Add',
  data(){
  return{
    tableData:[],
    id:0,
    list:{}
  }
  },
  methods:{
    hu(){
      this.$router.back()
    },
   async getlist(){
const res=await chakan(this.id)
console.log("reas",res);
this.list=res
this.tableData=res.rent
console.log(this.tableData);
    }
  },
  created(){
this.id=this.$route.query.id
this.getlist()
  }

};
</script>

<style lang="scss" scoped>
.add{
  background-color:#f4f6f8 ;
  width: 100%;
  height: 100%;
}
.top{
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
}
.center{
  padding: 20px 50px;
  height: 69%;
  box-sizing: border-box;
}
.centertop{
  width: 100%;
  padding: 20px 0;
  height: 69%;
  box-sizing: border-box;
  background-color: #fff;
}
.qiye{
  display: flex;
}
.demo-ruleForm{
  padding: 0 0 0 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}
.centerbtm{
  padding: 20px 0;
  width: 100%;
  height: 30%;
  margin-top: 20px;
  background-color: #fff;
}

.demo{
  width: 50%;
  margin-top: 20px;
}
.bom{
width: 100%;
  padding: 20px 50px;
  box-sizing: border-box;
  background-color: #f4f6f8;
  .bom1{
    padding: 20px 0;
    box-sizing: border-box;
    width: 100%;
    background-color:#fff;
  }
}
</style>
