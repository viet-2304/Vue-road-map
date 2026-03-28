<script setup>
import { ref, reactive, computed, toRefs } from 'vue'

// ref — for single values
const count = ref(0)

// reactive — for objects
const state = reactive({
  name: 'Vue',
  version: 3,
})

// computed — derived state
const message = computed(() => `${state.name} ${state.version} — count: ${count.value}`)

// toRefs — safe destructuring
const { name, version } = toRefs(state)

function increment() {
  count.value++
}

function reset() {
  count.value = 0
  state.name = 'Vue'
  state.version = 3
}
</script>

<template>
  <div style="padding: 16px; font-family: sans-serif;">
    <h2>Reactivity Demo</h2>

    <p><strong>Message:</strong> {{ message }}</p>

    <div style="margin: 12px 0;">
      <button @click="increment" style="margin-right: 8px;">
        Count: {{ count }}
      </button>
      <button @click="reset">Reset</button>
    </div>

    <div style="margin: 12px 0;">
      <label>
        Name:
        <input v-model="name" style="border: 1px solid #ccc; padding: 4px; border-radius: 4px;" />
      </label>
    </div>

    <div style="margin: 12px 0;">
      <label>
        Version:
        <input v-model.number="version" type="number" style="border: 1px solid #ccc; padding: 4px; border-radius: 4px; width: 60px;" />
      </label>
    </div>

    <p style="color: #666; font-size: 14px;">
      Try editing the code! Change the initial values or add new reactive state.
    </p>
  </div>
</template>
