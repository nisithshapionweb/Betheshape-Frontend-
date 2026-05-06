import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextField.css";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    ["link", "image", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "link",
  "image",
  "code-block",
];

const ModalRichText = ({ value, placeholder = "Write something..." }) => {
  return (
    <td className="align-top">
      <div className="editor-wrapper">
        <Controller
          control={value || ""}
          defaultValue=""
          render={({ field }) => (
            <ReactQuill
              {...field}
              theme="snow"
              modules={modules}
              formats={formats}
              className="custom-quill"
              placeholder={placeholder}
            />
          )}
        />
      </div>
    </td>
  );
};

export default ModalRichText;
