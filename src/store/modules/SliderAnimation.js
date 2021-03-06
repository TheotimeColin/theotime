import { UPDATE_STEP, ANIMATION_START, ANIMATION_END, RESET_STEPS, CHECK_ACTIVE_ANIMATIONS } from '@/store/types/mutation-types'

export default {
    namespaced: true,
    state: {
        animating: false,
        steps: {
            ['is-right']: {
                active: false,
                animating: false,
                transitionStart: false,
                transitionEnd: false 
            },
            ['is-center']: {
                active: false,
                animating: false,
                transitionStart: false,
                transitionEnd: false
            },
            ['is-left']: {
                active: false,
                animating: false,
                transitionStart: false,
                transitionEnd: false
            }
        }
    },
    mutations: {
        [ANIMATION_START] (state, id) {
            this.commit('sliderAnimation/' + RESET_STEPS)

            state.animating = true

            state.steps[id] = {
                active: true,
                animating: true,
                transitionStart: true,
                transitionEnd: false
            }
        },
        [ANIMATION_END] (state, id) {
            state.animating = false

            state.steps[id] = {
                active: true,
                animating: false,
                transitionStart: false,
                transitionEnd: true
            }

            this.commit('sliderAnimation/' + CHECK_ACTIVE_ANIMATIONS)
        },
        [RESET_STEPS] (state) {
            Object.keys(state.steps).map(id => {
                state.steps[id] = {
                    active: false,
                    animating: false,
                    transitionStart: false,
                    transitionEnd: false
                }
            })
        },
        [UPDATE_STEP] (state, { id, options }) {
            state.steps[id] = {
                ...state.steps[id],
                ...options
            }
        },
        [CHECK_ACTIVE_ANIMATIONS] (state) {
            let animating = false

            Object.keys(state.steps).map(id => {
                if (state.steps[id].animating) animating = true
            })

            state.animating = animating
        }
    }
}