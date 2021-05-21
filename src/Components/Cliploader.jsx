import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function Cliploader() {
  return (
    <Loader
      type="Bars"
      color="#074b79"
      height={20}
      width={50}
      timeout={3000} //3 secs
    />
  );
}
