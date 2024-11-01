<template>
    <div class="calculator">
      <h1>Calculator</h1>
      <div class="calculator-display">{{ result }}</div>
      <div class="calculator-buttons">
        <button v-for="number in numbers" :key="number" @click="handleNumber(number)">
          {{ number }}
        </button>
        <button @click="handleOperator('+')">+</button>
        <button @click="handleOperator('-')">-</button>
        <button @click="handleOperator('*')">*</button>
        <button @click="handleOperator('/')">/</button>
        <button @click="handleEqual">=</button>
        <button @click="handleClear">AC</button>
        <button @click="handleSign">+/-</button>
      </div>  
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const number1 = ref<number | null>(null);
  const number2 = ref<number | null>(null);
  const operator = ref<string | null>(null);
  const isNewEquation = ref<boolean>(true);
  const result = ref<string>('0');
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  
  function operate(operator: string, number1: number, number2: number) {
    switch (operator) {
      case '+':
        return number1 + number2;
      case '-':
        return number1 - number2;
      case '*':
        return number1 * number2;
      case '/':
        if (number2 !== 0) {
          const result = number1 / number2;
          return result % 1 !== 0 ? result.toFixed(6) : result; 
        } else {
          return "X_X";
        }
      default:
        return 0;
    }
  }
  
  function handleNumber(number: number) {
    if (isNewEquation.value) {
      result.value = number.toString();
      isNewEquation.value = false;
    } else {
      result.value += number.toString();
    }
  }
  
  function handleOperator(op: string) {
    if (number1.value === null) {
      number1.value = Number(result.value);
    } else if (operator.value) {
      number2.value = Number(result.value);
      number1.value = operate(operator.value, number1.value, number2.value) as number;
    }
    operator.value = op;
    result.value = `${number1.value}`;
    isNewEquation.value = true;
  }
  
  function handleEqual() {
    if (operator.value && number1.value !== null) {
      number2.value = Number(result.value);
      const calcResult = operate(operator.value, number1.value, number2.value);
      result.value = calcResult.toString();
      number1.value = typeof calcResult === 'number' ? calcResult : null;
      operator.value = null;
      isNewEquation.value = true;
    }
  }
  
  function handleClear() {
    number1.value = null;
    number2.value = null;
    operator.value = null;
    result.value = '0';
    isNewEquation.value = true;
  }
  
  function handleSign() {
    result.value = (Number(result.value) * -1).toString();
  }
  
  function handleKeyPress(event: KeyboardEvent) {
    const key = event.key;
  
    if (!isNaN(Number(key))) {
      handleNumber(Number(key));
    } else if (['+', '-', '*', '/'].includes(key)) {
      handleOperator(key);
    } else if (key === 'Enter') {
      handleEqual();
    } else if (key === 'Escape') {
      handleClear();
    } else if (key === 's') {
      handleSign();
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
  });
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
  });
  </script>
  
  <style scoped>
  .calculator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .calculator-display {
    font-size: 2rem;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #000;
    width: 200px;
    text-align: right;
  }
  
  .calculator-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  .calculator-operators {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
  </style>
  