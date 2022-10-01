import '@fortawesome/fontawesome-free/css/all.min.css'
import './style.scss'
import lottie from 'lottie-web'
import { Action } from './app/components/action/action'
import index from './index.hbs'
import { DragRegion } from './app/components/drag-region/drag-region'
import animationData from './assets/loading.json'

customElements.define('ma-action', Action, {})
customElements.define('ma-drag-region', DragRegion, {})

document.getElementById('app').innerHTML = index({})
const loading = document.getElementById('loading')

lottie.loadAnimation({
    container: loading,
    renderer: 'svg',
    animationData
})

