import { Howl } from 'howler';
import { FC } from 'react';

type UseSoundParams = {
  route: string;
}

export const useSound = (params: UseSoundParams) =>{
  const {route} = params;
  
  const sound = new Howl({
    src: [route]
  })

  const play = ()=>{
    sound.play();
  }

  return play;
}