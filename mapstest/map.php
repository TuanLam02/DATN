<!DOCTYPE html>
<html>
<head>
    <title>Bảng Đồ Di Tích Lịch Sử Tỉnh Phú Yên</title>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD4Fet_AfCX6OzqYNTsb_jPuH__Jq4F4sE&callback=initMap" defer async></script>
    <link rel="stylesheet" href="./style.css">
    <script src="script.js"></script>
</head>
<body>
<div class="search-container">
    <input type="text" id="searchInput" placeholder="Tìm kiếm...">
    <div class="dropdown">
        <button class="dropbtn">Chọn địa điểm</button>
        <div id="searchResults" class="dropdown-content"></div>
    </div>
</div>


    <div id="information">
        <div id="information_child">
            <img id="img" src="" alt="">
            <div id="name" class="name"></div>
            <div id="description" class="description" style="overflow: scroll"></div>
            <div id="distance"></div>
            <div class="button">
                <button class="direct" id="direct"> Chỉ đường </button>
                <button class="close" id="close" > Đóng </button>
            </div>
        </div>
    </div>
    <!-- <label for="cars">Loại phương tiện</label>
    <select id="cars">
        <option value="Car" id="driving-mode-car" >Ô tô</option>
        <option selected value="Bike" id="driving-mode-bike">Xe máy</option>
    </select> -->
    <div id="distanceOutsideMap"></div>
    <div id="map" style="height: 100vh; width: 100%;"></div>
</body>
</html>