import {GAME_READY,GAME_SUCCESS,GAME_FAIL, GAME_WIDTH,GAME_GROUND_BOUNDRY,GAME_DROP_SIZE, GAME_BASIC_HEALTH,GAME_LEVEL,GAME_NO_EFFECT, GAME_HIDE_WORD_EFFECT,GAME_MORE_SPEED_EFFECT,GAME_WORD_COUNT} from './GAME_VALUE';

const GAME_CONTENT_INPUT = 'game-content-input';
const GAME_INIT = 'game-init';
const GAME_ADD_DROP = 'game-add-drop';
const GAME_CHECK_DROPS = 'game-check-drops';
const GAME_UPDATE_DROPS = 'game-update-drops';
const GAME_CHANGE_MODE = 'game-change-mode';
const GAME_HEALTH_SCORE_STORE = 'game-health-score-store';
const GAME_EFFECT = 'game-effect';
const GAME_RESET = 'game-reset';


export const contentInput = (_content)=>({
    type : GAME_CONTENT_INPUT,
    content : _content
});
export const initGame = (json) =>(Object.assign({},json,{type : GAME_INIT}));
export const addDrop = ()=>({
    type : GAME_ADD_DROP
});
export const updateDrops = ()=>({
    type : GAME_UPDATE_DROPS
});
export const checkDrops = ()=>({
    type : GAME_CHECK_DROPS
});
export const changeMode= (_mode)=>({
    type : GAME_CHANGE_MODE,
    mode : _mode
})
export const storeHealthAndScore = (_health,_score)=>({
    type : GAME_HEALTH_SCORE_STORE,
    health : _health,
    score : _score
})
export const effectDrops=()=>({
    type : GAME_EFFECT
})
export const reset=()=>({
    type : GAME_RESET
});
const initalState = {
    mode : GAME_READY,
    effect : GAME_NO_EFFECT,
    effect_count : 0,
    move_size : 0,
    content : '',
    words_index : 0,
    words : [],
    drops : [],
    score : 0,
    health : GAME_BASIC_HEALTH
}
function shuffle(words){
    var i,j,tmp;
    for(i = words.length;i;i--){
        j = Math.floor(Math.random()*i);
        tmp = words[i-1];
        words[i-1] = words[j];
        words[j] = tmp;
    }
}
export default function reducer(state = initalState, action){
    switch(action.type){
        case GAME_CONTENT_INPUT : 
            return Object.assign({},state,{content:action.content});
        case GAME_INIT :
            var _words = Array.from(action.words);
            shuffle(_words);
            return Object.assign({},state, initalState,{move_size:action.move_size,words:_words});
        case GAME_RESET:
            return Object.assign({},state,initalState);
        case GAME_EFFECT : 
            var current_effect = state.effect;
            var current_effect_count = state.effect_count;
            var effected_drops = state.drops;
            if(state.effect_count >= 200){
                current_effect = GAME_NO_EFFECT;
                current_effect_count = 0;
                effected_drops = state.drops.map(drop=>{
                    return Object.assign({},{left:drop.left,top:drop.top,word:drop.word,item:drop.item});
                });
            }else{                
                if(state.effect === GAME_HIDE_WORD_EFFECT){
                    effected_drops = state.drops.map(drop=>{
                        return Object.assign({},drop,{effect:'hidden'});
                    });
                }else if(state.effect === GAME_MORE_SPEED_EFFECT){

                }
                
                current_effect_count = current_effect_count+1;
            }

            return Object.assign({},state,{drops:effected_drops, effect : current_effect, effect_count : current_effect_count});
        case GAME_HEALTH_SCORE_STORE :
            return Object.assign({},state,{health:action.health,score:action.score});
        case GAME_ADD_DROP : 
            var r = Math.random();
            var _item = r >= 0.6 ? true : false;
            var added_drops = state.drops;
            if(state.words_index < GAME_WORD_COUNT){
                added_drops = state.drops.concat({word : state.words[state.words_index],top:-80,left : Math.floor(Math.random()*(GAME_WIDTH-GAME_DROP_SIZE)/GAME_DROP_SIZE*GAME_DROP_SIZE), item : _item});
            }
            return Object.assign({},state,{ drops : added_drops, words_index: state.words_index+1});
        case GAME_UPDATE_DROPS : 
            var _move_size = state.move_size;
            if(state.effect === GAME_MORE_SPEED_EFFECT){
                _move_size += 0.5;
            }
            var updated_drops = state.drops.map((drop)=>{
                return Object.assign({},drop,{top : drop.top + _move_size});
            })
            return Object.assign({},state,{drops:updated_drops});
        case GAME_CHECK_DROPS :
            var added_score = state.score;
            var subed_health = state.health;
            var removed_drops = Array.from(state.drops);
            var updated_effect = state.effect;
            if(state.content !== ''){
                removed_drops = removed_drops.filter(drop=>{
                    if(drop.word === state.content){
                        added_score += 10;
                        if(drop.item === true){
                            updated_effect = 6 + Math.floor((2*Math.random()));
                        }
                    }
                    return drop.word !== state.content;
                });
            }

            removed_drops = removed_drops.filter(drop=>{
                if(drop.top+GAME_DROP_SIZE >= GAME_GROUND_BOUNDRY)
                    subed_health -= 1;

                return drop.top+GAME_DROP_SIZE < GAME_GROUND_BOUNDRY;
            });
            var _mode = state.mode;
            var level = JSON.parse(sessionStorage.getItem(GAME_LEVEL));
            if(subed_health === 0){
                _mode = GAME_FAIL;
            }else if(added_score / 10 + GAME_BASIC_HEALTH-subed_health === GAME_WORD_COUNT * parseInt(level.num)){
                _mode = GAME_SUCCESS;
            }
            return Object.assign({},state,{mode : _mode, effect : updated_effect, drops : removed_drops, content:'', score : added_score, health : subed_health});
        case GAME_CHANGE_MODE:
            return Object.assign({},state,{mode : action.mode});
        default : 
            return state;
    }
}