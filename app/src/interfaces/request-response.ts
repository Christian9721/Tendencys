export interface IResponsePayload {
    success: boolean
    orders: Order[]
    page: Page
  }
  
  export interface Order {
    id: string
    number: string
    marketPlaceId: any
    groupId: any
    name: string
    packsId: any
    email: any
    fulfillmentStatus: FulfillmentStatus
    currency: string
    currencyExtension: any
    discountsCoupon: DiscountsCoupon
    totals: Totals
    dimensions: Dimensions
    totalsExtension: TotalsExtension
    taxesIncluded: string
    taxLines: any[]
    units: Units
    status: Status
    locationId: any
    reference: any
    tags: string[]
    payment: Payment
    customer: Customer
    refunds: any[]
    billingAddress: BillingAddress
    logistic: Logistic
    shippingMethod: any
    shippingOptionReference: any
    shippingLabel: any
    documents: Documents
    shippingAddress: ShippingAddress
    items: Item[]
    packages: any[]
    meta: any
    dates: Dates
    cancelReason: any
    note?: string
    locations: any[]
    localizationExtensions: any[]
    checkoutId: any
    fraudRisk: any
    events: any[]
  }
  
  export interface FulfillmentStatus {
    id: any
    status: any
    ecartapi: string
    ecartapiId: string
    partiallAvailable: string
  }
  
  export interface DiscountsCoupon {
    type: any
    codeCupon: any
    discount: any
    discountAmount: any
  }
  
  export interface Totals {
    subtotal: string
    total: string
    tax: string
    discount: string
    weight?: string
    shipping: string
  }
  
  export interface Dimensions {
    width: any
    height: any
    length: any
  }
  
  export interface TotalsExtension {
    subtotal: any
    total: any
    tax: any
    discount: any
    shipping: any
  }
  
  export interface Units {
    weight: string
  }
  
  export interface Status {
    id: any
    status: string
    financial: string
    ecartapi: string
    ecartapiId: string
  }
  
  export interface Payment {
    method: string
    status: string
    ecartapi: any
  }
  
  export interface Customer {}
  
  export interface BillingAddress {
    id: any
    firstName?: string
    lastName?: string
    dni: any
    identificationNumber: any
    address1?: string
    address2: any
    interiorNumber: any
    address3: any
    country?: Country
    state?: State
    city?: string
    postalCode?: string
    phone?: string
    email: any
    company?: string
    references: any
    latitude: any
    longitude: any
  }
  
  export interface Country {
    code: string
    name: string
    codeIso2: any
    codeIso3: any
  }
  
  export interface State {
    code: string
    name: string
    codeIso2: any
    codeIso3: any
  }
  
  export interface Logistic {
    mode: any
    type: any
    free: string
    direction: any
    serviceId: any
  }
  
  export interface Documents {
    shippingLabels: any[]
  }
  
  export interface ShippingAddress {
    id: any
    firstName?: string
    lastName?: string
    dni: any
    identificationNumber: any
    address1?: string
    address2: any
    interiorNumber: any
    address3: any
    country?: Country2
    state?: State2
    city?: string
    postalCode?: string
    phone?: string
    email: any
    company?: string
    references: any
    latitude: any
    longitude: any
  }
  
  export interface Country2 {
    code: string
    name: string
    codeIso2: any
    codeIso3: any
  }
  
  export interface State2 {
    code: string
    name: string
    codeIso2: any
    codeIso3: any
  }
  
  export interface Item {
    id: string
    variantId?: string
    productId?: string
    offerId: any
    inventoryId: any
    sku?: string
    productType: any
    fulfillment: Fulfillment
    name: string
    upc: any
    requiresShipping: string
    quantity: string | number
    currentQuantity: any
    price: string | number
    priceExtension: any
    discount: string
    discountExtension: any
    associatedItems: any[]
    bundled: string
    tax: any
    taxable: string
    weight?: string
    length: any
    width: any
    height: any
    vendor?: string
    imageUrl: any
    ecartapiUrl: string
  }
  
  export interface Fulfillment {
    quantity: string
    service: string
    status: any
  }
  
  export interface Dates {
    estimatedDeliveryIn: any
    deliveredAt: any
    canceledAt: any
    closedAt: any
    createdAt: string
    updatedAt: string
    paidAt: string
  }
  
  export interface Page {
    next: any
    previous: any
  }
  