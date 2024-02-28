<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="add">新增区域</el-button>
    </div>
    <div class="center">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="areaName" label="区域名称"> </el-table-column>
        <el-table-column prop="spaceNumber" label="车数(个)"> </el-table-column>
        <el-table-column prop="areaProportion" label="面积(㎡)">
        </el-table-column>
        <el-table-column prop="ruleName" label="周边规则">
        <template v-slot="{row}">
          <el-tooltip class="item" effect="dark" :content="row.hoverRuleName" placement="top">
     <span>{{ row.ruleName }}</span>
    </el-tooltip>
        </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"> </el-table-column>
        <el-table-column prop="date" label="操作">
          <template v-slot="{ row }">
            <el-button type="text" @click="edit(row)">编辑</el-button>
            <el-button type="text" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :title="this.xin"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="top"
        label-width="10px"
        class="demo-ruleForm"
        style="padding-left: 39px;"
      >
        <el-form-item label="区域名称" prop="areaName" style="height: 80px">
          <el-input
            v-model="ruleForm.areaName"
            size="mini"
            style="padding-top: -100px; width: 90%;" placeholder="请输入区域名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="车位数" prop="spaceNumber" style="height: 80px">
          <el-input-number v-model="ruleForm.spaceNumber"  controls-position="right" style="padding-top: -100px; width: 90%;" size="mini" placeholder="请输入车位个数" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item label="面积(㎡)" prop="areaProportion" style="height: 80px;">
          <el-input v-model="ruleForm.areaProportion" style="padding-top: -100px; width: 90%;" size="mini" placeholder="请输入面积"></el-input
          ><span>㎡</span>
        </el-form-item>
        <el-form-item label="关联规则" prop="ruleId" style="height: 80px">
          <el-select
          style="padding-top: -100px; width: 90%;"
            v-model="ruleForm.ruleId"
            size="mini"
            placeholder="请选择"
          >
            <el-option v-for="item in guize" :key="item.id" :label="item.ruleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark" style="height: 80px">
          <el-input
          style="padding-top: -100px; width: 90%;"
            type="textarea"
            size="mini"
            v-model="ruleForm.remark"
            placeholder="请输入备注"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" style="background-color:#f4f6f8;" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getcarlist,addcar,getguize,editcar,deletecar } from "@/api/car";
export default {
  name: "Area",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      guize:[],
      xin:'新增区域',
      ruleForm: {},
      rules: {
        areaName: [
          { required: true, message: "请输入区域名称", trigger: "blur" },
        ],
        spaceNumber: [
          { required: true, message: "请输入车数", trigger: "blur" },
        ],
        areaProportion: [
          { required: true, message: "请输入面积", trigger: "blur" },
        ],
        ruleId: [
          { required: true, message: "请选择关联规则", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async getcar() {
      const res = await getcarlist();
      this.tableData = res.rows;
    },
    async getguan(){
const res=await getguize()
console.log(res,"res");
this.guize=res.rows
    },
    add() {
      this.xin='新增区域'
      this.ruleForm={}
      this.dialogVisible = true;
    },
    del(id){
    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
await deletecar(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getcar()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    handleClose(done) {
          done();
    },
    edit(row){
this.xin='编辑区域'
this.ruleForm={}
this.ruleForm=JSON.parse(JSON.stringify(row))
this.dialogVisible=true
    },
    submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
if(this.xin=='新增区域'){
 addcar(this.ruleForm)
setTimeout(() => {
  this.getcar()
  this.$message({
  type: 'success',
  message: '添加成功',
})
this.dialogVisible = false;
}, 2000)
}else if(this.xin=='编辑区域'){
  const res=editcar({ areaName:this.ruleForm.areaName,
    spaceNumber:this.ruleForm.spaceNumber,
    areaProportion:this.ruleForm.areaProportion,
    ruleId:this.ruleForm.ruleId,
    id:this.ruleForm.id,
    remark:this.ruleForm.remark})
console.log("res",res);
this.getcar()
this.$message({
  type: 'success',
  message: '修改成功',
})
this.dialogVisible = false;
}

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
  },
  created() {
    this.getcar();
    this.getguan();
  },
};
</script>

<style lang="scss" scoped></style>
