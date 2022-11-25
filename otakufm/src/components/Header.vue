<script>
import FlexContentAround from './FlexContentAround.vue';
import StationPlaceholder from './StationPlaceholder.vue';
import LogoArea from './LogoArea.vue'
import Settings from './Settings.vue'

export default {
    components: {
        FlexContentAround,
        StationPlaceholder,
        LogoArea,
        Settings
    }
}
</script>
<template>
    <div class="header">
        <FlexContentAround>
            <StationPlaceholder />
            <LogoArea />
            <Settings />
        </FlexContentAround>
    </div>
</template>

<style scoped>
.header {
    height: 15vh;
    background-color: transparent;
    padding-inline: 1.5em;
}
</style>