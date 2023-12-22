<template>
    <ArticoloDettaglio :id="props.id"/>
</template>

<script setup lang="ts">
import ArticoloDettaglio from '@/components/ArticoloDettaglio.vue';
import { defineProps } from 'vue';

const props = defineProps(['id']);


</script>