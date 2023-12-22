<template>
    <div class="flex flex-col items-center">
        <div class="text-3xl mb-4">
            Nuovo articolo
        </div>
        <div class="flex flex-col justify-center item-center w-1/2">
            <div class="mb-4">
                <div class="text-center text-xl">Titolo</div>
                <input class="text-center mt-2 text-lg bg-transparent w-full border-solid border-2 border-gray-300 focus:border-blue-500 hover:border-green-800 outline-none" v-model="titolo" type="text" @input="modificaTitolo" />
                <div class="text-center text-sm text-red-600" v-if="!isValidTitolo">È necessario inserire il titolo dell'articolo</div>
            </div>
            <div class="mb-4">
                <div class="text-center text-xl mb-2"> Nome dell'autore</div>
                <input class="text-center text-lg bg-transparent w-full border-solid border-2 border-gray-300 focus:border-blue-500 hover:border-green-800 outline-none" v-model="autore" type="text" @input="modificaAutore" />
                <div class="text-center text-sm text-red-600" v-if="!isValidAutore">È necessario inserire l'autore dell'articolo</div>
            </div>
            <div class="mb-4">
                <div class="text-center text-xl mb-2"> Testo </div>
                <div class="h-300!" ref="quillContainer"></div>
                <div class="text-center text-sm text-red-600" v-if="!isValidTesto">È necessario inserire il testo dell'articolo</div>
            </div>
            <button class="border-solid text-xl border-2 px-16 py-2 mx-auto hover:bg-green-800 hover:text-gray-400 hover:border-gray-400 duration-300 transform hover:scale-110 transition ease-linear" @click="onSubmit">Crea Articolo</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { articoliStore } from '@/stores/store';
import {ref, onMounted} from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import TurndownService  from 'turndown';

const quillContainer = ref(null);
const quillInstance= ref(null);
const turndownService = new TurndownService();
const router = useRouter();
const store = articoliStore();

//Informazioni sul nuovo articolo
const titolo = ref(store.getNuovoArticoloTitolo);
const autore = ref(store.getNuovoArticoloAutore);
const testo = ref(store.getNuovoArticoloTesto);

//Verifica che i campi siano valorizzati
const isValidTitolo = ref(true);
const isValidAutore = ref(true);
const isValidTesto = ref(true);

//Aggiorna i valori nello store
const modificaTitolo = () => {
    isValidTitolo.value = true;
    store.setNuovoArticoloTitolo(titolo.value);
}
const modificaAutore = () => {
    isValidAutore.value = true;
    store.setNuovoArticoloAutore(autore.value);
}
const modificaTesto = () => {
    isValidTesto.value=true;
    store.setNuovoArticoloTesto(testo.value);
}

const onSubmit = async () => {
    //Verifico che i campi siano valorizzati
    if(store.getNuovoArticoloTitolo == ""){
        isValidTitolo.value = false;
    }
    if(store.getNuovoArticoloAutore == ""){
        isValidAutore.value = false;
    }
    if(store.getNuovoArticoloTesto == ""){
        isValidTesto.value=false;
    }
    if(!isValidAutore.value || !isValidTesto.value || !isValidTitolo.value){
        return;
    }
    //Se tutti i campi sono valorizzati, creo l'articolo
    try{
        await creaArticolo();
    }catch(error){
        console.error("Errore durante la creazione dell'articolo", error);
    }
}

//Creazione dell'articolo
const creaArticolo = async () => {
    const response = await axios.post("http://localhost:5000/api/articoli/crea",{
        titolo: store.getNuovoArticoloTitolo,
        nomeAutore: store.getNuovoArticoloAutore,
        testo: turndownService.turndown(store.getNuovoArticoloTesto)    //Converto da html a markdown
    })
    //Svuoto lo store dalle informazioni del nuovo articolo
    store.setNuovoArticoloAutore("")
    store.setNuovoArticoloTitolo("")
    store.setNuovoArticoloTesto("")
    if(response.status == 200){
        //Svuoto la lista degli articoli così da richiamare il backend ed avere la lista aggiornata
        store.setArticoli([])
        router.push("/")
    }
}

//Inizializzazione di Quill
onMounted(() => {
  quillInstance.value = new Quill(quillContainer.value, {
    theme: 'snow'
  });

  //Inserimento contenuto editor nello store
  quillInstance.value.on('text-change', () => {
    testo.value = quillInstance.value.root.innerHTML;
    modificaTesto();
    });
});

//Aggiungo regola per il markdown in quanto non è presente l'underline
turndownService.addRule('underline', {
  filter: ['u'],
  replacement: function (content) {
    return '++' + content + '++';
  }
});

</script>
