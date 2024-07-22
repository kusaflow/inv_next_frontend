import "@styles/globals.css";
import { AppContextProvider } from '@mycontext/AppContext';
import NavB from '@components/NavB'

export const metadata = {
  title: "PropertyDekho",
  description: "Buy Properties",
};

const RootLayout = ({ children }) => {


  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <AppContextProvider>
        {//(pathName !== "/login" && pathName !== "/signup") ?(
        <div className="main">
            <div className="gradient" />
          </div>
        //):(<></>)
        }
          <main className="app">
            <NavB />
            {children}
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
 