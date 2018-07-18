<template>
  <div class="car-insurance">
    <img src="../assets/car_buy_banner.jpg" class="img-banner">
    <section class="section-wrap">
      <a href="tel:4006398009">
        <img src='../assets/phone-bg.png' class='img-phone'>
      </a>
      <form class='form-wrap' @submit.prevent>
        <my-input :props='nameInput.props' :model="nameInput.model"></my-input>
        <my-input :props='mobileInput.props' :model="mobileInput.model"></my-input>
        <my-input :props='carInput.props' :model="carInput.model"></my-input>
        <button type="submit" class='button-primary button-bg-full' @click.prevent='baseInfoSubmit'>快速报价</button>
      </form>  
    </section>
  </div>
</template>

<script>
  import MyInput from '../components/input'
  import {formatMobileLimit, isWeixin} from '../utils/util'
  import formValidMixin from './_mixin/formValidMixin'
  import {carBuyApply} from '../api/carLoanApply'

  export default {
    mixins: [formValidMixin],
    data () {
      return {
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
            placeholder: '请填写手机号',
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
        carInput: {
          props: {
            label: '中意车型',
            type: 'text',
            placeholder: '如:大众途观',
            readOnly: false,
            isBorder: true,
            value: '',
            validOff: false,
            rules: {
              required: true
            }
          },
          model: 'carModels'
        }
      }
    },
    methods: {
      baseInfoSubmit () {
        if (this.isFormValid()) {
          return
        }
        carBuyApply(this.applyEdit).then(() => {
          /* eslint-disable */
          isWeixin() && WeixinJSBridge.call('closeWindow')
        })
      }
    },
    components: {
      MyInput
    }
  }
</script>

<style lang="scss" scoped>
  .car-insurance {
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
    margin: .30rem;
    background-color: #fff;
    border-radius: 4px;
    padding: 0.6rem 0.3rem;
  }

  .img-phone {
    width: 100%;
    height: 1rem;
    margin-bottom: 0.1rem;
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
