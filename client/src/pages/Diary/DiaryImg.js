import { useState } from "react";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";
import SimpleImageSlider from "react-simple-image-slider";
import { MdClose, MdUploadFile } from "react-icons/md";

const InputContainer = styled.div`
  width: ${(props) => (props.width ? props.width : "700px")};
  height: ${(props) => (props.height ? props.height : "480px")};
  padding: 0 18px;
  /* border-radius: 35px; */
  box-shadow: 0 0 5px 2px #63aeae;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const UlStyle = styled.ul`
  display: flex;
  flex-direction: row;
  width: 700px;
  height: auto;
  overflow: unset;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const PreViewImg = styled.img`
  width: 120px;
  height: 120px;
  margin: 10px;
`;

const UploadBtn = styled.button`
  width: 120px;
  height: 120px;
  margin: 10px;
`;
const fileTypes = ["JPG", "PNG", "GIF"];

const DiaryImg = () => {
  const [imageList, setImageList] = useState([]);
  const [isDrag, setIsDrag] = useState(false);

  const imageRegistHandler = (files) => {
    let tempImagelist = [...imageList];
    for (let i = 0; i < files.length; i++) {
      tempImagelist.push(files[i]);
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
          <div>
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
              bgColor="#E1DFE9"
            />
          </div>
        )}
      </InputContainer>
      {/* <InputContainer2> */}
      <UlStyle>
        {imageList.map((image, index) => {
          return (
            <li key={index}>
              <div>
                <MdClose onClick={() => imageDeleteHandler(index)} />
              </div>
              <PreViewImg alt="갤러리 이미지" src={URL.createObjectURL(image)} />
            </li>
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
      {/* </InputContainer2> */}
    </>
  );
};
export default DiaryImg;
