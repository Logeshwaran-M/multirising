import { useEffect } from "react";

const LanguageTranslator = () => {

  useEffect(() => {

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
         includedLanguages: "en,fr,de,it,es,ru,zh-CN,ja,id,bn,ar,vi,sv,tl,fa,th,ms,ur",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    document.body.appendChild(script);

  }, []);

  return (
    <div id="google_translate_element"></div>
  );

};

export default LanguageTranslator;