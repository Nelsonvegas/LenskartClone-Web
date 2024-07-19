import React from "react";

const HomeCategoryContent = () => {
  return (
    <div>
      <div className="container-fluid bg-white col-6 p-3 d-flex justify-content-center ">
        <p class="txt1">NEW ARRIVALS &nbsp;</p>
        <p class="txt2"> STARTING AT RS.1200</p>
      </div>

      <div class="container-fluid">
        <div class="row align-items-center text-center">
          <div class="col-lg-4 col-sm-12">
            <a href="#">
              <img class="img-fluid w-50" src="image/div 6 1.jpg" />
            </a>
          </div>
          <div class="col-lg-4 col-sm-12">
            <a href="#">
              <img class="img-fluid w-50" src="image/div 6 2.jpg" />
            </a>
          </div>
          <div class="col-lg-4 col-sm-12">
            <a href="#">
              <img class="img-fluid w-50" src="image/div 6 3.jpg" />
            </a>
          </div>
        </div>
      </div>

      <div class="container-fluid bg-white col-6 pt-5 pb-3 d-flex justify-content-center ">
        <a href="products.html">
          <button class="btn btn-primary"> VIEW MORE</button>
        </a>
      </div>

      <hr></hr>
    </div>
  );
};

export default HomeCategoryContent;
