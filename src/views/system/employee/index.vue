<template>
  <div>
    <div style="border-bottom: 1px solid #ccc; margin-bottom: 20px;">
  <el-form :inline="true" class="demo-form-inline">
  <el-form-item label="员工姓名">
    <el-input placeholder="请输入员工姓名" v-model="pagea.name" size="small"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" size="small" @click="cha">查询</el-button>
  </el-form-item>
</el-form>
</div>
<div>
  <el-button type="primary" size="small" @click="add">添加员工</el-button>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="员工姓名">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="登录账号">
      </el-table-column>
      <el-table-column
        prop="phonenumber"
        label="联系方式">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template v-slot="{row}">
{{ row.status==0?'禁用':'启用' }}
      </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="添加时间">
      </el-table-column>
      <el-table-column
        prop="date"
        label="员操作工姓名">
        <template v-slot="{row}">
          <el-button type="text" @click="edit(row)">编辑</el-button>
          <el-button type="text" @click="del(row.id)">删除</el-button>
          <el-button type="text" @click="chongzhi(row.id)">重置密码</el-button>
        </template>
      </el-table-column>
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
  :title="yuan"
  :visible.sync="dialogVisible"
  width="39%"
  :before-close="handleClose">
  <el-form :model="ruleForm" style="padding:0 30px;" size="mini" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm">
  <el-form-item label="员工姓名" prop="name">
    <el-input v-model="ruleForm.name" placeholder="请填写员工姓名"></el-input>
  </el-form-item>
  <el-form-item label="登录账号" prop="userName">
    <el-input v-model="ruleForm.userName" placeholder="请填写登录账号"></el-input>
  </el-form-item>
  <el-form-item label="联系方式" prop="phonenumber">
    <el-input v-model="ruleForm.phonenumber" placeholder="请填写联系方式"></el-input>
  </el-form-item>
  <el-form-item prop="name">
    默认密码：123456
  </el-form-item>
  <el-form-item label="分配角色" prop="name">
    <el-select v-model="ruleForm.roleId" placeholder="请选择分配角色" style="width: 100%;">
      <el-option v-for="item in juese" :label="item.roleName" :key="item.roleId" :value="item.roleId"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="员工状态" prop="status">
    <el-radio-group v-model="ruleForm.status">
      <el-radio :label="1">启用</el-radio>
      <el-radio :label="0">禁用</el-radio>
    </el-radio-group>
  </el-form-item>
  </el-form>

  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="qd">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import {getuserinfo,getrole,addrole,editrole,chong,delsys} from '@/api/sys'
export default {
  name: 'Employee',
  data(){
return{
total:1,
yuan:'添加员工',
xun:'',
pagea:{
  name:'',
  page:'1',
  pageSize:'10'
},
ruleForm:{},
dialogVisible:false,
tableData:[],
juese:[],
rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          userName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          phonenumber: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          status: [
            { required: true, message: '请输入活动名称', trigger: 'change' },
          ],
}
}
  },
  methods:{
    handleSizeChange(val) {
      this.pagea.page='1'
        this.pagea.pageSize=val
        this.getlist()
      },
      handleCurrentChange(val) {
        this.pagea.pageSize='10'
        this.pagea.page=val
        this.getlist()
      },
      chongzhi(id){
      this.$confirm('确认将密码重置为"123456"?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await chong({id:id})
          this.$message({
            type: 'success',
            message: '重置成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      },
     async getlist(){
      this.pagea.page='1'
      this.pagea.pageSize='10'
const res=await getuserinfo({...this.pagea})
this.total=res.total
this.tableData=res.rows
      },
     async getroles(){
const res=await getrole()
console.log("Res",res);
this.juese=res
      },
     del(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delsys(id)
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
        })
        this.getlist()
      },
      edit(row){
        this.ruleForm={}
        this.yuan='编辑员工'
        this.dialogVisible=true
        delete row.createTime
        this.ruleForm=JSON.parse(JSON.stringify(row))
        this.getlist()
      },
      add(){
        this.ruleForm={}
        this.yuan='添加员工'
        this.dialogVisible=true
      },
      handleClose(done) {
            done();
      },
     async qd(){
if(this.yuan=='添加员工'){
  await addrole({...this.ruleForm})
this.$message({
  type: 'success',
  message: '添加成功',
})
}else if(this.yuan=='编辑员工'){
  await editrole({...this.ruleForm})
this.$message({
  type: 'success',
  message: '编辑成功',
})
}
this.dialogVisible=false
this.getlist()
      },
      cha(){
        this.pagea.page='1'
      this.pagea.pageSize='10'
      this.$message({
        type: 'success',
        message: '查询成功',
      })
this.getlist()

      }
  },
  created(){
    this.getlist()
    this.getroles()
  }
};
</script>

<style lang="scss" scoped>

</style>
