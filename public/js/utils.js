// Utility functions
const API = '/api';
function getToken(){return localStorage.getItem('token')}
function setToken(t){localStorage.setItem('token',t)}
function removeToken(){localStorage.removeItem('token');localStorage.removeItem('user')}
function getUser(){try{return JSON.parse(localStorage.getItem('user'))}catch(e){return null}}
function setUser(u){localStorage.setItem('user',JSON.stringify(u))}
function isAdmin(){const u=getUser();return u&&u.role==='admin'}
function formatPrice(p){return new Intl.NumberFormat('vi-VN').format(p)+'₫'}
function toast(msg,type='success'){
  const c=document.getElementById('toast-container');
  const t=document.createElement('div');t.className='toast '+type;
  t.innerHTML='<i class="fas fa-'+(type==='success'?'check-circle':type==='error'?'exclamation-circle':'info-circle')+'"></i>'+msg;
  c.appendChild(t);setTimeout(()=>{t.classList.add('hide');setTimeout(()=>t.remove(),300)},3000);
}
async function api(url,opts={}){
  const t=getToken();const h={'Content-Type':'application/json'};
  if(t)h['Authorization']='Bearer '+t;
  try{
    const r=await fetch(API+url,{...opts,headers:{...h,...(opts.headers||{})}});
    const d=await r.json();
    if(!r.ok)throw new Error(d.error||'Lỗi hệ thống');
    return d;
  }catch(e){throw e}
}
const CATS={laptop:'Laptop',sac:'Dây Sạc','tai-nghe':'Tai Nghe',chuot:'Chuột','ban-phim':'Bàn Phím',loa:'Loa',usb:'USB',ram:'RAM','ve-sinh':'Vệ Sinh'};
const CAT_ICONS={laptop:'fa-laptop',sac:'fa-plug','tai-nghe':'fa-headphones',chuot:'fa-mouse','ban-phim':'fa-keyboard',loa:'fa-volume-up',usb:'fa-usb',ram:'fa-memory','ve-sinh':'fa-spray-can'};
const STATUS_MAP={pending:'Chờ xử lý',processing:'Đang xử lý',shipping:'Đang giao',delivered:'Đã giao',cancelled:'Đã hủy'};
