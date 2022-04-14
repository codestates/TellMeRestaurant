import REACT, { useState } from "react";
import DaumPostCode from "react-daum-postcode";

const DaumPost = ({}) => {
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소
  const [isOpenPost, setIsOpenPost] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddress);
    setIsOpenPost(false);
    //fullAddress -> 전체 주소반환
  };
  return <DaumPostCode onComplete={handleComplete} className="post-code" />;
};
export default DaumPost;
