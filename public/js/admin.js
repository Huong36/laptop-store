// Admin pages
function renderAdmin(tab='dashboard'){
  return `<div class="container"><div class="admin-page">
  <h2 class="section-title"><i class="fas fa-cog"></i> Quản trị hệ thống</h2>
  <div class="admin-tabs">
  <button class="admin-tab ${tab==='dashboard'?'active':''}" onclick="loadAdmin('dashboard')"><i class="fas fa-chart-bar"></i> Tổng quan</button>
  <button class="admin-tab ${tab==='products'?'active':''}" onclick="loadAdmin('products')"><i class="fas fa-box"></i> Sản phẩm</button>
  <button class="admin-tab ${tab==='orders'?'active':''}" onclick="loadAdmin('orders')"><i class="fas fa-list"></i> Đơn hàng</button>
  <button class="admin-tab ${tab==='users'?'active':''}" onclick="loadAdmin('users')"><i class="fas fa-users"></i> Người dùng</button>
  </div><div id="admin-content"><div class="loading-screen"><div class="spinner"></div></div></div></div></div>`;
}

async function loadAdmin(tab){
  const c=document.getElementById('admin-content');
  if(!c)return;c.innerHTML='<div class="loading-screen"><div class="spinner"></div></div>';
  document.querySelectorAll('.admin-tab').forEach(t=>t.classList.toggle('active',t.textContent.trim().includes(
    tab==='dashboard'?'Tổng quan':tab==='products'?'Sản phẩm':tab==='orders'?'Đơn hàng':'Người dùng')));
  try{
    if(tab==='dashboard'){const d=await api('/admin/dashboard');c.innerHTML=adminDashboard(d);}
    else if(tab==='products'){const d=await api('/admin/products');c.innerHTML=adminProducts(d);}
    else if(tab==='orders'){const d=await api('/admin/orders');c.innerHTML=adminOrders(d);}
    else if(tab==='users'){const d=await api('/admin/users');c.innerHTML=adminUsers(d);}
  }catch(e){c.innerHTML=`<p style="color:var(--danger)">${e.message}</p>`;}
}

function adminDashboard(d){
  const s=d.stats;
  return `<div class="stat-grid">
  <div class="stat-card blue"><i class="fas fa-box"></i><div class="stat-value">${s.totalProducts}</div><div class="stat-label">Sản phẩm</div></div>
  <div class="stat-card green"><i class="fas fa-shopping-cart"></i><div class="stat-value">${s.totalOrders}</div><div class="stat-label">Đơn hàng</div></div>
  <div class="stat-card purple"><i class="fas fa-users"></i><div class="stat-value">${s.totalUsers}</div><div class="stat-label">Người dùng</div></div>
  <div class="stat-card pink"><i class="fas fa-money-bill"></i><div class="stat-value">${formatPrice(s.totalRevenue)}</div><div class="stat-label">Doanh thu</div></div>
  </div>
  <h3 style="margin:16px 0 12px"><i class="fas fa-clock"></i> Đơn hàng mới</h3>
  ${d.recentOrders.length?`<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>Khách</th><th>Tổng</th><th>Trạng thái</th><th>Ngày</th></tr></thead><tbody>
  ${d.recentOrders.map(o=>`<tr><td>#${o.id}</td><td>${o.full_name||o.username}</td><td>${formatPrice(o.total)}</td><td><span class="order-status status-${o.status}">${STATUS_MAP[o.status]}</span></td><td>${o.created_at}</td></tr>`).join('')}</tbody></table></div>`:'<p style="color:var(--text3)">Chưa có đơn hàng</p>'}`;
}

function adminProducts(d){
  return `<div class="admin-toolbar"><button class="btn btn-primary btn-sm" onclick="showProductForm()"><i class="fas fa-plus"></i> Thêm sản phẩm</button></div>
  <div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>Tên</th><th>Danh mục</th><th>Giá</th><th>Kho</th><th>Thao tác</th></tr></thead><tbody>
  ${d.products.map(p=>`<tr><td>${p.id}</td><td>${p.name}</td><td>${CATS[p.category]||p.category}</td><td>${formatPrice(p.price)}${p.sale_price>0?' <small style="color:var(--danger)">'+formatPrice(p.sale_price)+'</small>':''}</td><td>${p.stock}</td>
  <td><button class="btn btn-sm btn-outline" onclick='showProductForm(${JSON.stringify(p).replace(/'/g,"\\'")})'><i class="fas fa-edit"></i></button>
  <button class="btn btn-sm btn-danger" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button></td></tr>`).join('')}</tbody></table></div>
  <div class="product-form-modal" id="product-form-modal"><div class="product-form-card"><h2 id="pf-title">Thêm sản phẩm</h2>
  <div class="checkout-form">
  <div class="form-group"><label>Tên *</label><input id="pf-name" required></div>
  <div class="form-row"><div class="form-group"><label>Giá *</label><input type="number" id="pf-price"></div>
  <div class="form-group"><label>Giá KM</label><input type="number" id="pf-sale" value="0"></div></div>
  <div class="form-row"><div class="form-group"><label>Danh mục *</label><select id="pf-cat">${Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></div>
  <div class="form-group"><label>Thương hiệu</label><input id="pf-brand"></div></div>
  <div class="form-row"><div class="form-group"><label>Tồn kho</label><input type="number" id="pf-stock" value="0"></div>
  <div class="form-group"><label>Nổi bật</label><select id="pf-featured"><option value="0">Không</option><option value="1">Có</option></select></div></div>
  <div class="form-group"><label>Mô tả</label><textarea id="pf-desc"></textarea></div>
  <div class="form-group"><label>Thông số</label><textarea id="pf-specs" placeholder="CPU: ... | RAM: ..."></textarea></div>
  <div class="form-group"><label>Hình ảnh</label>
  <input type="file" id="pf-image-file" accept="image/*" onchange="uploadImage(this)">
  <input type="hidden" id="pf-image">
  <div id="pf-image-preview" style="margin-top:8px;max-width:100px;border-radius:4px;overflow:hidden"></div>
  </div>
  <input type="hidden" id="pf-id">

  <div style="display:flex;gap:8px"><button class="btn btn-primary" onclick="saveProduct()"><i class="fas fa-save"></i> Lưu</button>
  <button class="btn btn-secondary" onclick="hideProductForm()">Hủy</button></div></div></div></div>`;
}

function showProductForm(p){
  const m=document.getElementById('product-form-modal');if(!m)return;m.classList.add('show');
  document.getElementById('pf-title').textContent=p?'Sửa sản phẩm':'Thêm sản phẩm';
  document.getElementById('pf-id').value=p?p.id:'';
  document.getElementById('pf-name').value=p?p.name:'';
  document.getElementById('pf-price').value=p?p.price:'';
  document.getElementById('pf-sale').value=p?p.sale_price:0;
  document.getElementById('pf-cat').value=p?p.category:'laptop';
  document.getElementById('pf-brand').value=p?p.brand:'';
  document.getElementById('pf-stock').value=p?p.stock:0;
  document.getElementById('pf-featured').value=p?p.featured:0;
  document.getElementById('pf-desc').value=p?p.description:'';
  document.getElementById('pf-specs').value=p?p.specs:'';
  document.getElementById('pf-image').value=p&&p.image?p.image:'';
  document.getElementById('pf-image-preview').innerHTML=p&&p.image?`<img src="${p.image}" style="width:100%;display:block">`:'';
  document.getElementById('pf-image-file').value='';
}
function hideProductForm(){const m=document.getElementById('product-form-modal');if(m)m.classList.remove('show');}

async function saveProduct(){
  const id=document.getElementById('pf-id').value;
  const body={name:document.getElementById('pf-name').value,price:parseInt(document.getElementById('pf-price').value),
    sale_price:parseInt(document.getElementById('pf-sale').value)||0,category:document.getElementById('pf-cat').value,
    brand:document.getElementById('pf-brand').value,stock:parseInt(document.getElementById('pf-stock').value)||0,
    featured:parseInt(document.getElementById('pf-featured').value),description:document.getElementById('pf-desc').value,
    specs:document.getElementById('pf-specs').value,image:document.getElementById('pf-image').value};
  try{
    if(id)await api('/admin/products/'+id,{method:'PUT',body:JSON.stringify(body)});
    else await api('/admin/products',{method:'POST',body:JSON.stringify(body)});
    toast(id?'Cập nhật thành công!':'Thêm sản phẩm thành công!');hideProductForm();loadAdmin('products');
  }catch(e){toast(e.message,'error')}
}

async function deleteProduct(id){if(!confirm('Xóa sản phẩm này?'))return;
  try{await api('/admin/products/'+id,{method:'DELETE'});toast('Đã xóa!');loadAdmin('products');}catch(e){toast(e.message,'error')}}

function adminOrders(d){
  if(!d.orders.length)return '<p style="color:var(--text3)">Chưa có đơn hàng</p>';
  return `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>Khách</th><th>SĐT</th><th>Tổng</th><th>Thanh toán</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
  ${d.orders.map(o=>`<tr><td>#${o.id}</td><td>${o.full_name||o.username}</td><td>${o.shipping_phone}</td><td>${formatPrice(o.total)}</td><td>${o.payment_method==='cod'?'COD':'QR'}</td>
  <td><span class="order-status status-${o.status}">${STATUS_MAP[o.status]}</span></td>
  <td><select onchange="updateOrderStatus(${o.id},this.value)" style="padding:6px;font-size:.8rem">
  ${['pending','processing','shipping','delivered','cancelled'].map(s=>`<option value="${s}" ${o.status===s?'selected':''}>${STATUS_MAP[s]}</option>`).join('')}</select></td></tr>`).join('')}</tbody></table></div>`;
}

async function updateOrderStatus(id,status){
  try{await api('/admin/orders/'+id,{method:'PUT',body:JSON.stringify({status})});toast('Cập nhật thành công!');}catch(e){toast(e.message,'error')}}

function adminUsers(d){
  return `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>ID</th><th>Username</th><th>Họ tên</th><th>Email</th><th>SĐT</th><th>Quyền</th><th>Thao tác</th></tr></thead><tbody>
  ${d.users.map(u=>`<tr><td>${u.id}</td><td>${u.username}</td><td>${u.full_name}</td><td>${u.email}</td><td>${u.phone}</td>
  <td><span class="order-status ${u.role==='admin'?'status-delivered':'status-processing'}">${u.role==='admin'?'Admin':'User'}</span></td>
  <td><select onchange="updateRole(${u.id},this.value)" style="padding:6px;font-size:.8rem"><option value="user" ${u.role==='user'?'selected':''}>User</option><option value="admin" ${u.role==='admin'?'selected':''}>Admin</option></select>
  <button class="btn btn-sm btn-danger" onclick="deleteUser(${u.id})" style="margin-left:4px"><i class="fas fa-trash"></i></button></td></tr>`).join('')}</tbody></table></div>`;
}

async function updateRole(id,role){try{await api('/admin/users/'+id+'/role',{method:'PUT',body:JSON.stringify({role})});toast('Cập nhật quyền thành công!');}catch(e){toast(e.message,'error')}}
async function deleteUser(id){if(!confirm('Xóa người dùng này?'))return;try{await api('/admin/users/'+id,{method:'DELETE'});toast('Đã xóa!');loadAdmin('users');}catch(e){toast(e.message,'error')}}

async function uploadImage(input) {
  if (!input.files || !input.files[0]) return;
  const formData = new FormData();
  formData.append('image', input.files[0]);
  try {
    const res = await fetch('/api/admin/upload', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + getToken() },
      body: formData
    });
    const d = await res.json();
    if (!res.ok) throw new Error(d.error || 'Lỗi upload');
    document.getElementById('pf-image').value = d.url;
    document.getElementById('pf-image-preview').innerHTML = `<img src="${d.url}" style="width:100%;display:block">`;
    toast('Tải ảnh lên thành công');
  } catch (e) {
    toast(e.message, 'error');
  }
}
