// Import Modules
import React, { useEffect, useState } from "react";
import "./css/pagination.css";

// Import Components
import { Pagination, ConfigProvider } from "antd";

export default function PaginationCusTom({
  data,
  onSaveSliceData,
  pageSize,
  refresh,
}) {
  // Create + use Hooks
  const [currentPage, setCurrentPage] = useState(1);
  // Reset Pagination when data change
  useEffect(() => {
    if (!refresh) {
      setCurrentPage(1);
    }
  }, [data.length]);

  // Create + use event Handlers
  const choosePageHandler = (page, pageSizeOption) => {
    const restartRefrestRoom = false;
    const startIndex = (page - 1) * pageSizeOption;
    const sliceData = data.slice(startIndex, pageSizeOption * page);
    onSaveSliceData(sliceData, restartRefrestRoom);
    setCurrentPage(page);
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
        current={refresh ? 1 : currentPage}
        defaultPageSize={pageSize}
        showTitle={false}
        total={data.length}
        onChange={choosePageHandler}
      />
    </ConfigProvider>
  );
}
