import "./Detail.css";
import search from "./logos_figma/search.svg";
import mapBackground from "./logos_figma/mapBackground.png";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Detail(){
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get("http://10.106.22.52:8081/all").then((response) => {
      setItems(response.data);
    });
  }, []);

  
  return (
    <div className="container">
        <div class="demo-detail">
          <img class="map" alt="" src={mapBackground}></img>
          <div class="blur_layer"></div>

          {/*Này thì tính làm searchbox mà chỉnh hoài không ra*/}
          {/* <div class="search-box">
            <img class="search" alt="" src={search}></img>
            <input></input>
          </div> */}
          
          {/*Nay là hàng chữ nội dung á (record_time đồ)*/}    
          <div class="contents">
            <div class="record-time">Record_time</div>
            <div class="alcohol-concentration">Alcohol_concentration</div>
            <div class="record-time">Temperature</div>
            <div class="record-time">Cordinate</div>
            <div class="record-time">Speed/second</div>
            <div class="record-time">Heading</div>
          </div>

          <div class="hr"></div> {/*Này là cái đường kẻ thẳng á, <hr> á*/}
          
          {/*Còn mấy cái div dưới là mấy cái ô hiển thị thông tin xuất ra*/}
          <div className ="Details">
        {items.map((item) => (
          <div key={item.id} className="card-body">
            <div>
              <p>
                ID: {item.id} Temperature: {item.temperature} Humid:{item.humid}{" "}
                Date: {item.atTime}
              </p>
            </div>
          </div>
        ))}
      </div>

          <div class="demo-detail-item"></div>
          <div class="demo-detail-inner"></div>
          <div class="rectangle-div"></div>
          <div class="demo-detail-child1"></div>
          <div class="demo-detail-child2"></div>
          <div class="demo-detail-child3"></div>
        </div>
    </div>
  );
}

export default Detail;
