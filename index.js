const express = require('express');
const app = express();
const fs = require('fs');

let routeCount2 = 0
let arry1 = []
let arry2 = []
app.get('/api/input1/:value', (req, res) => {
    arry1.push(req.params.value)
    res.send("OK");
})

app.get('/api/input2/:value', (req, res) => {
    routeCount2++;
    if (routeCount2 % 2 !== 0) {
        arry2.push(req.params.value)
        arry2.push(arry1[routeCount2 - 1])
    } else if (routeCount2 % 2 === 0) {
        arry2.push(req.params.value)
        arry2.push(arry1.pop())
        arry1.push(req.params.value)
    }
    let output1 = arry1.join('\n');
    let output2 = arry2.join('\n');
    fs.writeFileSync('output1.txt', output1, "utf8");
    fs.writeFileSync('output2.txt', output2, "utf8");
    res.send("OK");
})
const port = 3000;
app.listen(port, () => { console.log(`Server up and running on Port: ${port}`) })