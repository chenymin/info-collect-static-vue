<template>
  <div class='car-insurance'>
    <img src='../assets/banner-bg.png' class='img-banner'>
    <div class='section-wrap up-top'>
      <section class='icon-page-wrap'>
        <img src='../assets/icon-page.png' class='icon-page'>
      </section>
       <a href="tel:4006398009">
          <img src='../assets/phone-bg.png' class='img-phone'>
      </a>
      <form class='form-wrap' bindsubmit="subminActionInfo">
        <distpicker 
          :props='distpicker.props'
          :model='distpicker.model'
          :province='distpicker.province'
          :city='distpicker.city'
          :area='distpicker.area'>
        </distpicker>
        <my-input :props='carNameInput.props' :model="carNameInput.model"></my-input>
        <my-input :props='nameInput.props' :model="nameInput.model"></my-input>
        <my-input :props='mobileInput.props' :model="mobileInput.model"></my-input>
        <my-input :props='carInsuranceInput.props' :model="carInsuranceInput.model"></my-input>
        <button class='button-primary button-bg-full'  @click.prevent='baseInfoSubmit'>快速申请</button>
      </form>
  </div>
</div>
</template>

<script>
  import MyInput from '../components/input'
  import Distpicker from '../components/distpickers/distpicker'
  import {formatMobileLimit, isWeixin} from '../utils/util'
  import formValidMixin from './_mixin/formValidMixin'
  import {carInsuranceApply} from '../api/carLoanApply'

  export default {
    mixins: [formValidMixin],
    data () {
      return {
        distpicker: {
          props: {
            isAll: true,
            defaultVal: '北京市-市辖区-朝阳区',
            isNeedValue: true
          },
          province: '',
          city: '',
          area: '',
          model: 'address'
        },
        carNameInput: {
          props: {
            label: '车牌号码',
            type: 'text',
            placeholder: '请输入车牌号码',
            readOnly: false,
            isBorder: true,
            value: '',
            validOff: false,
            rules: {
              required: true
            }
          },
          model: 'carNumber'
        },
        nameInput: {
          props: {
            label: '姓名',
            type: 'text',
            placeholder: '请填写您的真实姓名',
            readOnly: false,
            isBorder: true,
            value: '',
            validOff: false,
            rules: {
              required: true,
              characters: true,
              max: 20,
              min: 2
            }
          },
          model: 'userName'
        },
        mobileInput: {
          props: {
            label: '手机号',
            type: 'tel',
            placeholder: '请填写您的手机号',
            readOnly: false,
            isBorder: true,
            value: '',
            format: formatMobileLimit,
            validOff: false,
            rules: {
              required: true,
              phone: true
            }
          },
          model: 'phone'
        },
        carInsuranceInput: {
          props: {
            label: '车险',
            type: 'text',
            placeholder: '请输入车险名称',
            readOnly: false,
            isBorder: true,
            value: '',
            validOff: false,
            rules: {
              required: true
            }
          },
          model: 'carInsurance'
        }
      }
    },
    methods: {
      baseInfoSubmit () {
        if (this.isFormValid()) {
          return
        }
        carInsuranceApply(this.applyEdit).then(() => {
          /* eslint-disable */
          isWeixin() && WeixinJSBridge.call('closeWindow')
        })
      }
    },
    components: {
      MyInput,
      Distpicker
    }
  }
</script>

<style lang="scss" scoped>
  .car-insurance {
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 100vh;
    background-color: #efefef;
  }

  .img-banner {
    width: 100%;
    height: 3.6rem;
  }

  .section-wrap {
    margin: .3rem;
    background-color: #fff;
    border-radius: 4px;
    padding: .6rem .3rem;
  }

  .up-top {
    margin-top: -1.5rem;
  }

  .icon-page-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    height: 45px;
  }

  .icon-page {
    width: 2.70rem;
    height: 2.70rem;
    margin-top: -2rem;
    margin-bottom: .6rem;
  }

  .img-phone {
    width: 100%;
    height: 1rem;
  }

  .button-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .6rem;
    border-radius: .4rem;
    color: #fff;
    font-size: .32rem;
    height: 1rem;
    width: 100%;
  }

  .button-bg-full {
    background-image: linear-gradient(to right, #ff6e34, #fea325);
  }

  .button-border {
    background-color: #fff; 
    border: 1px solid #d85728;
    color: #fe9629;
  }
</style>
