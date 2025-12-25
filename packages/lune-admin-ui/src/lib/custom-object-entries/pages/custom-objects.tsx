import { PageLayout } from '@/shared/components/layout/page-layout';

import { CustomObjectDefinitionsTable } from '../components/custom-object-definitions-table/custom-object-definitions-table';
import { CustomObjectDefinitionsTableEmptyState } from '../components/custom-object-definitions-table/empty-state';
import { useCustomObjectDefinitionsTable } from '../components/custom-object-definitions-table/use-custom-object-definitions-table';

export const CustomObjectsPage = () => {
  const result = useCustomObjectDefinitionsTable();

  return (
    <PageLayout isLoading={result.isLoading}>
      {result.shouldRenderEmptyState ? (
        <CustomObjectDefinitionsTableEmptyState />
      ) : (
        <CustomObjectDefinitionsTable {...result} />
      )}
    </PageLayout>
  );
};
