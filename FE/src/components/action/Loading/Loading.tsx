import { Spin } from "antd";
import { useState, useEffect } from "react";

export default function Loading() {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh", // Đảm bảo phần tử chứa Loading có chiều cao tối thiểu là chiều cao của trang web
  };

  return showSpinner ? (
    <Spin tip="Loading"  size="large">
      <div className="content" />
    </Spin>
  ) : null;
}
