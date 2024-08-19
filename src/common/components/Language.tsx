import i18next from "i18next";
import { SyntheticEvent } from "react";
import { useTranslation } from "react-i18next";

const Language = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e: SyntheticEvent<HTMLElement>) => {
    i18n.changeLanguage((e.target as HTMLInputElement).value);
  };

  return (
    <div className=" mr-3">
      <select
        className="py-1.5 pl-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={changeLanguage}
      >
        <option value="en" selected={i18next.language.includes("en")}>
          {t("lang.en")}
        </option>
        <option value="de" selected={i18next.language.includes("de")}>
          {t("lang.de")}
        </option>
      </select>
    </div>
  );
};

export default Language;
