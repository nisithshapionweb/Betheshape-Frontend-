// import { createContext, useContext, useState } from "react";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// const TranslationContext = createContext();

// const TranslationProvider = ({ children }) => {
//   const axiosPublic = useAxiosPublic();
//   const [language, setLanguage] = useState("en");
//   const [translations, setTranslations] = useState({}); // text: translatedText map
//   const [loading, setLoading] = useState(false);
//   // Language change handler
//   const changeLanguage = async (lang) => {
//     setLoading(true);
//     setLanguage(lang);

//     // সব elements translate করা
//     const elements = document.querySelectorAll("[data-translate]");

//     // Promise array
//     const translationPromises = Array.from(elements).map(async (el) => {
//       const text = el.innerText.trim();
//       if (!text) return null;

//       try {
//         const res = await axiosPublic.post("/api/translate", {
//           text,
//           targetLang: lang,
//         });
//         return { original: text, translated: res.data.translatedText };
//       } catch (err) {
//         console.error("Translation Error:", err);
//         return { original: text, translated: text };
//       }
//     });

//     const results = await Promise.all(translationPromises);

//     // Update the DOM
//     results.forEach((res) => {
//       if (!res) return;
//       const el = Array.from(elements).find(
//         (el) => el.innerText.trim() === res.original
//       );
//       if (el) el.innerText = res.translated;
//     });
//     setLoading(false); // loader stop
//   };

//   return (
//     <TranslationContext.Provider
//       value={{
//         language,
//         setLanguage: changeLanguage,
//         translations,
//         setTranslations,
//         loading,
//       }}
//     >
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// const useTranslation = () => useContext(TranslationContext);

// export { TranslationProvider, useTranslation };

// import { createContext, useContext, useState } from "react";
// import useAxiosPublic from "../hooks/useAxiosPublic";

// const TranslationContext = createContext();

// const TranslationProvider = ({ children }) => {
//   const axiosPublic = useAxiosPublic();
//   const [language, setLanguage] = useState("en");
//   const [translations, setTranslations] = useState({});
//   const [loading, setLoading] = useState(false);

//   const changeLanguage = async (lang) => {
//     setLoading(true);
//     setLanguage(lang);

//     // collect all elements with data-translate
//     const elements = document.querySelectorAll("[data-translate]");

//     const translationPromises = Array.from(elements).map(async (el) => {
//       const originalText = el.getAttribute("data-translate");
//       if (!originalText) return null;

//       try {
//         const res = await axiosPublic.post("/api/translate", {
//           text: originalText,
//           targetLang: lang,
//         });

//         return { original: originalText, translated: res.data.translatedText };
//       } catch (err) {
//         console.error("Translation Error:", err);
//         return { original: originalText, translated: originalText };
//       }
//     });

//     const results = await Promise.all(translationPromises);

//     const newTranslations = { ...translations };
//     results.forEach((res) => {
//       if (res) newTranslations[res.original] = res.translated;
//     });

//     setTranslations(newTranslations);
//     setLoading(false);
//   };

//   return (
//     <TranslationContext.Provider
//       value={{ language, setLanguage: changeLanguage, translations, loading }}
//     >
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// const useTranslation = () => useContext(TranslationContext);

// export { TranslationProvider, useTranslation };


import { createContext, useContext, useState } from "react";

const TranslationContext = createContext();

const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);

  // Main Translation Function
  const changeLanguage = async (lang) => {
    setLoading(true);
    setLanguage(lang);

    // Collect all elements with [data-translate]
    const elements = document.querySelectorAll("[data-translate]");

    const translationPromises = Array.from(elements).map(async (el) => {
      const originalText = el.getAttribute("data-translate");
      if (!originalText) return null;

      try {
        // 🌍 Free Google Translate Unofficial API
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(
          originalText
        )}`;

        const res = await fetch(url);
        const data = await res.json();

        // Extract translated text
        const translatedText =
          data[0]?.map((item) => item[0]).join("") || originalText;

        // ✅ Replace only textContent (styles remain intact)
        el.textContent = translatedText;

        return { original: originalText, translated: translatedText };
      } catch (err) {
        console.error("Translation Error:", err);
        return { original: originalText, translated: originalText };
      }
    });

    const results = await Promise.all(translationPromises);

    // Save translations in state
    const newTranslations = { ...translations };
    results.forEach((res) => {
      if (res) newTranslations[res.original] = res.translated;
    });

    setTranslations(newTranslations);
    setLoading(false);
  };

  return (
    <TranslationContext.Provider
      value={{ language, setLanguage: changeLanguage, translations, loading }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

const useTranslation = () => useContext(TranslationContext);

export { TranslationProvider, useTranslation };

