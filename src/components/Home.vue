<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <div class="logo"><img src="../assets/logo.png" alt=""></div>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapsed ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapsed">
          |||
        </div>
        <el-menu
          :collapse="isCollapsed"
          :collapse-transition="false"
          :default-active="activePath"
          :router="true"
          :unique-opened="true"
          active-text-color="#409EFF"
          background-color="#333744"
          text-color="#fff"
        >
          <el-submenu v-for="(item) in menuList" :key="item.id" :index="item.id + ''">
            <template slot="title">
              <i :class="iconObj[item.id]" />
              <span>{{ item.authName }}</span>
            </template>
            <el-menu-item
              v-for="(subItem) in item.children"
              :key="subItem.id"
              :index="'/' + subItem.path"
              @click="saveNavState('/' + subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu" />
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      menuList: [],
      iconObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      isCollapsed: false,
      activePath: ''
    }
  },

  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http('menus')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      } else {
        this.menuList = res.data
      }
    },
    toggleCollapsed() {
      this.isCollapsed = !this.isCollapsed
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }

}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header .logo {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: transparent;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-header .logo img {
  width: 60%;
  height: auto;
}

.el-header {
  background-color: #373D41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #EAEDF1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
