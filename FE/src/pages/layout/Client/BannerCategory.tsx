import React from 'react';
import { Link } from "react-router-dom";

const BannerCategory = () => {
  return (
    <div className="flex justify-between m-10 gap-6">
      <a href="/list-productsAll" className="w-1/2 relative overflow-hidden group">
        <div className="aspect-w-3 aspect-h-4 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300 ">
          <img src="https://images.summitmedia-digital.com/spotph/images/2021/12/09/best-sneakers-2021-640-1639022364.jpg" data-src="images/skins/fashion/banner-fashion-2-02.webp" className="fade-up ls-is-cached lazyloaded w-full h-full" alt="Banner" />
          <div className="foxic-loader"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <h3 className="text-white text-lg font-bold">Sản Phẩm</h3>
          <h4 className="text-white text-sm">Sản Phẩm Đa Dạng Phong Phú</h4>
        </div>
      </a>

      <Link to={"/category"} className="w-1/2 relative overflow-hidden group">
        <div className="aspect-w-3 aspect-h-4 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-300 ">
          <img src="https://images.summitmedia-digital.com/spotph/images/2020/11/06/where-to-buy-jordans-640-1604646636.jpg" data-src="images/skins/fashion/banner-fashion-2-04.webp" className="fade-up ls-is-cached lazyloaded w-full h-full" alt="Banner" />
          <div className="foxic-loader"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <h3 className="text-white text-lg font-bold">Danh mục </h3>
          <h4 className="text-white text-sm">Ngập Tràn Sản Phẩm </h4>
        </div>
      </Link>
    </div>
  );
};

export default BannerCategory;
