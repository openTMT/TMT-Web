<template>

  <div>
    <Row>
      <div class="ivu-article">
        <Col span="12">
          <p>
            <Icon type="md-phone-portrait" size="18"/>
            设备机型：{{device_info().device_name}}
          </p>
        </Col>
        <Col span="12">
          <p>
            <Icon type="ios-information-circle" size="18"/>
            系统版本：{{device_info().system}}
          </p>
        </Col>
        <Col span="12">
          <p>
            <Icon type="md-battery-dead" size="18"/>
            当前电量：{{device_info().charge}}
          </p>
        </Col>
        <Col span="12">
          <p>
            <Icon type="ios-apps" size="18"/>
            分辨率：{{device_info().screen}}
          </p>
        </Col>
        <Col span="12">
          <p>
            <Icon type="md-card" size="18"/>
            设备内存：{{device_info().memory}}
          </p>
        </Col>
        <Col span="12">
          <p>
            <Icon type="ios-folder" size="18"/>
            设备存储：{{device_info().storage}}
          </p>
        </Col>

      </div>
    </Row>
  </div>

</template>

<script>
  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'

  export default {
    name: "TDeviceInfo",
    methods: {
      ...mapGetters(['device_info']),
    },
  }
</script>

<style scoped>

</style>