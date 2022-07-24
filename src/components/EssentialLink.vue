<template>
  <q-header elevated class="text-white"  height-hint="100.59">
    <q-toolbar class="q-py-sm q-px-md">
      <q-btn round dense flat :ripple="false" :icon="fabGithub" size="19px" color="white" class="q-mr-sm" no-caps />

      <q-space />
      <div v-if="$q.screen.gt.sm" class="GL__toolbar-link q-ml-xs q-gutter-md text-body2 text-weight-bold row items-center no-wrap">
        <a href="javascript:void(0)" class="text-white" >
          Pull requests
        </a>
      </div>
      <q-space />
      <div class="q-pl-sm q-gutter-sm row items-center no-wrap">
        <!--Aqui viene el boton-->
        <a href="javascript:void(0)" class="text-white">
          <q-btn style="background: #FF0080; color: white" label="Fuchsia" />
        </a>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },
    msg: String,
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
</style>
