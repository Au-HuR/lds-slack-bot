/**
 * Created by moritz on 30.01.17.
 */
'use strict';
const express = require('express');
const Slapp = require('slapp');
const ConvoStore = require('slapp-convo-beepboop');
const BeepBoopContext = require('slapp-context-beepboop');
if (!process.env.PORT) throw Error('PORT missing but required');

var slapp = Slapp({
    convo_store: ConvoStore(),
    context: BeepBoopContext()
});

var app = slapp.attachToExpress(express());

slapp.message('hi (.)', ['direct_message'], function (msg, text, match1) {
   msg.say('How are you?').route('handleHi', { what: match1 })
});

slapp.route('handleHi', function (msg, state) {
    msg.say(':smile: ' + state.what)
});

app.get('/', function (request, response) {
    request.send('Hello')
});

console.log('Listening on: ' + process.env.PORT);
app.listen(process.env.PORT);