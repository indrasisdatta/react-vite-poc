import { useTranslation } from "react-i18next";

export const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-8">
      <h4 className="text-2xl font-bold mb-4">{t("title")}</h4>
      <div>
        <p>
          The goal is to create a simple POC app to familiarize with the
          following:
        </p>
        <ul className="list-disc ml-4">
          <li>TS</li>
          <li>Vite</li>
          <li>React Query</li>
          <li>React hook form </li>
          <li>Tailwind CSS</li>
          <li>Dockerize build based on local and prod env vars</li>
        </ul>
      </div>
    </div>
  );
};
