<template>
    <div class='car-insurance'>
        <img src='../assets/car_buy_banner.jpg' class='img-banner'>
        <section class='section-wrap'>
            <a href="tel:4006398009">
               <img src='../assets/phone-bg.png' class='img-phone'>
            </a>
            <form class='form-wrap' @submit.prevent>
                <my-input :props='nameInput.props' :model="nameInput.model"></my-input>
                <my-input :props='mobileInput.props' :model="mobileInput.model"></my-input>
                <div class='form-filed'>
                    <label class='label'>资格证类型</label>
                    <label class='switch-label switch-label-one' @click="selectAction($event, 0)" :class="{'switch-label-active' : currentIndex === 0}">客运资格证</label>
                    <label class='switch-label switch-label-two' @click="selectAction($event, 1)" :class="{'switch-label-active' : currentIndex === 1}">货运资格证</label>
                </div>    
                <button type="submit" class='button-primary button-bg-full' @click.prevent='baseInfoSubmit'>快速申请</button>
            </form>
        </section>
</div>
</template>

<script>
  import MyInput from '../components/input'
  import {formatMobileLimit, isWeixin} from '../utils/util'
  import formValidMixin from './_mixin/formValidMixin'
  import {carTypeApply} from '../api/carLoanApply'

  export default {
    mixins: [formValidMixin],
    data () {
      return {
        qualificationType: '客运资格证',
        currentIndex: 0,
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
        }
      }
    },
    methods: {
      selectAction (event, index) {
        this.$store.commit('changeApplyEdit', {qualificationType: event.currentTarget.innerText})
        this.currentIndex = index
      },
      baseInfoSubmit () {
        if (this.isFormValid()) {
          return
        }
        carTypeApply(this.applyEdit).then(() => {
          /* eslint-disable */
          isWeixin() && WeixinJSBridge.call('closeWindow')
        })
      }
    },
    components: {
      MyInput
    },
    mounted () {
        this.$store.commit('changeApplyEdit', {qualificationType: this.qualificationType})
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
        padding: .60rem .3rem;
    }

    .img-phone {
        width: 100%;
        height: 1rem;
        margin-bottom: 10px;
    }
    .switch-label {
        position: absolute;
        top: 50%;
        margin-top: -0.38rem;
        padding: .1rem 0.15rem;
        border: 1px solid #999;
        border-radius: .4rem;
        font-size: .32rem;
        margin-right: .30rem;
        color: #999;
        width: 2rem;
        text-align: center;
    }
    .form-filed {
        position: relative;
    }
    .switch-label-active {
        color: #fea225;
        border-color: #fea225;
    }

    .switch-label-one {
        left: 2.2rem;
    }

    .switch-label-two {
        left: 4.3rem;
    }

    .placeholder-style {
        color: #ccc;
        font-size: .32rem;
    }

    .select-text {
        font-size: .32rem;
        color: #000;
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

