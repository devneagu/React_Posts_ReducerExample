import { range } from "./Helpers";
import { PaginationContainer, PaginationItem } from "./styled/Pagination";
import { PaginationNext, PaginationBack } from "./styled/PaginationSvg";

function Pagination({ pagination, dispatch }) {
  const paginationElements = 5;

  const getRange = () => {
    const _buckets: number = Math.round(pagination.max / paginationElements);
    if (_buckets <= 1) return [1, pagination.max];
    for (let i = 0; _buckets; i++) {
      if (pagination.active <= i * paginationElements) {
        return [paginationElements * (i - 1) + 1, paginationElements * i];
      }
    }
  };
  return (
    <>
      <PaginationContainer>
        <span
          style={{ marginRight: "0.5em" }}
          onClick={() => dispatch({ type: "prev" })}
        >
          <PaginationBack />
        </span>
        {range(...getRange()).map((el, index) => (
          <PaginationItem
            key={el}
            className={`${pagination.active === el ? "active" : ""}`}
            onClick={() => dispatch({ type: "updateActive", value: el })}
          >
            {el}
          </PaginationItem>
        ))}
        <span
          style={{ marginLeft: "0.5em" }}
          onClick={() => dispatch({ type: "next" })}
        >
          <PaginationNext />
        </span>
      </PaginationContainer>
    </>
  );
}

export default Pagination;
