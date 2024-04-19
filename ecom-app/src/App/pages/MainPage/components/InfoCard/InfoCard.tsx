import Button from "components/Button";

const InfoCard = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log("кликнул");
        }}
      >
        Click me
      </Button>
    </div>
  );
};

export default InfoCard;
