import { Howl } from 'howler';

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