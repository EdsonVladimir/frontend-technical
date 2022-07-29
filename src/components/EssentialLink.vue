<template>
  <q-header elevated class="text-white"  height-hint="104px">
    <q-toolbar class="q-py-sm q-px-md">
      <q-btn round dense flat :ripple="false" :icon="fabGithub" size="19px" color="white" class="q-mr-sm" no-caps />

      <q-space />
      <div v-if="$q.screen.gt.sm" class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
        <a v-for="link in msg"
           :key="link.title"
           v-bind="link" @click="navigateTo(link.link)" class="text-white" >
         {{link.title}}
          <i class="las la-caret-down"></i>
        </a>

      </div>
      <q-space />
      <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
        <q-item  class="text-white">
          <q-btn style="background: #FF0080; color: white" label="Register or Login"  @click="open()"/>
        </q-item>
      </div>
    </q-toolbar>
  </q-header>
  <q-dialog v-model="bar2" transition-show="flip-down" transition-hide="flip-up">
    <q-card class="text-dark" style="width: 700px; max-width: 80vw;">
      <q-card-section class="row items-center q-pb-none">
        <q-space />
        <div class="text-h6">Log in or sign up</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="text-center">
          <q-btn-toggle
            outline rounded
            v-model="slide"
            :options="[
          { label: 'Sign Up', value: 'register' },
          { label: 'Login', value: 'login' },
        ]"
          />
      </q-card-section>
      <q-card-section>
      <q-carousel
        v-model="slide"
        transition-prev="slide-left"
        transition-next="slide-right"
        animated
        control-color="ligtnew"
      >
        <q-carousel-slide name="register" class="text-center">
          <p>Register as a new student</p>
          <div class="row">
           <div class="col-6">
             <div class="q-pa-md">
               <form @submit.prevent="onSubmit">
               <div class="q-gutter-y-md column">
                 <q-input outlined type="text" v-model="userForm.full_name" label="Full name" :dense="true" :options-dense="true" required>
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
                 <q-input outlined  type="email" v-model="userForm.email" label="Username (Email Address)" :dense="true" required>
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
                 <q-input outlined type="password" v-model="userForm.pass" label="Enter your Password" :dense="true" required>
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
                 <q-input outlined  type="password" v-model="userForm.passWord" label="Confirm your Password" :dense="true" required>
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
                 <q-select outlined  name="userData.id_country" type="number" v-model="userForm.id_country"  option-value="country.id_country" :options="country" label="Select your Country" option-label="name" :dense="true"/>
                   <div>
                   <q-btn unelevated rounded  type="submit" color="dark">Continue</q-btn>
                   </div>
               </div>
               </form>
             </div>
           </div>
            <div class="col-6">
              <div class="q-pa-md text-center">
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-github" />
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-facebook" />
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-instagram" />
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-google-plus-g" />
                <p>Protected by re CAPTCHA and Google's Privacy and Terms</p>
              </div>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="login" class="text-center">
          <p>Register as a new student</p>

          <div class="row">
            <div class="col-6">
              <div class="q-pa-md">
                <div class="q-gutter-y-md column">
                  <form @submit.prevent="submitLogin">
                  <q-input outlined name="email" type="text" v-model="loginForm.email" label="Username (Email Address)" :dense="true">
                    <template v-slot:append>
                      <q-icon @click="text = ''" class="las la-times" />
                    </template>
                  </q-input>
                  <q-input outlined name="pass" type="password" v-model="loginForm.pass" label="Enter your Password" :dense="true">
                    <template v-slot:append>
                      <q-icon @click="text = ''" class="las la-times" />
                    </template>
                  </q-input>
                  <div>
                    <q-btn unelevated rounded  type="submit" color="dark">Continue</q-btn>
                  </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="q-pa-md">
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-github" />
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-facebook" />
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-instagram" />
                <q-btn padding="10px 5px" align="around" class="full-width" text-color="black"  color="blue-grey-2" label="Align around" icon="lab la-google-plus-g" />
                <p>Protected by re CAPTCHA and Google's Privacy and Terms</p>
              </div>
            </div>
          </div>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
      </q-card-section>
      <q-card-section>

      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from "axios";

import useAuth from "src/composables/useAuth";

export default {
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    msg: [],
    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      content: this.value,
      countryModel:{
        name:"",
        id_country:0,
      },
    };
  },
  setup(props){
    console.log(props)
    const bar2 = ref(false);
    const slide = ref('register');
    let router = useRouter();
    console.log(props)
    const { loginUser } = useAuth()
    const userForm = ref ({
      full_name:'',
      email:'',
      pass:'',
      id_country:0
    })
    const loginForm = ref ({
      email:'',
      pass:''
    })
    return  {
      slide,
      country:[],
      userForm,
      bar2,
      onSubmit:async () =>{
        userForm.value.id_country = userForm.value.id_country.id_country;
        try{
        const respuesta = await axios.post(`http://localhost:8001/api/user`, userForm.value);
          slide.value='login'

        } catch (error) {
          console.log("error ", error);
        }
      },
      loginForm,
      submitLogin:async () =>{
        try {

        const resp = await loginUser(loginForm.value);
          bar2.value = false
          console.log(props)
        } catch (error) {
          console.log("error ", error);
        }
      },
      open(){
        console.log(bar2)
        bar2.value = true
        console.log("hola")
      }
    }
  },methods:{
    async getCountry() {
      let res = await axios.get(`http://localhost:8001/api/country`);
      try {
        this.country=res.data;
      } catch (error) {
        console.log("error ", error);
      }
    }
  },
  created() {
  this.getCountry();

},

}
/* v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"*/
</script>
<style lang="sass">
.GL
  &__select-GL__menu-link
    .default-type
    visibility: hidden
    &:hover
      background: #0366d6
      color: white
      .q-item__section--side
        color: white
      .default-type
        visibility: visible
  &__toolbar-link
    a
      color: white
      text-decoration: none
      &:hover
        opacity: 0.7
  &__menu-link:hover
    background: #0366d6
    color: white
  &__menu-link-signed-in,
  &__menu-link-status
    &:hover
      & > div
        background: white !important
  &__menu-link-status
    color: $blue-grey-6
    &:hover
      color: $light-blue-9
  &__toolbar-select.q-field--focused
    width: 450px !important
    .q-field__append
      display: none

</style>
