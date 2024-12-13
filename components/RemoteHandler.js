import * as React from 'react';

async function loadList(aurl,alist,asetlist) {
    const response = await fetch(aurl);
    console.log("Response from remote:")
    // console.log(response);
    const names = await response.json();
    console.log("Result of fetched JSON")
    // add the returned list to the existing list
    // names.forEach((item ) => {
    //     alist.push(item)
    //     console.log(item)
    // })

    // const newList = alist.map((item) => {return item})
    asetlist(names);
}

async function saveList(aurl, list) {
    // POST request using fetch with async/await
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list)
    };
    const response = await fetch(aurl, requestOptions);
    console.log("Response from remote save")
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
    console.log("save completed");
}

async function getRemoteProfiles(aurl) {
    const response = await fetch(aurl);
    console.log("Response from remote:")
    // console.log(response);
    const names = await response.json();
    console.log("Result of fetched JSON")
    // console.log(names);
    // add the returned list to the existing list
    // names.forEach((item ) => {
    //     alist.push(item)
    //     console.log(item)
    // })

    // const newList = alist.map((item) => {return item})
    return names;
}

export {loadList}
export {saveList}
export {saveRemoteProfiles}
export {getRemoteProfiles}