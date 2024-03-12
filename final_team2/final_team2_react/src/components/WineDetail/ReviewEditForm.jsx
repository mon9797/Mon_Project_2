import React, { useState } from "react";
import axios from "axios";

function ReviewEditForm({ reviewId }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(`http://localhost:8080/reviews/${reviewId}/file`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("파일이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("파일 수정 중 오류 발생:", error);
    }
  };

  return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSubmit}>파일 수정</button>
      </div>
  );
}

export default ReviewEditForm;