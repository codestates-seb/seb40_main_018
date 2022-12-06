import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

function Scroll() {
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState(Array.from({ length: 20 }));

  // console.log("items", items);

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(!hasMore);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 10 })));
    }, 500);
  };

  const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8,
  };
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      //   height={1000}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {/* 리스트 */}
      {items.map((i, index) => (
        <div style={style} key={index}>
          div - #{index}
        </div>
      ))}
    </InfiniteScroll>
  );
}

export default Scroll;
