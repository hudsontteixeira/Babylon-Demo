import { useState } from "react";

export function useForceRender(){
    // console.log('FORCE RENDER')
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export function getUserId(id: string){
    if(id === undefined || id === null || id == ''){
        return `${window.localStorage.getItem('user_id')}`
    } else {
        return `${id}`
    }
}