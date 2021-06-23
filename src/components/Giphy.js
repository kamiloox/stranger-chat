import { useRef, useEffect, useState } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import PropTypes from 'prop-types';
import styles from '../styles/Giphy.module.scss';
import { ReactComponent as CloseIcon } from '../assets/closeIcon.svg';
import { emitMessage } from '../api/events';
import TextInput from './TextInput';
import Button from './Button';
import { GiphyProvider, useGiphy } from '../context/GiphyContext';
import { emitterType } from '../helpers/emitterTemplate';

const giphyFetch = new GiphyFetch(process.env.REACT_APP_GIPHY_KEY);

export const contentTypes = {
  gif: 'gif',
  animatedText: 'animatedText',
};

const Components = ({ closeFn, padding, type }) => {
  const totalPadding = padding * 2;
  const [width, setWidth] = useState(window.innerWidth - totalPadding);
  const inputRef = useRef(null);
  const wrapperRef = useRef();
  const { searchKey, setSearchKey } = useGiphy();
  const initialAnimatedText = 'hej';

  const contentType = contentTypes[type];

  useEffect(() => {
    const updateWidth = () => {
      const totalWidth = wrapperRef.current.parentNode.getBoundingClientRect().width - totalPadding;
      setWidth(totalWidth);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [totalPadding]);

  const fetchItems = (offset) => {
    return new Promise(async (resolve, reject) => {
      const pagination = {
        limit: 10,
        offset,
      };
      try {
        let data = null;
        switch (contentType) {
          case contentTypes.gif:
            if (searchKey.length === 0) data = await giphyFetch.trending(pagination);
            else data = await giphyFetch.search(searchKey, { lang: 'pl', ...pagination });
            break;
          case contentTypes.animatedText:
            if (searchKey.length === 0)
              data = await giphyFetch.animate(initialAnimatedText, pagination);
            else data = await giphyFetch.animate(searchKey, pagination);
            break;
          default:
            break;
        }
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleGifClick = ({ images }) => {
    emitMessage(images?.downsized_medium?.url || images?.original?.url, emitterType.gif);
    closeFn();
  };

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <Grid
        key={searchKey}
        columns={width > 800 ? 3 : 2}
        width={width}
        fetchGifs={fetchItems}
        className={styles.grid}
        onGifClick={handleGifClick}
        noLink
      />
      <div className={styles.searchFooter}>
        <Button btnType="icon" onClick={closeFn}>
          <CloseIcon />
        </Button>
        <TextInput
          onChange={(e) => setSearchKey(e.target.value)}
          ref={inputRef}
          as="input"
          placeholder="Szukaj gifa"
        />
      </div>
    </div>
  );
};

const Giphy = ({ type, closeFn, padding }) => (
  <GiphyProvider>
    <Components closeFn={closeFn} padding={padding} type={type} />
  </GiphyProvider>
);

Giphy.propTypes = {
  closeFn: PropTypes.func.isRequired,
  type: PropTypes.oneOf([contentTypes.animatedText, contentTypes.gif]),
  padding: PropTypes.number,
};

Giphy.defaultProps = {
  type: contentTypes.gif,
  padding: 0,
};

export default Giphy;
