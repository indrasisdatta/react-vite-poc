import { Trans, useTranslation } from "react-i18next";

export const Dashboard = () => {
  const { t } = useTranslation();

  const listItems = t("dashboard.listItems", { returnObjects: true }) as
    | string[]
    | null;

  const count = 3;

  return (
    <div className="container mx-auto p-8">
      <h4 className="text-2xl font-bold mb-4">{t("title")}</h4>
      <div>
        <p>{t("dashboard.para1")}</p>
        <ul className="list-disc ml-4">
          {Array.isArray(listItems) ? (
            listItems?.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>No data</li>
          )}
        </ul>
        {/* Singular/plural texts using Trans component */}
        <p>
          <Trans i18nKey="dashboard.todoCount" count={count}>
            To do task ({count}).
          </Trans>
        </p>
      </div>
    </div>
  );
};
