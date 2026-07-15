// Pages rendering
function renderHome(products, bsProducts){
  let featured=products.filter(p=>p.featured);
  return `<div class="container">
    <div class="hero"><h1>Chào mừng đến <span>LaptopStore</span></h1>
    <p>Chuyên cung cấp laptop và phụ kiện chính hãng với giá tốt nhất tại TP.HCM</p>
    <div class="hero-info"><div><i class="fas fa-phone"></i> Hotline: 0392005016</div>
    <div><i class="fas fa-map-marker-alt"></i> 77 Bùi Xuân Phái, Tây Thạnh, TP.HCM</div></div></div>
    ${featured.length?`<h2 class="section-title"><i class="fas fa-fire"></i> Sản phẩm nổi bật</h2>
    <div class="product-grid">${featured.map(p=>productCard(p)).join('')}</div>`:''}
    ${bsProducts && bsProducts.length?`<h2 class="section-title" style="margin-top:32px"><i class="fas fa-chart-line"></i> Bán chạy nhất</h2>
    <div class="product-grid">${bsProducts.map(p=>productCard(p)).join('')}</div>`:''}
    <h2 class="section-title" style="margin-top:32px"><i class="fas fa-th"></i> Tất cả sản phẩm</h2>
    <div class="product-grid">${products.map(p=>productCard(p)).join('')}</div></div>`;
}

function productCard(p){
  const price=p.sale_price>0?p.sale_price:p.price;
  const discount=p.sale_price>0?Math.round((1-p.sale_price/p.price)*100):0;
  const icon=CAT_ICONS[p.category]||'fa-box';
  const imgHtml = p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="img-placeholder" style="display:none"><i class="fas ${icon}"></i></div>` : `<div class="img-placeholder"><i class="fas ${icon}"></i></div>`;
  const isOut = p.stock <= 0;
  return `<div class="product-card ${isOut ? 'out-of-stock' : ''}" onclick="goTo('/product/${p.id}')">
    <div class="product-img" style="position:relative;">${imgHtml}
    ${discount && !isOut ?`<span class="product-badge">-${discount}%</span>`:''}
    ${isOut ? `<span class="product-badge" style="background:var(--danger)">Hết hàng</span>` : ''}</div>
    <div class="product-info"><div class="product-name">${p.name}</div>
    <div class="product-brand">${p.brand} | Kho: ${p.stock} | Đã bán: ${p.sold || 0}</div>
    <div class="product-price"><span class="price-current">${formatPrice(price)}</span>
    ${p.sale_price>0?`<span class="price-original">${formatPrice(p.price)}</span>`:''}</div>
    <div class="product-actions">
    ${isOut ? 
      `<button class="btn btn-secondary btn-sm" disabled style="opacity:0.5;cursor:not-allowed"><i class="fas fa-ban"></i> Hết hàng</button>` : 
      `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation();addToCart(${p.id})"><i class="fas fa-cart-plus"></i> Thêm</button>`
    }
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

function renderProductDetail(data, reviewData = { reviews: [], avg_rating: 0, total: 0 }){
  const p=data.product;const price=p.sale_price>0?p.sale_price:p.price;
  const icon=CAT_ICONS[p.category]||'fa-box';
  const imgHtml = p.image ? `<img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-sm)" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><div class="img-placeholder" style="display:none;font-size:6rem"><i class="fas ${icon}"></i></div>` : `<div class="img-placeholder"><i class="fas ${icon}"></i></div>`;
  const discount=p.sale_price>0?Math.round((1-p.sale_price/p.price)*100):0;
  let html=`<div class="container"><div class="product-detail">
    <div class="detail-image">${imgHtml}</div>
    <div class="detail-info"><h1>${p.name}</h1>
    <div class="detail-brand"><i class="fas fa-tag"></i> ${p.brand} | ${CATS[p.category]||p.category} | Đã bán: ${p.sold || 0}</div>
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

  // ĐÁNH GIÁ SẢN PHẨM
  html += `
  <div class="reviews-section" style="margin-top:40px; background:var(--surface); padding:24px; border-radius:var(--radius-md); box-shadow:var(--shadow-sm)">
    <h2 class="section-title"><i class="fas fa-star" style="color:#f59e0b"></i> Đánh giá sản phẩm</h2>
    <div style="display:flex; gap:20px; align-items:center; margin-bottom:24px;">
      <div style="font-size:3rem; font-weight:700; color:#f59e0b">${reviewData.avg_rating > 0 ? reviewData.avg_rating : 0}<span style="font-size:1.5rem; color:var(--text-light)">/5</span></div>
      <div style="color:var(--text-light)">Dựa trên ${reviewData.total} đánh giá</div>
    </div>
    
    <div class="reviews-list" style="display:flex; flex-direction:column; gap:16px; margin-bottom:32px;">
      ${reviewData.reviews.length ? reviewData.reviews.map(r => `
        <div class="review-item" style="border-bottom:1px solid var(--border); padding-bottom:16px;">
          <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
            <strong>${r.full_name || r.username}</strong>
            <span style="color:#f59e0b">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</span>
          </div>
          <p style="margin-bottom:8px; color:var(--text)">${r.comment}</p>
          <small style="color:var(--text-light)">${new Date(r.created_at).toLocaleString('vi-VN')}</small>
        </div>
      `).join('') : '<p style="color:var(--text-light)">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá sản phẩm này!</p>'}
    </div>

    <div class="review-form">
      <h3>Viết đánh giá của bạn</h3>
      ${getToken() ? `
        <form onsubmit="submitReview(event, ${p.id})">
          <div class="form-group">
            <label>Số sao</label>
            <select id="review-rating" class="form-control" style="width:100px" required>
              <option value="5">5 Sao (Tuyệt vời)</option>
              <option value="4">4 Sao (Rất tốt)</option>
              <option value="3">3 Sao (Bình thường)</option>
              <option value="2">2 Sao (Kém)</option>
              <option value="1">1 Sao (Tệ)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nội dung đánh giá</label>
            <textarea id="review-comment" class="form-control" rows="3" placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Gửi đánh giá</button>
        </form>
      ` : `<p style="color:var(--danger)">Vui lòng <a href="javascript:void(0)" onclick="showAuthModal()" style="text-decoration:underline">đăng nhập</a> để viết đánh giá.</p>`}
    </div>
  </div>`;

  return html+'</div>';
}

function changeQty(d){const i=document.getElementById('detail-qty');if(i){let v=parseInt(i.value)+d;if(v<1)v=1;if(v>parseInt(i.max))v=parseInt(i.max);i.value=v;}}
function getQty(){const i=document.getElementById('detail-qty');return i?parseInt(i.value):1;}
