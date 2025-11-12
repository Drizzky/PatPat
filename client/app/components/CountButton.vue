<template>
  <button @click="count++">Contador {{ count }}</button>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(1);
</script>
