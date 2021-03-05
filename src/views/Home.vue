<template>
    <div>
        <span>{{ msg }}</span>
        <div @click.stop="handleCount">count</div>
        <el-button type="primary" @click.stop="handleConsoleInfo">主要按钮</el-button>
        <div ref="dom">2555</div>
        <HelloWorld />
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import HelloWorld from "../components/HelloWorld";

export default {
    name: "Home",
    components: { HelloWorld },
    setup() {
        const dom = ref(null);
        const msgVal = ref(0);

        onMounted(() => {
            fetchTableDate();
        });

        async function fetchTableDate() {

        }

        const handleConsoleInfo = () => {
            msgVal.value += 1;
        };

        const msg = ref(0);
        const handleCount = () => msg.value++;
        return {
            msg,
            msgVal,
            handleCount,
            handleConsoleInfo,
            dom
        }
    },
}
</script>

<style lang="scss" scoped>

</style>
