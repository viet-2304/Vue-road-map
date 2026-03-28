<script setup>
import { useCounter } from './useCounter.ts'

const { count, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div style="padding: 16px; font-family: sans-serif;">
    <h2>Custom Composable Demo</h2>
    <p>This example extracts counter logic into a reusable composable.</p>

    <div style="margin: 16px 0; display: flex; align-items: center; gap: 8px;">
      <button @click="decrement">-</button>
      <span style="font-size: 24px; min-width: 40px; text-align: center;">{{ count }}</span>
      <button @click="increment">+</button>
      <button @click="reset" style="margin-left: 8px;">Reset</button>
    </div>

    <p style="color: #666; font-size: 14px;">
      Check the useCounter.ts tab to see the composable source code.
    </p>
  </div>
</template>
