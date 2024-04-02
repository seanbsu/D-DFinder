import * as React from 'react';

async function loadList(aurl,alist,asetlist) {
    console.log('loaded');

    const response = await fetch(aurl);
    console.log(response);
    const names = await response.json();
    console.log(names);
    // add the returned list to the existing list
    names.forEach((item ) => {
        alist.push(item)
        console.log(item)
    })

    const newList = alist.map((item) => {return item})
    asetlist(newList);
}

async function saveList(aurl, list) {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
    };
    const response = await fetch(aurl, requestOptions);
    console.log(response);
    console.log("save worked");
}

async function saveRemoteProfiles(aurl, list) {
    console.log("Beginning to save to remote...");
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
    };
    const response = await fetch(aurl, requestOptions);
    console.log(response);
    console.log("save worked");
}

async function getRemoteProfiles(aurl) {
    let alist = [];
    const response = await fetch(aurl);
    console.log(response);
    const names = await response.json();
    console.log(names);

    // add the returned list to the existing list
    names.forEach((item ) => {
        alist.push(item)
        console.log(item)
    })

    const newList = alist.map((item) => {return item})
    return newList;
}

export {loadList}
export {saveList}
export {saveRemoteProfiles}
export {getRemoteProfiles}