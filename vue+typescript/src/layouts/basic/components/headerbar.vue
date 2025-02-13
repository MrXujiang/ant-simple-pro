<template>
  <header class="header">
    <div class="header-inner">
      <div v-if="!drawerVisible" class="header-trigger" @click="onToggle">
        <ComSvgIcon v-if="windowWidth > 750" :name="collapsed ? 'menu-unfold' : 'menu-fold'"></ComSvgIcon>
        <ComSvgIcon v-else name="menu-unfold"></ComSvgIcon>
      </div>
      <div v-else></div>
      <a-row class="header-right" type="flex" align="middle">
        <a-row class="communication" type="flex" align="middle">
          <Communication />
        </a-row>
        <a-row class="docs" type="flex" align="middle">
          <a class="docs-link" href="http://blog.lgf196.top/ant-simple-pro-document/" target="_blank">
            <a-tooltip title="文档" placement="bottom">
              <QuestionCircleOutlined />
            </a-tooltip>
          </a>
        </a-row>
        <a-row class="notification" type="flex" align="middle">
          <Notification />
        </a-row>
        <a-row class="fullscreen" type="flex" align="middle">
          <Fullscreen />
        </a-row>
        <a-dropdown placement="bottomRight">
          <a-row type="flex" align="middle" class="user-container">
            <a-avatar :size="26" :src="user.iconUrl">
              <template #icon><UserOutlined /></template>
            </a-avatar>
            <span class="username">{{ user.username }}</span>
          </a-row>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="onToPersonCenter">
                <UserOutlined />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-divider></a-menu-divider>
              <a-menu-item @click="onLogout">
                <LogoutOutlined />
                <span>退出登录</span>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-dropdown placement="bottomRight">
          <a-button size="small" class="more-button">
            更多
            <DownOutlined />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item v-for="(item, index) in moreList" :key="index">
                <a :href="item.url" target="_blank" rel="noopener noreferrer">
                  {{ item.name }}
                </a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-row>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, createVNode, computed, reactive } from 'vue'
import {
  UserOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  DownOutlined
} from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'
import appStore from '@/store/modules/app'
import userStore from '@/store/modules/user'
import Notification from './notification.vue'
import Fullscreen from '@/components/fullscreen/index.vue'
import Communication from './communication.vue'
const oriMoreList = [
  {
    name: 'ant-simple-pro(afterEnd)',
    url: 'https://github.com/lgf196/ant-simple-pro/tree/afterEnd'
  },
  {
    name: 'ant-simple-pro(react)',
    url: 'https://github.com/lgf196/ant-simple-pro/tree/master/react'
  },
  {
    name: 'ant-simple-pro(react+ts)',
    url: 'https://github.com/lgf196/ant-simple-pro/tree/master/react-typescript'
  },
  {
    name: 'ant-simple-pro(vue3.0)',
    url: 'https://github.com/lgf196/ant-simple-pro/tree/master/vue'
  },
  {
    name: 'ant-simple-pro(vue3.0+ts)',
    url: 'https://github.com/lgf196/ant-simple-pro/tree/vue-typescript'
  },
  {
    name: 'ant-simple-pro(angular)',
    url: 'https://github.com/lgf196/ant-simple-pro/tree/angular/angular'
  }
]
export default defineComponent({
  name: 'HeaderBar',
  components: {
    UserOutlined,
    LogoutOutlined,
    QuestionCircleOutlined,
    DownOutlined,
    Notification,
    Fullscreen,
    Communication
  },
  emits: ['open-drawer'],
  props: {
    drawerVisible: Boolean,
    windowWidth: {
      type: Number,
      default: 0
    }
  },
  setup() {
    const collapsed = computed(() => appStore.collapsed)
    const user = computed(() => userStore.currentUser)
    const moreList = reactive(oriMoreList)
    return {
      collapsed,
      user,
      moreList
    }
  },
  data() {
    return {}
  },
  methods: {
    onToggle() {
      if (this.windowWidth <= 750) {
        this.$emit('open-drawer')
      } else {
        appStore.TOGGLE_SLIDE_BAR()
      }
    },
    onLogout() {
      Modal.confirm({
        title: '温馨提示',
        content: '确定要退出登录吗',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: () => {
          userStore.logout().then(() => {
            // this.$router.replace('/login')
            location.reload(true)
          })
        }
      })
    },
    onToPersonCenter() {
      this.$router.push('/userInfo')
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  z-index: 199;
  position: relative;
  display: flex;
  height: @header-height;
  padding-right: 24px;
  background: #fff;

  ::v-deep(.header-right) {
    .anticon-qq,
    .anticon-question-circle,
    .icon-bell,
    .fullscreen {
      font-size: 18px;
      color: rgba(105, 123, 140, 0.7);
    }
  }
}

.header-inner {
  flex: auto;
  display: flex;
  justify-content: space-between;
}

.header-trigger {
  // width: @header-height;
  width: 44px;
  height: @header-height;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s;
  cursor: pointer;
  color: @color-text-regular;
  font-size: @font-size-extra-large;

  &:hover {
    // color: @color-primary;
    background-color: #f9f9fc;
  }
}

.header-right {
  padding-right: 15px;
}

.communication {
  padding: 0 10px;
}

.docs {
  padding: 0 10px;

  .docs-link {
    display: flex;
  }
}

.fullscreen {
  height: 100%;
  padding: 0 10px;
  cursor: pointer;
}

.user-container {
  height: 100%;
  padding: 0 12px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    // color: @color-primary;
    background-color: #f9f9fc;
  }

  .username {
    margin-left: 8px;
    color: rgba(105, 123, 140, 0.7);
  }
}

.notification {
  height: 100%;
  padding: 0 10px;
  cursor: pointer;

  ::v-deep(.ant-badge) .ant-badge-count {
    min-width: 14px;
    height: 14px;
    padding: 0;
    font-size: 12px;
    line-height: 14px;
    border-radius: 7px;
    background: #ff4d4f;
  }
}

.more-button {
  margin-left: 8px;
  color: rgba(105, 123, 140, 0.7);
}
</style>
