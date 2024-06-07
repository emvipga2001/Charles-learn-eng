"use client"

import React from 'react'
import { useEffect, useState } from "react";

export default function ButtonDarkMode() {
  const [darkmode, setDarkmode] = useState<boolean>(false);
  const lightMode = 'light';
  const darkMode = 'dark';

  useEffect(() => {
    const localStorageDarkmode = localStorage.getItem('darkmode');
    if (localStorageDarkmode) {
      document.documentElement.setAttribute('class', localStorageDarkmode.toString());
      localStorage.setItem('darkmode', localStorageDarkmode.toString());
      setDarkmode(localStorageDarkmode === darkMode);
    } else {
      document.documentElement.setAttribute('class', lightMode);
      localStorage.setItem('darkmode', lightMode);
    }
  }, []);

  function handleDarkMode() {
    document.documentElement.setAttribute('class', !darkmode ? darkMode : lightMode);
    localStorage.setItem('darkmode', !darkmode ? darkMode : lightMode);
    setDarkmode(!darkmode);
  }

  return (
    <div className="absolute bottom-0 right-0">
      <label htmlFor="toggle" className="px-5 py-4 cursor-pointer inline-block">
        <input type="checkbox" name="" className="darkmode-handle hidden" id="toggle" checked={darkmode} onChange={handleDarkMode} />
        <div className="border bg-black rounded-2xl h-[30px] w-[60px] p-1 transition-colors">
          <div className="rounded-full bg-white w-5 h-5 transition-transform darkmode-spinner"></div>
        </div>
      </label>
    </div>
  )
}
