import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';
function KryptoBirdMarketplace({ Component, pageProps }: AppProps) {
  return (
    <div>
      <nav
        className="boder-b p-6 text-center"
        style={{ backgroundColor: 'purple' }}
      >
        <p className="text-2xl font-bold text-white mr-5">NFT BNB Opensea</p>
        <div className="flex justify-center align-center text-white mt-5">
          <Link href="/">
            <a className="mr-6 hover:text-purple-400 capitalize">
              main marketplace
            </a>
          </Link>
          <Link href="/mint-item">
            <a className="mr-6 hover:text-purple-400 capitalize">mint tokens</a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 hover:text-purple-400 capitalize">My NFTs</a>
          </Link>
          <Link href="/creator-dashboard">
            <a className="mr-6 hover:text-purple-400 capitalize">
              account dashboard
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps}></Component>
    </div>
  );
}

export default KryptoBirdMarketplace;
