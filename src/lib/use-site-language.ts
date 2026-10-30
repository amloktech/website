'use client';

import { useEffect, useState } from 'react';
const languageEvent='amlok-language-change';
export function useSiteLanguage() {
  const [language,setLanguage]=useState('English');
  useEffect(()=>{
    const update=()=>{try{setLanguage(localStorage.getItem('amlok-language')==='Français'?'Français':'English');}catch{}};
    update();window.addEventListener(languageEvent,update);window.addEventListener('storage',update);
    return()=>{window.removeEventListener(languageEvent,update);window.removeEventListener('storage',update);};
  },[]);
  const chooseLanguage=(value:string)=>{setLanguage(value);try{localStorage.setItem('amlok-language',value);}catch{}window.dispatchEvent(new Event(languageEvent));};
  return [language,chooseLanguage] as const;
}
