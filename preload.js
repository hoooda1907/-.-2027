const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('bridge',{save:(n,b,s)=>ipcRenderer.invoke('save',n,b,s)});
