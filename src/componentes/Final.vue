<template>
  <div>
    <h1>Conversor a Dólares</h1>
    <hr>
    <p>Ingrese monto $ <input type="number" v-model="pesos"></p>
    <p>
      Valor del dólar en $ <input type="number" v-model="valorDolar">
      - Actualización <input type="checkbox" v-model="actualizacion">
      <span v-if="horaActualizacion">Última actualización: {{ horaActualizacion }}</span>
    </p>
    <p>Valor Convertido U$D <span>{{ conversor }}</span></p>
    <p>respuestas: 1:b 2:b,d 3:c 4:b,e 5:c </p>
  </div>
</template>

<script>
import { getValores } from '../servicios/valoresDolar.js';

export default {
  name: 'src-componentes-final',
  data() {
    return {
      pesos: 0,
      valorDolar: 0,
      actualizacion: false,
      horaActualizacion: null, 
      intervalId: null
    };
  },
  computed: {
    conversor() {
      let conversion = !isNaN(this.pesos) && this.pesos && !isNaN(this.valorDolar) && this.valorDolar ? (Number(this.pesos) / Number(this.valorDolar)).toFixed(2) : "";
      return conversion;
    }
  },
  watch: {
    actualizacion(val) {
      if (val) {
        this.startAutoUpdate();
      } else {
        this.stopAutoUpdate();
        this.horaActualizacion = null; 
      }
    }
  },
  methods: {
    async fetchValorDolar() {
      try {
        const valores = await getValores();
        this.valorDolar = valores.blue.value_sell;
        this.horaActualizacion = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
      } catch (error) {
        console.error("Error al obtener valores del dólar:", error);
      }
    },
    startAutoUpdate() {
      this.fetchValorDolar(); 
      this.intervalId = setInterval(this.fetchValorDolar, 2000);
    },
    stopAutoUpdate() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  },
  beforeUnmount() { 
    this.stopAutoUpdate(); 
  }
};
</script>

<style scoped lang="css">
</style>
