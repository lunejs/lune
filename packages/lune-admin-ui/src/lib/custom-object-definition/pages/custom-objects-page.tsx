import { SettingsPageLayout } from '@/shared/components/layout/settings-page-layout';
import { PageLoader } from '@/shared/components/loader/page-loader';

import { CustomObjectsTable } from '../components/table/custom-object-table';
import { useGetCustomObjectDefinitions } from '../hooks/use-get-custom-object-definitions';

export const CustomObjectDefinitionsPage = () => {
  const { isLoading, customObjectDefinitions } = useGetCustomObjectDefinitions();

  if (isLoading) return <PageLoader />;

  return (
    <SettingsPageLayout
      title="Custom objects"
      subtitle="Define structured data objects you can use across your store."
    >
      <CustomObjectsTable customObjects={customObjectDefinitions} />
    </SettingsPageLayout>
  );
};
