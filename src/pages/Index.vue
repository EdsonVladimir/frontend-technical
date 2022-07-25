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

        <q-card-section class="q-pt-none truncate">
          {{item.description}}
        </q-card-section>
        <q-card-actions>
          <q-btn flat round icon="las la-times-clock" />
          <q-btn flat>
            7:30PM
          </q-btn>
          <q-btn flat color="primary">
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card>
      </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
  name: 'PageIndex',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {

  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
      courses:[]
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

</style>
