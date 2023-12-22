import { defineStore } from 'pinia'
import Articolo from '@/Articolo'

export const articoliStore = defineStore({
  id:'store',
  state: () => ({
    articoli: [],
    nuovoArticolo: new Articolo("","","","",""),
  }),
  actions:{
    setArticoli(articoli: Articolo[]){
      (this as any).articoli = articoli;
    },
    setNuovoArticoloTitolo(titolo: string){
      (this as any).nuovoArticolo.titolo = titolo;
    },
    setNuovoArticoloAutore(autore: string){
      (this as any).nuovoArticolo.nomeAutore = autore;
    },
    setNuovoArticoloTesto(testo: string){
      (this as any).nuovoArticolo.testo = testo;
    },
  },
  getters:{
    getArticoli: (state) => {
      return state.articoli;
    },
    getNuovoArticoloTitolo: (state) => {
      return state.nuovoArticolo.titolo;
    },
    getNuovoArticoloAutore: (state) => {
      return state.nuovoArticolo.nomeAutore;
    },
    getNuovoArticoloTesto: (state) => {
      return state.nuovoArticolo.testo;
    },
  }
})

