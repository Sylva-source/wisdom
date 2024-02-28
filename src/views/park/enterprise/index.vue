<template>
  <div>
    <div class="top">
      <el-form style="display: flex" label-width="80px">
        <el-form-item :inline="true" label-position="left" label="企业名称:">
          <el-input placeholder="请输入企业名称" v-model="value" size="mini" />
        </el-form-item>
        <el-form-item :inline="true" style="margin-left: -50px">
          <el-button type="primary" size="mini" @click="cha">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-button type="primary" size="mini" @click="add">添加企业</el-button>
      <el-table :data="tableData" style="width: 100%" @expand-change="detil">
        <el-table-column type="expand">
          <template v-slot="{ row }">
            <el-table :data="tableData1" style="width: 100%">
              <el-table-column prop="name" label="租赁楼宇"> </el-table-column>
              <el-table-column prop="date" label="租赁起止时间">
                <template v-slot="{ row }">
                  {{ row.startTime }}至{{ row.endTime }}
                </template>
              </el-table-column>
              <el-table-column prop="date" label="合同状态">
                <template v-slot="{ row }">
                  <el-button
                    type="info"
                    plain
                    size="mini"
                    v-if="row.status == 3"
                    >已退租</el-button
                  >
                  <el-button type="success" plain size="mini" v-else
                    >生效中</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column prop="date" label="操作">
                <template>
                  <el-button type="text">续租</el-button>
                  <el-button type="text">退租</el-button>
                  <el-button type="text">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="企业名称" prop="name"> </el-table-column>
        <el-table-column label="联系人" prop="contact"> </el-table-column>
        <el-table-column label="联系电话" prop="contactNumber">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="addhe(row.id)">
              添加合同
            </el-button>
            <el-button type="text" size="small" @click="chakan1(row.id)">
              查看
            </el-button>
            <el-button type="text" size="small" @click="bj(row.id)">
              编辑
            </el-button>
            <el-button type="text" size="small" @click="del(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="添加合同"
      :visible.sync="dialogVisible"
      width="39%"
      :before-close="handleClose"
    >
      <el-form
        ref="form"
        label-position="top"
        size="mini"
        :model="form"
        style="width: 100%; padding: 0 50px"
      >
        <el-form-item label="租赁楼宇">
          <el-select
            v-model="form.buildingId"
            style="width: 100%"
            placeholder="请选择活动区域"
          >
            <el-option
              v-for="(item, index) in louyulist"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="租赁起止日期">
          <el-date-picker
            v-model="value1"
            value-format="yyyy-MM-dd"
            @change="gettime"
            style="width: 100%"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="租赁合同">
          <el-upload
            class="upload-demo"
            :http-request="shangchaun"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :limit="3"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" plain>点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              支持扩展名：doc.docx.pdef,文件大小不得超过5M
            </div>
          </el-upload>
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
import {
  getqiye,
  chakan,
  delqiy,
  getlouyua,
  addrent,
  getshangchaun,
} from "@/api/user";
export default {
  name: "WisdomIndex",
  data() {
    return {
      tableData: [{ name: 111 }],
      tableData1: [],
      fileList: [],
      dialogVisible: false,
      pagea: {
        name: "",
        page: 1,
        pageSize: 10,
      },
      total: 0,
      value: "",
      value1: "",
      form: {
        type: 0,
      },
      louyulist: [],
    };
  },
  methods: {
    handleClose(done) {
      done();
    },
    async getlist() {
      const res = await getqiye({ ...this.pagea });
      console.log("res", res);
      this.tableData = res.rows;
      this.total = res.total;
    },
    async getlou() {
      const res = await getlouyua();
      this.louyulist = res;
      console.log("Res", res);
    },
    addhe(id) {
      this.dialogVisible = true;
      this.form.enterpriseId = id;
    },
    async handleSizeChange(val) {
      this.pagea.pageSize = val;
      this.pagea.page = 1;
      console.log("aaa", this.pagea);
      const res = await getqiye({ ...this.pagea });
      console.log("res", res);
      this.tableData = res.rows;
      this.total = res.total;
    },
    sahngchuan() {},
    chakan1(id) {
      console.log(id);
      this.$router.push({
        path: "/detail",
        query: { id },
      });
    },
    async qd() {
      console.log("rewada", this.form);
      const res = await addrent(this.form);
      this.dialogVisible=false
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await delqiy(id);
          console.log("res", res);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getlist();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async shangchaun(params) {
      if (params.file.size > 5 * 1024 * 1024) {
        this.$message.error("上传文件大小不能超过 5MB!");
        return false;
      }
      const file = params.file;
      console.log("params", params);
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("type", "contract");
      const res = await getshangchaun(formdata);
      this.form.contractId = res.id;
      this.form.contractUrl = res.url;
    },
    gettime() {
      console.log(this.value1);
      this.form.startTime = this.value1[0];
      this.form.endTime = this.value1[1];
    },
    bj(id) {
      console.log(id);
      this.$router.push({
        path: "/edit",
        query: { id },
      });
    },
    async detil(expandedRows, expanded) {
      console.log(expandedRows);
      const res = await chakan(expandedRows.id);
      console.log(res);
      this.tableData1 = res.rent;
    },
    async handleCurrentChange(val) {
      this.pagea.page = val;
      console.log("aaa", this.pagea);
      const res = await getqiye({ ...this.pagea });
      console.log("res", res);
      this.tableData = res.rows;
      this.total = res.total;
    },
    async cha() {
      this.pagea.name = this.value;
      this.pagea.page = 1;
      const res = await getqiye({ ...this.pagea });
      console.log("res", res);
      this.tableData = res.rows;
      this.total = res.total;
      this.$message({
        type: "success",
        message: "查询成功",
      });
    },
    add() {
      this.$router.push("/add");
    },
  },
  created() {
    this.getlist();
    this.getlou();
  },
};
</script>

<style lang="scss" scoped></style>
