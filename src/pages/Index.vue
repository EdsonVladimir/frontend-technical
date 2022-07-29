<template>
    <div class="q-pa-md">
      <div class="row justify-center">
      <h6>Available Courses</h6>
      </div>
      <div class="row justify-center">
      <q-card class="col-md-3 q-ma-md q-pa-md" v-for="item in courses"
              :key="item.title"
              v-bind="item">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section>
          <div class="text-h6">{{ item.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
         <p class="text-cort"> {{item.description}}</p>
        </q-card-section>
        <q-card-actions>
          <q-btn flat round icon="las la-times-clock" />
          <q-btn flat>
            {{ item.duration_time }}
          </q-btn>
          <q-btn flat color="primary">
            4
            <ModalComplete />
          </q-btn>
          <q-btn flat color="primary" v-if='$store.getters["auth/getersUser"]'>
            <q-btn unelevated rounded   @click="completeData(item)" color="dark">Enroll</q-btn>
          </q-btn>
        </q-card-actions>

      </q-card>
      </div>
    </div>
  <q-dialog v-model="valor" persistent>
    <q-card class="text-dark" style="width: 700px; max-width: 80vw;">

      <q-card-section>
        <q-carousel
          v-model="slide"
          transition-prev="slide-left"
          transition-next="slide-right"
          animated
          control-color="ligtnew"
        >
          <q-carousel-slide name="register" class="text-center">
      <q-card-section class="row items-center">
        <q-space />
        <div class="text-h6">{{course.name}}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <div class="row">
        <div class="col">
          <div class="q-pa-md">
            <q-btn unelevated rounded  color="dark" @click="updateUserData()">Save</q-btn>
            <form @submit.prevent="onSubmit">
              <div class="q-gutter-y-md column">
                <q-input outlined type="date" v-model="userForm.date_birth" label="Date of Birth" :dense="true" :options-dense="true" required>
                  <template v-slot:append>
                    <q-icon @click="text = ''" class="las la-times" />
                  </template>
                </q-input>
                <q-input outlined  type="text" v-model="userForm.gender" label="Gender" :dense="true" required>
                  <template v-slot:append>
                    <q-icon @click="text = ''" class="las la-times" />
                  </template>
                </q-input>
                <q-input outlined type="text" v-model="userForm.address" label="Address" :dense="true" required>
                  <template v-slot:append>
                    <q-icon @click="text = ''" class="las la-times" />
                  </template>
                </q-input>
                <q-input outlined  type="text" v-model="userForm.phone_number" label="Phone Number" :dense="true" required>
                  <template v-slot:append>
                    <q-icon @click="text = ''" class="las la-times" />
                  </template>
                </q-input>
                <q-select outlined  name="userData.id_country" type="number" v-model="userForm.id_language"  option-value="country.id_country" :options="language" label="Select your Country" option-label="name" :dense="true"/>
                <q-select outlined  name="id_education_level" type="number" v-model="userForm.id_education_level"  option-value="country.id_education_level" :options="education" label="Select your Country" option-label="name" :dense="true"/>

              </div>
            </form>
          </div>
        </div>
      </div>
          </q-carousel-slide>

          <q-carousel-slide name="login" class="text-center">
            <q-card-section class="row items-center">
              <q-space />

              <div class="text-h6">{{course.name}}</div>
              <q-space />
              <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>
            <q-btn unelevated rounded  color="dark" @click="savePaymentPlan()">Save Pyament</q-btn>
            <div class="q-pa-md row items-start q-gutter-md">

              <q-card class="my-card" v-for="item in planPago"
                      :key="item.id_payment_plan"
                      v-bind="item" @click="RegisterInCourse(item, course)" >
                <q-card-section class="bg-grey-8 text-white">
                  <div class="text-h6"></div>
                  <div class="text-subtitle2">{{item.number_installments}} {{ item.name_plan }}</div>
                </q-card-section>

                <q-card-actions vertical align="center">
                  <q-btn flat>${{ course.price /item.number_installments}}</q-btn>
                  <q-btn flat>save $ {{course.price-item.discount}}</q-btn>
                </q-card-actions>
              </q-card>
            </div>
          </q-carousel-slide>
        </q-carousel>
        <q-card-section class="text-center">
          <q-btn-toggle
            unelevated rounded  color="dark"
            v-model="slide"
            :options="[
          { label: 'Back', value: 'register' },
          { label: 'Next', value: 'login' },
        ]"
          />
          <q-space />

        </q-card-section>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

import axios from "axios";
import openModal from "src/composables/useAuth";

import {ref} from "vue";
import ModalComplete from "components/ModalComplete";
import useAuth from "src/composables/useAuth";
import auth from "src/store/auth";
import {useRouter} from "vue-router/dist/vue-router";
import store from "src/store";
export default {

  name: 'PageIndex',
  props: {
    id: {
      type: String,
      required: true
    },
  },
  components: {
    ModalComplete
  },

  data() {
    const bar2 = ref(false);
    return {
      user : JSON.parse(localStorage.getItem('user')),
      valor:false,
      entry: null,
      localImage: null,
      file: null,
      courses:[],
      slide : ref('register'),
      userForm: ref ({
        id_user:0,
       date_birth:new Date(),
        gender:'',
        address:'',
        bar2,
       phone_number:0,
       id_language:1,
        id_education:1,
        id_education_level:0
      }),
      resiterCourse: ref ({
        id_course: 0,
        id_user: 0,
        id_payment_plan: 0
      }),
     course:{},
      language:[],
      education:[],
      planPago:[],
      planSave:{}
    }
  },

  computed: {

  },

  methods: {
    async getCourses() {
      try {
        let res = await axios.get(`http://localhost:8001/public/courses`);
        this.courses=res.data;
        console.log(this.courses)
      } catch (error) {
        console.log("error ", error);
      }

    },
    async getLanguaje() {
      try {
        let res = await axios.get(`http://localhost:8001/api/language`);
        this.language=res.data;
        console.log(this.language)
      } catch (error) {
        console.log("error ", error);
      }

    },
    async getEducation() {
      try {
        let res = await axios.get(`http://localhost:8001/api/education`);
        this.education=res.data;
        console.log(this.education)
      } catch (error) {
        console.log("error ", error);
      }

    },
    next(){
      this.slide.value='login'
    },
    completeData(item){

    this.valor=true
      this.course = item;
    },
    back(){
      this.valor=false;
    },
    async updateUserData(){
      try {
        this.userForm.id_user=this.user.id_user;
        this.userForm.id_language = this.userForm.id_language.id_language;
        this.userForm.id_education = this.userForm.id_education_level.id_education_level;
        delete this.userForm.id_education_level;
        console.log(this.userForm)
        let res = await axios.put(`http://localhost:8001/api/user-update`, this.userForm);
        this.education=res.data;
        console.log(this.education)
      } catch (error) {
        console.log("error ", error);
      }
    },
    async modalOpen(){
      const {openModal} = useAuth()
      try {

        const resp = await openModal({valueModal:true});
       // bar2.value = false
       console.log(resp)
      } catch (error) {
        console.log("error ", error);
      }
    },
    async getPanPago() {
      try {
        let res = await axios.get(`http://localhost:8001/api/payment`);
        this.planPago=res.data;
        console.log(this.planPago)
      } catch (error) {
        console.log("error ", error);
      }
    },
    RegisterInCourse(item){
      console.log(item)
      this.planSave=item;

    },
    async savePaymentPlan(){
  this.resiterCourse.id_course=this.course.id_course;
      this.resiterCourse.id_user = this.user.id_user;
      this.resiterCourse.id_payment_plan=this.planSave.id_payment_plan;

      try {
        let res = await axios.post(`http://localhost:8001/api/enrolled`, this.resiterCourse);
        this.valor=false;
        console.log(res);
      } catch (error) {
        console.log("error ", error);
      }
    }

},
  created() {
    this.getCourses();
    this.getLanguaje();
    this.getEducation();
  this.getPanPago();
  },




}

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
.truncate
  --max-lines: 3
  max-height: calc(var(--lh) * var(--max-lines))
  overflow: hidden
.text-cort
  width: 100%
  overflow: hidden
  -webkit-box-orient: vertical
  display: -webkit-box
  overflow: hidden !important
  -webkit-line-clamp: 4
</style>
