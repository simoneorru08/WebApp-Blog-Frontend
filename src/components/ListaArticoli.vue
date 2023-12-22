<template>
    <div>
        <p v-if="isLoading" class="text-4xl text-center">Caricamento...</p>
        <ul v-else>
            <div :key="articolo.id" v-for="articolo in store.getArticoli">
                <ArticoloLista :id="articolo.id" :titolo="articolo.titolo" :testo="articolo.testo"/>
            </div>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import axios from 'axios';
import ArticoloLista from './ArticoloLista.vue';
import { articoliStore } from '@/stores/store';

const store = articoliStore();
const isLoading = ref(true);

onMounted(async () =>{
    //Se sono già presenti gli articoli nello store, non vado a chiamare nuovamente il backend
    if(store.getArticoli.length != 0){
        isLoading.value = false;
        return;
    }
    try{
        const response = await axios.get("http://localhost:5000/api/articoli");
        store.setArticoli(response.data);
    }catch(error){
        console.error("Errore nella chiamata API", error);
    }finally{
        isLoading.value = false;
    }
})


</script>