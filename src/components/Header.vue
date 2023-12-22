<template>
    <div class="py-2 px-10 z-10 min-h-30 sticky top-0 bg-gradient-to-r from-gray-900 to-gray-700">
        <div class="flex mb-2">
            <div class="w-1/4 text-3xl">
                <RouterLink class="text-green-400 text-3xl" to="/">Home</RouterLink>
            </div>
            <div class="w-1/2 text-4xl text-center text-orange-500">Blog</div>
            <div v-show="!isCreaArticolo" class="text-right w-1/4">
                <RouterLink class="text-green-400 text-3xl" to="/creaArticolo">Crea nuovo articolo</RouterLink> 
            </div>
        </div>
        <hr>
    </div>
</template>

<script setup lang="ts">
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'

    const route = useRoute();
    //Se ci troviamo nella view creaArticolo, nascondo il pulsante per andare nella stessa pagina
    const isCreaArticolo = computed(() => {
        if(route.path === '/creaArticolo'){
            return true;
        }else{
            return false;
        }
    })
</script>