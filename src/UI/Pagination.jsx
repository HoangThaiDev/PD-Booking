// Import Modules
import React from "react";
import "./css/pagination.css";

// Import Components
import { Pagination, ConfigProvider } from "antd";

export default function PaginationCusTom({ data, onSaveSliceData, pageSize }) {
  // Create + use event Handlers
  const choosePageHandler = (page, pageSize) => {
    const startIndex = (page - 1) * pageSize;
    const sliceData = data.slice(startIndex, pageSize * page);
    onSaveSliceData(sliceData);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "rgb(226, 144, 31)",
        },
      }}
    >
      <Pagination
        className="pagination"
        defaultCurrent={1}
        defaultPageSize={pageSize}
        showTitle={false}
        total={data.length}
        onChange={choosePageHandler}
      />
    </ConfigProvider>
  );
}
