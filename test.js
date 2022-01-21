
let { makeObservable, observable, action, when } = require("mobx")


const store = observable({
    age: 100,
    decrementAge() {
        this.age -= 10
    }
})

// let ix = 0
// let dispose = when(
//     () => {
//         return store.age < 60
//     }, 
//     () => {
//         console.log(`ix: ${ix}, age:`, store.age)
//     }
// )

// dispose()

// for(let i = 0; i < 10; i++) {
//     ix++
//     store.decrementAge()
// }

async function out()
{
    await when(() => {
        return store.age < 60
    })

    console.log("age: ", store.age)
}

out()
let i = setInterval(() => {
    console.log("run interval")
    store.decrementAge()
}, 2 * 1000)