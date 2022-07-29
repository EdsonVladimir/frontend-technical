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
          <div class="text-h6">{{ item.course.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p class="text-cort"> {{item.course.description}}</p>
        </q-card-section>
        <q-card-actions>
          <q-btn flat round icon="las la-times-clock" />
          <q-btn flat>
            {{ item.course.duration_time }}
          </q-btn>
          <q-btn flat color="primary">
            4
            <ModalComplete />
          </q-btn>
          <q-btn flat color="primary">
            <q-btn unelevated rounded  color="dark">Vew Details</q-btn>
          </q-btn>
        </q-card-actions>

      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'
import axios from "axios";
export default defineComponent({
  name: 'PageIndex',

  setup () {

    return {

      lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  },
  data() {
    const bar2 = ref(false);
    return {

      user : JSON.parse(localStorage.getItem('user')),
      courses:[],

    }
  },
  methods:{
    async  getEducation() {
      try {
        let res = await axios.get(`http://localhost:8001/api/enrolled-user/${this.user.id_user}`);
        this.courses=res.data;
        console.log(this.courses)
      } catch (error) {
        console.log("error ", error);
      }

    }

  },
  created() {
    this.getEducation();

  },
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  .text-cort
  width: 100%
  overflow: hidden
  -webkit-box-orient: vertical
  display: -webkit-box
  overflow: hidden !important
  -webkit-line-clamp: 4
</style>
