import { useState } from "react";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import SimpleImageSlider from "react-simple-image-slider";
import { MdClose, MdUploadFile } from "react-icons/md";

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "700px")};
  height: ${(props) => (props.height ? props.height : "480px")};
  padding: 0 18px;
  box-shadow: 0 0 5px 2px #63aeae;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;
const ImgSliderBox = styled.div``;
const UlStyle = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 700px;
  height: auto;
  margin-bottom: 40px;
`;

const ListStyled = styled.li`
  overflow: hidden;
  position: relative;
`;

const ImgItem = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
  text-align: right;
  box-sizing: border-box;
`;

const PreViewImg = styled.img`
  width: 120px;
  height: 120px;
  margin: 10px;
  border-radius: 8px;
`;

const UploadBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px dashed #cacaca;
  border-radius: 8px;
  background-color: #fcfcff;
  color: #cacaca;
  font-size: 64px;
  cursor: pointer;
  width: 120px;
  height: 120px;
  margin: 10px;
`;
const fileTypes = ["JPG", "PNG", "GIF"];

const DiaryEditImg = () => {
  // const images = [
  //   { url: "../../images/user.png" },
  //   { url: "images/2.jpg" },
  //   { url: "images/3.jpg" },
  //   { url: "images/4.jpg" },
  //   { url: "images/5.jpg" },
  //   { url: "images/6.jpg" },
  //   { url: "images/7.jpg" },
  // ];
  const [imageList, setImageList] = useState([]); // 여기 잘 바꿔야 할듯?

  console.log(imageList);
  const [isDrag, setIsDrag] = useState(false);
  const imageRegistHandler = (files) => {
    let tempImagelist = [...imageList];
    for (let i = 0; i < files.length; i++) {
      tempImagelist.push(files[i]);
    }
    if (tempImagelist.length > 10) {
      alert("최대 10장까지 업로드할 수 있습니다.");
      tempImagelist = tempImagelist.slice(0, 10);
    }

    setImageList(tempImagelist);
  };

  const imageDeleteHandler = (index) => {
    setImageList([...imageList].filter((item, idx) => idx !== index));
  };
  return (
    <>
      <InputContainer>
        {imageList.length === 0 ? (
          <div>이미지를 추가해 주세요.</div>
        ) : (
          <ImgSliderBox>
            <SimpleImageSlider
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "none",
              }}
              width={"700px"}
              height={"480px"}
              images={imageList.map((item) => {
                return { url: URL.createObjectURL(item) };
              })}
              showBullets={true}
              showNavs={true}
              autoPlay={true}
              loop={true}
              // bgColor="#E1DFE9"
            />
          </ImgSliderBox>
        )}
      </InputContainer>
      <UlStyle>
        {imageList.map((image, index) => {
          return (
            <ListStyled key={index}>
              <ImgItem>
                <MdClose className="delete-img" size="28" onClick={() => imageDeleteHandler(index)} />
              </ImgItem>
              <PreViewImg alt="갤러리 이미지" src={URL.createObjectURL(image)} />
            </ListStyled>
          );
        })}

        <FileUploader
          handleChange={imageRegistHandler}
          name="file"
          types={fileTypes}
          multiple={true}
          hoverTitle="놓으세요!"
          onDraggingStateChange={(dragging) => setIsDrag(dragging)}
        >
          <UploadBtn type="button">{!isDrag && <MdUploadFile />}</UploadBtn>
        </FileUploader>
      </UlStyle>
    </>
  );
};
export default DiaryEditImg;
