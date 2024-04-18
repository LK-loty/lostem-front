import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import { BiImageAdd } from "react-icons/bi";
import { FiX } from "react-icons/fi";
import { readLostDetail, updateLost } from "../../apis/post";
import { regions } from "../../data/regions";
import { category } from "../../data/category";

const EditLostPage = () => {
  const { postId } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageCheck, setImageCheck] = useState({ error: false, message: "" });
  const [date, setDate] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await readLostDetail(postId);
        if (response.status === 200) {
          const postData = response.data.postLostDTO;

          console.log(postData);

          setValue("title", postData.title);
          setValue("item", postData.item);
          setValue("place", postData.place);
          setValue("contents", postData.contents);
          setValue("start", postData.start);
          setValue("end", postData.end);
          setValue("field_sido", postData.area.split(" ")[0]);
          setValue("field_sigungu", postData.area.split(" ")[1]);
          setValue("category", postData.category);
          setValue("date", new Date(postData.date));
          setDate(new Date(postData.date));

          // 이미지 설정
        }
      } catch (error) {
        console.error("edit lost page fetchdata 에러 => ", error);
      }
    };

    fetchData();
  }, []);

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
    console.log("lost 수정");
    // field_sido와 field_sigungu 필드 제거 및 area에 값 설정
    const areaValue = `${data.field_sido} ${data.field_sigungu}`;
    delete data.field_sido;
    delete data.field_sigungu;

    const updatedData = {
      ...data,
      area: areaValue,
      postId: postId,
    };

    const formData = new FormData();
    const JSONData = JSON.stringify(updatedData);

    formData.append("data", new Blob([JSONData], { type: "application/json" }));

    images.forEach((image) => {
      formData.append("image", image);
    });

    updateLost(formData).then((response) => {
      console.log(response);
      if (response.status === 200) {
        navigate(-1);
      } else if (response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    });
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
        분실물명
        <input
          type="text"
          {...register("item", {
            required: "분실물명을 입력해주세요",
            maxLength: {
              value: 20,
              message: "분실물명은 20자이내로 입력해야 합니다",
            },
          })}
        />
        {errors?.item && <span className="error">{errors?.item?.message}</span>}
      </div>
      <div className="postform-group">
        <div>분실일자</div>
        <DatePicker
          {...register("date", { required: true })}
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

        <br />
        {errors?.date && <span className="error">분실일자를 입력해주세요</span>}
      </div>
      <div className="postform-group">
        분실지역
        <div className="region-container">
          <select
            {...register("field_sido", { required: "분실지역을 입력해주세요" })}
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
        {(errors?.field_sido?.type === "required" ||
          errors?.field_sigungu?.type === "required") && (
          <span className="error">분실지역을 입력해주세요</span>
        )}
        {errors?.field_sigungu?.type === "maxLength" && (
          <span className="error"> {errors?.field_sigungu?.message}</span>
        )}
      </div>
      <div className="postform-group">
        분실장소
        <input
          type="text"
          name="place"
          {...register("place", { required: "분실장소를 입력해주세요" })}
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
        수정하기
      </button>
    </form>
  );
};
export default EditLostPage;
