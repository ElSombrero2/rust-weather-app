import './action.scss'
import view from './action.hbs'
import { delay } from '../../../utils/time'
import { createElement, data, exit } from '../../../utils/data' 
import { ask } from '@tauri-apps/api/dialog'
import template from './template/content.hbs'

export class Action extends HTMLElement{

    private index: number = 0
    private load: boolean = false

    public constructor(){
        super();
        (async () => {
            try{
                this.innerHTML = view({})  
                const root = document.getElementById('root')
                root.classList.add('loading')
                const first = await createElement(template, data[0])
                first.classList.add('active')
                root.append(first)
                root.classList.remove('loading')

                document.getElementById('next').addEventListener('click', () => this.iterate({
                    initial: () => data[++this.index] || data[0], 
                    final: () => (this.index >= data.length) ? 0 : this.index,
                    animation: 'roll-down'
                }))

                document.getElementById('prev').addEventListener('click', () => this.iterate({
                    initial: () => data[--this.index] || data[data.length - 1], 
                    final: () => (this.index < 0) ? data.length - 1 : this.index,
                    animation: 'roll'
                }))

            }catch(e){ await this.error() }
        })();
    }

    public iterate =  async (args: {initial: any, final: any, animation: string}): Promise<void> => {
        if(!this.load){
            try{
                this.load = true
                const root = document.getElementById('root')
                const next = args.initial()
                root.classList.add('loading')
                const back = await createElement(template, next)
                root.classList.remove('loading')
                root.append(back)
                const content = document.getElementsByClassName('active').item(0)
                content.classList.add(args.animation)
                await delay(600)
                back.classList.remove('back')
                back.classList.add('content')
                back.classList.add('active')
                content.remove()
                this.index = args.final()
                this.load = false
            }catch(e){ await this.error() }
        }
    }

    public error = async () => {
        const res = await ask(`An error occured while trying to fetch data\nDo you want to retry?`)
        if(res) location.reload()
        else exit()
    }
}