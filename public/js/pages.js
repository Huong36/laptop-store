// Pages rendering
function renderHome(products){
  let featured=products.filter(p=>p.featured);
  return `<div class="container">
    <div class="hero"><h1>Chào mừng đến <span>LaptopStore</span></h1>
    <p>Chuyên cung cấp laptop và phụ kiện chính hãng với giá tốt nhất tại TP.HCM</p>
    <div class="hero-info"><div><i class="fas fa-phone"></i> Hotline: 0392005016</div>
    <div><i class="fas fa-map-marker-alt"></i> 77 Bùi Xuân Phái, Tây Thạnh, TP.HCM</div></div></div>
    ${featured.length?`<h2 class="section-title"><i class="fas fa-fire"></i> Sản phẩm nổi bật</h2>
    <div class="product-grid">${featured.map(p=>productCard(p)).join('')}</div>`:''}
    <h2 class="section-title"><i class="fas fa-th"></i> Tất cả sản phẩm</h2>
    <div class="product-grid">${products.map(p=>productCard(p)).join('')}</div></div>`;
}

function productCard(p){
  const price=p.sale_price>0?p.sale_price:p.price;
  const discount=p.sale_price>0?Math.round((1-p.sale_price/p.price)*100):0;
  const icon=CAT_ICONS[p.category]||'fa-box';
  const imgHtml = p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="img-placeholder" style="display:none"><i class="fas ${icon}"></i></div>` : `<div class="img-placeholder"><i class="fas ${icon}"></i></div>`;
  return `<div class="product-card" onclick="goTo('/product/${p.id}')">
    <div class="product-img">${imgHtml}
    ${discount?`<span class="product-badge">-${discount}%</span>`:''}</div>
    <div class="product-info"><div class="product-name">${p.name}</div>
    <div class="product-brand">${p.brand}</div>
    <div class="product-price"><span class="price-current">${formatPrice(price)}</span>
    ${p.sale_price>0?`<span class="price-original">${formatPrice(p.price)}</span>`:''}</div>
    <div class="product-actions"><button class="btn btn-primary btn-sm" onclick="event.stopPropagation();addToCart(${p.id})">
    <i class="fas fa-cart-plus"></i> Thêm</button>
    <button class="btn btn-outline btn-sm" onclick="event.stopPropagation();goTo('/product/${p.id}')">
    <i class="fas fa-eye"></i> Xem</button></div></div></div>`;
}

function renderProducts(data,category){
  const catName=category?CATS[category]||category:'Tất cả sản phẩm';
  let html=`<div class="container"><h2 class="section-title"><i class="fas fa-th"></i> ${catName}</h2>`;
  if(!data.products.length) html+=`<div class="cart-empty"><i class="fas fa-box-open"></i><p>Không tìm thấy sản phẩm nào</p></div>`;
  else{
    html+=`<div class="product-grid">${data.products.map(p=>productCard(p)).join('')}</div>`;
    if(data.pagination.pages>1){
      html+=`<div class="pagination">`;
      for(let i=1;i<=data.pagination.pages;i++){
        html+=`<button class="${i===data.pagination.page?'active':''}" onclick="loadProducts('${category||''}',${i})">${i}</button>`;
      }
      html+=`</div>`;
    }
  }
  return html+'</div>';
}

function renderProductDetail(data){
  const p=data.product;const price=p.sale_price>0?p.sale_price:p.price;
  const icon=CAT_ICONS[p.category]||'fa-box';
  const imgHtml = p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="img-placeholder" style="display:none;font-size:6rem"><i class="fas ${icon}"></i></div>` : `<div class="img-placeholder"><i class="fas ${icon}"></i></div>`;
  const discount=p.sale_price>0?Math.round((1-p.sale_price/p.price)*100):0;
  let html=`<div class="container"><div class="product-detail">
    <div class="detail-image">${imgHtml}</div>
    <div class="detail-info"><h1>${p.name}</h1>
    <div class="detail-brand"><i class="fas fa-tag"></i> ${p.brand} | ${CATS[p.category]||p.category}</div>
    <div class="detail-price"><span class="price-current">${formatPrice(price)}</span>
    ${p.sale_price>0?`<span class="price-original">${formatPrice(p.price)}</span><span class="price-discount">-${discount}%</span>`:''}</div>
    ${p.specs?`<div class="detail-specs"><h3><i class="fas fa-cog"></i> Thông số kỹ thuật</h3><p>${p.specs.replace(/\|/g,'<br>')}</p></div>`:''}
    <div class="detail-desc">${p.description}</div>
    <div class="detail-stock ${p.stock>0?'':'out'}"><i class="fas fa-${p.stock>0?'check':'times'}-circle"></i> ${p.stock>0?'Còn '+p.stock+' sản phẩm':'Hết hàng'}</div>
    ${p.stock>0?`<div class="qty-selector"><button onclick="changeQty(-1)">-</button>
    <input type="number" id="detail-qty" value="1" min="1" max="${p.stock}">
    <button onclick="changeQty(1)">+</button></div>
    <button class="btn btn-primary btn-block" onclick="addToCart(${p.id},getQty())"><i class="fas fa-cart-plus"></i> Thêm vào giỏ hàng</button>`:''}
    </div></div>`;
  if(data.relatedProducts&&data.relatedProducts.length){
    html+=`<h2 class="section-title" style="margin-top:32px"><i class="fas fa-cube"></i> Sản phẩm liên quan</h2>
    <div class="product-grid">${data.relatedProducts.map(p=>productCard(p)).join('')}</div>`;
  }
  return html+'</div>';
}

function changeQty(d){const i=document.getElementById('detail-qty');if(i){let v=parseInt(i.value)+d;if(v<1)v=1;if(v>parseInt(i.max))v=parseInt(i.max);i.value=v;}}
function getQty(){const i=document.getElementById('detail-qty');return i?parseInt(i.value):1;}
