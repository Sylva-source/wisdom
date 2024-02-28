<template>
  <div>
    <div class="top">
      <el-form style="display: flex" label-width="80px">
        <el-form-item :inline="true" label-position="left" label="楼宇名称:">
          <el-input placeholder="请输入楼宇名称" size="mini" v-model="value" />
        </el-form-item>
        <el-form-item :inline="true" style="margin-left: -50px">
          <el-button type="primary" size="mini" @click="cha">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="center">
      <el-button type="primary" size="mini" @click="addmit"
        >添加楼宇</el-button
      >

      <el-table
        :data="tableData"
        style="width: 100%"
        header-row-class-name="aaa"
      >
        <el-table-column label="序号" type="index" />
        <el-table-column prop="name" label="楼宇名称" />
        <el-table-column prop="floors" label="层数" />
        <el-table-column prop="area" label="在管面积(㎡)" />
        <el-table-column prop="propertyFeePrice" label="物业费(元/㎡)" />
        <el-table-column prop="" label="状态">
          <template v-slot="{ row }">
            {{ row.status == 0 ? "空置中" : "未空置" }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="editmit(row)"> 编辑 </el-button>
            <el-button type="text" size="small" @click="del(row.id)"> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog :title="this.dang" :visible.sync="dialogVisible" width="59%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="楼宇名称" prop="name" style="margin-top: -10px">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入楼宇名称"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="楼宇层数" prop="floors" style="margin-top: -10px">
          <el-input
            v-model="ruleForm.floors"
            placeholder="请输入楼宇层数"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="在管面积" prop="area" style="margin-top: -10px">
          <el-input
            v-model="ruleForm.area"
            placeholder="请输入在管面积"
            size="mini"
          />
        </el-form-item>
        <el-form-item
          label="物业费"
          prop="propertyFeePrice"
          style="margin-top: -10px"
        >
          <el-input
            v-model="ruleForm.propertyFeePrice"
            placeholder="请输入物业费"
            size="mini"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getlouyu,addlouyu,editlouyu,deletemit } from "@/api/user";
export default {
  name: "WisdomIndex",
  data() {
    return {
      tableData: [],
      pagea: {
        name: "",
        page: 1,
        pageSize: 10,
      },
      total: 0,
      value: "",
      dialogVisible: false,
      dang:"添加楼宇",
      ruleForm: {
        name:'',
        floors:'',
        area:'',
        propertyFeePrice:'',
    },
      rules: {
        name: [{ required: true, message: "请输入楼宇名称", trigger: "blur" }],
        floors: [
          { required: true, message: "请输入楼宇层数", trigger: "blur" },
        ],
        area: [{ required: true, message: "请输入在管面积", trigger: "blur" }],
        propertyFeePrice: [
          { required: true, message: "请输入物业费", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    addmit(){
      this.ruleForm={}
      this.dang="添加楼宇"
      this.dialogVisible=true
    },
    editmit(row){
      this.dang="编辑楼宇"
      // this.ruleForm={}
      this.ruleForm.name=row.name
      this.ruleForm.id=row.id
      this.ruleForm.floors=row.floors
      this.ruleForm.area=row.area
      this.ruleForm.propertyFeePrice=row.propertyFeePrice
      console.log(row);
      console.log(this.ruleForm);
      this.dialogVisible=true
    },
    async getlist() {
      const res = await getlouyu({ ...this.pagea });
      this.tableData = res.rows;
      this.total = res.total;
    },
    async handleSizeChange(val) {
      this.pagea.pageSize = val;
      const res = await getlouyu({ ...this.pagea });
      this.tableData = res.rows;
      this.total = res.total;
    },
    async handleCurrentChange(val) {
      this.pagea.page = val;
      const res = await getlouyu({ ...this.pagea });
      this.tableData = res.rows;
      this.total = res.total;
    },
    del(id){
    this.$confirm('是否确认删除当前楼宇?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
      await deletemit(id)
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
    async cha() {
      this.pagea.name = this.value;
      this.pagea.page = 1;
      const res = await getlouyu({ ...this.pagea });
      this.tableData = res.rows;
      this.total = res.total;
      this.value = "";
    },
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
if(this.dang=="添加楼宇"){
await addlouyu(this.ruleForm)
}else if(this.dang=="编辑楼宇"){
await editlouyu(this.ruleForm)
}
this.getlist()
this.$message({
  type: 'success',
  message: `${this.dang}成功`,
})
this.dialogVisible=false
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

  },
  created() {
    this.getlist();
  },
};
</script>

<style lang="scss" scoped>
.top {
  border-bottom: 1px solid #f4f4f4;
}
.aaa {
  background-color: red;
}
</style>
