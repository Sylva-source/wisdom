<template>
  <div class="add">
<div class="top">
 <span @click="hu"> ← 返回 | 编辑企业</span> <span>程序员</span>
</div>

<div class="center">
<div class="centertop">
<div class="qiye"><div style="background-color:#4770ff; width: 3px; height: 18px;margin-right: 5px;"></div>企业信息</div>
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="企业名称" prop="name" style="width: 46%;">
    <el-input v-model="ruleForm.name" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="法人" prop="legalPerson" style="width: 46%;">
    <el-input v-model="ruleForm.legalPerson" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="注册地址" prop="registeredAddress" style="width: 46%;">
    <el-input v-model="ruleForm.registeredAddress" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="所在行业" prop="industryCode" style="width: 46%;">
    <el-select v-model="ruleForm.industryCode" placeholder="请选择负责人" size="mini" style="width: 100%;">
      <el-option v-for="item,index in indslist" :label="item.industryName" :value="item.industryCode" :key="index"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="营业执照" prop="businessLicenseUrl" style="width: 46%;">
<template>
  <el-upload
  class="upload-demo"
  action="https://jsonplaceholder.typicode.com/posts/"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :file-list="fileList">
  <el-button size="small" type="primary" plain>点击上传</el-button>
  <div slot="tip" class="el-upload__tip">支持扩展名：png.jpg.jpeg,文件大小不得超过5M</div>

  </el-upload>
</template>
  </el-form-item>
  </el-form>


</div>
<div class="centerbtm">
  <div class="qiye"><div style="background-color:#4770ff; width: 3px; height: 18px;margin-right: 5px;"></div>联系人信息</div>
  <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
  <el-form-item label="企业联系人" prop="contact" style="width: 46%;">
    <el-input v-model="ruleForm1.contact" size="mini"></el-input>
  </el-form-item>
  <el-form-item label="联系电话" prop="contactNumber" style="width: 46%;">
    <el-input v-model="ruleForm1.contactNumber" size="mini"></el-input>
  </el-form-item>
  </el-form>

</div>



</div>
<div class="bom">
  <el-button size="mini">重置</el-button>
  <el-button size="mini" type="primary" @click="qd('ruleForm','ruleForm1')">确定</el-button>
</div>

  </div>
</template>

<script>
import {chakan,editqy,indus} from '@/api/user'
export default {
  name: 'Add',
  data(){
    return{
      id:0,
      indslist:[],
      ruleForm:{
        name:'',
        legalPerson:'',
        registeredAddress:'',
        businessLicenseId:0,
        businessLicenseUrl:'',
        industryCode:'',
        // industryName:''
      },
      ruleForm1:{
        contact:'',
        contactNumber:'',
      },
      rules: {
          name: [
            { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          ],
          legalPerson: [
            { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          ],
          registeredAddress: [
            { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          ],
          industryCode: [
            { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          ],
          // businessLicenseUrl: [
          //   { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          // ],
          contact: [
            { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          ],
          contactNumber: [
            { required: true, message: '必填项，内容不能为空', trigger: 'blur' },
          ],
      },
      fileList: []
    }
  },
  methods:{
    async getlist(){
const res=await chakan(this.id)
console.log("resaaa",res);
this.list=res
this.ruleForm.name=res.name
this.ruleForm.legalPerson=res.legalPerson
this.ruleForm.registeredAddress=res.registeredAddress
this.ruleForm.businessLicenseId=res.businessLicenseId
this.ruleForm.businessLicenseUrl=res.businessLicenseUrl
this.ruleForm.industryCode=res.industryCode
// this.ruleForm.industryName=res.industryName
this.fileList
this.ruleForm1.contact=res.contact
this.ruleForm1.contactNumber=res.contactNumber
const file=[{
  name:res.businessLicenseName,
  url:res.businessLicenseUrl
}]
this.fileList=file
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      hu(){
        this.$router.back()
      },
      qd(formName,formName1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$refs[formName].validate(async(valid) => {
          if (valid) {
const res=editqy({...this.ruleForm,...this.ruleForm1,id:this.id})
console.log(this.ruleForm.industryName);
console.log("ressss",res);
this.getlist()
this.$message({
  type: 'success',
  message: '编辑成功',
})
          } else {
            console.log('error submit!!');
            return false;
          }
        });

          } else {
            console.log('error submit!!');

            this.$refs[formName1].validate((valid) => {
          if (valid) {
          } else {
            console.log('error submit!!');
            return false;
          }
        });
            return false;
          }
        });
      },
      async getindusc(){
        const res=await indus()
        console.log("rea",res);
        this.indslist=res
      }
  },
  created(){
this.id=this.$route.query.id
this.getlist()
this.getindusc()
  },
};
</script>

<style lang="scss" scoped>
.add{
  background-color:#f4f6f8 ;
  width: 100vw;
  height: 100vh;
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
  padding: 0 50px;
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
.bom{
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 65px;
  padding-left: 46%;
  padding-top: 20px;
  box-sizing: border-box;
}
</style>
