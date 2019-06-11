<style>
  body {
    background: #f8f8f9;
    background-image: url('../../../src/assets/img/bg.svg');

  }

  .login-content {
    /*text-align: center; !*让div内部文字居中*!*/
    width: 300px;
    height: 350px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 200px;

  }

  .login-title {
    font-weight: bold;
    font-size: medium;
  }

</style>

<template>
  <div class="login-content">
    <Card :style="{width:'350px'}">

      <span class="login-title"><Icon type="md-person"/> 欢迎登录 </span><span>(请使用对应缺陷系统的账户)</span>
      <Divider></Divider>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline
            @keyup.enter.native="handleSubmit('formInline')">
        <FormItem prop="username" label="用户名" :style="{width: '100%'}">
          <Input type="text" v-model="formInline.username" placeholder="账号">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password" label="密码" :style="{width: '100%'}">
          <Input type="password" v-model="formInline.password" placeholder="密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <br/><br/>
        <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
      </Form>
    </Card>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        formInline: {
          username: '',
          password: ''
        },
        ruleInline: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {
              type: 'string',
              min: 1,
              message: '至少1位',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.doLogin()
          } else {
            this.$Message.error('登录失败,请填写完整');
          }
        })
      },
      doLogin() {
        this.login({
          username: this.formInline.username,
          password: this.formInline.password
        }).then(() => {
          this.$router.push({name: 'tmt'})
        }).catch(error => {
          this.$Message.error(error.message);

        })

      }
    }
  }
</script>
