<template>
    <div class=" bg-red-400">
        {{ str }}
    </div>
</template>

<script setup> 
    import { ref } from "vue"

    const str = ref("hello world")
</script>