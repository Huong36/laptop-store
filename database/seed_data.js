const products = [
    // Laptops
    { name: 'Laptop ASUS VivoBook 15', price: 13990000, sale_price: 12490000, category: 'laptop', brand: 'ASUS', stock: 15, image: '/dataset/Asus_Vivobook_X1502VA.jpg', featured: 1 },
    { name: 'Laptop Dell Inspiron 14', price: 18990000, sale_price: 16990000, category: 'laptop', brand: 'Dell', stock: 10, image: '/dataset/Laptop_Dell_Inspiron_14.jpg', featured: 1 },
    { name: 'Laptop HP Pavilion 15', price: 11990000, sale_price: 0, category: 'laptop', brand: 'HP', stock: 20, image: '/dataset/Laptop_HP_Pavilion_15.jpg', featured: 1 },
    { name: 'Laptop Lenovo IdeaPad Slim 3', price: 9490000, sale_price: 8490000, category: 'laptop', brand: 'Lenovo', stock: 25, image: '/dataset/Laptop_Lenovo_IdeaPad_Slim_3.jpg', featured: 1 },
    { name: 'MacBook Air M2', price: 27990000, sale_price: 25490000, category: 'laptop', brand: 'Apple', stock: 8, image: '/dataset/MacBook_Air_M2.jpg', featured: 1 },
    { name: 'Laptop ASUS ROG Strix G15', price: 25990000, sale_price: 23990000, category: 'laptop', brand: 'ASUS', stock: 12, image: '/dataset/gaming_laptop_black.png', featured: 1 },
    { name: 'Laptop Acer Nitro 5 Tiger', price: 21990000, sale_price: 19990000, category: 'laptop', brand: 'Acer', stock: 18, image: '/dataset/Laptop_Lenovo_IdeaPad_Slim_3.jpg', featured: 0 },
    { name: 'Laptop MSI Bravo 15', price: 17990000, sale_price: 16490000, category: 'laptop', brand: 'MSI', stock: 22, image: '/dataset/Laptop_Dell_Inspiron_14.jpg', featured: 0 },
    { name: 'Laptop Dell XPS 13 Plus', price: 42990000, sale_price: 39990000, category: 'laptop', brand: 'Dell', stock: 5, image: '/dataset/dell_laptop_white.png', featured: 1 },
    { name: 'MacBook Pro 14 M3', price: 39990000, sale_price: 38500000, category: 'laptop', brand: 'Apple', stock: 10, image: '/dataset/macbook_pro_silver.png', featured: 1 },
    { name: 'Laptop HP Victus 16', price: 23990000, sale_price: 21990000, category: 'laptop', brand: 'HP', stock: 14, image: '/dataset/Laptop_HP_Pavilion_15.jpg', featured: 0 },
    { name: 'Laptop Lenovo Legion 5', price: 29990000, sale_price: 28490000, category: 'laptop', brand: 'Lenovo', stock: 7, image: '/dataset/gaming_laptop_black.png', featured: 1 },
    { name: 'Laptop Gigabyte G5', price: 19990000, sale_price: 18490000, category: 'laptop', brand: 'Gigabyte', stock: 11, image: '/dataset/Asus_Vivobook_X1502VA.jpg', featured: 0 },
    { name: 'Laptop ASUS ZenBook 14 OLED', price: 26990000, sale_price: 25490000, category: 'laptop', brand: 'ASUS', stock: 15, image: '/dataset/Asus_Vivobook_X1502VA.jpg', featured: 1 },
    { name: 'Laptop Acer Swift 3', price: 16990000, sale_price: 15990000, category: 'laptop', brand: 'Acer', stock: 20, image: '/dataset/dell_laptop_white.png', featured: 0 },
    
    // Chargers
    { name: 'Sạc Laptop Đa Năng 65W USB-C', price: 350000, sale_price: 290000, category: 'sac', brand: 'Anker', stock: 50, image: '/dataset/Sac_Laptop_Da_Nang_65W_USB-C.jpg', featured: 0 },
    { name: 'Sạc Laptop ASUS 90W Chính Hãng', price: 450000, sale_price: 0, category: 'sac', brand: 'ASUS', stock: 30, image: '/dataset/Sac_Laptop_ASUS_90W.jpg', featured: 0 },
    { name: 'Sạc Baseus GaN3 Pro 65W', price: 550000, sale_price: 450000, category: 'sac', brand: 'Baseus', stock: 40, image: '/dataset/charger_usbc_65w.png', featured: 0 },
    { name: 'Sạc Apple 30W USB-C', price: 990000, sale_price: 890000, category: 'sac', brand: 'Apple', stock: 25, image: '/dataset/charger_usbc_65w.png', featured: 0 },
    { name: 'Sạc Dell 65W Type-C', price: 650000, sale_price: 0, category: 'sac', brand: 'Dell', stock: 35, image: '/dataset/Sac_Laptop_ASUS_90W.jpg', featured: 0 },
    { name: 'Sạc Lenovo ThinkPad 65W', price: 590000, sale_price: 0, category: 'sac', brand: 'Lenovo', stock: 20, image: '/dataset/Sac_Laptop_ASUS_90W.jpg', featured: 0 },
    { name: 'Sạc UGREEN 100W GaN', price: 1200000, sale_price: 990000, category: 'sac', brand: 'UGREEN', stock: 15, image: '/dataset/charger_usbc_65w.png', featured: 1 },

    // Headphones
    { name: 'Tai Nghe Bluetooth Sony WH-1000XM5', price: 7990000, sale_price: 6990000, category: 'tai-nghe', brand: 'Sony', stock: 12, image: '/dataset/Tai_Nghe_Bluetooth_Sony_WH-1000XM5.jpg', featured: 1 },
    { name: 'Tai Nghe Gaming HyperX Cloud III', price: 2490000, sale_price: 1990000, category: 'tai-nghe', brand: 'HyperX', stock: 20, image: '/dataset/Tai_Nghe_Gaming_HyperX_Cloud_III.jpg', featured: 0 },
    { name: 'Tai Nghe Apple AirPods Pro 2', price: 6290000, sale_price: 5890000, category: 'tai-nghe', brand: 'Apple', stock: 25, image: '/dataset/headphones_white_premium.png', featured: 1 },
    { name: 'Tai Nghe Marshall Major IV', price: 3490000, sale_price: 3190000, category: 'tai-nghe', brand: 'Marshall', stock: 18, image: '/dataset/Tai_Nghe_Bluetooth_Sony_WH-1000XM5.jpg', featured: 0 },
    { name: 'Tai Nghe Gaming Razer Kraken V3', price: 2190000, sale_price: 1890000, category: 'tai-nghe', brand: 'Razer', stock: 30, image: '/dataset/headphones_gaming_black.png', featured: 0 },
    { name: 'Tai Nghe Logitech G PRO X', price: 2990000, sale_price: 2590000, category: 'tai-nghe', brand: 'Logitech', stock: 15, image: '/dataset/headphones_gaming_black.png', featured: 1 },
    { name: 'Tai Nghe JBL Tune 720BT', price: 1590000, sale_price: 1390000, category: 'tai-nghe', brand: 'JBL', stock: 22, image: '/dataset/Tai_Nghe_Bluetooth_Sony_WH-1000XM5.jpg', featured: 0 },
    { name: 'Tai Nghe Corsair HS80 RGB', price: 3290000, sale_price: 2990000, category: 'tai-nghe', brand: 'Corsair', stock: 14, image: '/dataset/headphones_gaming_black.png', featured: 0 },
    { name: 'Tai Nghe Sennheiser HD 450BT', price: 3990000, sale_price: 3590000, category: 'tai-nghe', brand: 'Sennheiser', stock: 10, image: '/dataset/headphones_white_premium.png', featured: 0 },
    { name: 'Tai Nghe Soundpeats Air3 Deluxe', price: 990000, sale_price: 790000, category: 'tai-nghe', brand: 'Soundpeats', stock: 40, image: '/dataset/Tai_Nghe_Bluetooth_Sony_WH-1000XM5.jpg', featured: 0 },

    // Mice
    { name: 'Chuột Logitech MX Master 3S', price: 2490000, sale_price: 2190000, category: 'chuot', brand: 'Logitech', stock: 18, image: '/dataset/mouse_ergonomic_sleek.png', featured: 1 },
    { name: 'Chuột Gaming Razer DeathAdder V3', price: 1690000, sale_price: 0, category: 'chuot', brand: 'Razer', stock: 25, image: '/dataset/mouse_gaming_rgb.png', featured: 0 },
    { name: 'Chuột Logitech G102 Lightsync', price: 450000, sale_price: 390000, category: 'chuot', brand: 'Logitech', stock: 100, image: '/dataset/Chuot_Gaming_Razer_DeathAdder_V3.jpg', featured: 1 },
    { name: 'Chuột Gaming Corsair Harpoon RGB', price: 690000, sale_price: 590000, category: 'chuot', brand: 'Corsair', stock: 45, image: '/dataset/mouse_gaming_rgb.png', featured: 0 },
    { name: 'Chuột Không Dây DareU EM901', price: 590000, sale_price: 490000, category: 'chuot', brand: 'DareU', stock: 60, image: '/dataset/mouse_gaming_rgb.png', featured: 0 },
    { name: 'Chuột SteelSeries Rival 3', price: 890000, sale_price: 790000, category: 'chuot', brand: 'SteelSeries', stock: 35, image: '/dataset/Chuot_Gaming_Razer_DeathAdder_V3.jpg', featured: 0 },
    { name: 'Chuột Apple Magic Mouse 2', price: 1990000, sale_price: 1890000, category: 'chuot', brand: 'Apple', stock: 20, image: '/dataset/mouse_ergonomic_sleek.png', featured: 0 },
    { name: 'Chuột Logitech G Pro X Superlight', price: 3290000, sale_price: 2990000, category: 'chuot', brand: 'Logitech', stock: 25, image: '/dataset/mouse_gaming_rgb.png', featured: 1 },
    { name: 'Chuột Asus ROG Gladius III', price: 1890000, sale_price: 1690000, category: 'chuot', brand: 'ASUS', stock: 15, image: '/dataset/mouse_gaming_rgb.png', featured: 0 },
    { name: 'Chuột Zowie EC2-C', price: 1790000, sale_price: 1590000, category: 'chuot', brand: 'Zowie', stock: 12, image: '/dataset/Chuot_Gaming_Razer_DeathAdder_V3.jpg', featured: 0 },

    // Keyboards
    { name: 'Bàn Phím Cơ Keychron K8 Pro', price: 2290000, sale_price: 1990000, category: 'ban-phim', brand: 'Keychron', stock: 15, image: '/dataset/Ban_Phim_Keychron_K8_Pro.jpg', featured: 1 },
    { name: 'Bàn Phím Gaming Corsair K70 RGB', price: 3290000, sale_price: 2890000, category: 'ban-phim', brand: 'Corsair', stock: 10, image: '/dataset/Ban_Phim_ Gaming_Corsair_K70_RGB.jpg', featured: 1 },
    { name: 'Bàn Phím Cơ Akko 3098B', price: 1890000, sale_price: 1690000, category: 'ban-phim', brand: 'Akko', stock: 25, image: '/dataset/keyboard_mechanical_rgb.png', featured: 0 },
    { name: 'Bàn Phím Razer BlackWidow V3', price: 2590000, sale_price: 2290000, category: 'ban-phim', brand: 'Razer', stock: 18, image: '/dataset/keyboard_mechanical_rgb.png', featured: 0 },
    { name: 'Bàn Phím Logitech MX Keys', price: 2790000, sale_price: 2590000, category: 'ban-phim', brand: 'Logitech', stock: 22, image: '/dataset/keyboard_minimalist_white.png', featured: 1 },
    { name: 'Bàn Phím Cơ DareU EK87', price: 590000, sale_price: 490000, category: 'ban-phim', brand: 'DareU', stock: 80, image: '/dataset/keyboard_mechanical_rgb.png', featured: 0 },
    { name: 'Bàn Phím Leopold FC900R', price: 3490000, sale_price: 3290000, category: 'ban-phim', brand: 'Leopold', stock: 8, image: '/dataset/Ban_Phim_Keychron_K8_Pro.jpg', featured: 0 },
    { name: 'Bàn Phím Asus ROG Strix Scope', price: 2990000, sale_price: 2690000, category: 'ban-phim', brand: 'ASUS', stock: 14, image: '/dataset/keyboard_mechanical_rgb.png', featured: 0 },
    { name: 'Bàn Phím Không Dây E-Dra EK368', price: 890000, sale_price: 790000, category: 'ban-phim', brand: 'E-Dra', stock: 35, image: '/dataset/keyboard_minimalist_white.png', featured: 0 },

    // Speakers
    { name: 'Loa Bluetooth JBL Flip 6', price: 2790000, sale_price: 2390000, category: 'loa', brand: 'JBL', stock: 20, image: '/dataset/speaker_portable_bluetooth.png', featured: 1 },
    { name: 'Loa Vi Tính Edifier R1280T', price: 1690000, sale_price: 0, category: 'loa', brand: 'Edifier', stock: 12, image: '/dataset/Loa_Vi_Tinh_Edifier_R1280T.jpg', featured: 1 },
    { name: 'Loa Harman Kardon Aura Studio 3', price: 5990000, sale_price: 5490000, category: 'loa', brand: 'Harman Kardon', stock: 8, image: '/dataset/speaker_portable_bluetooth.png', featured: 1 },
    { name: 'Loa Marshall Emberton II', price: 4290000, sale_price: 3890000, category: 'loa', brand: 'Marshall', stock: 15, image: '/dataset/Loa_Bluetooth_JBL_Flip_6.jpg', featured: 0 },
    { name: 'Loa Vi Tính Microlab B77', price: 1290000, sale_price: 1090000, category: 'loa', brand: 'Microlab', stock: 30, image: '/dataset/Loa_Vi_Tinh_Edifier_R1280T.jpg', featured: 0 },
    { name: 'Loa Bluetooth Sony SRS-XB13', price: 1190000, sale_price: 990000, category: 'loa', brand: 'Sony', stock: 45, image: '/dataset/speaker_portable_bluetooth.png', featured: 0 },
    { name: 'Loa Soundbar Samsung HW-B450', price: 2490000, sale_price: 1990000, category: 'loa', brand: 'Samsung', stock: 10, image: '/dataset/Loa_Vi_Tinh_Edifier_R1280T.jpg', featured: 0 },

    // USB
    { name: 'USB Kingston DataTraveler 64GB', price: 189000, sale_price: 149000, category: 'usb', brand: 'Kingston', stock: 100, image: '/dataset/USB_Kingston_DataTraveler_64GB.jpg', featured: 1 },
    { name: 'USB SanDisk Ultra Dual 128GB', price: 299000, sale_price: 249000, category: 'usb', brand: 'SanDisk', stock: 80, image: '/dataset/USB_SanDisk_Ultra_Dual_128GB.jpg', featured: 1 },
    { name: 'USB Samsung Fit Plus 128GB', price: 350000, sale_price: 290000, category: 'usb', brand: 'Samsung', stock: 60, image: '/dataset/usb_flash_drive_metal.png', featured: 0 },
    { name: 'USB Transcend JetFlash 32GB', price: 120000, sale_price: 99000, category: 'usb', brand: 'Transcend', stock: 120, image: '/dataset/USB_SanDisk_Ultra_Dual_128GB.jpg', featured: 0 },
    { name: 'USB Lexar JumpDrive 256GB', price: 590000, sale_price: 490000, category: 'usb', brand: 'Lexar', stock: 40, image: '/dataset/usb_flash_drive_metal.png', featured: 0 },
    { name: 'USB PNY Turbo Attache 64GB', price: 150000, sale_price: 0, category: 'usb', brand: 'PNY', stock: 90, image: '/dataset/USB_Kingston_DataTraveler_64GB.jpg', featured: 0 },
    { name: 'USB Adata UV150 64GB', price: 140000, sale_price: 110000, category: 'usb', brand: 'Adata', stock: 110, image: '/dataset/usb_flash_drive_metal.png', featured: 0 },

    // RAM
    { name: 'RAM Kingston Fury 8GB DDR4 3200MHz', price: 590000, sale_price: 490000, category: 'ram', brand: 'Kingston', stock: 40, image: '/dataset/RAM_Kingston_Fury_8GB_DDR4_3200MHz.jpg', featured: 1 },
    { name: 'RAM Corsair Vengeance 16GB DDR5 4800MHz', price: 1290000, sale_price: 0, category: 'ram', brand: 'Corsair', stock: 25, image: '/dataset/RAM_Corsair_Vengeance_16GB_DDR5_4800MHz.jpg', featured: 1 },
    { name: 'RAM G.Skill Ripjaws 8GB DDR4 2666MHz', price: 490000, sale_price: 390000, category: 'ram', brand: 'G.Skill', stock: 50, image: '/dataset/RAM_Kingston_Fury_8GB_DDR4_3200MHz.jpg', featured: 0 },
    { name: 'RAM Crucial 16GB DDR4 3200MHz', price: 990000, sale_price: 890000, category: 'ram', brand: 'Crucial', stock: 35, image: '/dataset/ram_stick_rgb.png', featured: 0 },
    { name: 'RAM Samsung 8GB DDR4 3200MHz', price: 550000, sale_price: 0, category: 'ram', brand: 'Samsung', stock: 60, image: '/dataset/RAM_Kingston_Fury_8GB_DDR4_3200MHz.jpg', featured: 0 },
    { name: 'RAM Lexar Thor 16GB DDR4 3200MHz', price: 890000, sale_price: 790000, category: 'ram', brand: 'Lexar', stock: 30, image: '/dataset/ram_stick_rgb.png', featured: 0 },
    { name: 'RAM Adata XPG 32GB DDR5 5200MHz', price: 2590000, sale_price: 2390000, category: 'ram', brand: 'Adata', stock: 15, image: '/dataset/ram_stick_rgb.png', featured: 0 },

    // Cleaning Kits
    { name: 'Bộ Vệ Sinh Laptop 8 Món', price: 99000, sale_price: 79000, category: 've-sinh', brand: 'Generic', stock: 200, image: '/dataset/Bo_Ve_Sinh_Laotop_8_Mon.jpg', featured: 0 },
    { name: 'Bình Xịt Khí Nén Vệ Sinh 400ml', price: 159000, sale_price: 129000, category: 've-sinh', brand: 'Generic', stock: 60, image: '/dataset/Binh_Xit_Khi_Nen_Ve_Sinh_400ml.jpg', featured: 0 },
    { name: 'Cọ Vệ Sinh Bàn Phím Đa Năng', price: 45000, sale_price: 35000, category: 've-sinh', brand: 'Generic', stock: 150, image: '/dataset/laptop_cleaning_kit.png', featured: 0 },
    { name: 'Gel Dính Bụi Bàn Phím Siêu Sạch', price: 55000, sale_price: 0, category: 've-sinh', brand: 'Generic', stock: 180, image: '/dataset/Bo_Ve_Sinh_Laotop_8_Mon.jpg', featured: 0 },
    { name: 'Nước Lau Màn Hình Laptop 250ml', price: 79000, sale_price: 59000, category: 've-sinh', brand: 'Generic', stock: 120, image: '/dataset/laptop_cleaning_kit.png', featured: 0 },
    { name: 'Bộ Khăn Lau Microfiber Cao Cấp', price: 65000, sale_price: 49000, category: 've-sinh', brand: 'Generic', stock: 250, image: '/dataset/laptop_cleaning_kit.png', featured: 0 }
].map(p => {
    // Add default description and specs to make them look complete
    if (!p.description) p.description = `Sản phẩm ${p.name} chính hãng ${p.brand}, thiết kế hiện đại, độ bền cao. Phù hợp cho mọi nhu cầu sử dụng.`;
    if (!p.specs) p.specs = `Thương hiệu: ${p.brand} | Loại: ${p.category.toUpperCase()} | Bảo hành: 12 tháng`;
    
    // Tồn kho ngẫu nhiên (15% cơ hội hết hàng = 0, còn lại từ 1-50)
    const isOut = Math.random() < 0.15;
    p.stock = isOut ? 0 : Math.floor(Math.random() * 50) + 1;
    
    // Đã bán ngẫu nhiên từ 10 đến 500
    p.sold = Math.floor(Math.random() * 491) + 10;
    
    return p;
});

module.exports = products;
