export enum Endpoints {
	/** Update */
	UPDATE = '/update/',
	/** Domains */
	SITE = '/domains/domain-details-guest/',
	/** Pages */
	PAGES = '/pages/get/',
	PAGES_CREATE = '/pages/create/',
	PAGES_CONTENT = '/pages/content/',
	PAGES_TITLE = '/pages/title/',
	/** Blog */
	BLOG = '/blog/',
	BLOG_SUBSCRIBE = '/blog/subscribe/',
	/** Categories */
	CATEGORIES = '/category/',
	CATEGORIES_BANNER = '/category/banner/',
	/** CHAT */
	CHAT = '/chat/',
	CHAT_LIST = '/chat/list/',
	/** Overview */
	OVERVIEW = '/overview/',
	/** Products */
	PRODUCTS = '/products/',
	PRODUCTS_BANNER = '/products/banner/',
	PRODUCTS_CART = '/products/cart/',
	PRODUCTS_MY = '/products/my/',
	PRODUCTS_WISH = '/products/wish/',
	/** Tenants */
	TENANTS = '/tenants/',
	/** Users */
	LOGIN = '/user/auth/login/',
	REGISTER = '/user/auth/signup/',
	USERS = '/user/utils/list/',
	USERS_UPDATE = '/user/utils/update/', // PUT - PATCH
	PHONES_CREATE = '/user/utils/phone/', // POST
	PRODUCT_RATING = '/rating/product/', // GET - POST
	/** Orders */
	ORDERS = '/orders/', // GET
	ORDERS_DASHBOARD = '/orders/dashboard/', // GET
	ORDERS_ORDER = '/orders/order/', // PUT - PATCH
	/** Payment */
	PAYMENT_PAYMOB = '/payment/paymob/',
	PAYMENT_STRIPE = '/payment/stripe/',
	/** Rating */
	RATING_REPLY = '/rating/reply/',
	RATING_PRODUCT = '/rating/product/',
	/** Users */
	USER_IS_LOGGED_IN = '/user/auth/is/logged/',
	USER_SHIPMENT = '/user/shipment/',
	USER_LIST = '/user/utils/list/',
	USER_PHONE_LIST = '/user/utils/phone/',
	USER_PROFILE = '/user/utils/profile/',
	USER_PROMOTE = '/user/utils/user/promote/',
	USER_REGION = '/user/regions/',
	/** Gateways */
	GATEWAY_ACTIVATED = '/gateway/activated/'
}
