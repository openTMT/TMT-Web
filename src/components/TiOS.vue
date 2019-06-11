<template>

  <div>
    <Tag color="default" v-if="current_device"> {{current_device.device_name}} [iOS {{current_device.version}}]
    </Tag>


    <ButtonGroup>
      <Button type="primary" @click="tmtGetiOSDevice();drawer_display=true" size="small">
        <Icon type="md-reorder" size="15"/>
        iOS设备
      </Button>
      <Button type="success" @click="device_screenshot" :loading="screenshot_loading" size="small">
        <Icon type="ios-crop" size="15"/>
        iOS截图
      </Button>
      <Button type="warning" @click="device_log('start')" size="small" v-if="logcat_status=='stop'">
        <Icon type="md-bookmarks" size="15"/>
        iOS日志
      </Button>
      <Button type="warning" @click="device_log('stop')" size="small" v-if="logcat_status=='start'">
        <Icon type="md-bookmarks" size="15"/>
        iOS日志停止 {{logcat_seconds}}s
      </Button>
    </ButtonGroup>

    <Drawer title="iOS设备列表" width="350" placement="left" :closable="false" v-model="drawer_display">
      <Card v-for="device in device_list" :key="device.id" style="width:320px;margin-bottom: 20px">
        <div @click="select_device(device)">
          <!--<img src="../../images/logo.png">-->
          <div><span style="font-size: 18px">{{device.personal_name}}</span>
            <Tag v-if="device.status=='在线'" color="success" style="margin-left: 10px">{{device.status}}</Tag>
            <Tag v-else color="error" style="margin-left: 10px">{{device.status}}</Tag>
            <Tag v-if="device.owner!='public'" color="gold">私人设备</Tag>

          </div>
          <div><span>{{device.device_name}} ( iOS {{device.version}} )</span>
          </div>
          <div><span>UUID:{{device.uuid}}</span>
          </div>
        </div>
      </Card>
    </Drawer>
  </div>

</template>

<script>
  import {tmtGetiOSDevice, tmtiOSDeviceScreenshot, tmtiOSDeviceLogCat} from '@/api/tmt'

  export default {
    name: "TiOS",
    data() {
      return {
        drawer_display: false,
        screenshot_loading: false,
        device_list: [],
        current_device: false,
        logcat_status: 'stop',
        logcat_seconds: 0,
        timer: null,
      }
    },
    methods: {
      select_device(device) {
        this.current_device = device;
        this.drawer_display = false;
      },
      device_screenshot() {
        if (!this.current_device.uuid) {
          this.$Message.error('请先选择一个iOS设备');
          return
        }
        this.screenshot_loading = true;
        tmtiOSDeviceScreenshot(this.current_device.uuid).then(res => {
          if (res.data.status) {

          } else {
            this.$Message.error(res.data.message);
          }
          this.screenshot_loading = false;
        }, error => {
          this.$Message.error('失败');
          this.screenshot_loading = false;
        });
      },
      device_log(action) {
        if (!this.current_device.uuid) {
          this.$Message.error('请先选择一个iOS设备');
          return
        }


        if (action == 'start') {
          tmtiOSDeviceLogCat(this.current_device.uuid, action).then(res => {
            if (res.data.status) {
              this.logcat_status = 'start';
            } else {
              this.$Message.error(res.data.message);
              this.logcat_status = 'stop';
            }
          }, error => {
            this.$Message.error('失败');
            this.logcat_status = 'stop';
          });
        }
        else if (action == 'stop') {
          tmtiOSDeviceLogCat(this.current_device.uuid, action).then(res => {
            if (res.data.status) {
              this.logcat_status = 'stop';
            } else {
              this.$Message.error(res.data.message);
              this.logcat_status = 'stop';
            }
          }, error => {
            this.$Message.error('失败');
            this.logcat_status = 'stop';
          });
        }


      },

      tmtGetiOSDevice() {
        tmtGetiOSDevice().then(res => {
          if (res.data.status) {
            this.device_list = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        }, error => {
          this.$Message.error('失败');
        });
      },
      startCounter() {
        this.logcat_seconds += 1;
        this.timer = setTimeout(this.startCounter, 1000)
      },

      stopCounter() {
        this.logcat_seconds = 0;
        clearTimeout(this.timer);
      }
    },
    watch: {
      'logcat_status': {
        handler: function (nowVal, oldVal) {
          if (nowVal == 'start') {
            this.startCounter();
          }

          if (nowVal == 'stop') {
            this.stopCounter();
          }
        }
      },
      'logcat_seconds': {
        handler: function (nowVal, oldVal) {
          if (nowVal >= 120) {
            this.device_log('stop')
          }
        }
      },
    },
    beforeDestroy() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }

  }
</script>

<style scoped>

</style>