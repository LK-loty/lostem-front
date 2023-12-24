import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { BiImageAdd } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import Modal from "../common/Modal";
import { post } from "../../apis/post";
import "./style.scss";

// 카테고리
const category = [
  { id: 1, name: "카드" },
  { id: 2, name: "증명서" },
  { id: 3, name: "전자기기" },
  { id: 4, name: "자동차" },
  { id: 5, name: "유가증권" },
  { id: 6, name: "스포츠용품" },
  { id: 7, name: "현금" },
  { id: 8, name: "쇼핑백 " },
  { id: 9, name: "도서용품" },
  { id: 10, name: "휴대폰" },
  { id: 11, name: "컴퓨터" },
  { id: 12, name: "가방 " },
  { id: 13, name: "유류품 " },
  { id: 14, name: "지갑" },
  { id: 15, name: "서류" },
  { id: 16, name: "산업용품" },
  { id: 17, name: "기타" },
];

// 지역
const regions = [
  { id: 1, name: "서울특별시" },
  { id: 2, name: "강원도" },
  { id: 3, name: "경기도" },
  { id: 4, name: "경상남도" },
  { id: 5, name: "경상북도" },
  { id: 6, name: "광주광역시" },
  { id: 7, name: "대구광역시" },
  { id: 8, name: "대전광역시" },
  { id: 9, name: "부산광역시" },
  { id: 10, name: "울산광역시" },
  { id: 11, name: "인천광역시" },
  { id: 12, name: "전라남도" },
  { id: 13, name: "전라북도" },
  { id: 14, name: "충청남도" },
  { id: 15, name: "충청북도" },
  { id: 16, name: "제주특별자치도" },
  { id: 17, name: "세종특별자치시" },
  { id: 18, name: "해외" },
  { id: 19, name: "기타" },
];

// 분실기간, 습득날짜로 하기
// 분실기간은 /로 구분
const PostForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: {} });

  const [images, setImages] = useState([]);
  const [imageCheck, setImageCheck] = useState({ error: false, message: "" });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleImageChange = (event) => {
    const isValid = false;
    const files = event.target.files;
    const newImages = Array.from(files);

    newImages.forEach((image) => {
      if (image.size > 1 * 1024 * 1024) {
        setImageCheck({
          error: true,
          message: "이미지는 각각 최대 50MB까지 업로드할 수 있습니다.",
        });
        isValid = true;
      }
    });

    if (images.length + newImages.length > 3) {
      setImageCheck({
        error: true,
        message: "이미지는 최대 3개까지 업로드할 수 있습니다.",
      });
    }

    if (!imageCheck.error) {
      setImageCheck({
        error: false,
        message: "",
      });
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleImageDelete = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    console.log(newImages.length);
  };

  const onSubmit = (data) => {
    const formattedDateRange = dateRange.map((date) =>
      date ? formatDate(date) : ""
    );
    const formatData = {
      ...data,
      datetime: formattedDateRange.join("-"),
    };
    const formData = new FormData();
    const JSONData = JSON.stringify(formatData);
    formData.append("data", new Blob([JSONData], { type: "application/json" }));

    images.forEach((image) => {
      formData.append("image", image);
    });

    console.log(formData.get("data"));

    post(formData);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <form className="postform" onSubmit={handleSubmit(onSubmit)}>
      <div>
        상태
        <select
          name="state"
          {...register("state", {
            required: "상태를 선택해주세요",
          })}
        >
          <option value="">선택</option>
          <option value="찾는중">찾는중</option>
          <option value="확인중">확인중</option>
          <option value="습득완료">습득완료</option>
        </select>
      </div>
      {errors?.state && <span className="error">{errors?.state?.message}</span>}
      <div>
        제목
        <input
          type="text"
          {...register("title", {
            required: "제목을 입력해주세요",
            maxLength: {
              value: 20,
              message: "제목은 20자 이내로 입력해야 합니다",
            },
          })}
        />
      </div>
      {errors?.title && <span className="error">{errors?.title?.message}</span>}
      <div className="imge-upload">
        사진
        <label htmlFor="images" className="button-upload">
          <BiImageAdd size="30" />
        </label>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div className="container-images">
          {images.map((image, index) => (
            <div className="file-image" key={index}>
              <img src={URL.createObjectURL(image)} alt="" />
              <button
                type="button"
                className="button-delete"
                onClick={() => handleImageDelete(index)}
              >
                <FiX size="15" />
              </button>
            </div>
          ))}
        </div>
        {imageCheck.error && (
          <span className="error">{imageCheck.message}</span>
        )}
      </div>
      <div>
        분실물명
        <input
          type="text"
          {...register("item", {
            required: "분실물명을 입력해주세요.",
            maxLength: {
              value: 20,
              message: "분실물명은 20자이내로 입력해야 합니다",
            },
          })}
        />
        {errors?.item && <span className="error">{errors?.item?.message}</span>}
      </div>
      <div>
        분실기간
        <Controller
          name="datetime"
          control={control}
          rules={{ required: "분실기간을 입력해주세요." }}
          defaultValue=""
          render={({ field }) => (
            <DatePicker
              {...field}
              dateFormat="yyyy.MM.dd"
              dateFormatCalendar="yyyy년 MM월"
              locale={ko}
              maxDate={new Date()}
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                field.onChange(update); // 필드 값 업데이트
              }}
              isClearable={true}
            />
          )}
        />
        {errors?.datetime && (
          <span className="error">{errors?.datetime?.message}</span>
        )}
      </div>

      <div className="region">
        분실지역
        <div className="region-container">
          <select
            {...register("field_do", { required: "분실지역을 입력해주세요." })}
          >
            <option value="">선택</option>
            {regions.map((reg) => (
              <option key={reg.id} value={reg.name}>
                {reg.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="region"
            placeholder="시/군/구"
            {...register("field_sigungu", {
              required: "분실지역을 입력해주세요.",
            })}
          />
        </div>
      </div>
      <div className="location">
        분실장소
        <input
          type="text"
          name="location"
          {...register("location", { required: "분실장소를 입력해주세요." })}
        />
      </div>
      <div className="category">
        카테고리
        <div className="category-wrap">
          {category.map((cat) => (
            <React.Fragment key={cat.id}>
              <input
                type="radio"
                name="cat"
                className="radio"
                id={cat.id}
                value={cat.name}
                // onChange={(event) => handleInputChange(event, "category")}
                {...register("category", {
                  required: "카테고리를 선택해주세요.",
                })}
              />
              <label htmlFor={cat.id}>{cat.name}</label>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div>
        자세한설명
        <textarea {...register("explain", { maxLength: 300 })} />
      </div>
      <button type="submit" className="button-submit">
        글쓰기
      </button>
    </form>
  );
};
export default PostForm;
