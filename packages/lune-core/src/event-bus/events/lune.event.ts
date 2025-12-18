export class LuneEvent {
  constructor(
    public readonly type: string,
    public readonly ctx: LuneEventContext
  ) {}
}

export type LuneEventContext = {
  userId?: string;
  shopId: string;
};

export const buildEventContext = (
  shopId: string | undefined | null,
  userId?: string | null
): LuneEventContext => ({ shopId: shopId as string, userId: userId ?? undefined });
