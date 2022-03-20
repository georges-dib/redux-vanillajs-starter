/**
 * This file is not related to Redux, but contains some notions learned such as using Immer and Lodash libraries.
 * To activate this indexx.js, go to webpack.config.js, and switch the entry from index.js to indexx.js
 */

import {pipe, compose} from 'lodash/fp';
import { produce } from 'immer';

const input = "     Hello World!     ";


const trim = str => str.trim();
const toLower = str => str.toLowerCase();
const addMarvellous = str => `Marvellous! ${str}`;

//supposing we want to create a function that takes more than 1 argument,
//calling it in the pipe function would not work because we are allowed to
//only pass function references, and the output of each function serves as the input for another.
//This is where we use "currying" which is a process of tunring a function that takes N parameters
//to a function that takes only 1 parameter. This is usually done by making the function return
//another function which then takes the second input (check addWordCurried)
const addWord = (word, str) => `${word}! ${str}`;
const addWordCurried = word => str => `${word}! ${str}`;

//pipe runs the functions in the left to right order
const pipeTransform = pipe(trim, toLower, addMarvellous);
const pipeResult = pipeTransform(input);

//compose runs the functions in the right to left order
const composeTransform = compose(trim, toLower, addMarvellous);
const composeResult = composeTransform(input);

console.log(`Pipe result: ${pipeResult}`);
console.log(`Compose result: ${composeResult}`);


// const curryingTransform_notWorking = pipe(trim, toLower, addWord("Marvellous"));     //throws error: Expected a function
const curryingTransform = pipe(trim, toLower, addWordCurried("Amazing"));
console.log(`With Currying: ${curryingTransform(input)}`);

//immutability with immer
const relocate = (user, newCountry, newCity) => {
    //the produce function copies the object and creates a new instance with the updated data to ensure immutability
    return produce(user, newUser => {
        newUser.address.country = newCountry;
        newUser.address.city = newCity;
    });
}

const user = {name: "John Doe", address: {country: "France", city: "Paris"}}
const newUser = relocate(user, "Spain", "Madrid");
console.log(user);
console.log(newUser);
