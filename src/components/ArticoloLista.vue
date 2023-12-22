<template>
    <div class="border-solid border-2 mb-5 p-2 overflow-hidden">
        <RouterLink class="text-5xl p-0 text-green-400" :to="{name: 'dettaglio', params: {id: props.id}}">{{ props.titolo }}</RouterLink>
        <div v-html="renderMarkdown" class="mt-5 text-lg custom-truncate"></div>
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import MarkdownIt from 'markdown-it';

const props = defineProps({
    id: String,
    titolo: String,
    testo: String
});

const md = new MarkdownIt({ breaks: true });

//Rimuovo gli stili del markdown per avere solo il testo
const renderMarkdown = computed(() => {
    const plainText = md.render(props.testo);
    return plainText.replace(/<[^>]+>/g, '');
})

//Aggiunta regola per la gestione dell'underline
md.renderer.rules.text = (tokens, idx, options, env, self) => {
  const content = tokens[idx].content;
  const regex = /\+\+(.*?)\+\+/g;
  const replacedContent = content.replace(regex, '<u>$1</u>');
  return replacedContent;
};
</script>

<style scoped>
/* Inserito troncamento testo a tre righe per anteprima */
.custom-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3;
}
</style>