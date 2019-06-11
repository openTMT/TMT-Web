<style>
  .content-body {
    margin-top: 70px;
    padding-top: 30px;
    min-height: calc(100vh - 33px);
    background: rgb(255, 255, 255);
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  }

  .time {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .content {
    font-size: 14px;
    padding-left: 5px;
  }

  .goodShow {
    position: relative;
    overflow-y: scroll;
  }

</style>
<template>
  <div class="content-body">
    <Row :gutter="16">
      <Col span="6">
        &nbsp;
      </Col>
      <Col span="12">
        <div>

          <Timeline>
            <TimelineItem color="red">
              <Icon type="ios-trophy" slot="dot" size="20"></Icon>
              <p class="time">2019-06-11</p>
              <div class="ivu-article">
                <ul>
                  <li>TMT平台正式开源</li>
                  <li>新增 提测单创建功能</li>
                  <li>新增 提测后企业微信通知功能</li>
                  <li>新增 提测单列表查询功能</li>
                </ul>
              </div>
            </TimelineItem>

            <TimelineItem>
              <p class="time">没有更多了</p>
            </TimelineItem>
          </Timeline>
        </div>
      </Col>
      <Col span="6">
        &nbsp;
      </Col>


    </Row>


  </div>
</template>

<script>


  export default {}
</script>
