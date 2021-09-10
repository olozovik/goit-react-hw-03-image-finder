import LoaderOval from 'react-loader-spinner';
import { createPortal } from 'react-dom';
import s from './Loader.module.css';

const loadingRoot = document.querySelector('#loading-root');

const Loader = () => {
  return createPortal(
    <div className={s.wrapper}>
      <LoaderOval
        className={s.loader}
        type="Oval"
        color="#3faae5"
        height={75}
        width={75}
      />
    </div>,
    loadingRoot,
  );
};

export { Loader };
