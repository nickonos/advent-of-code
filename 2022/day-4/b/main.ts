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

    let overlapping = 0;
    formatted.map((group) => {
        if (GroupOverlaps(group))
            overlapping += 1
    })
    console.log(overlapping)
}

function GroupOverlaps(group: Group) {
    if (Inbetween(group.A.Lowest, group.B))
        return true

    if (Inbetween(group.A.Highest, group.B))
        return true

    if (Inbetween(group.B.Lowest, group.A))
        return true

    if (Inbetween(group.B.Highest, group.A))
        return true
    
    return false
}

function Inbetween(check: number, section: Section) {
    if (check >= section.Lowest && check <= section.Highest)
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