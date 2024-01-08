import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { BiImageAdd } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import Modal from "../common/Modal";
import { postFound } from "../../apis/post";
import { regions, category } from "./data";
import "./style.scss";

const Found = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: { date: "" } });

  const [images, setImages] = useState([]);
  const [imageCheck, setImageCheck] = useState({ error: false, message: "" });
  const [date, setDate] = useState();

  const handleImageChange = (event) => {
    let isValid = false;
    const files = event.target.files;
    const newImages = Array.from(files);

    newImages.forEach((image) => {
      if (image.size > 1 * 1024 * 1024) {
        setImageCheck({
          error: true,
          message: "이미지는 각각 최대 50MB까지 업로드할 수 있습니다",
        });
        isValid = true;
      }
    });

    if (images.length + newImages.length > 3) {
      setImageCheck({
        error: true,
        message: "이미지는 최대 3개까지 업로드할 수 있습니다",
      });
      isValid = true;
    }

    if (!isValid) {
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
    console.log(data);

    const formData = new FormData();
    const JSONData = JSON.stringify(data);

    formData.append("data", new Blob([JSONData], { type: "application/json" }));

    images.forEach((image) => {
      formData.append("image", image);
    });

    postFound(formData);
  };

  return (
    <form className="postform" onSubmit={handleSubmit(onSubmit)}>
      <div className="postform-group">
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
        {errors?.title && (
          <span className="error">{errors?.title?.message}</span>
        )}
      </div>
      <div>
        사진
        <div className="container-images">
          <label htmlFor="images" className="button-upload">
            <BiImageAdd size={24} />
            {images.length}/3
          </label>
          <input
            type="file"
            name="images"
            id="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {images.map((image, index) => (
            <div className="file-image" key={index}>
              <img src={URL.createObjectURL(image)} alt="" />
              <button
                type="button"
                className="button-delete"
                onClick={() => handleImageDelete(index)}
              >
                <FiX size={15} />
              </button>
            </div>
          ))}
        </div>
        {imageCheck.error && (
          <span className="error">{imageCheck.message}</span>
        )}
      </div>
      <div className="postform-group">
        습득물명
        <input
          type="text"
          {...register("item", {
            required: "습득물명을 입력해주세요",
            maxLength: {
              value: 20,
              message: "습득물명은 20자이내로 입력해야 합니다",
            },
          })}
        />
        {errors?.item && <span className="error">{errors?.item?.message}</span>}
      </div>
      <div className="postform-group">
        <div>습득날짜</div>

        <DatePicker
          {...register("date", { required: "습득날짜를 입력해주세요" })}
          dateFormat="yyyy.MM.dd"
          dateFormatCalendar="yyyy년 MM월"
          locale={ko}
          maxDate={new Date()}
          selected={date}
          onChange={(date) => {
            setDate(date);
            setValue("date", date);
          }}
          isClearable={true}
        />
      </div>
      {errors?.date && <span className="error"> {errors?.date?.message}</span>}
      <div className="postform-group">
        습득지역
        <div className="region-container">
          <select
            {...register("field_sido", { required: "습득지역을 입력해주세요" })}
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
            placeholder="시 / 구 / 군"
            {...register("field_sigungu", {
              required: "분실지역을 입력해주세요",
            })}
          />
        </div>
        {(errors?.field_sido || errors?.field_sigungu) && (
          <span className="error">습득지역을 입력해주세요</span>
        )}
      </div>
      <div className="postform-group">
        습득장소
        <input
          type="text"
          name="place"
          {...register("place", { required: "습득장소를 입력해주세요" })}
        />
        {errors?.place && (
          <span className="error">{errors?.place?.message}</span>
        )}
      </div>
      <div className="postform-group">
        카테고리
        <div className="category-wrap">
          {category.map((cat) => (
            <React.Fragment key={cat.id}>
              <input
                type="radio"
                name="category"
                className="radio"
                id={cat.id}
                value={cat.name}
                {...register("category", {
                  required: "카테고리를 선택해주세요",
                })}
              />
              <label htmlFor={cat.id}>{cat.name}</label>
            </React.Fragment>
          ))}
        </div>
        {errors?.category && (
          <span className="error">{errors?.category?.message}</span>
        )}
      </div>
      <div className="postform-group">
        자세한설명
        <textarea
          {...register("contents", {
            maxLength: {
              value: 300,
              message: "자세한설명은 300자이내로 입력해야 합니다",
            },
          })}
        />
      </div>
      <button type="submit" className="button-submit">
        글쓰기
      </button>
    </form>
  );
};
export default Found;
