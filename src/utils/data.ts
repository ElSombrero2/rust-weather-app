import { getClient } from '@tauri-apps/api/http'
import casablanca from '../assets/bg.jpg'
import mexico from '../assets/bg2.jpg'
import japan from '../assets/bg3.jpg'
import paris from '../assets/bg4.jpg'

export const data = [
    {
        name: 'Casablanca',
        src: casablanca,
        description: `A cynical expatriate American cafe 
        owner struggles to decide whether or not to help his former 
        lover and her fugitive husband escape the Nazis in French Morocco. 
        The story of Rick Blaine, a cynical world-weary ex-patriate who runs a 
        nightclub in Casablanca, Morocco during the early stages of WWII.`
    },
    {
        name: 'Mexico',
        src: mexico,
        description: `A country rich in history, tradition and culture, 
        Mexico is made up of 31 states and one federal district. It is the 
        third largest country in Latin America and has one of the largest 
        populations—more than 100 million—making it the home of more Spanish 
        speakers than any other nation in the world.`
    },
    {
        name: 'Japan',
        src: japan,
        description: `Japan is an archipelago, or string of islands, 
        on the eastern edge of Asia. There are four main islands: Hokkaido, Honshu, 
        Shikoku, and Kyushu. There are also nearly 4,000 smaller islands! Japan's nearest 
        mainland neighbors are the Siberian region of Russia in the north and 
        Korea and China farther south.`
    },
    {
        name: 'Paris',
        src: paris,
        description: `Paris is one of the most beautiful cities 
        in the world. It is known worldwide for the Louvre Museum, 
        Notre-Dame cathedral, and the Eiffel tower. 
        It has a reputation of being a romantic and 
        cultural city. The city is also known for its 
        high-quality gastronomy and the terraces of its cafés`
    }
]

export interface Town{
    name: string
    src: string
    description: string
}

export const findMeteo = async (country: string) => {
    const http = await getClient()
    const res = await http.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.API_KEY}`)
    return res.data
}

export const split = (str: string): string[] => {
    const mid = Math.floor(str.length / 2)
    return [
        str.substring(0, mid),
        str.substring(mid, str.length)
    ]
}

export const createElement =  async (template: any, next: Town): Promise<HTMLElement> => {
    const back = document.createElement('div')
    back.classList.add('content')
    const data: any = await findMeteo(next.name)
    const names = split(next.name)
    back.innerHTML = template({
        start: names[0], 
        end: names[1], 
        src: next.src,
        max: (data.main.temp_max - 273.15).toFixed(0),
        min: (data.main.temp_min - 273.15).toFixed(0),
        icon: data.weather[0].icon,
        description: next.description
    })
    return back
}

export const exit = () => { (window as any).__TAURI__.process.exit() }