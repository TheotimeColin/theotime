<template>
    <nav class="Navigation" :class="{ ...modifiers, 'is-right': isRight, 'is-window-s': windowSmall }" :style="{ '--highlight-color': project && loaded ? project.highlightColor : null }">
        <router-link :to="{ name: 'Homepage' }" class="Navigation_item Navigation_item--top">théotime</router-link>
        <router-link :to="{ name: 'About' }" class="Navigation_item Navigation_item--bot">about me</router-link>
    </nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'BaseNavigation',
    props: {
        modifiers: { type: Object, default: () => {} }
    },
    computed: {
        ...mapState('global', {
            loaded: state => state.loaded,
            windowSmall: state => state.window.s
        }),
        ...mapState('projects', {
            project: (state) => state.active
        }),
        ...mapState('sliderAnimation', {
            isRight: state => state.steps['is-right'].active
        })
    }
}
</script>

<style lang="scss" scoped>
.Navigation_item {
    position: absolute;
    z-index: 20;
    left: 40px;
    font-weight: bold;
    color: var(--highlight-color);
    transition: color 500ms ease;
    transition-delay: 500ms;
}

.Navigation_item--top {
    top: 40px;
}

.Navigation_item--bot {
    bottom: 40px;
}

.Navigation.is-right {

    .Navigation_item {
        color: var(--font-color);
    }
}

.Navigation.is-window-s {

    .Navigation_item--top {
        left: 20px;
        top: 20px;
    }

    .Navigation_item--bot {
        bottom: auto;
        top: 20px;
        right: 20px;
        left: auto;
    }

    .Navigation_item {
        color: var(--highlight-color);
    }
}
</style>


