<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'


</script>

<template>
    <Header />
    <div class="bg-gradient-to-r from-gray-900 to-gray-700 flex-grow overflow-y-auto p-8">
      <RouterView />
    </div>
    <Footer />
</template>
