import {SiteHeader} from './SiteHeader';
export function PageFrame({children}:{children:React.ReactNode}){return <><SiteHeader/><main className="inner-page">{children}</main><footer className="site-footer">ALINE — Brigadería Gourmet · Caracas, Venezuela</footer></>}
