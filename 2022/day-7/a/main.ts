import { dir } from "console"
import fs from "fs/promises"

main()

type Directory = {
    name: string 
    files: File[]
    directories: Directory[]
    parent?: Directory
}

type File = {
    name: string
    size: number 
}

enum CommandType {
    ls,
    cd
}

type Command = {
    type: CommandType
    args: string
}

let currentDirectory = NewDir("/")
const base_dir = currentDirectory
const under100000: Directory[] = []

async function main() {
    const input = await ReadFile()

    const split = input.split("\r\n")
    split.map((str) => {
        const command = GetCommand(str)
        if (!command){
            parseDirectoryOrFile(str)
            return
        }
        
        useCommand(command)
    })
    
    CheckDirectories(base_dir)
    let total = 0
    under100000.map((dir) => {
        total += GetFilesize(dir)
    })
    console.log(total)
}

function CheckDirectories(dir: Directory){
    if (GetFilesize(dir) <= 100000)
        under100000.push(dir)
        
    dir.directories.map((d) => {
        CheckDirectories(d)
    })
}

function GetFilesize(dir: Directory) {
    let total = 0;
    dir.files.map((file) => {total += file.size})
    dir.directories.map((d) => {
        total += GetFilesize(d)
    })

    return total
}

function parseDirectoryOrFile(str: string){
    const split = str.split(" ")
    if (split[0] === "dir"){
        currentDirectory.directories.push(NewDir(split[1], currentDirectory))
        return
    }
    
    currentDirectory.files.push({name: split[1], size: parseInt(split[0])})
}

function useCommand(command: Command){
    if (command.type === CommandType.ls)
        return

    if (command.args === ".." && currentDirectory.parent){
        currentDirectory = currentDirectory.parent
    }

    const dir = currentDirectory.directories.find(x => x.name == command.args)
    if (dir)
        currentDirectory = dir

}

function GetCommand(str: string) : Command | null {
    if (str[0] !== "$")
        return null

    const split = str.split(" ")
    return {
        type: GetCommandType(split[1]),
        args: split[2],
    }
}

function GetCommandType(str: string) : CommandType {
    switch (str){
        case "ls":
            return CommandType.ls
        case "cd":
            return CommandType.cd  
    }

    throw new Error("command type not found")
}

function NewDir(name: string, parent?: Directory): Directory{
    return {
        name,
        files: [],
        directories: [],
        parent
    }
}
async function ReadFile() {
    return fs.readFile("./input.txt", 'utf-8')
}