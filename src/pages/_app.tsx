import type { AppProps } from 'next/app'

import 'antd/dist/antd.css';
import '../styles/globals.css'
import { MainLayout } from 'components/layout';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <MainLayout><Component {...pageProps} /></MainLayout>
}
export default App
