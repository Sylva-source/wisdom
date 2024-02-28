<template>
  <div style="box-sizing: border-box">
    <div class="top">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="车牌号码:">
          <el-input
            v-model="formInline.carNumber"
            placeholder="请输入车牌号码"
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="付款状态:">
          <el-select
            v-model="formInline.paymentStatus"
            placeholder="未选择"
            size="mini"
          >
          <el-option label="全部" value=""></el-option>
            <el-option label="已付款" value="1"></el-option>
            <el-option label="未付款" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="chaxun" size="mini"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="center">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column prop="carNumber" label="车牌号码" width="180">
        </el-table-column>
        <el-table-column prop="chargeType" label="收费类型" width="180">
          <template v-slot="{row}">
            {{row.chargeType=="card"?'月卡':'临时停车'}}
          </template>
        </el-table-column>
        <el-table-column prop="carNumber" label="停车总时长" width="180">
        </el-table-column>
        <el-table-column prop="actualCharge" label="违约金(元)" width="180">
        </el-table-column>
        <el-table-column prop="paymentStatus" label="付款状态" width="180">
          <template v-slot="{row}">
{{ row.paymentStatus==1?'已付款':'未付款' }}
          </template>
        </el-table-column>
        <el-table-column prop="paymentMethod" label="缴费方式" width="180">
          <template v-slot="{row}">
<span v-if="row.paymentMethod=='Alipay'">支付宝</span>
<span v-if="row.paymentMethod=='WeChat'">微信</span>
<span v-if="row.paymentMethod=='Cash'">线下</span>
<span v-if="row.paymentMethod==null">--</span>
          </template>
        </el-table-column>
        <el-table-column prop="paymentTime" label="缴费时间" width="180">
        </el-table-column>
        <template v-slot:empty>
            <div>空状态</div>
            <!-- <el-empty description="描述文字"></el-empty> -->
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
  </div>
</template>

<script>
import { gettinglist } from "@/api/car";
export default {
  name: "Pay",
  data() {
    return {
      total:1,
      formInline: {
        carNumber: "",
        paymentStatus: "",
      },
      tableData: [],
      pagea: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
   async chaxun() {
      const res = await gettinglist({ ...this.pagea,...this.formInline });
      console.log("Res",res);
      this.tableData=res.rows
      this.total=res.total
    },
    async getlist() {
      const res = await gettinglist({ ...this.pagea });
      console.log("res", res);
      this.tableData=res.rows
      this.total=res.total
    },
    handleSizeChange(val) {
this.pagea.pageSize=val
this.chaxun()
      },
      handleCurrentChange(val) {

        this.pagea.page=val
        this.chaxun()
      }

  },
  created() {
    this.getlist();
  },
};
</script>

<style lang="scss" scoped></style>
