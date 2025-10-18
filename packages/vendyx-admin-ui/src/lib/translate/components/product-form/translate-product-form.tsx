import { Card, CardContent, CardTitle, Table, TableBody } from '@vendyx/ui';

import type { CommonListProductFragment } from '@/lib/api/types';

import { TranslateFormCell } from '../form/translate-form-cell';
import { TranslateFormHeader } from '../form/translate-form-header';
import { TranslateFormRow } from '../form/translate-form-row';
import { TranslateFormSeparator } from '../form/translate-form-separator';
import { TranslateFormToolbar } from '../form/translate-form-toolbar';
import { TranslateInput } from '../form/translate-input';
import { TranslateTextarea } from '../form/translate-textarea';

export const TranslateProductForm = ({ product }: Props) => {
  return (
    <section className="w-full">
      <TranslateFormToolbar title={product.name} image={product.assets.items?.[0].source} />
      <div className="p-4">
        <Card className="pb-0">
          <CardTitle className="ml-4">General</CardTitle>
          <CardContent className="p-0">
            <Table>
              <TranslateFormHeader />
              <TableBody>
                <TranslateFormRow>
                  <TranslateFormCell>Name</TranslateFormCell>
                  <TranslateFormCell isDisabled>Blusa Assilah</TranslateFormCell>
                  <TranslateInput defaultValue="Blusa Assilah" />
                </TranslateFormRow>

                <TranslateFormRow>
                  <TranslateFormCell>Description</TranslateFormCell>
                  <TranslateFormCell isDisabled>
                    Inspirada en la encantadora ciudad costera de Assilah en Marruecos, esta blusa
                    destaca por su escote en U y su diseño único. Con mangas 3/4 adornadas con dos
                    líneas de barbas y una parte trasera ligeramente más larga que la delantera,
                    ofrece un look moderno y fluido. Perfecta para un estilo casual con un toque
                    exótico.
                  </TranslateFormCell>
                  <TranslateTextarea defaultValue="Inspirada en la encantadora ciudad costera de Assilah en Marruecos, esta blusa destaca por su escote en U y su diseño único. Con mangas 3/4 adornadas con dos líneas de barbas y una parte trasera ligeramente más larga que la delantera, ofrece un look moderno y fluido. Perfecta para un estilo casual con un toque exótico." />
                </TranslateFormRow>

                <TranslateFormSeparator text="Options" />

                <TranslateFormRow>
                  <TranslateFormCell>Option name</TranslateFormCell>
                  <TranslateFormCell isDisabled>Talla</TranslateFormCell>
                  <TranslateInput defaultValue={'Size'} />
                </TranslateFormRow>

                <TranslateFormRow className="border-0!">
                  <TranslateFormCell>Option Values</TranslateFormCell>
                  <TranslateFormCell className="border-b" isDisabled>
                    S
                  </TranslateFormCell>
                  <TranslateInput defaultValue={'S'} className="border-b" />
                </TranslateFormRow>

                <TranslateFormRow className="border-0!">
                  <TranslateFormCell></TranslateFormCell>
                  <TranslateFormCell className="border-b" isDisabled>
                    M
                  </TranslateFormCell>
                  <TranslateInput defaultValue={'M'} className="border-b" />
                </TranslateFormRow>

                <TranslateFormRow className="border-0!">
                  <TranslateFormCell></TranslateFormCell>
                  <TranslateFormCell isDisabled>XL</TranslateFormCell>
                  <TranslateInput defaultValue={'M'} />
                </TranslateFormRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

type Props = {
  product: CommonListProductFragment;
};
