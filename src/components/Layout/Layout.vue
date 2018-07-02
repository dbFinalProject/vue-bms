<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">用户服务</el-menu-item>
      <el-menu-item index="2">查看库存</el-menu-item>
      <el-menu-item index="3">购买图书</el-menu-item>
      <el-menu-item index="4">营业额</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  computed:{
    activeIndex(){
      return this.$route.path.replace('/','')
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">
  .el-menu{
    width: 100%;
    margin: 0px;
  }
</style>
