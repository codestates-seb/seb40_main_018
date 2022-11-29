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

const DiaryPlace2 = ({ Location, register, errors }) => {
  const select1 = Object.keys(Location);
  return (
    <>
      <PlaceContainer>
        <PlaceArea>
          <TitleText>다녀온 지역 :</TitleText>
          <Tags>
            <Select
              name="selected"
              {...register("selected", {
                required: { value: true, message: "지역을 선택해주세요." },
              })}
            >
              {select1.map((el, index) => (
                <option key={index} value={el.id}>
                  {el}
                </option>
              ))}
            </Select>
            {/* <Select
              name="city"
              {...register("city", {
                required: { value: true, message: "지역을 선택해주세요." },
              })}
            >
              {Location[selected].map((el, index) => (
                <option key={index}>{el}</option>
              ))}
            </Select> */}
          </Tags>
        </PlaceArea>
      </PlaceContainer>
      {errors.selected && errors.city && <div role="alert">{errors.selected.message}</div>}
    </>
  );
};
export default DiaryPlace2;
