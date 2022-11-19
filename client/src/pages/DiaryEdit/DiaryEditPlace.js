import styled from "styled-components";

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "700px")};
  height: ${(props) => (props.height ? props.height : "55px")};
  padding: 0 18px;
  border-radius: 35px;
  box-shadow: 0 0 5px 2px #63aeae;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const TitleText = styled.span`
  white-space: nowrap;
`;
const PlaceContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const PlaceArea = styled(InputContainer)`
  width: 341px;
`;
const Tags = styled.div`
  margin-left: 10px;
  width: 100%;
`;

const Select = styled.select`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Adjusted", "Segoe UI", "Liberation Sans", sans-serif;
  outline-style: none;
  border: none;
  margin-right: 8px;
  font-size: 14px;
  background-color: #fbfbfb;
`;

const DiaryEditPlace = ({ Location, selected, setSelected, city, setCity, select1 }) => {
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };
  const handleCitySelect = (e) => {
    setCity(e.target.value);
  };

  return (
    <PlaceContainer>
      <PlaceArea>
        <TitleText>다녀온 지역 :</TitleText>
        <Tags>
          {/* defaultValue써야하나? */}
          <Select name="." onChange={handleSelect} value={selected}>
            {select1.map((el) => (
              <option key={el.id}>{el}</option>
            ))}
          </Select>
          <Select name="." onChange={handleCitySelect} value={city}>
            {Location[selected].map((el) => (
              <option key={el.id}>{el}</option>
            ))}
          </Select>
        </Tags>
      </PlaceArea>
    </PlaceContainer>
  );
};
export default DiaryEditPlace;
