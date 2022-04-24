<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <CommonForm
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </CommonForm>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false"> 取消</el-button>
        <el-button type="primary" @click="confirm">确认</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser"> +新增 </el-button>

      <CommonForm
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <!-- <input type="text" placeholder="请输入" class="s_input"> -->
        <el-button type="primary" @click="getList(searchForm.keyword)"> 搜索 </el-button>
      </CommonForm>
    </div>
    <CommonTable
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    >
    </CommonTable>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { getUser } from "../../api/data";
import { time } from "echarts";
export default {
  name: "user",
  data() {
    return {
      operateType: "add",
      isShow: false,
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        sex: "",
        birth: "",
        
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keywords: "",
      },
      tableData: [],
      // sexLabel:'',
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLable",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    };
  },
  components: {
    CommonForm,
    CommonTable,
  },
  methods: {
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log("edit打印出来的",res);
          this.isShow = false;
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log("add打印出来的",res);
          this.isShow = false;
          this.getList();
        });
      }
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = {...row};
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : "";
      getUser({
        page: this.config.page,
        name,
      }).then(({data:res}) => {
        console.log('getuser成功的时候返回的数据',res)
        this.tableData = res.list.map((item) => {
          item.sexLable = item.sex === 0 ? "女" : "男";
          return item;
        });
        console.log("打印tabledata",this.tableData)
        console.log("打印tablelabel",this.tableLabel)
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  .el-button {
    width: 70px;
    height: 40px;
  }
}
</style>