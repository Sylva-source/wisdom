<template>
  <div>
    <el-button type="primary" @click="add">增加停车规则</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"> </el-table-column>
      <el-table-column prop="ruleNumber" label="计费规则编号">
      </el-table-column>
      <el-table-column prop="ruleName" label="计费规则名称">
      </el-table-column>
      <el-table-column
        prop="freeDuration"
        label="免费时长(分钟)"
      ></el-table-column>
      <el-table-column prop="chargeCeiling" label="收费上限"> </el-table-column>
      <el-table-column prop="ruleName" label="计费方式"> </el-table-column>
      <el-table-column prop="ruleNameView" label="计费规则"> </el-table-column>
      <el-table-column prop="date" label="操作">
        <template v-slot="{ row }">
          <el-button type="text" @click="edit(row)">编辑</el-button>
          <el-button type="text" @click="del(row)">删除</el-button>
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
    <el-dialog
      :title="this.guize"
      :visible.sync="dialogVisible"
      width="39%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        label-position="top"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="计费规则编号" prop="ruleNumber">
          <el-input
            v-model="ruleForm.ruleNumber"
            size="small"
            placeholder="请输入计费规则编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="计费规则名称" prop="ruleName">
          <el-input
            v-model="ruleForm.ruleName"
            size="mini"
            placeholder="请输入计费规则名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="计费方式(全天收费)" prop="radio">

          <el-radio-group  v-model="radio" style="width: 100%; display: flex; justify-content: space-between">
    <el-radio :label="duration" border>时长收费</el-radio>
    <el-radio :label="turn" border>按次收费</el-radio>
    <el-radio :label="partition" border>分段收费</el-radio>
  </el-radio-group>
        </el-form-item>
        <el-form-item label="" prop="freeDuration">
            <div style="display: flex; justify-content: space-between">
              <div>
                <p>免费时长</p>
                <div>
                  <el-input-number
                    controls-position="right"
                    v-model="ruleForm.freeDuration"
                    :min="1"
                    style="width: 80%"
                    placeholder="请输入免费时长"
                  ></el-input-number
                  >分钟
                </div>
              </div>

              <div>
                <p>收费上限</p>
                <div>
                  <el-input
                    v-model="ruleForm.chargeCeiling"
                    style="width: 80%"
                    placeholder="请输入收费上限"
                  ></el-input>
                  元
                </div>
              </div>
            </div>
        </el-form-item>
        <el-form-item label="计费规则" prop="resource">
          <div class="zhoubian" v-if="this.radio=='duration'">
            每<el-input
              v-model="ruleForm.durationTime"
              placeholder="请输入"
              style="width: 25%"
            ></el-input>
            <el-select
              v-model="ruleForm.durationType"
              placeholder="请选择"
              style="width: 35%"
            >
              <el-option label="分钟" value="minute"></el-option>
              <el-option label="小时" value="hour"></el-option>
            </el-select>
            <el-input
              v-model="ruleForm.durationPrice"
              placeholder="请输入"
              style="width: 25%"
            ></el-input>
            元
          </div>
          <div v-if="this.radio=='turn'">
            附
            <el-input
              v-model="ruleForm.turnPrice"
              placeholder="请输入金额"
            ></el-input>
            元
          </div>
          <div v-if="this.radio=='partition'">
            <div class="kaishi">
              <el-input
                v-model="ruleForm.partitionFrameTime"
                placeholder="请输入"
                style="width: 30%"
              ></el-input>
              小时内, 开始收费
              <el-input
                v-model="ruleForm.partitionFramePrice"
                style="width: 30%"
                placeholder="请输入"
              ></el-input>
              元
            </div>
            <div class="kaishi">
              每增加<el-input
                v-model="ruleForm.partitionIncreaseTime"
                style="width: 30%"
                placeholder="请输入"
              ></el-input
              >小时, 增加<el-input
                v-model="ruleForm.partitionIncreasePrice"
                style="width: 30%"
                placeholder="请输入"
              ></el-input
              >元
            </div>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="qd"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getrulelist,addguize,editguize,getxq,delcar } from "@/api/car";
export default {
  name: "WisdomIndex",
  data() {
    return {
      tableData: [],
      guize: "添加规则",
      pagea: {
        page: 1,
        pageSize: 10,
      },
      rules: {
        ruleNumber: [
          { required: true, message: "请输入计费规则编号", trigger: "blur" },
        ],
        ruleName: [
          { required: true, message: "请输入计费规则名称", trigger: "blur" },
        ],
        radio: [
          { required: true, message: "请输入选择计费方式", trigger: "change" },
        ],
        durationTime: [
          { required: true, message: "请输入计费时间", trigger: "blur" },
        ],
        durationType: [
          { required: true, message: "请输入选择计费时间单位", trigger: "change" },
        ],
        durationPrice: [
          { required: true, message: "请输入计费金额", trigger: "blur" },
        ]
      },
      duration:'duration',
      turn:'turn',
      partition:'partition',
      input: "",
      ruleForm: {
        ruleNumber:'',
        ruleName:'',
        freeDuration:1,
        chargeCeiling:'',
        chargeType:'duration',
        durationTime:'',
        durationPrice:'',
        durationType:'',
        turnPrice:'',
        partitionFrameTime:'',
        partitionFramePrice:'',
        partitionIncreaseTime:'',
        partitionIncreasePrice:'',
      },
      shichang:{
    ruleNumber: "A005",
    ruleName: "按时长收费",
    freeDuration: 15,
    chargeCeiling: 50.00,
    chargeType: "duration",
    durationTime: 30,
    durationPrice: 5,
    durationType: "minute",
    turnPrice: null,
    partitionFrameTime: null,
    partitionFramePrice: null,
    partitionIncreaseTime: null,
  partitionIncreasePrice: null
      },
      radio:'duration',
      total: 1,
      dialogVisible: false,
      mode: "添加",
    };
  },
  methods: {
    async getlist() {
      const res = await getrulelist({ ...this.pagea });
      console.log("res", res);
      this.tableData = res.rows;
      this.total = res.total;
    },
    handleSizeChange(val) {
      this.pagea.pageSize = val;
      this.getlist();
    },
    handleCurrentChange(val) {
      this.pagea.page = val;
      this.getlist();
    },
    handleClose(done) {
      done();
    },
    add() {
      this.dialogVisible = true;
      this.guize='添加规则'
      this.ruleForm={}
    },
   del(row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delcar(row.id)
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
   async qd(){
if(this.guize=='添加规则'){
  this.ruleForm.chargeType=this.radio
      await addguize({...this.ruleForm})
}else if(this.guize=='编辑规则'){
const res=await editguize({...this.ruleForm})
console.log("this.",res);
}
this.getlist()
this.$message({
  type: 'success',
  message: this.guize+'成功',
})
this.dialogVisible=false
    },
  async edit(row){
      this.ruleForm={}
      const res=await getxq(row.id)
      this.ruleForm=res
      console.log("this",this.ruleForm);
      this.guize='编辑规则'
      this.dialogVisible=true
    }
  },
  created() {
    this.getlist();
    console.log(this.ruleForm);
  },
};
</script>

<style lang="scss" scoped>
.shebei {
  width: 120px;
  height: 36px;
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #4770ff;
  border-radius: 3px;
}
.zhoubian {
  justify-content: space-between;
  display: flex;
}
.fang {
  display: flex;
  width: 100%;
}
.demo-ruleForm {
  padding: 0 80px;
  box-sizing: border-box;
}
.kaishi {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
}
</style>
