// import { Controller } from "react-hook-form";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import "./RichTextField.css";

// const modules = {
//   toolbar: [
//     [{ header: "1" }, { header: "2" }, { font: [] }],
//     [{ list: "ordered" }, { list: "bullet" }],
//     ["bold", "italic", "underline", "strike"],
//     [{ align: [] }],
//     ["link", "image", "code-block"],
//     ["clean"],
//   ],
// };

// const formats = [
//   "header",
//   "font",
//   "list",
//   "bullet",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "align",
//   "link",
//   "image",
//   "code-block",
// ];

// const RichTextField = ({ name, control, placeholder = "Write something..." }) => {
//   return (
//     <div className="align-top">
//   <div className="editor-wrapper">
//     <Controller
//       name={name}
//       control={control}
//       defaultValue=""
//       render={({ field }) => (
//        <ReactQuill
//   {...field}
//   theme="snow"
//   modules={modules}
//   formats={formats}
//   className="custom-quill"
//   placeholder={placeholder}
//   onChange={(content, delta, source, editor) => {
//     let html = editor.getHTML();

//     // remove extra blank paragraph
//     html = html.replace(/<p><br><\/p>/g, "");

//     field.onChange(html);
//   }}
// />

//       )}
//     />
//   </div>
// </div>

//   );
// };

// export default RichTextField;


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

const RichTextField = ({ name, control, placeholder = "Write something..." }) => {
  return (
    <div className="align-top">
  <div className="editor-wrapper">
    <Controller
      name={name}
      control={control}
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
</div>

  );
};

export default RichTextField;
