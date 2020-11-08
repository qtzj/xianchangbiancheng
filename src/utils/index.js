import Vue from 'vue'
import router from '@/router'
import CryptoJS from 'crypto-js'
import axios from 'axios'


export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

export function aesMinEncrypt(word) {
  const key = 'forestForTodoKey'
  const iv = 'forestForTodo_Iv'
  var _word = CryptoJS.enc.Utf8.parse(word),
    _key = CryptoJS.enc.Utf8.parse(key),
    _iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(_word, _key, {
    iv: _iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.toString();
}

