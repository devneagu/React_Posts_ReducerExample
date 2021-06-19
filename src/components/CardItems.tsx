import { Card, CardContainer } from "./styled/CardItems";
type ElementPosts = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

function CardItems({ pagination, data }: ElementPosts[]) {
  return (
    <>
      {data
        .slice(
          (pagination.active - 1) * pagination.numberOfCards,
          pagination.active * pagination.numberOfCards
        )
        .map((element: ElementPosts) => (
          <Card key={element.id}>
            <CardContainer>
              <h3>
                {element.id}. {element.title}
              </h3>
              <p>{element.body}</p>
            </CardContainer>
          </Card>
        ))}
    </>
  );
}

export default CardItems;
