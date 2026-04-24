// Main App - Router, Auth, Cart actions
// Load all script modules first
(function(){
  const scripts=['utils.js','pages.js','cart.js','admin.js'];
  let loaded=0;
  scripts.forEach(s=>{
    const el=document.createElement('script');el.src='/js/'+s;
    el.onload=()=>{loaded++;if(loaded===scripts.length)initApp();};
    document.head.appendChild(el);
  });
})();

function initApp(){
  updateAuthUI();
  updateCartBadge();
  setupAuth();
  setupSearch();
  window.addEventListener('hashchange',router);
  router();
}

// Router
function goTo(path){window.location.hash=path;}

async function router(){
  const hash=window.location.hash.slice(1)||'/';
  const main=document.getElementById('main-content');
  main.innerHTML='<div class="loading-screen"><div class="spinner"></div><p>Đang tải...</p></div>';

  // Update active category
  const params=new URLSearchParams(hash.includes('?')?hash.split('?')[1]:'');
  const cat=params.get('category');
  document.querySelectorAll('.cat-link').forEach(l=>{
    const lcat=l.dataset.cat;
    l.classList.toggle('active',cat?lcat===cat:lcat==='all'&&(hash==='/'||hash===''));
  });

  try{
    if(hash==='/'){
      const d=await api('/products?limit=50&sort=featured');
      main.innerHTML=renderHome(d.products);
    }
    else if(hash.startsWith('/products')){
      const q=hash.includes('?')?hash.split('?')[1]:'';
      const d=await api('/products?'+q);
      main.innerHTML=renderProducts(d,cat);
    }
    else if(hash.startsWith('/product/')){
      const id=hash.split('/')[2];
      const d=await api('/products/'+id);
      main.innerHTML=renderProductDetail(d);
    }
    else if(hash==='/cart'){
      if(!getToken()){toast('Vui lòng đăng nhập','error');showAuthModal();return;}
      const d=await api('/cart');main.innerHTML=renderCart(d);
    }
    else if(hash==='/checkout'){
      if(!getToken()){toast('Vui lòng đăng nhập','error');showAuthModal();return;}
      main.innerHTML=renderCheckout();
    }
    else if(hash.startsWith('/order-success/')){
      const id=hash.split('/')[2];main.innerHTML=renderOrderSuccess(id);
    }
    else if(hash==='/orders'){
      if(!getToken()){toast('Vui lòng đăng nhập','error');showAuthModal();return;}
      const d=await api('/orders');main.innerHTML=renderOrders(d);
    }
    else if(hash==='/profile'){
      if(!getToken()){toast('Vui lòng đăng nhập','error');showAuthModal();return;}
      try{const d=await api('/auth/profile');setUser(d.user);}catch(e){}
      main.innerHTML=renderProfile();
    }
    else if(hash.startsWith('/admin')){
      if(!isAdmin()){toast('Bạn không có quyền truy cập','error');goTo('/');return;}
      main.innerHTML=renderAdmin();loadAdmin('dashboard');
    }
    else{main.innerHTML='<div class="container"><div class="cart-empty"><i class="fas fa-exclamation-triangle"></i><h3>Trang không tồn tại</h3></div></div>';}
  }catch(e){
    main.innerHTML=`<div class="container"><div class="cart-empty"><i class="fas fa-exclamation-triangle"></i><h3>Lỗi: ${e.message}</h3><button class="btn btn-primary" onclick="router()">Thử lại</button></div></div>`;
  }
}

// Auth
function setupAuth(){
  document.getElementById('btn-show-login').addEventListener('click',showAuthModal);
  document.getElementById('auth-modal-close').addEventListener('click',hideAuthModal);
  document.getElementById('auth-modal').addEventListener('click',e=>{if(e.target.id==='auth-modal')hideAuthModal();});
  document.querySelectorAll('.modal-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.modal-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');
      document.getElementById('login-form').style.display=tab.dataset.tab==='login'?'block':'none';
      document.getElementById('register-form').style.display=tab.dataset.tab==='register'?'block':'none';
    });
  });
  document.getElementById('login-form').addEventListener('submit',async e=>{
    e.preventDefault();const err=document.getElementById('login-error');err.textContent='';
    try{
      const d=await api('/auth/login',{method:'POST',body:JSON.stringify({username:document.getElementById('login-username').value,password:document.getElementById('login-password').value})});
      setToken(d.token);setUser(d.user);toast(d.message);hideAuthModal();updateAuthUI();updateCartBadge();router();
    }catch(e){err.textContent=e.message;}
  });
  document.getElementById('register-form').addEventListener('submit',async e=>{
    e.preventDefault();const err=document.getElementById('register-error');err.textContent='';
    try{
      const d=await api('/auth/register',{method:'POST',body:JSON.stringify({username:document.getElementById('reg-username').value,email:document.getElementById('reg-email').value,password:document.getElementById('reg-password').value,full_name:document.getElementById('reg-fullname').value,phone:document.getElementById('reg-phone').value})});
      setToken(d.token);setUser(d.user);toast(d.message);hideAuthModal();updateAuthUI();router();
    }catch(e){err.textContent=e.message;}
  });
}

function showAuthModal(){document.getElementById('auth-modal').style.display='flex';}
function hideAuthModal(){document.getElementById('auth-modal').style.display='none';}

function updateAuthUI(){
  const nav=document.getElementById('nav-user');const u=getUser();
  if(u){
    nav.innerHTML=`<button class="user-menu-btn" onclick="toggleUserMenu()"><i class="fas fa-user-circle"></i> ${u.full_name||u.username}</button>
    <div class="user-dropdown" id="user-dropdown">
    <a href="#/profile"><i class="fas fa-user"></i> Tài khoản</a>
    <a href="#/orders"><i class="fas fa-list"></i> Đơn hàng</a>
    ${u.role==='admin'?'<a href="#/admin"><i class="fas fa-cog"></i> Quản trị</a>':''}
    <div class="divider"></div>
    <button class="danger" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Đăng xuất</button></div>`;
  }else{
    nav.innerHTML=`<button class="btn-login" id="btn-show-login" onclick="showAuthModal()"><i class="fas fa-user"></i> <span>Đăng nhập</span></button>`;
  }
}

function toggleUserMenu(){const d=document.getElementById('user-dropdown');if(d)d.classList.toggle('show');}
document.addEventListener('click',e=>{const d=document.getElementById('user-dropdown');if(d&&!e.target.closest('.nav-user'))d.classList.remove('show');});

function logout(){removeToken();updateAuthUI();toast('Đã đăng xuất');goTo('/');}

// Cart actions
async function addToCart(productId,qty=1){
  if(!getToken()){toast('Vui lòng đăng nhập để thêm vào giỏ','error');showAuthModal();return;}
  try{const d=await api('/cart',{method:'POST',body:JSON.stringify({product_id:productId,quantity:qty})});toast(d.message);updateCartBadge();}catch(e){toast(e.message,'error');}
}
async function updateCart(id,qty){
  if(qty<1){removeCart(id);return;}
  try{await api('/cart/'+id,{method:'PUT',body:JSON.stringify({quantity:parseInt(qty)})});const d=await api('/cart');document.getElementById('main-content').innerHTML=renderCart(d);updateCartBadge();}catch(e){toast(e.message,'error');}
}
async function removeCart(id){
  try{await api('/cart/'+id,{method:'DELETE'});toast('Đã xóa');const d=await api('/cart');document.getElementById('main-content').innerHTML=renderCart(d);updateCartBadge();}catch(e){toast(e.message,'error');}
}
async function updateCartBadge(){
  const b=document.getElementById('cart-badge');if(!getToken()){b.textContent='0';return;}
  try{const d=await api('/cart');b.textContent=d.count;}catch(e){b.textContent='0';}
}

// Search
function setupSearch(){
  const input=document.getElementById('search-input');const btn=document.getElementById('search-btn');
  function doSearch(){const q=input.value.trim();if(q)goTo('/products?search='+encodeURIComponent(q));}
  btn.addEventListener('click',doSearch);
  input.addEventListener('keypress',e=>{if(e.key==='Enter')doSearch();});
}

// Product list loader
async function loadProducts(cat,page=1){
  let q='page='+page;if(cat)q+='&category='+cat;
  goTo('/products?'+q);
}
