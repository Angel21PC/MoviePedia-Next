  
import styles, { globalStyles } from "./styles"
import 'bootstrap/dist/css/bootstrap.min.css';

export interface AppLayoutProps {
    
}
 
const AppLayout: React.SFC<AppLayoutProps> = ({children}) => {
    return ( 
        <>
            <div>
                <main>{children}</main>
            </div>
            <style jsx>{styles}</style>
            <style jsx global>
                {globalStyles}
            </style>
        </>
     );
}
 
export default AppLayout;