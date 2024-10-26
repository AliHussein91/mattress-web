/// <reference lib="webworker" />

"use strict";
var curFib= 0;
self.postMessage('Hello from the web workder');
self.onmessage = onMessage;

function onMessage(event:any){
    var data = event.data;
    switch(data){
        case 'start':
            self.postMessage('Starting the fibonacci sequence');
            break;
        case 'stop':
            self.postMessage('Stopping the fibonacci sequence');
            break;
            case 'api':
            self.postMessage('Stopping the fibonacci sequence');
            break;
        default:
            self.postMessage('Unknown command');
            break;
    }
   
}

function fib(n:number): number {
    if(n <= 1){
        return n;
    }
    return fib(n-1) + fib(n-2);
}

function callEndPoint(){
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
}