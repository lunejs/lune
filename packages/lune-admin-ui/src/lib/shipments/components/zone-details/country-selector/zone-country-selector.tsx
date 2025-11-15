import { useMemo, useState } from 'react';
import { CircleFadingPlusIcon } from 'lucide-react';

import { Button } from '@lune/ui';

import type { CommonCountryFragment, CommonZoneFragment } from '@/lib/api/types';
import { useGetCountries } from '@/lib/shipments/hooks/use-get-countries';
import { useUpdateZone } from '@/lib/shipments/hooks/use-update-zone';
import { EntitySelector } from '@/shared/components/entity-selector/entity-selector';
import { AccordionEntitySelectorRow } from '@/shared/components/entity-selector/rows/accordion-entity-selector-row';

import { useZoneFormDetailsContext } from '../use-form/use-form';

export const ZoneCountrySelector = ({ defaultSelected, zone }: Props) => {
  const { isLoading, countries } = useGetCountries();
  const { updateZone } = useUpdateZone();

  const [search, setSearch] = useState('');
  const { setValue, watch } = useZoneFormDetailsContext();
  const states = watch('states');

  const [selectedStates, setSelectedStates] = useState<CommonCountryFragment['states']>(states);

  const filteredCountries = useMemo(
    () => countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase())),
    [countries, search]
  );

  return (
    <EntitySelector
      title="Add countries"
      description="Add countries to your zone"
      trigger={
        <Button variant={'outline'} type="button">
          <CircleFadingPlusIcon /> Add countries and states
        </Button>
      }
      items={filteredCountries}
      isLoading={isLoading}
      defaultSelected={countries.filter(p => defaultSelected.includes(p.id))}
      onSearch={setSearch}
      getRowId={item => item.id}
      onDone={async () => {
        if (zone) {
          updateZone({ id: zone.id, input: { stateIds: selectedStates.map(s => s.id) } });
        } else {
          setValue('states', selectedStates);
        }

        return true;
      }}
      renderItem={({ item: country }) => {
        return (
          <AccordionEntitySelectorRow
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

type Props = {
  zone: CommonZoneFragment | undefined;
  defaultSelected: string[];
};

export const isStateInCountry = (
  state: CommonCountryFragment['states'][0],
  country: CommonCountryFragment
) => {
  return country.states.some(s => s.id === state.id);
};
