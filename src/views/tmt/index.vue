<template>
  <div>

    <Layout :style="{margin: '70px 0px 0'}">
      <Layout class="content-wrapper">
        <Content class="content">
          <Row :gutter="20">
            <Col span="10">
              <Card>
                <Icon type="logo-buffer" size="20"/>
                设备数据
                <!--<Button @click="app_download = true" size="small" type="default">-->
                <!--<Icon type="md-download"/>-->
                <!--Android版APP下載-->
                <!--</Button>-->
                <TiOS style="float: right"></TiOS>

                <Divider style="margin: 15px 0"/>
                <TImageView class="left"></TImageView>
              </Card>
            </Col>
            <Col span="14">
              <Row>
                <Card>
                  <Icon type="ios-bug" size="20"/>
                  BUG描述
                  <ButtonGroup style="float: right">
                    <Button type="primary" @click="create_bug()" size="small">提交</Button>
                  </ButtonGroup>
                  <Divider style="margin: 15px 0"/>
                  <TBug ref="tbug"></TBug>
                </Card>
                <br/>

                <Collapse simple>
                  <Panel name="1" :hide-arrow="false">
                    <Icon type="md-cube" size="20"/>
                    设备详细信息
                    <div slot="content">
                      <TDeviceInfo></TDeviceInfo>
                    </div>
                  </Panel>
                </Collapse>
                <!--<Card>-->
                <!--<Icon type="md-cube" size="20"/>-->
                <!--设备详细信息-->
                <!--<Divider style="margin: 15px 0"/>-->
                <!--<TDeviceInfo></TDeviceInfo>-->
                <!--</Card>-->
              </Row>

            </Col>

          </Row>
        </Content>
      </Layout>
    </Layout>


    <Drawer title="TMT下载" placement="left" :closable="false" v-model="app_download">
      <qrcode v-if="appHistoryData.length>0" :value="appHistoryData[0].file_url" :options="{ size: 200 }"></qrcode>
      <br/><br/><br/>
      <Timeline>
        <TimelineItem color="green" v-for="app in appHistoryData">
          <p>
            <Tag checkable color="success">{{app.version}}版本</Tag>
          </p>
          <p>{{app.create_time}}</p>
          <pre>{{app.update_log}}</pre>
        </TimelineItem>
      </Timeline>
    </Drawer>


    <!--<Drawer title="我提交的BUG" placement="right" :closable="false" v-model="app_download" width="380">-->
    <!--<Card style="width:350px">-->
    <!--<p slot="title">-->
    <!--<Icon type="ios-film-outline"></Icon>-->
    <!--Classic film-->
    <!--</p>-->
    <!--<a href="#" slot="extra" @click.prevent="changeLimit">-->
    <!--<Icon type="ios-loop-strong"></Icon>-->
    <!--Change-->
    <!--</a>-->
    <!--</Card>-->
    <!--</Drawer>-->

    <!--<div style="position:absolute;top:10px;left:170px;z-index: 999">-->
      <!--<Button size="small" icon="md-cloud-download" @click="app_download = true" type="default" shape="circle">-->
        <!--Android版APP下载-->
      <!--</Button>-->
    <!--</div>-->


  </div>
</template>

<script>
  import TImageView from "../../components/TImageView";
  import TBug from "../../components/TBug";
  import TDeviceInfo from "../../components/TDeviceInfo";
  import TiOS from "../../components/TiOS";

  import Vue from 'vue'
  import VueSimpleWebSocket from 'vue-simple-websocket'
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {WEBSOCKET_TMT} from "../../config";

  import {tmtGetAppHistory} from '@/api/tmt'

  Vue.use(VueSimpleWebSocket, WEBSOCKET_TMT, {
    reconnectEnabled: true,
    reconnectInterval: 1000 // time to reconnect in milliseconds
  })

  export default {
    name: 'index',
    components: {TDeviceInfo, TBug, TImageView, TiOS},
    data: () => {
      return {
        active_menuitem: '',
        app_download: false,
        appHistoryData: [],
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.active_menuitem = this.$route.name
      });

    },
    created() {
      // this.initWebSocket();
      this.$socketClient.onOpen = () => {
        console.log('websocket connected')
        this.$socketClient.sendObj({message: "connect", room: this.username()})
      }
      this.$socketClient.onMessage = (msg) => {
        console.log('websocket message：' + msg.data)
        this.update_device_info(JSON.parse(msg.data).device_info)
        this.push_files(JSON.parse(msg.data).message)

      }
      this.$socketClient.onClose = (msg) => {
        console.log('websocket closed')
      }
      this.$socketClient.onError = (msg) => {
        console.log('websocket error')
      }
      this.getAppHistory()


    },
    destroyed() {
      // this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      ...mapMutations(['push_files', 'update_device_info']),
      ...mapActions(['createBug']),
      ...mapGetters(['username']),
      async create_bug() {

        let vaild = await this.$refs.tbug.check_validate();
        if (!vaild) {
          this.$Notice.error({title: '提交失败', desc: '请检查必填项'});
          return
        }

        this.createBug().then(res => {
          if (res.data.status) {
            this.$Notice.success({
              title: '提交成功',
              desc: '<a href="' + res.data.data + '" target="_blank">' + res.data.data + '</a>'
            });

          } else {
            this.$Notice.error({title: '提交失败', desc: '原因：' + res.data.data});
          }
        }).catch(error => {
          this.$Notice.error({title: '提交失败', desc: '提交失败'});
        });
      },
      getAppHistory() {
        tmtGetAppHistory().then(res => {
          if (res.data.status) {
            this.appHistoryData = res.data.data
          }
        })
      },
    },

  }
</script>

<style scoped>

  .content-wrapper {
    padding: 0;
    background: rgb(238, 238, 238);
  }

  .content {
    margin: 0px 20px 0px 20px;
    min-height: calc(100vh - 116px);
    background: rgb(238, 238, 238);
  }

  .left {
    height: calc(100vh - 200px);

  }
</style>
