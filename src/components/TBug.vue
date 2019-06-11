<template>
  <div>
    <Form :model="form" label-position="right" :label-width="80" :rules="ruleValidate" ref="formValidate_content">
      <Row>
        <Col span="12">
          <FormItem label="所属产品" prop="product">
            <Select v-model="form.product" filterable>
              <Option v-for="product in products()" :value="product[0]" :key="product[0]">{{ product[1] }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属项目" prop="project">
            <Select v-model="form.project" filterable>
              <Option v-for="project in projects()" :value="project[0]" :key="project[0]">{{ project[1] }}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>


      <Row>

        <Col span="12">
          <FormItem label="当前指派" prop="assignedTo">
            <Select v-model="form.assignedTo" filterable>
              <Option v-for="user in users()" :value="user[0]" :key="user[0]" :label="user[1]">
                {{ user[1] }} ({{ user[2] }})
              </Option>
            </Select>
          </FormItem>
        </Col>

        <Col span="12">
          <FormItem label="抄送" prop="mailto">
            <Select v-model="form.mailto" filterable multiple>
              <Option v-for="user in users()" :value="user[0]" :key="user[0]" :label="user[1]">
                {{ user[1] }} ({{ user[2] }})
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>


      <Row>
        <Col span="8">

          <FormItem label="Bug类型" prop="type">
            <Select v-model="form.type">
              <Option value="codeerror">开发缺陷</Option>
              <Option value="interface">优化建议</Option>
              <Option value="designdefect">设计缺陷</Option>
              <Option value="config">配置相关</Option>
              <Option value="install">安装部署</Option>
              <Option value="security">安全相关</Option>
              <Option value="performance">性能问题</Option>
              <Option value="standard">标准规范</Option>
              <Option value="automation">测试脚本</Option>
              <Option value="others">其他</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="严重程度" prop="severity">
            <Select v-model="form.severity">
              <Option value="1">S（致命的）</Option>
              <Option value="2">A（严重的）</Option>
              <Option value="3">B（一般的）</Option>
              <Option value="4">C（微小的）</Option>
            </Select>
          </FormItem>

        </Col>
        <Col span="8">
          <FormItem label="优先级" prop="pri">
            <Select v-model="form.pri">
              <Option value="1">最高</Option>
              <Option value="2">较高</Option>
              <Option value="3">普通</Option>
              <Option value="4">较低</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <FormItem label="Bug标题" prop="title">
        <Input v-model="form.title">

          <Select v-model="form.title_pre" slot="prepend" style="width: 80px">
            <Option value="Android">Android</Option>
            <Option value="iOS">iOS</Option>
            <Option value="H5">H5</Option>
            <Option value="UI">UI</Option>
            <Option value="服务端">服务端</Option>
          </Select>
        </Input>
      </FormItem>
      <FormItem label="重现步骤" prop="steps">

        <quillEditor v-model="form.steps"
                     ref="myQuillEditor"
                     :options="editorOption"
                     class="editor">
        </quillEditor>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  import VueQuillEditor, {Quill, quillEditor} from 'vue-quill-editor'
  import {ImageDrop} from 'quill-image-drop-module'
  import {container, ImageExtend, QuillWatch} from '@/components/quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
  Quill.register('modules/imageDrop', ImageDrop)

  import {mapState, mapGetters, mapActions, mapMutations} from 'vuex'
  import {baseURL_TMT} from "@/config";

  export default {
    components: {
      quillEditor
    },
    name: "TBug",
    data() {
      return {
        editorOption: {
          theme: 'bubble',
          placeholder: "",
          modules: {
            // toolbar: [
            //   ['bold', 'italic', 'underline', 'strike'],
            //   [{'list': 'ordered'}, {'list': 'bullet'}],
            //   [{'align': []}],
            //   ['image'],
            // ],
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{'list': 'ordered'}, {'list': 'bullet'}],
                [{'align': []}],
                // ['image'],
              ],
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            },
            imageDrop: true,
            ImageExtend: {
              loading: true,
              name: 'file',
              action: baseURL_TMT + "/api/tmt/bugfiles/",
              response: (res) => {
                return res.data.issue_file_url
              }
            },

          }
        },
        form: {
          'type': 'codeerror',
          'severity': '3',
          'pri': '3',
          'steps': "<p>[步骤]</p><br /><br /><p>[结果]</p><br /><br /><p>[期望]</p><br /><br />"
        },
        ruleValidate: {
          product: [
            {required: true, message: '产品不能为空', trigger: 'change'}
          ],
          project: [
            {required: true, message: '项目不能为空', trigger: 'change'},
          ],
          assignedTo: [
            {required: true, message: '指派人不能为空', trigger: 'change'}
          ],
          type: [
            {required: true, message: '类型不能为空', trigger: 'change'}
          ],
          severity: [
            {required: true, message: '严重程度不能为空', trigger: 'change'}
          ],
          pri: [
            {required: true, message: '优先级不能为空', trigger: 'change'}
          ],
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          steps: [
            {required: true, message: '描述不能为空', trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      ...mapGetters(['products', 'projects', 'users']),
      ...mapActions(['getProjects', 'getProducts', 'getUsers']),
      ...mapMutations(['update_form']),
      async check_validate() {
        let vaild = true;
        await this.$refs['formValidate_content'].validate((valid_content) => {
          vaild = valid_content
        })
        return vaild;
      },
    },
    mounted() {
      this.getProducts();
      this.getUsers();

    },
    watch: {
      'form.product': {
        handler: function (nowVal, oldVal) {
          this.getProjects({id: nowVal})
        }
      },
      'form': {
        handler: function (nowVal, oldVal) {
          this.update_form(nowVal)
        }, deep: true
      }
    }
  }
</script>

<style>
  .ql-editor {
    /*height: calc(100vh - 650px);*/
    height: calc(100vh - 505px);
    border: 1px solid #ccc;
  }
</style>
