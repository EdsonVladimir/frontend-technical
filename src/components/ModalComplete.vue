<template>
<q-dialog v-model="valor" persistent>
<q-card class="text-dark" style="width: 700px; max-width: 80vw;">
  <div class="row">
    <div class="col">
      <div class="q-pa-md">
        <form @submit.prevent="onSubmit">
          <div class="q-gutter-y-md column">
            <q-input outlined type="text" v-model="userForm.full_name" label="Full name" :dense="true" :options-dense="true" >
              <template v-slot:append>
                <q-icon @click="text = ''" class="las la-times" />
              </template>
            </q-input>
            <q-input outlined  type="email" v-model="userForm.email" label="Username (Email Address)" :dense="true" >
              <template v-slot:append>
                <q-icon @click="text = ''" class="las la-times" />
              </template>
            </q-input>
            <q-input outlined type="password" v-model="userForm.pass" label="Enter your Password" :dense="true" >
              <template v-slot:append>
                <q-icon @click="text = ''" class="las la-times" />
              </template>
            </q-input>
            <q-input outlined  type="password" v-model="userForm.passWord" label="Confirm your Password" :dense="true" >
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
  </div>
</q-card>
</q-dialog>
</template>

<script>

import axios from "axios";

import ModalComplete from "components/ModalComplete";
import {ref} from "vue";
export default {
  name: 'PageIndex',
  props: {
    id: {
      type: String,
      required: true
    },

  },
  components: {

  },
  data() {
    return {

      entry: null,
      localImage: null,
      file: null,
      courses:[],
      bar:ref(true),
      userForm: ref ({
        full_name:'',
        email:'',
        pass:'',
        id_country:0
      })
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
    async modalOpen(){

    }


  },
  created() {
    this.getCourses();
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

