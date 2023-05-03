<template>
  <div style="padding: 20px;">
    <h1>首页展示管理</h1>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="轮播图管理" name="1">
        <template slot="title">
          <h2>轮播图管理</h2>
        </template>
        <el-card style="width: 20%;" :body-style="{ padding: '20px',width: '100%' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <div style="padding: 14px">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
      <el-collapse-item title="轮播图管理" name="1">
        <template slot="title">
          <h2>精品小说管理</h2>
        </template>
        <el-card style="width: 20%;" :body-style="{ padding: '20px',width: '100%' }">
          <img
            src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
            class="image"
          >
          <div style="padding: 14px">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1']
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
</style>
