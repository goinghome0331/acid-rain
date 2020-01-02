import {initGame} from './Reducer';

function loadJSON(url){
    return fetch(url,)
    .then(r=>r.json());
}

export function loadLevel(url,dispatch){
    return loadJSON(url)
    .then(json=>{
        dispatch(initGame(json));
    })
}
