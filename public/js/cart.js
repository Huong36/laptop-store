// Cart & Checkout pages
function renderCart(data){
  if(!data.items.length) return `<div class="container"><div class="cart-page"><h2 class="section-title"><i class="fas fa-shopping-cart"></i> Giỏ hàng</h2><div class="cart-empty"><i class="fas fa-shopping-cart"></i><h3>Giỏ hàng trống</h3><p>Hãy thêm sản phẩm vào giỏ hàng</p><br><button class="btn btn-primary" onclick="goTo('/')"><i class="fas fa-shopping-bag"></i> Mua sắm ngay</button></div></div></div>`;
  let html=`<div class="container"><div class="cart-page"><h2 class="section-title"><i class="fas fa-shopping-cart"></i> Giỏ hàng (${data.count} sản phẩm)</h2>`;
  data.items.forEach(item=>{
    const price=item.sale_price>0?item.sale_price:item.price;
    const icon=CAT_ICONS['laptop']||'fa-box';
    const imgHtml = item.image ? `<img src="${item.image}" alt="${item.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="img-placeholder" style="display:none"><i class="fas ${icon}"></i></div>` : `<div class="img-placeholder"><i class="fas ${icon}"></i></div>`;
    html+=`<div class="cart-item"><div class="cart-item-img">${imgHtml}</div>
    <div class="cart-item-info"><div class="cart-item-name">${item.name}</div><div class="cart-item-price">${formatPrice(price)}</div></div>
    <div class="cart-item-actions"><div class="qty-selector"><button onclick="updateCart(${item.id},${item.quantity-1})">-</button>
    <input type="number" value="${item.quantity}" min="1" onchange="updateCart(${item.id},this.value)" style="width:50px">
    <button onclick="updateCart(${item.id},${item.quantity+1})">+</button></div>
    <div class="cart-item-subtotal">${formatPrice(item.subtotal)}</div>
    <button class="btn btn-danger btn-sm" onclick="removeCart(${item.id})"><i class="fas fa-trash"></i></button></div></div>`;
  });
  html+=`<div class="cart-summary"><div class="cart-total"><span>Tổng cộng:</span><span class="amount">${formatPrice(data.total)}</span></div>
  <button class="btn btn-primary btn-block" onclick="goTo('/checkout')"><i class="fas fa-credit-card"></i> Tiến hành đặt hàng</button></div></div></div>`;
  return html;
}

function renderCheckout(){
  const u=getUser()||{};
  return `<div class="container"><div class="checkout-page"><h2 class="section-title"><i class="fas fa-credit-card"></i> Đặt hàng</h2>
  <div class="checkout-form">
  <div class="form-group"><label>Họ tên người nhận *</label><input type="text" id="ck-name" value="${u.full_name||''}" required></div>
  <div class="form-group"><label>Số điện thoại *</label><input type="text" id="ck-phone" value="${u.phone||''}" required></div>
  <div class="form-group"><label>Địa chỉ giao hàng *</label><textarea id="ck-address">${u.address||''}</textarea></div>
  <div class="form-group"><label>Ghi chú</label><textarea id="ck-note" placeholder="Ghi chú cho đơn hàng..."></textarea></div>
  <div class="form-group"><label>Phương thức thanh toán</label>
  <div class="payment-options">
  <div class="payment-option selected" data-method="cod" onclick="selectPayment('cod')"><i class="fas fa-truck"></i><span>COD - Thanh toán khi nhận hàng</span></div>
  <div class="payment-option" data-method="qr" onclick="selectPayment('qr')"><i class="fas fa-qrcode"></i><span>Chuyển khoản QR</span></div>
  </div></div>
  <div id="qr-section" style="display:none">
  <div class="qr-display"><img src="/images/qr-payment.png" alt="QR Thanh toán" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-qrcode\\' style=\\'font-size:4rem;color:var(--text3)\\'></i><p>Mã QR thanh toán</p><p class=\\'qr-info\\'>Ngân hàng MB - TRAN XUAN HUONG</p><p class=\\'qr-info\\'>SĐT: 0392005016</p><p>Nội dung CK: [Tên] - [SĐT]</p>'">
  <p class="qr-info">Ngân hàng MB - TRAN XUAN HUONG</p><p class="qr-info">SĐT: 0392005016</p><p>Nội dung CK: [Tên] - [SĐT]</p></div></div>
  <div class="form-error" id="checkout-error"></div>
  <button class="btn btn-primary btn-block" onclick="placeOrder()" id="btn-order"><i class="fas fa-check"></i> Xác nhận đặt hàng</button>
  </div></div></div>`;
}

let selectedPayment='cod';
function selectPayment(m){
  selectedPayment=m;
  document.querySelectorAll('.payment-option').forEach(el=>el.classList.toggle('selected',el.dataset.method===m));
  const qr=document.getElementById('qr-section');if(qr)qr.style.display=m==='qr'?'block':'none';
}

async function placeOrder(){
  const name=document.getElementById('ck-name').value.trim();
  const phone=document.getElementById('ck-phone').value.trim();
  const address=document.getElementById('ck-address').value.trim();
  const note=document.getElementById('ck-note').value.trim();
  const errEl=document.getElementById('checkout-error');
  if(!name||!phone||!address){errEl.textContent='Vui lòng điền đầy đủ thông tin giao hàng';return;}
  try{
    const d=await api('/orders',{method:'POST',body:JSON.stringify({payment_method:selectedPayment,shipping_name:name,shipping_phone:phone,shipping_address:address,note})});
    toast(d.message);goTo('/order-success/'+d.order.id);
  }catch(e){errEl.textContent=e.message}
}

function renderOrderSuccess(id){
  return `<div class="container"><div class="order-success"><i class="fas fa-check-circle"></i>
  <h2>Đặt hàng thành công!</h2><p>Mã đơn hàng: #${id}<br>Chúng tôi sẽ liên hệ bạn sớm nhất.</p>
  <p><i class="fas fa-phone"></i> Hotline: 0392005016</p>
  <button class="btn btn-primary" onclick="goTo('/')"><i class="fas fa-home"></i> Về trang chủ</button>
  <button class="btn btn-outline" onclick="goTo('/orders')" style="margin-left:8px"><i class="fas fa-list"></i> Xem đơn hàng</button></div></div>`;
}

function renderOrders(data){
  let html=`<div class="container"><div class="profile-page"><h2 class="section-title"><i class="fas fa-list"></i> Đơn hàng của tôi</h2>`;
  if(!data.orders.length) html+=`<div class="cart-empty"><i class="fas fa-clipboard-list"></i><p>Chưa có đơn hàng nào</p></div>`;
  else data.orders.forEach(o=>{
    html+=`<div class="order-card"><div class="order-header"><span class="order-id">#${o.id}</span>
    <span class="order-status status-${o.status}">${STATUS_MAP[o.status]||o.status}</span></div>
    <div><small style="color:var(--text3)">${o.created_at} | ${o.payment_method==='cod'?'COD':'QR'}</small></div>`;
    if(o.items)o.items.forEach(it=>html+=`<div class="order-item-row"><span>${it.product_name} x${it.quantity}</span><span>${formatPrice(it.price*it.quantity)}</span></div>`);
    html+=`<div class="order-total-row"><span>Tổng</span><span style="color:var(--primary)">${formatPrice(o.total)}</span></div></div>`;
  });
  return html+'</div></div>';
}

function renderProfile(){
  const u=getUser()||{};
  return `<div class="container"><div class="profile-page">
  <div class="profile-card"><h2><i class="fas fa-user"></i> Thông tin cá nhân</h2>
  <div class="checkout-form">
  <div class="form-group"><label>Tên đăng nhập</label><input type="text" value="${u.username||''}" disabled></div>
  <div class="form-group"><label>Họ tên</label><input type="text" id="pf-name" value="${u.full_name||''}"></div>
  <div class="form-group"><label>Email</label><input type="email" id="pf-email" value="${u.email||''}"></div>
  <div class="form-group"><label>Số điện thoại</label><input type="text" id="pf-phone" value="${u.phone||''}"></div>
  <div class="form-group"><label>Địa chỉ</label><textarea id="pf-address">${u.address||''}</textarea></div>
  <button class="btn btn-primary" onclick="saveProfile()"><i class="fas fa-save"></i> Lưu thông tin</button>
  </div></div>
  <div class="profile-card"><h2><i class="fas fa-key"></i> Đổi mật khẩu</h2>
  <div class="checkout-form">
  <div class="form-group"><label>Mật khẩu hiện tại</label><input type="password" id="pw-current"></div>
  <div class="form-group"><label>Mật khẩu mới</label><input type="password" id="pw-new"></div>
  <div class="form-error" id="pw-error"></div>
  <button class="btn btn-primary" onclick="changePassword()"><i class="fas fa-key"></i> Đổi mật khẩu</button>
  </div></div></div></div>`;
}

async function saveProfile(){
  try{
    const d=await api('/auth/profile',{method:'PUT',body:JSON.stringify({full_name:document.getElementById('pf-name').value,email:document.getElementById('pf-email').value,phone:document.getElementById('pf-phone').value,address:document.getElementById('pf-address').value})});
    const pd=await api('/auth/profile');setUser(pd.user);toast(d.message);
  }catch(e){toast(e.message,'error')}
}
async function changePassword(){
  try{
    const d=await api('/auth/change-password',{method:'PUT',body:JSON.stringify({current_password:document.getElementById('pw-current').value,new_password:document.getElementById('pw-new').value})});
    toast(d.message);document.getElementById('pw-current').value='';document.getElementById('pw-new').value='';
  }catch(e){document.getElementById('pw-error').textContent=e.message}
}
