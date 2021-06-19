import { BtnSort } from "./styled/Card";
import { getNextSortingDirection } from "./Helpers";
function SortButton(props) {
  const customMessage = (direction) => {
    var nextDirection: string = getNextSortingDirection(direction);

    if (nextDirection === "UNSORTED") return "Reset";
    if (nextDirection === "DESCENDING") return "Sort Z-A";
    return "Sort A-Z";
  };
  return (
    <BtnSort onClick={() => props.sortDataTrigger()}>
      {customMessage(props.sortingDirections.direction)}
    </BtnSort>
  );
}

export default SortButton;
