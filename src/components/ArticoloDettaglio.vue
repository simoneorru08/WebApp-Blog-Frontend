<template>
    <p v-if="!data" class="text-4xl text-center">Caricamento...</p>
    <div v-else class="card">
        <div class="flex justify-center my-2">
            <span class="text-4xl text-center">{{ data.titolo }}</span>
        </div>
        <div v-html="renderMarkdown" class="m-5 text-justify text-lg">
        </div>
        <div class="text-right text-lg mx-5 mt-10">
            {{ data.nomeAutore }}
        </div>
        <div class="text-right text-lg mx-5">
            {{ getDataOra(dataOra)}}        
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import axios from 'axios';
import { defineProps } from 'vue';
import Articolo from '@/Articolo'
import MarkdownIt from 'markdown-it';

const isLoading = ref(true);
const data = ref<Articolo | null>();
const dataOra = ref<Date>(new Date());
const md = new MarkdownIt({ breaks: true });

const props = defineProps({
    id: String
});

//Chiamo il backend per ottenere le informazioni dell'articolo
onMounted(async () =>{
    try{
        const response = await axios.get("http://localhost:5000/api/articoli/"+props.id);
        data.value = response.data;
        //converto la data/ora in oggetto Date per formattare a piacimento
        dataOra.value = new Date(response.data.dataCreazione);
    }catch(error){
        console.error("Errore nella chiamata API", error);
    }finally{
        isLoading.value = false;
    }
})

//Creo la stringa con le informazioni data e ora formattate
const getDataOra = (date: Date) => {
    const giorno = date.getDate() < 10 ? "0"+ date.getDate().toString() : date.getDate().toString();
    const mese = date.getMonth() < 10 ? "0"+ date.getMonth().toString() : date.getMonth().toString();
    const ora = date.getHours() < 10 ? "0"+ date.getHours().toString() : date.getHours().toString();
    const minuti = date.getMinutes() < 10 ? "0"+ date.getMinutes().toString() : date.getMinutes().toString();

    return ora+":"+minuti+", "+giorno+"-"+mese+"-"+date.getFullYear();
}

//Converto da markdown ad html
const renderMarkdown = computed(() => {
    return md.render(data.value.testo);
})

//Aggiungo regola per la gestione dell'underline
md.renderer.rules.text = (tokens, idx, options, env, self) => {
  const content = tokens[idx].content;
  const regex = /\+\+(.*?)\+\+/g;
  const replacedContent = content.replace(regex, '<u>$1</u>');
  return replacedContent;
};
</script>