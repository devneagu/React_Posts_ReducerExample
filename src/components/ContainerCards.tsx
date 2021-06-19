import "./styled/Custom.css";
import { useEffect, useReducer, useState } from "react";
import HeaderPosts from "./HeaderPosts";
import Pagination from "./Pagination";
import SortButton from "./SortButton";
import CardItems from "./CardItems";
import { getNextSortingDirection, sortData } from "./Helpers";
import { CardItemsContainer, ParentContainerCards } from "./styled/Card";

type StatePagination = {
  min: number;
  active: number;
  max: number;
  numberOfCards: number;
};

type ActionReducer = {
  type: string;
  value: number;
};

function paginationReducer(state: StatePagination, action: ActionReducer) {
  switch (action.type) {
    case "next":
      if (state.active === state.max) return { ...state };
      return { ...state, active: state.active + 1 };
    case "prev":
      if (state.active === state.min) return { ...state };
      return { ...state, active: state.active - 1 };
    case "updateMax":
      return { ...state, max: action.value };
    case "updateActive":
      return { ...state, active: action.value };
    default:
      throw new Error();
  }
}

function ContainerCards() {
  const [posts, setPosts] = useState(null);
  const [sortingDirections, setSortingDirections] = useState({
    direction: "UNSORTED"
  });
  const [pagination, dispatch] = useReducer(paginationReducer, {
    min: 1,
    active: 1,
    max: 1,
    numberOfCards: 20 // number of Cards per page -
    // this property can be changed
  });
  useEffect(() => {
    let controller: AbortController = new AbortController();
    (async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts`,
          {
            signal: controller.signal
          }
        );
        console.log("Data Fetch");
        var _posts = await response.json();
        setPosts(_posts);
        dispatch({
          type: "updateMax",
          value: Math.round(_posts.length / pagination.numberOfCards)
        });
        controller = null;
      } catch (e) {
        // Handle fetch error
      }
    })();
    return () => controller?.abort();
  }, []);

  const sortDataTrigger = () => {
    const currentSortingDirection = sortingDirections["direction"];
    const nextSortingDirection = getNextSortingDirection(
      currentSortingDirection
    );
    sortData(posts, "title", nextSortingDirection);
    setSortingDirections({
      direction: nextSortingDirection
    });
  };

  if (posts === null) return "Loading...";
  return (
    <ParentContainerCards>
      <HeaderPosts />
      <div className="flex reset-flex-m">
        <div className="flex-1">
          <SortButton
            sortingDirections={sortingDirections}
            sortDataTrigger={sortDataTrigger}
          />
        </div>
        <div className="flex-1 relative">
          <Pagination pagination={pagination} dispatch={dispatch} />
        </div>
      </div>
      <CardItemsContainer>
        <CardItems pagination={pagination} data={posts} />
      </CardItemsContainer>
      <div className="padding-tb-1 relative">
        <Pagination pagination={pagination} dispatch={dispatch} />
      </div>
    </ParentContainerCards>
  );
}
export default ContainerCards;
