const {app,BrowserWindow,ipcMain}=require('electron'),path=require('path'),fs=require('fs');
// يحفظ الملفات في سطح المكتب داخل مجلد Aswaq Badr (ومجلد فرعي اختياري)
ipcMain.handle('save',(e,name,buf,sub)=>{
 const clean=s=>String(s||'').replace(/[\\/:*?"<>|]/g,'-').replace(/^\.+/,'');
 let d=path.join(app.getPath('desktop'),'Aswaq Badr');
 if(sub)d=path.join(d,clean(sub));
 fs.mkdirSync(d,{recursive:true});
 fs.writeFileSync(path.join(d,clean(name)),Buffer.from(buf));
 return d;
});
app.whenReady().then(()=>{
 const w=new BrowserWindow({width:1280,height:800,icon:path.join(__dirname,'icon.png'),autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'preload.js')}});
 w.maximize();w.loadFile('app/index.html');
 // إعادة التركيز للنافذة عند العودة إليها حتى لا تتوقف الكتابة
 w.on('focus',()=>{try{w.webContents.focus()}catch(e){}});
});
app.on('window-all-closed',()=>app.quit());
