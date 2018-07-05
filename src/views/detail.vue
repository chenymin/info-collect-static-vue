<template>
  <div class='car-insurance'>
    <button class='button-primary button-bg-full' @click='callPhone'>联系学员：{{phoneNumber}}</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        phoneNumber: ''
      }
    },
    methods: {
      callPhone () {
      }
    }
  }
</script>

<style lang="scss" scoped>
  .car-insurance {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #efefef;
    padding: 0 0.6rem;
  }

  .button-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: .6rem;
    border-radius: .4rem;
    color: #fff;
    font-size: .32;
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
