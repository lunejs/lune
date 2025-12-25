import { PageLayout } from '@/shared/components/layout/page-layout';

import { CustomObjectDefinitionsTable } from '../components/definitions-table/custom-object-definitions-table';
import { CustomObjectDefinitionsTableEmptyState } from '../components/definitions-table/empty-state';
import { useCustomObjectDefinitionsTable } from '../components/definitions-table/use-custom-object-definitions-table';

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
