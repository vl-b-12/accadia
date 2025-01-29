import { REQUEST } from "@/types/requestTypes";
import { apiRtk } from "../";

interface Collection {
  id: string;
  name: string;
}

type JewelryTypes = Collection;

interface FiltersResponse {
  collections: Collection[];
  jewelryTypes: JewelryTypes[];
}

export const filtersApi = apiRtk.injectEndpoints({
  endpoints: (build) => ({
    getFilters: build.query<FiltersResponse, void>({
      query: () => ({
        url: "/catalog/filters",
        method: REQUEST.GET,
      }),
    }),
  }),
});

export const { useLazyGetFiltersQuery } = filtersApi;
