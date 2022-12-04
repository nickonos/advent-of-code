import fs from "fs/promises"
import {input} from "./input.js"

main()

async function main() {
    const list = input.split("\n\n")

    let highest_calories : number[] = [0];
    list.map((value, index) => {
        const elf = value.split("\n")

        let calories = 0;
        elf.map((food) => {
            calories += parseInt(food)
        })

        const lowest_calories = Math.min(...highest_calories)
        if (calories > lowest_calories) {
            if (highest_calories.length >= 3)
                highest_calories.splice(highest_calories.indexOf(lowest_calories), 1)

            highest_calories.push(calories)
        }
    })

    console.log(highest_calories[0] + highest_calories[1] + highest_calories[2])
}

async function ReadJSON() {
    return fs.readFile("./input.json", 'utf-8')
        .then((res) => JSON.parse(res))
}