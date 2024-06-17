"use client";

import React, { useEffect } from 'react';

// global.d.ts
export {};

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

 
const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js'
    script.async = true
    document.body.appendChild(script)
 
    script.onload = () => {
      window.botpressWebChat.init({
        botId: 'af054bfe-65de-4ab1-95bd-94f3a2a40abc',
        hostUrl: 'https://cdn.botpress.cloud/webchat/v1',
        messagingUrl: 'https://messaging.botpress.cloud',
        clientId: 'af054bfe-65de-4ab1-95bd-94f3a2a40abc',
      })
    }
  }, [])
 
  return <div id="webchat" />
}
 
export default Chatbot