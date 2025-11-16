import { useMemo, useState } from 'react';
import { CircleFadingPlusIcon } from 'lucide-react';

import { Button } from '@lune/ui';

import type { CommonCountryFragment } from '@/lib/api/types';
import { useUpdateZone } from '@/lib/shipments/hooks/use-update-zone';
import { isStateInCountry } from '@/lib/shipments/utils/shipment.utils';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { AccordionEntitySelectorRow } from '@/shared/components/entity-selector/rows/accordion-entity-selector-row';
import { useLoadingNotification } from '@/shared/hooks/use-loading-notification';

import { useZoneFormDetailsContext } from '../use-form/use-form';

export const ZoneCountriesSelector = () => {
  const { loading, success, failure } = useLoadingNotification();
  const { setValue, watch, countries, zone } = useZoneFormDetailsContext();
  const { updateZone } = useUpdateZone();

  const [search, setSearch] = useState('');
  const states = watch('states');

  const [selectedStates, setSelectedStates] = useState<CommonCountryFragment['states']>(states);

  const filteredCountries = useMemo(
    () => countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())),
    [countries, search]
  );

  const defaultSelected = zone?.states.map(s => s.id) ?? [];

  return (
    <EntitySelector
      maxHeight
      title="Add countries"
      description="Add countries to your zone"
      trigger={
        <Button variant={'outline'} type="button">
          <CircleFadingPlusIcon /> Add countries
        </Button>
      }
      items={filteredCountries}
      isLoading={false}
      defaultSelected={countries.filter(p => defaultSelected.includes(p.id))}
      onSearch={setSearch}
      getRowId={item => item.id}
      onDone={async () => {
        if (zone) {
          loading('Saving...');

          const result = await updateZone({
            id: zone.id,
            input: { stateIds: selectedStates.map(s => s.id) }
          });

          if (!result.isSuccess) {
            failure(result.error);
            return false;
          }

          success('Zone saved');
        } else {
          setValue('states', selectedStates);
        }

        return true;
      }}
      renderItem={({ item: country }) => {
        return (
          <AccordionEntitySelectorRow
            key={country.id}
            value={country.id}
            checked={selectedStates.some(s => isStateInCountry(s, country))}
            onCheckedChange={checked => {
              if (checked) {
                setSelectedStates([...selectedStates, ...country.states]);
              } else {
                const stateIds = country.states.map(s => s.id);

                setSelectedStates(
                  selectedStates.filter(selectedState => !stateIds.includes(selectedState.id))
                );
              }
            }}
            label={country.name}
            content={country.states.map(state => ({
              id: state.id,
              label: state.name,
              checked: selectedStates.map(s => s.id).includes(state.id),
              onCheckedChange: checked => {
                if (checked) {
                  setSelectedStates([...selectedStates, state]);
                } else {
                  setSelectedStates(selectedStates.filter(s => s.id !== state.id));
                }
              }
            }))}
          />
        );
      }}
    />
  );
};
