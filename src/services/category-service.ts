import { axiosClient } from '~/plugins/axiosClient'
import categoies from '~/constants/categories/categories.json'
import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { URLs } from '~/constants/request'
import {
  CategoryInterface,
  CategoryNameInterface,
  CategoriesParams,
  ItemsWithCount
} from '~/types'

export const categoryService = {
  // getCategories: (
  //   params?: Partial<CategoriesParams>
  // ): Promise<AxiosResponse<ItemsWithCount<CategoryInterface>>> => {
  //   return axiosClient.get(URLs.categories.get, { params })
  // },
  getCategories: (
    params?: Partial<CategoriesParams>
  ): Promise<AxiosResponse<ItemsWithCount<CategoryInterface>>> => {
    const filtered = categoies.filter((cat) => {
      if (!params?.name) return true
      return cat.name.toLowerCase().includes(params.name.toLowerCase())
    })
    const mockConfig: InternalAxiosRequestConfig = {
      headers: new AxiosHeaders(),
      method: 'get',
      url: '/categories'
    }
    const mockResponse: AxiosResponse<ItemsWithCount<CategoryInterface>> = {
      data: { items: filtered, count: filtered.length },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: mockConfig
    }

    return Promise.resolve(mockResponse)
  },
  getCategoriesNames: (): Promise<AxiosResponse<CategoryNameInterface[]>> => {
    return axiosClient.get(URLs.categories.getNames)
  }
}
