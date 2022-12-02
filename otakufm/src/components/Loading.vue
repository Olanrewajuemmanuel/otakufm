<script>
export default {
    props: {
        loading: Boolean
    }
    
}
</script>
<template>
    <div v-if="loading">
        <span class="loader"></span>
        <h2>OtakuFM</h2>
    </div>
</template>

<style scoped>
.loader {
    display: block;
    height: 100px;
    width: 100px;
    border: 3px solid white;
    border-radius: 50% 50% 50% 50% / 50% 50% 50% 50% ;
    border-top-style: hidden;
    animation: rotate 1s infinite;
}
div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    height: 100vh;
    width: 100%;
    position: absolute;
    background: rgb(17, 17, 17);
    z-index: 99;
}
h2 {
    font-size: 3rem;
    color: white;
    font-weight: normal;
}
@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>