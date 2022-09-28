import axios, { AxiosRequestConfig, AxiosInstance } from "axios"

const defaultHeaders = {
  accept: "application/json",
  "accept-language": "zh-CN,zh;q=0.9",
  "cache-control": "no-cache",
  pragma: "no-cache",
  "sec-ch-ua":
    '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  Referer: "https://www.pixiv.net/",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
}
export class PixivClient {
  private axiosInst: AxiosInstance
  constructor({ headers, requestConf }: { headers?: { cookie?: string, 'x-user-id'?: string } & Record<string, string>, requestConf?: AxiosRequestConfig } = {}) {
    this.axiosInst = axios.create({
      headers: { ...defaultHeaders, ...headers },
      ...requestConf,
    })
  }

  async getImgByPixivUrl (url: string) {
    const resp = await this.axiosInst.get<Buffer>(url, {
      method: "GET",
      responseType: "arraybuffer"
    })
    return resp.data
  }

  async getIllust (id: string | number) {
    const resp = await this.axiosInst.get<IllustResp>(`https://www.pixiv.net/ajax/illust/${id}`)
    if (resp.data.error) {
      console.error(resp.data)
      throw new Error('pixiv error')
    }
    return resp.data.body
  }

  async searchByKeyword (params: PixivSearchParams) {
    params = { ...params, word: encodeURIComponent(params.word) } // clone
    const defaultParams: PixivSearchParams = {
      word: '',
      order: "popular_d",
      mode: "safe",
      p: 1,
      s_mode: "s_tag",
      type: "all",
      lang: "zh",
    }
    const resp = await this.axiosInst.get<PixivSearchResp>(`https://www.pixiv.net/ajax/search/illustrations/${params.word}`, { params: { ...defaultParams, ...params }, })
    if (resp.data.error) {
      console.error(resp.data)
      throw new Error('pixiv error')
    }
    return resp.data.body
  }
}

export interface TitleCaptionTranslation {
  workTitle?: any
  workCaption?: any
}

export interface Datum {
  id: string
  title: string
  illustType: number
  xRestrict: number
  restrict: number
  sl: number
  url: string
  description: string
  tags: string[]
  userId: string
  userName: string
  width: number
  height: number
  pageCount: number
  isBookmarkable: boolean
  bookmarkData?: any
  alt: string
  titleCaptionTranslation: TitleCaptionTranslation
  createDate: Date
  updateDate: Date
  isUnlisted: boolean
  isMasked: boolean
  profileImageUrl: string
}

export interface BookmarkRange {
  min?: number
  max?: number
}

export interface IllustManga {
  data: Datum[]
  total: number
  bookmarkRanges: BookmarkRange[]
}

export interface Popular {
  recent: any[]
  permanent: any[]
}

export interface TagTranslation {
  [x: string]: {
    zh: string
  }
}

export interface Header {
  url: string
}

export interface Footer {
  url: string
}

export interface Infeed {
  url: string
}

export interface ZoneConfig {
  header: Header
  footer: Footer
  infeed: Infeed
}

export interface AlternateLanguages {
  ja: string
  en: string
}

export interface Meta {
  title: string
  description: string
  canonical: string
  alternateLanguages: AlternateLanguages
  descriptionHeader: string
}

export interface ExtraData {
  meta: Meta
}

export interface PixivSearchRespBody {
  illust: IllustManga

  popular: Popular
  relatedTags: string[]
  tagTranslation: TagTranslation
  zoneConfig: ZoneConfig
  extraData: ExtraData
}

export interface PixivSearchParams {
  word: string
  order?: "popular_d" | 'popular_male_d' | 'popular_female_d' | 'date_d' | 'date',
  mode?: "safe" | 'all' | 'r18',
  p?: number,
  s_mode?: "s_tag",
  type?: "all",
  lang?: "zh",
}

export interface PixivSearchResp {
  error: boolean
  body: PixivSearchRespBody
}

export interface Urls {
  mini: string
  thumb: string
  small: string
  regular: string
  original: string
}

export interface Translation {
  en: string
}

export interface Tag {
  tag: string
  locked: boolean
  deletable: boolean
  userId: string
  userName: string
  translation: Translation
}

export interface Tags {
  authorId: string
  isLocked: boolean
  tags: Tag[]
  writable: boolean
}

export interface TitleCaptionTranslation {
  workTitle?: any
  workCaption?: any
}

export interface TitleCaptionTranslation2 {
  workTitle?: any
  workCaption?: any
}

export interface TitleCaptionTranslation3 {
  workTitle?: any
  workCaption?: any
}

export interface Illust {
  id: string
  title: string
  illustType: number
  xRestrict: number
  restrict: number
  sl: number
  url: string
  description: string
  tags: string[]
  userId: string
  userName: string
  width: number
  height: number
  pageCount: number
  isBookmarkable: boolean
  bookmarkData?: any
  alt: string
  titleCaptionTranslation: TitleCaptionTranslation3
  createDate: Date
  updateDate: Date
  isUnlisted: boolean
  isMasked: boolean
  profileImageUrl: string
}

export interface UserIllusts {
  [x: number]: Illust | undefined
}

export interface FanboxPromotion {
  userName: string
  userImageUrl: string
  contentUrl: string
  description: string
  imageUrl: string
  imageUrlMobile: string
  hasAdultContent: boolean
}

export interface ZoneConfig {
  [x: string]: {
    url: string
  }
}

export interface AlternateLanguages {
  ja: string
  en: string
}

export interface Ogp {
  description: string
  image: string
  title: string
  type: string
}

export interface Twitter {
  description: string
  image: string
  title: string
  card: string
}

export interface Meta {
  title: string
  description: string
  canonical: string
  alternateLanguages: AlternateLanguages
  descriptionHeader: string
  ogp: Ogp
  twitter: Twitter
}

export interface ExtraData {
  meta: Meta
}

export interface TitleCaptionTranslation4 {
  workTitle?: any
  workCaption?: any
}

export interface IllustBody {
  illustId: string
  illustTitle: string
  illustComment: string
  id: string
  title: string
  description: string
  illustType: number
  createDate: Date
  uploadDate: Date
  restrict: number
  xRestrict: number
  sl: number
  urls: Urls
  tags: Tags
  alt: string
  storableTags: string[]
  userId: string
  userName: string
  userAccount: string
  userIllusts: UserIllusts
  likeData: boolean
  width: number
  height: number
  pageCount: number
  bookmarkCount: number
  likeCount: number
  commentCount: number
  responseCount: number
  viewCount: number
  bookStyle: string
  isHowto: boolean
  isOriginal: boolean
  imageResponseOutData: any[]
  imageResponseData: any[]
  imageResponseCount: number
  pollData?: any
  seriesNavData?: any
  descriptionBoothId?: any
  descriptionYoutubeId?: any
  comicPromotion?: any
  fanboxPromotion: FanboxPromotion
  contestBanners: any[]
  isBookmarkable: boolean
  bookmarkData?: any
  contestData?: any
  zoneConfig: ZoneConfig
  extraData: ExtraData
  titleCaptionTranslation: TitleCaptionTranslation4
  isUnlisted: boolean
  request?: any
  commentOff: number
}

export interface IllustResp {
  error: boolean
  message: string
  body: IllustBody
}
