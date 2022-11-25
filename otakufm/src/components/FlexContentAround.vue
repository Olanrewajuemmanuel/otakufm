<template>
    <div class="flex-around">
        <slot></slot>
    </div>
</template>

<style>
.flex-around {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>