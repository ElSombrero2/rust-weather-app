import './drag-region.scss'
import view from './drag-region.hbs'
import { process } from '@tauri-apps/api'

export class DragRegion extends HTMLElement{
    constructor(){
        super()
        this.innerHTML = view({})
        document.getElementById('close').addEventListener('click', () => process.exit())
    }
}