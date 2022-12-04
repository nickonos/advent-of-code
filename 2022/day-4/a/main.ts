import { group } from "console"
import fs from "fs/promises"

main()

type Group = {
    A: Section
    B: Section
}

type Section = {
    Lowest: number
    Highest: number
}

async function main() {
    const input: string[] = await ReadJSON()
    const formatted = formatInput(input)

    let fully_contained = 0;
    formatted.map((group) => {
        if (fullyContains(group.A, group.B)){
            fully_contained += 1;
            return
        }
        if (fullyContains(group.B, group.A))
            fully_contained += 1;
        
    })

    console.log(fully_contained)
}

function fullyContains(A: Section, B: Section){
    if (A.Lowest <= B.Lowest && A.Highest >= B.Highest)
        return true
    return false
}

function formatInput(input: string[]) {
    const output: Group[] = [];
    input.map((value) => {
        const split = value.split(",")
        output.push({
            A: formatSection(split[0]),
            B: formatSection(split[1])
        })

    })
    return output
}

function formatSection(input: string): Section {
    const split = input.split("-")
    return {
        Lowest: parseInt(split[0]),
        Highest: parseInt(split[1])
    }
}

async function ReadJSON() {
    return fs.readFile("./input.json", 'utf-8')
        .then((res) => JSON.parse(res))
}