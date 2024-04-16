import Button from "components/Button";

const InfoCard = () => {
  return (
    <div>
      infocard
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
