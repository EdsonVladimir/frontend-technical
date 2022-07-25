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
          <q-btn style="background: #FF0080; color: white" label="Register or Login"  @click="bar2 = true"/>
        </q-item>
      </div>
    </q-toolbar>
  </q-header>
  <q-dialog v-model="bar2" persistent transition-show="flip-down" transition-hide="flip-up">
    <q-card class="ligtnew text-dark">

      <q-card-section class="row items-center">
        <q-space />
        <p>Log in or sign up</p>
        <q-space />
        <q-btn icon="las la-times" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>

        <div class="row justify-center">
          <q-btn-toggle
            outline rounded
            v-model="slide"
            :options="[
          { label: 'Sign Up', value: 'register' },
          { label: 'Login', value: 'login' },

        ]"
          />
        </div>
      </q-card-section>
      <q-carousel
        v-model="slide"
        transition-prev="slide-left"
        transition-next="slide-right"
        animated
        control-color="ligtnew"
        class="rounded-borders"
      >
        <q-carousel-slide name="register" class="column no-wrap">

            <div class="row justify-center">
              <h6>Register as a new student</h6>
            </div>
          <div class="column">
           <div class="col-6  text-center" style="width: 400px">
             <div class="q-pa-md">
               <div class="q-gutter-y-md column" style="max-width: 300px">
                 <q-input filled bottom-slots v-model="full_name" label="Label" counter :dense="dense">
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
                 <q-input filled bottom-slots v-model="email" label="Label" counter :dense="dense">
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
                 <q-input filled bottom-slots v-model="pass" label="Label" counter :dense="dense">
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
                 <q-input filled bottom-slots v-model="pass" label="Label" counter :dense="dense">
                   <template v-slot:append>
                     <q-icon @click="text = ''" class="las la-times" />
                   </template>
                 </q-input>
               </div>
             </div>
           </div>
            <div class="col-6" style="width: 400px">

            </div>
          </div>-
        </q-carousel-slide>
        <q-carousel-slide name="login" class="column no-wrap">
          <div class="row justify-center">
            <h6>Are you an existing student?</h6>
          </div>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>

    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
export default defineComponent({
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
  }, setup(props){
    const router = useRouter()
    console.log(props)
    return  {
      navigateTo(link){
        router.push({path: link})
      },
      bar2: ref(false),
      slide: ref('register'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?'
    }
  }
})
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
.my-card
  width: 100%
  max-width: 900px
</style>
