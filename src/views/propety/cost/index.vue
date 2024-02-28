<template>
  <div>
    <div style="border-bottom: 1px solid #efefef; margin-bottom: 20px;">
      <el-form :inline="true" :model="pagea" class="demo-form-inline">
        <el-form-item label="企业名称：">
          <el-input
            size="small"
            v-model="pagea.enterpriseName"
            placeholder="请输入审批名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="缴费时间：">
          <el-date-picker
      v-model="timeval"
      @change="changeTime"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="cha">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" size="small" @click="add">添加账单</el-button>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="billNumber" label="账单编号">
        </el-table-column>
        <el-table-column prop="enterpriseName" label="企业名称">
        </el-table-column>
        <el-table-column prop="buildingName" label="租赁楼宇">
        </el-table-column>
        <el-table-column prop="propertyFeePrice" label="物业费(元/㎡)">
        </el-table-column>
        <el-table-column prop="paymentAmount" label="账单金额(元)">
        </el-table-column>
        <el-table-column prop="createTime" label="缴费时间">
        </el-table-column>
        <el-table-column prop="date" label="操作" width="180">
          <template v-slot="{row}">
            <el-button type="text" size="small" @click="chakan(row)">查看</el-button>
        <el-button type="text" size="small" @click="del(row)">删除</el-button>
          </template>
        </el-table-column>
        <template v-slot:empty>
          <el-empty description="描述文字"></el-empty>
        </template>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>




<el-dialog
  title="添加账单"
  :visible.sync="dialogVisible"
  width="39%"
  :before-close="handleClose">
  <el-form ref="form" :model="form" label-width="80px" label-position="top" style="padding:0 30px; box-sizing: border-box;">
  <el-form-item label="选择租户" prop="enterpriseId">
    <el-select v-model="form.enterpriseId" style="width: 100%;" placeholder="请选择租户">
      <el-option v-for="item in tenterlist" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="租赁楼宇" prop="buildingId">
    <el-select v-model="form.buildingId" placeholder="请选择租赁楼宇" style="width: 100%;">
      <el-option v-for="item in buillist" :key="item.id" :label="item.name" :value="item.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="缴费周期" prop="timeval1">
    <el-date-picker
    style="width: 100%;"
      v-model="timeval1"
      @change="time"
      type="daterange"
      value-format="yyyy-MM-dd"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="支付金额" prop="paymentAmount">
    <el-input v-model="form.paymentAmount" style="width: 100%;"></el-input>
  </el-form-item>
  <el-form-item label="支付方式" prop="paymentMethod">
    <el-select v-model="form.paymentMethod" placeholder="请选择支付方式" style="width: 100%;">
      <el-option label="微信" value="1"></el-option>
      <el-option label="支付宝" value="2"></el-option>
      <el-option label="现金" value="3"></el-option>
    </el-select>
  </el-form-item>
  </el-form>


  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="qd">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="查看账单"
  :visible.sync="dialogVisible1"
  width="39%"
  :before-close="handleClose">
<div>
  <el-row style="width: 100%; height: 30px;margin-bottom: 20px; line-height: 30px;" justify="center">
  <el-col :span="9" style="text-align: right;">租户名称：</el-col>
  <el-col :span="15" style="text-align: left;"><span style="color: black;">{{ this.chalist.enterpriseName }}</span></el-col>
</el-row>
  <el-row justify="center" style="width: 100%; height: 30px;margin-bottom: 20px; line-height: 30px;" >
  <el-col :span="9" style="text-align: right;">租赁楼宇：</el-col>
  <el-col :span="15"><span style="color: black;">{{ this.chalist.buildingName }}</span></el-col>
</el-row>
  <el-row justify="center" style="width: 100%; height: 30px;margin-bottom: 20px; line-height: 30px;" >
  <el-col :span="9" style="text-align: right;">缴费周期：</el-col>
  <el-col :span="15"><span style="color: black;">{{ this.chalist.startTime }}至{{ this.chalist.endTime }}</span></el-col>
</el-row>
  <el-row justify="center" style="width: 100%; height: 30px;margin-bottom: 20px; line-height: 30px;" >
  <el-col :span="9" style="text-align: right;">物业费(元/㎡)：</el-col>
  <el-col :span="15"><span style="color: black;">{{ this.chalist.propertyFeePrice }}</span></el-col>
</el-row>
  <el-row justify="center" style="width: 100%; height: 30px;margin-bottom: 20px; line-height: 30px;" >
  <el-col :span="9" style="text-align: right;">账户金额(元)：</el-col>
  <el-col :span="15"><span style="color: black;">{{ this.chalist.paymentAmount }}</span></el-col>
</el-row>
  <el-row justify="center" style="width: 100%; height: 30px;margin-bottom: 20px; line-height: 30px;" >
  <el-col :span="9"  style="text-align: right;">支付方式：</el-col>
  <el-col :span="15">
    <span style="color: black;" v-if="this.chalist.paymentMethod==1">微信</span>
    <span style="color: black;" v-if="this.chalist.paymentMethod==2">支付宝</span>
    <span style="color: black;" v-if="this.chalist.paymentMethod==3">现金</span>
  </el-col>
</el-row>
  <el-row justify="center" style="width: 100%; height: 30px;margin-bottom: 20px; line-height: 30px;" >
  <el-col :span="9"  style="text-align: right;">缴费时间：</el-col>
  <el-col :span="15"><span style="color: black;">{{ this.chalist.createTime }}</span></el-col>
</el-row>
</div>




  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>





  </div>
</template>

<script>
import { getenter, getproper,yusuanmoney,getbuil,addpro,delproper } from "@/api/property";
export default {
  name: "WisdomIndex",
  data() {
    return {
      timeval: "",
      total:1,
      formInline: {},
      dialogVisible1:false,
      form:{
        enterpriseId:'',
        buildingId:'',
        startTime:'',
        endTime:'',
        paymentAmount:'',
        paymentMethod:'',
      },
      tableData:[],
      chalist:{},
      dialogVisible:false,
tenterlist:[],
pagea:{
  enterpriseName:'',
  start:'',
  page:'1',
  pageSize:'10',
  end:''
},
buillist:[],
timeval1:'',
rules: {
  enterpriseId: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
          buildingId: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
          timeval1: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
          paymentAmount: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
          paymentMethod: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
}
    };
  },
  methods: {
    async getlist() {
      this.pagea={}
      this.pagea.page='1'
      this.pagea.pageSize='10'
      const res = await getproper({...this.pagea});
this.total=res.total
      this.tableData=res.rows
    },
    async getenlist(){
      const res=await getenter()
this.tenterlist=res
    },
    changeTime(){
      this.pagea.start=this.timeval[0]
        this.pagea.end=this.timeval[1]
    },
    async getbuillist(){
    const res=await getbuil()
    this.buillist=res
    },
    handleSizeChange(val) {
      this.pagea={}
      this.pagea.page='1'
      this.pagea.pageSize=val
this.getlist()
      },
      chakan(row){
        this.dialogVisible1=true
        console.log(row);
        this.chalist=row
      },
     async cha(){
    const res=await getproper({...this.pagea})
      this.total=res.total
      this.tableData=res.rows
      },
      handleCurrentChange(val) {
        this.pagea={}
        this.pagea.pageSize='10'
       this.pagea.page=val
       this.getlist()
      },
    add(){
      this.dialogVisible=true
    },
    del(row){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delproper(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getlist()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
   },
   async qd(){
await addpro(this.form)
this.getlist()
this.$message({
  type: 'success',
  message: '操作成功',
})
this.dialogVisible=false
    },
    handleClose(done) {
            done();
      },
     async time(){
        console.log(this.timeval1);
        this.form.startTime=this.timeval1[0]
        this.form.endTime=this.timeval1[1]
        const res= await yusuanmoney({
          buildingId:this.form.buildingId,
          startTime:this.form.startTime,
          endTime:this.form.endTime,
        })
        console.log(res);
        this.form.paymentAmount=res
      }
  },
  created() {
    this.getlist();
    this.getenlist()
    this.getbuillist()
  },
};
</script>

<style lang="scss" scoped></style>
