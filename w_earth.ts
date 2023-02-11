import chalk from 'chalk';
import {Fluence} from '@fluencelabs/fluence';
import {krasnodar} from '@fluencelabs/fluence-network-environment'
import {getRelayTime} from './generated/Print'

function compass(hex: string){
    switch(hex){
        case 'blue':
            return chalk.blue
            break;
        case 'grey':
            return chalk.grey
            break;
        case 'yellow':
            return chalk.yellow
            break;
        case 'magenta':
            return chalk.magenta
            break;
        case 'cyan':
            return chalk.cyan
            break;
        default:
            return chalk.green
            break;
    }
}

function print(tree: number[], color: string){
    console.log('')
    console.log(compass(color)(`\t\t${ tree[0] == 0 ? '⚫' : '❍'}`))
    console.log(compass(color)(`\t${ tree[2] == 0 ? '⚫' : '❍'}\t\t${ tree[1] == 0 ? '⚫' : '❍'}\t`))
    console.log(`\t\t\t\t\t`)
    console.log(compass(color)(`\t${ tree[4] == 0 ? '⚫' : '❍'}\t\t${ tree[3] == 0 ? '⚫' : '❍'}\t`))
    console.log(compass(color)(`\t\t${ tree[5] == 0 ? '⚫' : '❍'}\t\t`))
    console.log(compass(color)(`\t${ tree[7] == 0 ? '⚫' : '❍'}\t\t${ tree[6] == 0 ? '⚫' : '❍'}\t`))
    console.log(compass(color)(``))
    console.log(compass(color)(`\t\t${ tree[8] == 0 ? '⚫' : '❍'}\t\t`))
    console.log(``)
    console.log(compass(color)(`\t\t☯\t\t`))
    console.log(``)
}

async function main(){
    await Fluence.start({connectTo: krasnodar[6]})
    console.log(Fluence.getStatus().peerId!)
    setInterval(async () => {
        const body = new Array(9).fill(0);
        const colors_other_than_home = ['blue','green','yellow','magenta','cyan','grey']
        const key = await getRelayTime(krasnodar[6].peerId) % 9
        const ink = await getRelayTime(krasnodar[6].peerId) % 6
        body[key] = 1
        print(body, colors_other_than_home[ink])
    }, 1414)
}

main()
