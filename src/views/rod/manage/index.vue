<template>
  <div>
    <div>
      <el-form :inline="true" :model="pagea" class="demo-form-inline">
        <el-form-item label="一体杆名称">
          <el-input
            size="small"
            v-model="pagea.poleName"
            placeholder="请输入一体杆名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="一体杆编号">
          <el-input
            size="small"
            v-model="pagea.poleNumber"
            placeholder="请输入一体杆编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="运行状态">
          <el-select v-model="pagea.poleStatus" style="width: 100%;" placeholder="请选择一体杆类型">
      <el-option label="全部" value=""></el-option>
      <el-option label="正常" value="0"></el-option>
      <el-option label="异常" value="1"></el-option>
    </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="cha">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button size="small" type="primary" @click="add">添加一体杆</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="delpl">批量删除</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号"> </el-table-column>
        <el-table-column prop="poleName" label="一体杆名称"> </el-table-column>
        <el-table-column prop="poleNumber" label="一体杆编号">
        </el-table-column>
        <el-table-column prop="poleIp" label="一体杆IP"> </el-table-column>
        <el-table-column prop="areaName" label="安装区域"> </el-table-column>
        <el-table-column prop="poleType" label="一体杆类型">
          <template v-slot="{ row }">
            <span v-if="row.poleType == 'entrance'">入口</span>
            <span v-if="row.poleType == 'export'">出口</span>
            <span v-if="row.poleType == 'center'">中间</span>
          </template>
        </el-table-column>
        <el-table-column prop="areaName" label="运行状态">
          <template v-slot="{ row }">
            {{ row.poleStatus == 0 ? "正常" : "异常" }}
          </template>
        </el-table-column>
        <el-table-column prop="poleStatus" label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="edit(row)">编辑</el-button>
            <el-button type="text" @click="del(row.id)">删除</el-button>
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
    <el-dialog
  :title="yitig"
  :visible.sync="dialogVisible"
  width="39%"
  :before-close="handleClose">
  <el-form label-position="top" :rules="rules" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="一体杆名称" prop="poleName">
    <el-input v-model="ruleForm.poleName" placeholder="请输入一体杆名称"></el-input>
  </el-form-item>
  <el-form-item label="一体杆编号" prop="poleNumber">
    <el-input v-model="ruleForm.poleNumber" placeholder="请输入一体杆编号" :disabled="this.yitig=='编辑一体杆'"></el-input>
  </el-form-item>
  <el-form-item label="一体杆IP" prop="poleIp">
    <el-input v-model="ruleForm.poleIp" placeholder="请输入一体杆IP"></el-input>
  </el-form-item>
  <el-form-item label="关联区域" prop="areaId">
    <el-select v-model="ruleForm.areaId" placeholder="请选择关联区域" style="width: 100%;">
      <el-option v-for="item in guanlist" :key="item.id" :label="item.areaName" :value="item.areaId"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="一体杆类型" prop="poleType">
    <el-select v-model="ruleForm.poleType" style="width: 100%;" placeholder="请选择一体杆类型">
      <el-option label="入口" value="entrance"></el-option>
      <el-option label="出口" value="export"></el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="qd">确 定</el-button>
  </span>
</el-dialog>
    </div>
  </div>
</template>

<script>
import { getinfolist,addinfo,getguanlian,editinfo,delinfolist } from "@/api/info";
export default {
  name: "Manage",
  data() {
    return {
      formInline: {},
      rules: {
        poleName: [
            { required: true, message: '请输入一体杆名称', trigger: 'blur' },
          ],
          poleNumber: [
            { required: true, message: '请输入一体杆编号', trigger: 'blur' },
          ],
          poleIp: [
            { required: true, message: '请输入一体杆IP', trigger: 'blur' },
          ],
          areaId: [
            { required: true, message: '请选择关联区域', trigger: 'change' },
          ],
          poleType: [
            { required: true, message: '请选择一体杆类型', trigger: 'change' },
          ],
      },
      tableData: [],
      dialogVisible:false,
      yitig:'添加一体杆',
      total:0,
      pagea: {
        page: "1",
        pageSize: "10",
        poleName: "",
        poleNumber: "",
        poleStatus: "",
      },
      pldel:'',
      ruleForm:{},
      guanlist:[]
    };
  },
  methods: {
    async getlist() {
      const res = await getinfolist({ ...this.pagea });
      this.tableData = res.rows;
      this.total = res.total;
    },
    async getguanlianlist(){
      const res=await getguanlian()
      this.guanlist=res
      console.log(res);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    add(){
      this.dialogVisible = true;
    },
    delpl(){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delinfolist(this.pldel)
this.getlist()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
   async cha(){
this.pagea.page='1',
this.pagea.pageSize='10'
const res = await getinfolist({ ...this.pagea });
      this.tableData = res.rows;
      this.total = res.total;
      this.$message({
        type: 'success',
        message: '查询成功',
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
      this.pldel=val.map(item=>item.id).join(',')
      console.log(this.pldel);
    },
    handleSizeChange(val) {
      this.pagea=page='1',
        this.pagea.pageSize = val;
        this.getlist();
      },
del(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delinfolist(id)
this.getlist()
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCurrentChange(val) {
        this.pagea.pageSize='10'
       this.pagea.page= val;
        this.getlist();
      },
      handleClose(done) {
            done()
      },
      edit(row){
        this.yitig='编辑一体杆'
        this.dialogVisible=true
        delete row.areaName
        delete row.poleStatus
        this.ruleForm=row
      },
     async qd(){
      console.log(this.ruleForm);
if(this.yitig=='添加一体杆'){
  await addinfo({...this.ruleForm})
this.$message({
  type: 'success',
  message: '添加成功',
})
}else if(this.yitig=='编辑一体杆'){
 await editinfo({...this.ruleForm})
  this.$message({
  type: 'success',
  message: '编辑成功',
})
}
this.getlist()
this.dialogVisible=false
      },
  },
  created() {
    this.getlist();
    this.getguanlianlist()
  },
};
</script>

<style lang="scss" scoped></style>
