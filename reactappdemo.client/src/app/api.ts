// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7295/api/' }),
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: () => `customers`,
        }),
        addCustomer: builder.mutation({
            query: body => ({
                url: `customers`,
                method: "POST",
                body,
            }),
        }),
        delCustomer: builder.mutation({
            query: id => ({
                url: `customers/${id}`,
                method: "DELETE",
            }),
        }),
        updCustomer: builder.mutation({
            query: ({ id, body }) => ({
                url: `customers/${id}`,
                method: "PUT",
                body,
            }),
        }),
        addImages: builder.mutation({
            query: ({ id, body }) => ({
                url: `customers/${id}/images`,
                method: "POST",
                body,
            }),
        }),
        getImages: builder.query({
            query: (id) => `customers/${id}/images`,
        }),
        delImage: builder.mutation({
            query: ({ id, imageId }) => ({
                url: `customers/${id}/images/${imageId}`,
                method: "DELETE",
            }),
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetCustomersQuery,
    useLazyGetCustomersQuery,
    useAddCustomerMutation,
    useDelCustomerMutation,
    useUpdCustomerMutation,
    useAddImagesMutation,
    useGetImagesQuery,
    useLazyGetImagesQuery,
    useDelImageMutation,
} = appApi